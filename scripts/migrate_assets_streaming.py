#!/usr/bin/env python3
"""Executa a migração de assets em fluxo, abrindo apenas uma imagem por vez."""
from __future__ import annotations

import importlib.util
import sys
from dataclasses import dataclass
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("asset_migration", ROOT / "scripts/migrate_assets.py")
migration = importlib.util.module_from_spec(spec)
assert spec.loader
sys.modules[spec.name] = migration
spec.loader.exec_module(migration)


@dataclass
class Candidate:
    source: Path
    old_path: str
    target: str
    score: int


def load_candidate(path: Path) -> Candidate:
    with Image.open(path) as opened:
        width, height = opened.size
    format_priority = {".png": 3, ".webp": 2, ".jpg": 1, ".jpeg": 1}.get(path.suffix.lower(), 0)
    score = width * height * 10 + format_priority * 1_000_000 + path.stat().st_size
    return Candidate(path, migration.rel(path), migration.canonical_target(path), score)


def save_webp(candidate: Candidate, target_root: Path) -> None:
    out = target_root / Path(candidate.target).relative_to("assets")
    out.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(candidate.source) as opened:
        image = ImageOps.exif_transpose(opened)
        image.load()
        if image.mode not in {"RGB", "RGBA"}:
            image = image.convert("RGBA" if "A" in image.getbands() else "RGB")
        else:
            image = image.copy()
    limit = migration.max_dimension(candidate.target)
    if max(image.size) > limit:
        image.thumbnail((limit, limit), Image.Resampling.LANCZOS)
    args = {"format": "WEBP", "method": 4}
    args.update({"lossless": True, "quality": 100} if "/branding/" in candidate.target else {"quality": 88})
    image.save(out, **args)
    image.close()


migration.Candidate = Candidate
migration.load_candidate = load_candidate
migration.save_webp = save_webp

if __name__ == "__main__":
    migration.main()
