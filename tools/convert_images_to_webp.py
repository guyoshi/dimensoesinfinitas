#!/usr/bin/env python3
"""Converte e optimiza as imagens raster do site para WebP.

O script:
- percorre o repositório à procura de PNG/JPG/JPEG/BMP/TIFF/GIF/WEBP;
- escolhe limites de dimensão e qualidade conforme o papel provável da imagem;
- preserva transparência e animação quando existirem;
- actualiza referências em HTML, CSS, JS, JSON, Markdown e outros ficheiros de texto;
- remove os formatos antigos após conversão bem-sucedida;
- gera relatórios MD, CSV e JSON com nome, dimensões, tamanho e descrição.
"""
from __future__ import annotations

import csv
import json
import os
import re
import shutil
import sys
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Iterable
from urllib.parse import quote

from PIL import Image, ImageOps, UnidentifiedImageError

ROOT = Path(__file__).resolve().parents[1]
REPORT_DIR = ROOT / "docs" / "imagens"

RASTER_EXTS = {".png", ".jpg", ".jpeg", ".bmp", ".tif", ".tiff", ".gif", ".webp"}
TEXT_EXTS = {
    ".html", ".htm", ".css", ".js", ".mjs", ".cjs", ".jsx", ".ts", ".tsx",
    ".json", ".md", ".txt", ".xml", ".yml", ".yaml", ".csv", ".webmanifest",
}
SKIP_DIRS = {
    ".git", ".github", "node_modules", "dist", "build", ".next", ".cache",
    ".idea", ".vscode", "coverage", "vendor",
}


@dataclass
class ImageReport:
    arquivo: str
    caminho: str
    tipo: str
    descricao: str
    dimensoes: str
    tamanho_bytes: int
    tamanho_humano: str
    formato_origem: str
    dimensoes_origem: str
    tamanho_origem_bytes: int
    tamanho_origem_humano: str
    economia_percentual: float
    referencias: list[str]


def human_size(size: int) -> str:
    value = float(size)
    for unit in ("B", "KB", "MB", "GB"):
        if value < 1024 or unit == "GB":
            return f"{value:.0f} {unit}" if unit == "B" else f"{value:.1f} {unit}"
        value /= 1024
    return f"{size} B"


def normalise_words(value: str) -> str:
    value = re.sub(r"[_\-]+", " ", value)
    value = re.sub(r"\s+", " ", value).strip()
    return value


def title_from_stem(stem: str) -> str:
    cleaned = normalise_words(stem)
    cleaned = re.sub(r"\b(?:img|image|imagem|photo|foto|final|new|novo|nova|copy|copia|versao|version|v\d+)\b", "", cleaned, flags=re.I)
    cleaned = re.sub(r"\s+", " ", cleaned).strip()
    return cleaned[:1].upper() + cleaned[1:] if cleaned else "imagem"


def classify(path: Path) -> tuple[str, tuple[int, int], int, bool]:
    value = path.as_posix().lower()
    name = path.stem.lower()

    def has(*terms: str) -> bool:
        return any(term in value for term in terms)

    if has("branding", "logo", "logotipo", "emblema", "simbolo", "símbolo", "icone", "ícone", "icon"):
        return "Logo / identidade visual", (1800, 1000), 94, True
    if has("capa", "cover"):
        return "Capa de livro", (1800, 2700), 90, False
    if has("mapa", "/maps/", "/map/"):
        return "Mapa", (2800, 2800), 92, False
    if has("personagem", "personagens", "character", "characters", "portrait", "retrato"):
        return "Retrato de personagem", (1400, 1800), 90, False
    if has("lugar", "lugares", "place", "places", "location", "locations", "paisagem"):
        return "Ilustração de local", (2200, 1600), 89, False
    if has("capitulo", "capítulo", "chapter", "scene", "cena", "ilustracao", "ilustração", "illustration"):
        return "Ilustração de capítulo / cena", (2200, 1600), 89, False
    if has("background", "fundo", "hero", "banner", "header"):
        return "Fundo / banner", (2560, 1600), 88, False
    if name in {"favicon", "apple-touch-icon"} or "favicon" in name:
        return "Ícone do site", (512, 512), 95, True
    return "Imagem do site", (1920, 1920), 88, False


def infer_book(path: Path) -> str | None:
    text = path.as_posix().lower()
    if "ruinas-dos-ceus" in text or "ruínas-dos-céus" in text or "ruinas dos ceus" in text:
        return "Ruínas dos Céus"
    if "guerras-de-sangue" in text or "guerras de sangue" in text:
        return "Guerras de Sangue"
    if "ciclo-de-jesed" in text or "ciclo de jesed" in text:
        return "Ciclo de Jesed"
    if "dimensoes" in text or "dimensões" in text:
        return "Dimensões Infinitas"
    return None


