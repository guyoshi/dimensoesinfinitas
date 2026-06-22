#!/usr/bin/env python3
"""Remove WebPs binariamente duplicados e religa todas as referências ao exemplar canónico."""
from __future__ import annotations

import hashlib
import importlib.util
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
REPORT = ROOT / "data/common/asset-migration-report.json"

spec = importlib.util.spec_from_file_location("asset_migration", ROOT / "scripts/migrate_assets.py")
migration = importlib.util.module_from_spec(spec)
assert spec.loader
sys.modules[spec.name] = migration
spec.loader.exec_module(migration)


def priority(path: Path) -> tuple[int, int, str]:
    relative = path.relative_to(ROOT).as_posix()
    score = 0
    if "/cover.webp" in relative:
        score += 100
    if "/branding/" in relative:
        score += 80
    if "/characters/" in relative or "/places/" in relative:
        score += 50
    if "/gallery/" in relative or "/reference/" in relative:
        score -= 20
    return (-score, len(relative), relative)


def main() -> None:
    groups: dict[str, list[Path]] = {}
    for path in ASSETS.rglob("*.webp"):
        digest = hashlib.sha256(path.read_bytes()).hexdigest()
        groups.setdefault(digest, []).append(path)
    replacements: dict[str, str] = {}
    removed = []
    for paths in groups.values():
        if len(paths) < 2:
            continue
        paths.sort(key=priority)
        winner = paths[0]
        winner_rel = winner.relative_to(ROOT).as_posix()
        for duplicate in paths[1:]:
            duplicate_rel = duplicate.relative_to(ROOT).as_posix()
            replacements[duplicate_rel] = winner_rel
            duplicate.unlink()
            removed.append({"removed": duplicate_rel, "kept": winner_rel})
    if replacements:
        migration.replace_references(replacements)
    images = migration.build_manifest()
    report = json.loads(REPORT.read_text(encoding="utf-8")) if REPORT.exists() else {}
    report["binaryDuplicatesRemoved"] = removed
    report["finalImages"] = len(images)
    REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"duplicatesRemoved": len(removed), "finalImages": len(images)}, indent=2))


if __name__ == "__main__":
    main()
