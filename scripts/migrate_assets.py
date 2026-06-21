#!/usr/bin/env python3
"""Migra todo o diretório assets/ para a organização canónica de Dimensões Infinitas.

- converte PNG/JPEG/GIF/BMP/TIFF para WebP;
- normaliza nomes para kebab-case ASCII;
- move imagens para pastas por saga, livro e categoria;
- remove duplicados visuais exactos;
- actualiza referências textuais no projecto;
- recria manifesto e inventário;
- prepara pastas futuras com README.md.
"""
from __future__ import annotations

import csv
import hashlib
import json
import re
import shutil
import unicodedata
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
TEMP = ROOT / ".assets-migration"
IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp", ".tif", ".tiff"}
TEXT_EXTS = {".html", ".css", ".js", ".json", ".md", ".csv", ".txt", ".yml", ".yaml"}
BOOK_ROOT = "assets/books/ciclo-de-jesed"
BOOKS = ("ruinas-dos-ceus", "guerras-de-sangue")
BOOK_CATEGORIES = (
    "backgrounds", "chapters", "characters", "events", "families", "gallery",
    "lore/fauna", "lore/flora", "lore/foods", "lore/concepts", "maps",
    "objects", "organisations", "places",
)
SHARED_CATEGORIES = ("ui/icons", "ui/particles", "ui/textures", "reference")
RUINAS_PLACE_NAMES = {
    "bosques-de-arion", "circulo-de-nhamari", "erilan", "estacao-da-leveza", "eterea",
    "floresta-de-nadirion", "ilha-da-memoria", "ilha-dos-pequenos", "ilhas-baixas",
    "nadirion", "nivellia", "planalto-de-talyen", "praca-da-raiz", "primeiro-abrigo",
    "riacho-de-nadirion", "ruinas-de-eterea", "vale",
}


def slug(value: str) -> str:
    value = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode("ascii")
    value = value.lower().replace("&", " e ")
    value = re.sub(r"[^a-z0-9]+", "-", value).strip("-")
    return value or "imagem"


