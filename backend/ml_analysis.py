
from pathlib import Path
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

NUMERIC_FEATURES = ["diameter_km", "relative_velocity_km_s", "miss_distance_km"]

def cluster_asteroids(csv_path: str, clusters: int = 3) -> pd.DataFrame:
    path = Path(csv_path)
    if not path.exists():
        raise FileNotFoundError(f"CSV not found: {path}")
    data = pd.read_csv(path)
    missing = [column for column in NUMERIC_FEATURES if column not in data.columns]
    if missing:
        raise ValueError(f"CSV must include these columns: {', '.join(NUMERIC_FEATURES)}")
    clean = data[NUMERIC_FEATURES].apply(pd.to_numeric, errors="coerce").dropna()
    if len(clean) < clusters:
        raise ValueError("Not enough complete rows for the requested number of clusters.")
    scaled = StandardScaler().fit_transform(clean)
    model = KMeans(n_clusters=clusters, random_state=42, n_init="auto")
    result = clean.copy()
    result["cluster"] = model.fit_predict(scaled)
    return result

if __name__ == "__main__":
    print("Import cluster_asteroids(csv_path) after preparing a documented CSV.")
    print("Do not interpret clusters as impact probability or hazard classification.")
