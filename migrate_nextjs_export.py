#!/usr/bin/env python3
"""
Next.js Static Export Migration Script
Automates restructuring and configuration for static export compatibility.
"""

import os
import re
import shutil
import sys
from pathlib import Path
from typing import List, Tuple


def find_project_root(start_path: Path) -> Path:
    """Find the frontend project root containing src/app and next.config.ts."""
    for parent in [start_path, *start_path.parents]:
        if (parent / "src" / "app").is_dir() and (
            parent / "next.config.ts"
        ).is_file():
            return parent
    raise FileNotFoundError("Could not locate Next.js project root (src/app + next.config.ts)")


def move_homepage(app_root: Path) -> bool:
    """Move (site)/page.tsx to root page.tsx if no conflict."""
    site_page = app_root / "(site)" / "page.tsx"
    root_page = app_root / "page.tsx"
    if site_page.is_file() and not root_page.is_file():
        shutil.move(str(site_page), str(root_page))
        print(f"✅ Moved homepage: {site_page} -> {root_page}")
        return True
    elif root_page.is_file():
        print("ℹ️ Root page.tsx already exists. Skipping homepage move.")
    else:
        print("⚠️ (site)/page.tsx not found. No homepage move performed.")
    return False


def update_next_config(config_path: Path) -> None:
    """Add or update static export configuration in next.config.ts."""
    output_config = """import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
"""
    if config_path.is_file():
        with open(config_path, "r") as f:
            content = f.read()
        if 'output: "export"' in content or "output: 'export'" in content:
            print("ℹ️ next.config.ts already has output: 'export'. Skipping config update.")
            return
        backup = config_path.with_suffix(".ts.bak")
        shutil.copy(config_path, backup)
        print(f"📦 Backed up original config to {backup}")
    with open(config_path, "w") as f:
        f.write(output_config)
    print(f"✅ Updated {config_path} with static export settings.")


def find_dynamic_routes(app_root: Path) -> List[Path]:
    """Find all [slug] directories under app."""
    return list(app_root.glob("**/[slug]"))


def add_generate_static_params(page_path: Path) -> None:
    """Add generateStaticParams function to dynamic page if missing."""
    content = page_path.read_text()
    if "generateStaticParams" in content:
        print(f"ℹ️ {page_path} already has generateStaticParams. Skipping.")
        return

    # Detect import style and insert after imports
    lines = content.splitlines()
    insert_idx = 0
    for i, line in enumerate(lines):
        if line.startswith("import ") or line.startswith("from "):
            insert_idx = i + 1
        elif line.strip() and not line.startswith("import") and not line.startswith("from"):
            break

    # Create stub generateStaticParams (returns empty array - user must fill)
    stub = """
// TODO: Replace with actual data source (API, database, or mock data)
export async function generateStaticParams() {
  // Example: return [{ slug: 'example-1' }, { slug: 'example-2' }];
  return [];
}
"""
    lines.insert(insert_idx, stub)
    page_path.write_text("\n".join(lines))
    print(f"✅ Added generateStaticParams stub to {page_path}")


def check_forbidden_server_functions(app_root: Path) -> List[str]:
    """Warn about usage of server-only functions that break static export."""
    forbidden = ["cookies(", "headers(", "draftMode("]
    warnings = []
    for tsx_file in app_root.rglob("*.tsx"):
        if "node_modules" in str(tsx_file):
            continue
        content = tsx_file.read_text()
        for func in forbidden:
            if func in content:
                warnings.append(f"⚠️ {tsx_file} uses {func} – will fail during static export")
    return warnings


def main():
    base_path = Path(sys.argv[1]) if len(sys.argv) > 1 else Path.cwd()
    try:
        project_root = find_project_root(base_path.resolve())
    except FileNotFoundError as e:
        print(f"❌ {e}", file=sys.stderr)
        sys.exit(1)

    app_root = project_root / "src" / "app"
    config_path = project_root / "next.config.ts"

    print(f"🚀 Starting static export migration at {project_root}\n")

    move_homepage(app_root)
    update_next_config(config_path)

    dynamic_routes = find_dynamic_routes(app_root)
    for dyn_dir in dynamic_routes:
        page_file = dyn_dir / "page.tsx"
        if page_file.is_file():
            add_generate_static_params(page_file)

    warnings = check_forbidden_server_functions(app_root)
    if warnings:
        print("\n⚠️ Server-function warnings:")
        for w in warnings:
            print(w)

    print("\n✅ Migration complete. Run 'npm run build' and verify 'out/index.html'.")
    print("   For dynamic routes, replace generateStaticParams stubs with real data.")


if __name__ == "__main__":
    main()