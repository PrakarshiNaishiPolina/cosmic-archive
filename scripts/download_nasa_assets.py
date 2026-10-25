#!/usr/bin/env python3
"""Download a small starter set of real NASA images into frontend/public/media.

Run from the project root: python scripts/download_nasa_assets.py
Uses NASA's public Image and Video Library API. Verify credits and usage guidance for each asset.
"""
import json
import time
from pathlib import Path
from urllib.parse import urlparse
import urllib.request
import urllib.error

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "frontend" / "public" / "media"
API = "https://images-api.nasa.gov/search"
ASSETS = [
    ("home-earth", "Earth from space blue marble"),
    ("asteroid-bennu", "asteroid Bennu OSIRIS REx"),
    ("image-nebula", "James Webb nebula"),
    ("mars-perseverance", "Perseverance rover Mars surface"),
]

def get_json(url):
    request = urllib.request.Request(url, headers={"User-Agent": "CosmicArchiveEducationalProject/1.0"})
    with urllib.request.urlopen(request, timeout=25) as response:
        return json.loads(response.read().decode("utf-8"))

def main():
    OUT.mkdir(parents=True, exist_ok=True)
    manifest = []
    for filename, query in ASSETS:
        from urllib.parse import urlencode
        url = API + "?" + urlencode({"q": query, "media_type": "image", "page_size": 10})
        try:
            payload = get_json(url)
            items = payload.get("collection", {}).get("items", [])
            selected = None
            for item in items:
                data = (item.get("data") or [{}])[0]
                links = item.get("links") or []
                image_url = next((link.get("href") for link in links if link.get("rel") == "preview"), None)
                if image_url and image_url.lower().split("?")[0].endswith((".jpg", ".jpeg", ".png")):
                    selected = {"title": data.get("title", query), "nasa_id": data.get("nasa_id", ""), "image_url": image_url, "center": data.get("center", "NASA"), "date_created": data.get("date_created", ""), "page_url": "https://images.nasa.gov/details/" + str(data.get("nasa_id", ""))}
                    break
            if not selected:
                print(f"No downloadable preview found for: {query}")
                continue
            suffix = Path(urlparse(selected["image_url"]).path).suffix.lower()
            if suffix not in {".jpg", ".jpeg", ".png"}:
                suffix = ".jpg"
            destination = OUT / f"{filename}{suffix}"
            req = urllib.request.Request(selected["image_url"], headers={"User-Agent": "CosmicArchiveEducationalProject/1.0"})
            with urllib.request.urlopen(req, timeout=30) as response, open(destination, "wb") as output:
                output.write(response.read())
            selected["local_file"] = str(destination.relative_to(ROOT)).replace("\\\\", "/")
            manifest.append(selected)
            print(f"Downloaded {destination.name} — {selected['title']}")
            time.sleep(0.4)
        except (urllib.error.URLError, TimeoutError, json.JSONDecodeError) as exc:
            print(f"Could not download {query}: {exc}")
    (OUT / "manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print(f"\\nFinished. {len(manifest)} image(s) downloaded to {OUT}")
    print("Review the manifest and individual NASA asset credits before redistribution.")

if __name__ == "__main__":
    main()
