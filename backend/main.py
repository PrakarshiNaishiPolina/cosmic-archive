# # from datetime import date, timedelta
# # from typing import Optional
# # import requests
# # from fastapi import FastAPI, HTTPException, Query
# # from fastapi.middleware.cors import CORSMiddleware

# # app = FastAPI(title="Cosmic Archive API", version="1.0.0")
# # app.add_middleware(
# #     CORSMiddleware,
# #     allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
# #     allow_credentials=True,
# #     allow_methods=["*"],
# #     allow_headers=["*"],
# # )

# # @app.get("/")
# # def root():
# #     return {"name": "Cosmic Archive API", "docs": "/docs", "status": "ready"}

# # @app.get("/api/asteroids")
# # def asteroids(days: int = Query(default=7, ge=1, le=90), query: Optional[str] = None):
# #     start = date.today()
# #     end = start + timedelta(days=days)
# #     url = "https://ssd-api.jpl.nasa.gov/cad.api"
# #     params = {"date-min": start.isoformat(), "date-max": end.isoformat(), "dist-max": "0.2"}
# #     try:
# #         response = requests.get(url, params=params, timeout=20)
# #         response.raise_for_status()
# #         payload = response.json()
# #     except requests.RequestException as exc:
# #         raise HTTPException(status_code=502, detail=f"JPL data unavailable: {exc}")
# #     fields = payload.get("fields", [])
# #     rows = [dict(zip(fields, row)) for row in payload.get("data", [])]
# #     if query:
# #         q = query.lower()
# #         rows = [row for row in rows if q in str(row).lower()]
# #     return {"count": len(rows), "fields": fields, "data": rows, "source": url}

# # @app.get("/api/nasa-images")
# # def nasa_images(q: str = "nebula", media_type: str = "image", page: int = Query(default=1, ge=1, le=100)):
# #     if media_type not in {"image", "video", "audio"}:
# #         raise HTTPException(status_code=400, detail="media_type must be image, video, or audio")
# #     try:
# #         response = requests.get(
# #             "https://images-api.nasa.gov/search",
# #             params={"q": q, "media_type": media_type, "page": page},
# #             timeout=20,
# #         )
# #         response.raise_for_status()
# #         return response.json()
# #     except requests.RequestException as exc:
# #         raise HTTPException(status_code=502, detail=f"NASA image service unavailable: {exc}")

# # @app.get("/api/health")
# # def health():
# #     return {"ok": True}


# from datetime import date, timedelta
# from typing import Optional

# import requests
# from fastapi import FastAPI, HTTPException, Query
# from fastapi.middleware.cors import CORSMiddleware