def describe(path: Path, category: str) -> str:
    subject = title_from_stem(path.stem)
    book = infer_book(path)
    lower = path.as_posix().lower()

    if category == "Logo / identidade visual":
        if "dimens" in lower:
            return "Logo da marca Dimensões Infinitas"
        if "ciclo" in lower and "jesed" in lower:
            return "Logo da saga Ciclo de Jesed"
        if "ruin" in lower and "ceu" in lower:
            return "Logo do livro Ruínas dos Céus"
        if "guerra" in lower and "sangue" in lower:
            return "Logo do livro Guerras de Sangue"
        return f"Elemento de identidade visual: {subject}"

    prefix = {
        "Capa de livro": "Capa",
        "Mapa": "Mapa",
        "Retrato de personagem": "Retrato do personagem",
        "Ilustração de local": "Ilustração do local",
        "Ilustração de capítulo / cena": "Ilustração de cena ou capítulo",
        "Fundo / banner": "Imagem de fundo ou banner",
        "Ícone do site": "Ícone do site",
        "Imagem do site": "Imagem do site",
    }.get(category, "Imagem")

    desc = f"{prefix}: {subject}"
    if book and book.lower() not in subject.lower():
        desc += f" — {book}"
    return desc


def iter_images() -> Iterable[Path]:
    for path in ROOT.rglob("*"):
        if not path.is_file():
            continue
        if any(part in SKIP_DIRS for part in path.relative_to(ROOT).parts):
            continue
        if path.suffix.lower() in RASTER_EXTS:
            yield path


def resize_frame(frame: Image.Image, max_size: tuple[int, int]) -> Image.Image:
    frame = ImageOps.exif_transpose(frame)
    copied = frame.copy()
    copied.thumbnail(max_size, Image.Resampling.LANCZOS)
    return copied


def prepare_mode(image: Image.Image) -> Image.Image:
    if image.mode in {"RGBA", "LA"} or "transparency" in image.info:
        return image.convert("RGBA")
    return image.convert("RGB")


def save_static(src: Image.Image, dst: Path, max_size: tuple[int, int], quality: int, prefer_lossless: bool) -> tuple[int, int]:
    frame = prepare_mode(resize_frame(src, max_size))
    kwargs = {
        "format": "WEBP",
        "method": 6,
        "exact": True,
    }
    # Logos, ícones e imagens pequenas com transparência beneficiam-se de lossless.
    has_alpha = frame.mode == "RGBA"
    lossless = prefer_lossless and has_alpha and frame.width * frame.height <= 3_000_000
    if lossless:
        kwargs.update({"lossless": True, "quality": 100})
    else:
        kwargs.update({"quality": quality})
    frame.save(dst, **kwargs)
    return frame.size


def save_animated(src: Image.Image, dst: Path, max_size: tuple[int, int], quality: int) -> tuple[int, int]:
    frames: list[Image.Image] = []
    durations: list[int] = []
    loop = src.info.get("loop", 0)
    for i in range(getattr(src, "n_frames", 1)):
        src.seek(i)
        frame = prepare_mode(resize_frame(src, max_size))
        frames.append(frame)
        durations.append(src.info.get("duration", 100))
    first, *rest = frames
    first.save(
        dst,
        format="WEBP",
        save_all=True,
        append_images=rest,
        duration=durations,
        loop=loop,
        quality=quality,
        method=6,
        exact=True,
    )
    return first.size


def replace_references(mapping: dict[str, str]) -> dict[str, list[str]]:
    refs: dict[str, list[str]] = {new: [] for new in mapping.values()}
    text_files: list[Path] = []
    for path in ROOT.rglob("*"):
        if not path.is_file() or path.suffix.lower() not in TEXT_EXTS:
            continue
        if any(part in SKIP_DIRS for part in path.relative_to(ROOT).parts):
            continue
        if path.is_relative_to(REPORT_DIR):
            continue
        text_files.append(path)

    # Substituir caminhos maiores primeiro evita colisões entre nomes semelhantes.
    pairs = sorted(mapping.items(), key=lambda item: len(item[0]), reverse=True)

    for path in text_files:
        try:
            original = path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue
        updated = original
        rel_text_path = path.relative_to(ROOT).as_posix()

        for old, new in pairs:
            variants = {
                old: new,
                "/" + old: "/" + new,
                quote(old): quote(new),
                quote(old, safe="/"): quote(new, safe="/"),
            }
            file_referenced = False
            for old_variant, new_variant in variants.items():
                if old_variant in updated:
                    updated = updated.replace(old_variant, new_variant)
                    file_referenced = True
            if file_referenced and rel_text_path not in refs[new]:
                refs[new].append(rel_text_path)

        if updated != original:
            path.write_text(updated, encoding="utf-8")

    return refs