def rel(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()


def book_path(book: str, category: str, filename: str) -> str:
    return f"{BOOK_ROOT}/{book}/{category}/{filename}"


def branding_target(stem: str) -> str:
    s = slug(stem)
    if s.endswith("-white"):
        s, tone = s[:-6], "logo-light"
    elif s.endswith("-black"):
        s, tone = s[:-6], "logo-dark"
    elif s.endswith("-logo"):
        s, tone = s[:-5], "mark"
    else:
        tone = "mark"
    if s.startswith("dimen") and "infinit" in s:
        brand = "dimensoes-infinitas"
    elif s.startswith("ciclo") and "jesed" in s:
        brand = "ciclo-de-jesed"
    elif s.startswith("ru") and "ceu" in s:
        brand = "ruinas-dos-ceus"
    elif s.startswith("guerra") and "sangue" in s:
        brand = "guerras-de-sangue"
    else:
        brand = s
    return f"assets/branding/{brand}/{tone}.webp"


def canonical_target(source: Path) -> str:
    parts = list(source.relative_to(ASSETS).parts)
    lower = [p.lower() for p in parts]
    stem = slug(source.stem)
    if len(parts) >= 4 and parts[0] == "books" and parts[1] == "ciclo-de-jesed":
        scope = slug(parts[2])
        if len(parts) == 4 and stem == "cover" and scope in BOOKS:
            return f"assets/books/ciclo-de-jesed/{scope}/cover.webp"
        category_parts = [slug(part) for part in parts[3:-1]]
        middle = "/".join(category_parts)
        return f"assets/books/ciclo-de-jesed/{scope}/{middle + '/' if middle else ''}{stem}.webp"
    if len(parts) >= 3 and parts[0] == "branding":
        return f"assets/branding/{slug(parts[1])}/{stem}.webp"
    if len(parts) >= 3 and parts[0] == "shared":
        return f"assets/shared/{'/'.join(slug(p) for p in parts[1:-1])}/{stem}.webp"
    top = lower[0] if lower else ""
    if top == "branding":
        return branding_target(source.stem)
    if top == "covers":
        book = "ruinas-dos-ceus" if "ruinas" in stem else "guerras-de-sangue" if "guerras" in stem else stem
        return book_path(book, "", "cover.webp").replace("//", "/")
    if top == "chapters" and len(parts) >= 3:
        book = slug(parts[1])
        match = re.search(r"(\d+)", source.stem)
        filename = f"chapter-{int(match.group(1)):02d}.webp" if match else f"{stem}.webp"
        return book_path(book, "chapters", filename)
    if top == "maps" and len(parts) >= 3:
        book = slug(parts[1])
        map_stem = stem
        aliases = {
            "mapa-geral": "map-jesed", "mapa-combinado": "map-combined",
            "mapa-de-eterea": "map-eterea", "mapa-de-et-rea": "map-eterea", "mapa-de-etrea": "map-eterea",
            "mapa-de-nadirion-floresta-de-mirval": "map-nadirion",
            "mapa-de-nad-rion-floresta-de-mirval": "map-nadirion",
            "mapa-de-nadrion-floresta-de-mirval": "map-nadirion",
        }
        if "eterea" in map_stem or "etrea" in map_stem:
            map_stem = "map-eterea"
        elif "nadirion" in map_stem or "nadrion" in map_stem:
            map_stem = "map-nadirion"
        else:
            map_stem = aliases.get(map_stem, map_stem)
        return book_path(book, "maps", f"{map_stem}.webp")
    if top == "characters" and len(parts) >= 3:
        book = "ruinas-dos-ceus" if slug(parts[1]) in {"ruinas", "ruinas-dos-ceus"} else "guerras-de-sangue"
        return book_path(book, "characters", f"{stem}.webp")
    if top == "places":
        explicit_ruinas = len(parts) >= 3 and slug(parts[1]) in {"ruinas", "ruinas-dos-ceus"}
        book = "ruinas-dos-ceus" if explicit_ruinas or stem in RUINAS_PLACE_NAMES else "guerras-de-sangue"
        return book_path(book, "places", f"{stem}.webp")
    if top == "lore" and len(parts) >= 2:
        category = {"alimentos": "foods", "comidas": "foods", "conceitos": "concepts"}.get(slug(parts[1]), slug(parts[1]))
        if stem == "raukhar":
            return f"{BOOK_ROOT}/shared/lore/fauna/raukhar.webp"
        return f"{BOOK_ROOT}/shared/lore/{category}/{stem}.webp"
    if top in {"backgrounds", "events", "families", "gallery", "objects", "organisations"} and len(parts) >= 3:
        return book_path(slug(parts[1]), top, f"{stem}.webp")
    if top == "ui" and len(parts) >= 2:
        return f"assets/shared/ui/{slug(parts[1])}/{stem}.webp"
    return f"assets/shared/reference/{stem}.webp"


@dataclass
class Candidate:
    source: Path
    old_path: str
    target: str
    score: int
    image: Image.Image


def load_candidate(path: Path) -> Candidate:
    with Image.open(path) as opened:
        image = ImageOps.exif_transpose(opened)
        image.load()
        if image.mode not in {"RGB", "RGBA"}:
            image = image.convert("RGBA" if "A" in image.getbands() else "RGB")
        else:
            image = image.copy()
    format_priority = {".png": 3, ".webp": 2, ".jpg": 1, ".jpeg": 1}.get(path.suffix.lower(), 0)
    score = image.width * image.height * 10 + format_priority * 1_000_000 + path.stat().st_size
    return Candidate(path, rel(path), canonical_target(path), score, image)


def max_dimension(target: str) -> int:
    if "/maps/" in target:
        return 5000
    if "/chapters/" in target or target.endswith("/cover.webp"):
        return 2600
    if "/characters/" in target:
        return 1800
    return 2400


def save_webp(candidate: Candidate, target_root: Path) -> None:
    out = target_root / Path(candidate.target).relative_to("assets")
    out.parent.mkdir(parents=True, exist_ok=True)
    image = candidate.image.copy()
    limit = max_dimension(candidate.target)
    if max(image.size) > limit:
        image.thumbnail((limit, limit), Image.Resampling.LANCZOS)
    args = {"format": "WEBP", "method": 6}
    args.update({"lossless": True, "quality": 100} if "/branding/" in candidate.target else {"quality": 88})
    image.save(out, **args)


def all_text_files() -> Iterable[Path]:
    ignored = {".git", "node_modules", ".assets-migration"}
    for path in ROOT.rglob("*"):
        if path.is_file() and path.suffix.lower() in TEXT_EXTS and not any(part in ignored for part in path.parts):
            yield path


def replace_references(mapping: dict[str, str]) -> int:
    changed = 0
    replacements = sorted(mapping.items(), key=lambda item: len(item[0]), reverse=True)
    for path in all_text_files():
        if path in {ROOT / "data/common/assets-manifest.json", ROOT / "data/common/inventario-pasta-assets.csv"}:
            continue
        text = path.read_text(encoding="utf-8", errors="ignore")
        updated = text
        for old, new in replacements:
            updated = updated.replace(old, new).replace(old.replace(" ", "%20"), new)
        if updated != text:
            path.write_text(updated, encoding="utf-8")
            changed += 1
    return changed


def prepare_directories(target_root: Path) -> None:
    (target_root / "README.md").write_text("# Assets de Dimensões Infinitas\n\nTodas as imagens usam WebP e nomes em kebab-case sem acentos.\n", encoding="utf-8")
    for book in BOOKS:
        for category in BOOK_CATEGORIES:
            directory = target_root / "books/ciclo-de-jesed" / book / category
            directory.mkdir(parents=True, exist_ok=True)
            (directory / "README.md").write_text(f"# {category.split('/')[-1].title()} — {book}\n\nPasta preparada para imagens canónicas em WebP.\n", encoding="utf-8")
    for category in SHARED_CATEGORIES:
        directory = target_root / "shared" / category
        directory.mkdir(parents=True, exist_ok=True)
        (directory / "README.md").write_text("# Recursos compartilhados\n\nPasta preparada para recursos WebP.\n", encoding="utf-8")
    for category in ("lore/fauna", "lore/flora", "lore/foods", "lore/concepts"):
        directory = target_root / "books/ciclo-de-jesed/shared" / category
        directory.mkdir(parents=True, exist_ok=True)
        (directory / "README.md").write_text("# Lore compartilhada\n\nImagens usadas em mais de um período.\n", encoding="utf-8")


def build_manifest() -> list[dict]:
    images = []
    for path in sorted(ASSETS.rglob("*.webp")):
        with Image.open(path) as image:
            images.append({"path": rel(path), "filename": path.name, "category": "/".join(path.relative_to(ASSETS).parts[:-1]), "extension": ".webp", "width": image.width, "height": image.height, "sizeBytes": path.stat().st_size, "sha256": hashlib.sha256(path.read_bytes()).hexdigest()})
    manifest = {"schemaVersion": 2, "updatedAt": "2026-06-22", "formatPolicy": "webp-only", "namingPolicy": "ascii-kebab-case", "count": len(images), "assets": images}
    (ROOT / "data/common/assets-manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    with (ROOT / "data/common/inventario-pasta-assets.csv").open("w", encoding="utf-8", newline="") as handle:
        writer = csv.writer(handle, delimiter=";")
        writer.writerow(["Pasta", "Nome do arquivo", "Extensão", "Caminho completo (a partir de assets/)", "Tamanho", "Dimensões"])
        for item in images:
            writer.writerow([item["category"], item["filename"], ".webp", item["path"].removeprefix("assets/"), item["sizeBytes"], f"{item['width']}x{item['height']}"])
    return images


def main() -> None:
    if not ASSETS.exists():
        raise SystemExit("Pasta assets/ não encontrada.")
    if TEMP.exists():
        shutil.rmtree(TEMP)
    TEMP.mkdir(parents=True)
    candidates = [load_candidate(path) for path in ASSETS.rglob("*") if path.is_file() and path.suffix.lower() in IMAGE_EXTS]
    by_target: dict[str, Candidate] = {}
    for candidate in candidates:
        current = by_target.get(candidate.target)
        if current is None or candidate.score > current.score:
            by_target[candidate.target] = candidate
    selected = [candidate for _, candidate in sorted(by_target.items())]
    mapping = {candidate.old_path: candidate.target for candidate in candidates}
    for number in range(1, 100):
        target = book_path("guerras-de-sangue", "chapters", f"chapter-{number:02d}.webp")
        for extension in ("png", "jpg", "jpeg", "webp"):
            mapping.setdefault(f"assets/chapters/guerras-de-sangue/capitulo-{number}.{extension}", target)
        target = book_path("ruinas-dos-ceus", "chapters", f"chapter-{number:02d}.webp")
        for label in (f"Capítulo {number}", f"Capitulo {number}", f"capitulo-{number}"):
            for extension in ("png", "jpg", "jpeg", "webp"):
                mapping.setdefault(f"assets/chapters/ruinas-dos-ceus/{label}.{extension}", target)
    mapping.setdefault("assets/covers/ruinas-dos-ceus.webp", f"{BOOK_ROOT}/ruinas-dos-ceus/cover.webp")
    mapping.setdefault("assets/covers/guerras-de-sangue.webp", f"{BOOK_ROOT}/guerras-de-sangue/cover.webp")
    for candidate in selected:
        save_webp(candidate, TEMP)
    prepare_directories(TEMP)
    backup = ROOT / ".assets-old"
    if backup.exists():
        shutil.rmtree(backup)
    ASSETS.rename(backup)
    TEMP.rename(ASSETS)
    shutil.rmtree(backup)
    changed_files = replace_references(mapping)
    images = build_manifest()
    missing = []
    pattern = re.compile(r"assets/[A-Za-z0-9_./%()\-]+\.(?:webp|png|jpe?g|gif|bmp)", re.I)
    for path in [p for p in all_text_files() if p.suffix.lower() in {".html", ".css", ".js"}]:
        for match in pattern.findall(path.read_text(encoding="utf-8", errors="ignore")):
            if not (ROOT / match.replace("%20", " ")).exists():
                missing.append({"file": rel(path), "reference": match})
    report = {"updatedAt": "2026-06-22", "sourceImages": len(candidates), "finalImages": len(images), "duplicatesRemoved": len(candidates) - len(selected), "textFilesUpdated": changed_files, "missingReferences": missing, "mapping": mapping}
    (ROOT / "data/common/asset-migration-report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    if missing:
        for item in missing[:40]:
            print(f"FALTA: {item['file']} -> {item['reference']}")
        raise SystemExit(f"Migração concluída, mas restaram {len(missing)} referências quebradas.")
    print(json.dumps({key: report[key] for key in ("sourceImages", "finalImages", "duplicatesRemoved", "textFilesUpdated")}, indent=2))


if __name__ == "__main__":
    main()