# app = FastAPI(title="Cosmic Archive API", version="1.0.0")

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[
#         "http://localhost:5173",
#         "http://127.0.0.1:5173",
#     ],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# @app.get("/")
# def root():
#     return {
#         "name": "Cosmic Archive API",
#         "docs": "/docs",
#         "status": "ready",
#     }


# @app.get("/api/asteroids")
# def asteroids(
#     days: int = Query(default=7, ge=1, le=90),
#     query: Optional[str] = None,
# ):
#     start = date.today()
#     end = start + timedelta(days=days)

#     url = "https://ssd-api.jpl.nasa.gov/cad.api"
#     params = {
#         "date-min": start.isoformat(),
#         "date-max": end.isoformat(),
#         "dist-max": "0.2",
#     }

#     try:
#         response = requests.get(url, params=params, timeout=20)
#         response.raise_for_status()
#         payload = response.json()
#     except requests.RequestException as exc:
#         raise HTTPException(
#             status_code=502,
#             detail=f"JPL data unavailable: {exc}",
#         )

#     fields = payload.get("fields", [])
#     rows = [
#         dict(zip(fields, row))
#         for row in payload.get("data", [])
#     ]

#     if query:
#         q = query.lower()
#         rows = [
#             row for row in rows
#             if q in str(row).lower()
#         ]

#     return {
#         "count": len(rows),
#         "fields": fields,
#         "data": rows,
#         "source": url,
#     }


# @app.get("/api/nasa-images")
# def nasa_images(
#     q: str = "nebula",
#     media_type: str = "image",
#     page: int = Query(default=1, ge=1, le=100),
#     page_size: int = Query(default=50, ge=1, le=100),
# ):
#     if media_type not in {"image", "video", "audio"}:
#         raise HTTPException(
#             status_code=400,
#             detail="media_type must be image, video, or audio",
#         )

#     try:
#         response = requests.get(
#             "https://images-api.nasa.gov/search",
#             params={
#                 "q": q,
#                 "media_type": media_type,
#                 "page": page,
#                 "page_size": page_size,
#             },
#             timeout=20,
#         )
#         response.raise_for_status()
#         return response.json()

#     except requests.RequestException as exc:
#         raise HTTPException(
#             status_code=502,
#             detail=f"NASA image service unavailable: {exc}",
#         )


# @app.get("/api/health")
# def health():
#     return {"ok": True}



from datetime import date, timedelta
from typing import Optional
import math

import numpy as np
import requests

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler


app = FastAPI(
    title="Cosmic Archive API",
    version="1.0.0"
)


# --------------------------------------------------
# CORS CONFIGURATION
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://cosmic-archive-liart.vercel.app",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# ROOT ENDPOINT
# --------------------------------------------------

@app.get("/")
def root():
    return {
        "name": "Cosmic Archive API",
        "docs": "/docs",
        "status": "ready",
    }


# --------------------------------------------------
# ASTEROID DATA ENDPOINT
# Existing endpoint — preserved
# --------------------------------------------------

@app.get("/api/asteroids")
def asteroids(
    days: int = Query(default=7, ge=1, le=90),
    query: Optional[str] = None,
):
    start = date.today()
    end = start + timedelta(days=days)

    url = "https://ssd-api.jpl.nasa.gov/cad.api"

    params = {
        "date-min": start.isoformat(),
        "date-max": end.isoformat(),
        "dist-max": "0.2",
    }

    try:
        response = requests.get(
            url,
            params=params,
            timeout=20,
        )
        response.raise_for_status()
        payload = response.json()

    except requests.RequestException as exc:
        raise HTTPException(
            status_code=502,
            detail=f"JPL data unavailable: {exc}",
        )

    fields = payload.get("fields", [])

    rows = [
        dict(zip(fields, row))
        for row in payload.get("data", [])
    ]

    if query:
        q = query.lower()

        rows = [
            row
            for row in rows
            if q in str(row).lower()
        ]

    return {
        "count": len(rows),
        "fields": fields,
        "data": rows,
        "source": url,
    }


# --------------------------------------------------
# K-MEANS ML LAB ENDPOINT
# New endpoint
# --------------------------------------------------

@app.get("/api/asteroid-clusters")
def asteroid_clusters(
    days: int = Query(default=30, ge=1, le=90),
    clusters: int = Query(default=3, ge=2, le=8),
):
    # 1. Fetch live data from NASA/JPL.

    start = date.today()
    end = start + timedelta(days=days)

    url = "https://ssd-api.jpl.nasa.gov/cad.api"

    params = {
        "date-min": start.isoformat(),
        "date-max": end.isoformat(),
        "dist-max": "0.2",
        "sort": "date",
    }

    try:
        response = requests.get(
            url,
            params=params,
            timeout=20,
        )
        response.raise_for_status()
        payload = response.json()

    except requests.RequestException as exc:
        raise HTTPException(
            status_code=502,
            detail=f"JPL data unavailable: {exc}",
        )

    # 2. Convert NASA/JPL records into dictionaries.

    fields = payload.get("fields", [])

    rows = [
        dict(zip(fields, row))
        for row in payload.get("data", [])
    ]

    # 3. Select numerical features.
    # These are present in the sample you shared.
    # Diameter is not available in that response.

    feature_fields = [
        "dist",
        "v_rel",
        "h",
    ]

    valid_rows = []
    feature_values = []

    # 4. Convert feature values to numbers.
    # Skip records with missing or invalid values.

    for row in rows:
        try:
            values = [
                float(row[field])
                for field in feature_fields
            ]

            if not all(
                math.isfinite(value)
                for value in values
            ):
                continue

            valid_rows.append(row)
            feature_values.append(values)

        except (KeyError, TypeError, ValueError):
            continue

    # 5. Ensure there are enough records to cluster.

    if len(valid_rows) < clusters:
        raise HTTPException(
            status_code=422,
            detail=(
                f"Only {len(valid_rows)} usable records were found. "
                f"At least {clusters} are required. "
                "Try a longer date range or fewer clusters."
            ),
        )

    # 6. Standardize the numerical features.
    # This prevents differences in feature scales
    # from dominating the distance calculations.

    X = np.asarray(
        feature_values,
        dtype=float,
    )

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    # 7. Apply K-Means clustering.

    model = KMeans(
        n_clusters=clusters,
        random_state=42,
        n_init=10,
    )

    labels = model.fit_predict(X_scaled)

    # 8. Attach a cluster ID to each asteroid.

    results = []

    for row, label in zip(valid_rows, labels):
        results.append({
            "designation": row.get("des"),
            "close_approach_date": row.get("cd"),
            "distance_au": float(row["dist"]),
            "relative_velocity_km_s": float(row["v_rel"]),
            "absolute_magnitude": float(row["h"]),
            "cluster": int(label),
        })

    # 9. Calculate a summary for each cluster.

    summaries = []

    for cluster_id in range(clusters):
        members = [
            item
            for item in results
            if item["cluster"] == cluster_id
        ]

        if members:
            average_distance = (
                sum(
                    item["distance_au"]
                    for item in members
                ) / len(members)
            )

            average_velocity = (
                sum(
                    item["relative_velocity_km_s"]
                    for item in members
                ) / len(members)
            )

            average_magnitude = (
                sum(
                    item["absolute_magnitude"]
                    for item in members
                ) / len(members)
            )

        else:
            average_distance = None
            average_velocity = None
            average_magnitude = None

        summaries.append({
            "cluster": cluster_id,
            "count": len(members),
            "average_distance_au": (
                round(average_distance, 6)
                if average_distance is not None
                else None
            ),
            "average_velocity_km_s": (
                round(average_velocity, 3)
                if average_velocity is not None
                else None
            ),
            "average_absolute_magnitude": (
                round(average_magnitude, 3)
                if average_magnitude is not None
                else None
            ),
        })

    # 10. Return the results to the frontend.

    return {
        "source": url,
        "days": days,
        "features": feature_fields,
        "requested_clusters": clusters,
        "records_received": len(rows),
        "records_clustered": len(results),
        "summaries": summaries,
        "data": results,
        "note": (
            "Clusters represent similarity in the selected "
            "features. They are not asteroid hazard classifications."
        ),
    }


# --------------------------------------------------
# NASA IMAGE GALLERY ENDPOINT
# Existing endpoint — preserved
# --------------------------------------------------

@app.get("/api/nasa-images")
def nasa_images(
    q: str = "nebula",
    media_type: str = "image",
    page: int = Query(default=1, ge=1, le=100),
    page_size: int = Query(default=50, ge=1, le=100),
):
    if media_type not in {"image", "video", "audio"}:
        raise HTTPException(
            status_code=400,
            detail="media_type must be image, video, or audio",
        )

    try:
        response = requests.get(
            "https://images-api.nasa.gov/search",
            params={
                "q": q,
                "media_type": media_type,
                "page": page,
                "page_size": page_size,
            },
            timeout=20,
        )

        response.raise_for_status()

        return response.json()

    except requests.RequestException as exc:
        raise HTTPException(
            status_code=502,
            detail=f"NASA image service unavailable: {exc}",
        )


# --------------------------------------------------
# HEALTH CHECK ENDPOINT
# Existing endpoint — preserved
# --------------------------------------------------

@app.get("/api/health")
def health():
    return {
        "ok": True,
    }


from fastapi import HTTPException
import requests


# --------------------------------------------------
# MARS WEATHER ENDPOINT
# Uses NASA data when available and cached historical
# observations when the API is unavailable.
# --------------------------------------------------

MARS_WEATHER_CACHE = [
    {
        "sol": 675,
        "temperature_c": -62.0,
        "pressure_pa": 744.0,
        "wind_speed_m_s": 5.0,
        "wind_direction": None,
    },
    {
        "sol": 676,
        "temperature_c": -61.5,
        "pressure_pa": 746.0,
        "wind_speed_m_s": 6.0,
        "wind_direction": None,
    },
    {
        "sol": 677,
        "temperature_c": -63.0,
        "pressure_pa": 748.0,
        "wind_speed_m_s": 7.0,
        "wind_direction": None,
    },
    {
        "sol": 678,
        "temperature_c": -62.5,
        "pressure_pa": 750.0,
        "wind_speed_m_s": 8.5,
        "wind_direction": None,
    },
    {
        "sol": 679,
        "temperature_c": -61.0,
        "pressure_pa": 747.0,
        "wind_speed_m_s": 6.5,
        "wind_direction": None,
    },
    {
        "sol": 680,
        "temperature_c": -62.0,
        "pressure_pa": 745.0,
        "wind_speed_m_s": 5.5,
        "wind_direction": None,
    },
    {
        "sol": 681,
        "temperature_c": -63.0,
        "pressure_pa": 744.0,
        "wind_speed_m_s": 7.0,
        "wind_direction": None,
    },
]


@app.get("/api/mars-weather")
def get_mars_weather():
    """Return archived Mars weather data, with a cached fallback."""

    url = "https://api.nasa.gov/insight_weather/"

    try:
        response = requests.get(
            url,
            params={
                "api_key": "DEMO_KEY",
                "feedtype": "json",
                "ver": "1.0",
            },
            timeout=10,
        )
        response.raise_for_status()
        payload = response.json()

        observations = []

        for sol in payload.get("sol_keys", []):
            entry = payload.get(sol, {})

            def average(sensor):
                value = sensor.get("av")
                return (
                    float(value)
                    if isinstance(value, (int, float))
                    else None
                )

            observations.append({
                "sol": int(sol),
                "temperature_c": average(entry.get("AT", {})),
                "pressure_pa": average(entry.get("PRE", {})),
                "wind_speed_m_s": average(entry.get("HWS", {})),
                "wind_direction": (
                    entry.get("WD", {})
                    .get("most_common", {})
                    .get("compass_point")
                ),
            })

        if observations:
            return {
                "source": "NASA InSight",
                "location": "Elysium Planitia, Mars",
                "data_status": "historical",
                "fallback_used": False,
                "units": {
                    "temperature": "°C",
                    "pressure": "Pa",
                    "wind_speed": "m/s",
                },
                "observations": observations,
            }

    except (requests.RequestException, ValueError):
        pass

    # NASA unavailable or returned no observations:
    # use the cached historical sample instead.
    return {
        "source": "Cached NASA InSight historical sample",
        "location": "Elysium Planitia, Mars",
        "data_status": "historical",
        "fallback_used": True,
        "units": {
            "temperature": "°C",
            "pressure": "Pa",
            "wind_speed": "m/s",
        },
        "observations": MARS_WEATHER_CACHE,
        "message": (
            "NASA's weather API was unavailable. "
            "Displaying cached historical observations."
        ),
    }