def main() -> int:
    REPORT_DIR.mkdir(parents=True, exist_ok=True)
    source_images = sorted(iter_images(), key=lambda p: p.as_posix().lower())
    if not source_images:
        print("Nenhuma imagem raster encontrada.")
        return 0

    mapping: dict[str, str] = {}
    interim: list[dict] = []
    failures: list[str] = []

    for src_path in source_images:
        rel_src = src_path.relative_to(ROOT).as_posix()
        category, max_size, quality, prefer_lossless = classify(src_path)
        dst_path = src_path if src_path.suffix.lower() == ".webp" else src_path.with_suffix(".webp")
        rel_dst = dst_path.relative_to(ROOT).as_posix()
        temp_path = dst_path.with_name(dst_path.name + ".tmp")
        original_size = src_path.stat().st_size

        try:
            with Image.open(src_path) as image:
                original_dims = image.size
                original_format = image.format or src_path.suffix.lstrip(".").upper()
                animated = getattr(image, "is_animated", False) and getattr(image, "n_frames", 1) > 1
                if animated:
                    new_dims = save_animated(image, temp_path, max_size, quality)
                else:
                    new_dims = save_static(image, temp_path, max_size, quality, prefer_lossless)

            # Se o destino já era WebP, substitui de forma atómica.
            temp_path.replace(dst_path)
            if src_path != dst_path:
                src_path.unlink()
                mapping[rel_src] = rel_dst

            new_size = dst_path.stat().st_size
            interim.append({
                "path": dst_path,
                "rel": rel_dst,
                "category": category,
                "description": describe(dst_path, category),
                "new_dims": new_dims,
                "new_size": new_size,
                "original_format": original_format,
                "original_dims": original_dims,
                "original_size": original_size,
            })
            print(f"OK  {rel_src} -> {rel_dst} ({human_size(original_size)} -> {human_size(new_size)})")
        except (UnidentifiedImageError, OSError, ValueError) as exc:
            failures.append(f"{rel_src}: {exc}")
            if temp_path.exists():
                temp_path.unlink()
            print(f"ERRO {rel_src}: {exc}", file=sys.stderr)

    refs = replace_references(mapping)

    reports: list[ImageReport] = []
    for item in interim:
        original_size = item["original_size"]
        new_size = item["new_size"]
        saving = ((original_size - new_size) / original_size * 100) if original_size else 0.0
        reports.append(ImageReport(
            arquivo=Path(item["rel"]).name,
            caminho=item["rel"],
            tipo=item["category"],
            descricao=item["description"],
            dimensoes=f"{item['new_dims'][0]} × {item['new_dims'][1]} px",
            tamanho_bytes=new_size,
            tamanho_humano=human_size(new_size),
            formato_origem=item["original_format"],
            dimensoes_origem=f"{item['original_dims'][0]} × {item['original_dims'][1]} px",
            tamanho_origem_bytes=original_size,
            tamanho_origem_humano=human_size(original_size),
            economia_percentual=round(saving, 1),
            referencias=sorted(refs.get(item["rel"], [])),
        ))

    reports.sort(key=lambda r: (r.tipo.lower(), r.arquivo.lower(), r.caminho.lower()))

    total_original = sum(r.tamanho_origem_bytes for r in reports)
    total_new = sum(r.tamanho_bytes for r in reports)
    total_saving = ((total_original - total_new) / total_original * 100) if total_original else 0.0

    json_path = REPORT_DIR / "relatorio-imagens-webp.json"
    json_path.write_text(json.dumps([asdict(r) for r in reports], ensure_ascii=False, indent=2), encoding="utf-8")

    csv_path = REPORT_DIR / "relatorio-imagens-webp.csv"
    with csv_path.open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.writer(handle)
        writer.writerow([
            "Arquivo", "Caminho", "Tipo", "O que é", "Dimensões", "Tamanho",
            "Tamanho em bytes", "Formato de origem", "Dimensões de origem",
            "Tamanho de origem", "Economia (%)", "Referenciado em",
        ])
        for r in reports:
            writer.writerow([
                r.arquivo, r.caminho, r.tipo, r.descricao, r.dimensoes, r.tamanho_humano,
                r.tamanho_bytes, r.formato_origem, r.dimensoes_origem,
                r.tamanho_origem_humano, r.economia_percentual, "; ".join(r.referencias),
            ])

    md_path = REPORT_DIR / "relatorio-imagens-webp.md"
    lines = [
        "# Relatório de imagens WebP",
        "",
        f"- **Imagens processadas:** {len(reports)}",
        f"- **Tamanho antes:** {human_size(total_original)}",
        f"- **Tamanho depois:** {human_size(total_new)}",
        f"- **Redução total:** {total_saving:.1f}%",
        "- **Observação:** SVGs foram preservados como vector, pois convertê-los para WebP reduziria a qualidade e a escalabilidade.",
        "",
        "| Arquivo | Dimensões | Tamanho | Tipo | O que é | Caminho |",
        "|---|---:|---:|---|---|---|",
    ]
    for r in reports:
        safe_desc = r.descricao.replace("|", "\\|")
        lines.append(f"| `{r.arquivo}` | {r.dimensoes} | {r.tamanho_humano} | {r.tipo} | {safe_desc} | `{r.caminho}` |")

    if failures:
        lines.extend(["", "## Ficheiros que não puderam ser processados", ""])
        lines.extend(f"- `{failure}`" for failure in failures)

    md_path.write_text("\n".join(lines) + "\n", encoding="utf-8")

    print()
    print(f"Imagens processadas: {len(reports)}")
    print(f"Antes: {human_size(total_original)}")
    print(f"Depois: {human_size(total_new)}")
    print(f"Redução: {total_saving:.1f}%")
    print(f"Relatório: {md_path.relative_to(ROOT)}")

    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
