# Cosmic Archive — NASA Space Explorer

A four-section astronomy website starter:
1. NASA Universe
2. Asteroid Tracker
3. NASA Image Explorer
4. Mars Expedition

## Stack
- React + Vite + JavaScript
- CSS with distinct page themes
- Plotly.js (`react-plotly.js`) for interactive charts
- Python + FastAPI backend (optional, included as a starter)
- NASA Image and Video Library API for real images and videos

> **Image note:** This project fetches real NASA media from the official NASA Image and Video Library when you run it with internet access. The current file-generation environment could not download external binary images, so the ZIP includes a downloader script rather than pretending offline image files are bundled. The app will still load images dynamically online.

## Run the frontend
Install Node.js 20+ first.

```bash
cd frontend
npm install
npm run dev
```

Open the local URL Vite prints (usually http://localhost:5173).

## Run the optional Python backend
Use Python 3.10+.

```bash
cd backend
python -m venv .venv
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Backend docs: http://127.0.0.1:8000/docs

## Download real NASA images into `frontend/public/media`
From the project root, run:

```bash
python scripts/download_nasa_assets.py
```

This downloads selected images from NASA's official Image and Video Library API. Check each asset's metadata/credit before redistribution. The app uses remote NASA API images dynamically as well, so the downloaded files are optional for local hero fallbacks.

## APIs used
- NASA Image and Video Library: https://images.nasa.gov/ and https://images-api.nasa.gov/
- NASA API portal: https://api.nasa.gov/
- JPL Small-Body Data API: https://ssd-api.jpl.nasa.gov/

The old Mars Rover Photos API is archived, so this starter uses the NASA image library for rover photos rather than depending on that retired endpoint.

## Notes
- The frontend's image explorer uses the official NASA Image API directly.
- Asteroid data is requested from JPL's close-approach API. API availability and response schemas can change; the UI includes error states.
- News and launch information links to NASA's official newsroom/event pages instead of inventing dates.
- The included ML module is a safe starter example (unsupervised clustering on numeric asteroid properties), not a collision predictor.
