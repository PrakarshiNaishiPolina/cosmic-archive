# 🌌 Cosmic Archive

**An interactive space exploration platform powered by NASA data, scientific visualizations, and machine learning.**

Cosmic Archive is a full-stack web application designed to make space exploration more accessible through interactive dashboards, asteroid analysis, NASA imagery, Mars weather observations, and a visual Solar System experience.

##  Overview

Space agencies publish enormous amounts of scientific data, but understanding and exploring it can be challenging without specialized tools.

Cosmic Archive brings several space exploration capabilities together in one web application. It combines a React-based frontend with a FastAPI backend to retrieve, process, analyze, and visualize space-related information.

##  Problem Statement

Space information is distributed across multiple APIs, datasets, and scientific platforms. Raw data can be difficult for beginners and general users to interpret, and exploring different types of space information often requires switching between separate tools.

Cosmic Archive addresses this challenge by providing a unified interface for exploring space data, visualizing asteroid information, browsing NASA imagery, examining Mars observations, and experimenting with machine learning.

##  Features

### 1. Asteroid Explorer
- Explore near-Earth asteroid and close-approach information.
- Examine properties such as relative velocity, estimated distance, and absolute magnitude when available.
- Present asteroid information in a more accessible visual format.
- Explore close-approach and risk-related information without treating every close approach as a confirmed hazard.

### 2. Machine Learning Lab
- Apply K-Means clustering to asteroid data.
- Explore patterns in features such as distance, relative velocity, and absolute magnitude.
- Use machine learning to group observations with similar characteristics.
- Understand how unsupervised learning can support exploratory space-data analysis.

### 3. NASA Image Explorer
- Search and browse NASA space imagery.
- Explore images and their associated metadata.
- Save interesting discoveries for later reference.

### 4. Mars Expedition
- Explore Mars weather observations.
- Examine temperature, pressure, wind speed, and other available measurements.
- Compare observations across Martian sols.
- Visualize trends through charts and data tables.

*Note: When the live NASA InSight data service is unavailable, the application may use a cached historical sample. Such data should be clearly identified and must not be presented as live measurements.*

### 5. Interactive Solar System
- Explore a visual representation of the Solar System.
- Navigate between celestial objects and discover basic information about them.
- Make space exploration more engaging through interactive visual elements.

### 6. Saved Discoveries
- Bookmark interesting discoveries from supported sections.
- View and remove saved items from one location.
- Store favorites in browser local storage so they persist across page refreshes in the same browser.

### 7. Mission Control Dashboard
- Bring selected space-data summaries together on the home page.
- Provide quick navigation to the main exploration tools.
- Offer a starting point for discovering the application's different features.

##  Technology Stack

| Component | Technology |
|---|---|
| Frontend | React, JavaScript, CSS |
| Build tooling | Vite |
| Backend | Python, FastAPI |
| API communication | HTTP requests, REST endpoints |
| Space data | NASA APIs and NASA/JPL data sources |
| Machine learning | Scikit-learn, K-Means |
| Numerical processing | NumPy |
| Visualization | Interactive charts and visual components |
| Icons | Lucide React |

## Project Structure

The main application is organized into frontend and backend components.

```text
cosmic-archive/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TopNav.jsx
│   │   │   ├── MediaGallery.jsx
│   │   │   ├── AsteroidMediaGallery.jsx
│   │   │   └── MarsWeatherDashboard.jsx
│   │   ├── context/
│   │   │   └── FavoritesContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Asteroids.jsx
│   │   │   ├── Images.jsx
│   │   │   ├── Mars.jsx
│   │   │   ├── MLLab.jsx
│   │   │   ├── SolarSystem.jsx
│   │   │   └── Favorites.jsx
│   │   ├── services/
│   │   │   └── nasa.js
│   │   ├── App.jsx
│   │   └── styles.css
│   └── package.json
│
├── backend/
│   ├── main.py
│   └── requirements.txt
│
└── README.md
```

*This is the expected structure based on the application's current organization. Keep only files and directories that actually exist in your repository.*

### What each part does

- **`pages/`** — Contains the main screens and features of the application.
- **`components/`** — Contains reusable UI components and dashboards.
- **`context/FavoritesContext.jsx`** — Manages shared favorites state and browser persistence.
- **`services/nasa.js`** — Organizes NASA-related frontend API requests.
- **`App.jsx`** — Connects the pages and navigation.
- **`styles.css`** — Contains the application's visual design and responsive styling.
- **`backend/main.py`** — Defines FastAPI endpoints and backend data-processing logic.
- **`requirements.txt`** — Lists Python packages required by the backend.
- **`package.json`** — Defines frontend dependencies and available scripts.

## ⚙️ Installation and Setup

### Prerequisites

Install the following before running the project:

- Python 3.10 or a compatible version supported by the backend dependencies.
- Node.js and npm.
- Git, if you want to clone the repository.

### Step 1: Download the project

**Option A — Download ZIP**

1. Open the project's GitHub repository.
2. Click **Code → Download ZIP**.
3. Extract the downloaded ZIP file.
4. Open the extracted `cosmic-archive` folder in your code editor.

**Option B — Clone with Git**

Replace `YOUR-USERNAME` with the actual GitHub username or organization that owns the repository.

```bash
git clone https://github.com/YOUR-USERNAME/cosmic-archive.git
cd cosmic-archive
```

The clone command will work once the project has been published at that repository address.

### Step 2: Set up the backend

Open a terminal inside the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```bash
venv\Scripts\activate
```

Install the dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
python -m uvicorn main:app --reload
```

The backend should be available at:

- API base: `http://localhost:8000`
- Interactive API documentation: `http://localhost:8000/docs`

### Step 3: Set up the frontend

Open a **second terminal** and navigate to the frontend directory:

```bash
cd frontend
```

Install the JavaScript dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL printed in the terminal, commonly `http://localhost:5173`.

Keep both the frontend and backend running while using the application.

### Step 4: Verify the application

1. Open the frontend in your browser.
2. Confirm the home page loads.
3. Check that the backend is reachable at `http://localhost:8000/docs`.
4. Test the asteroid, image, Mars, machine-learning, Solar System, and favorites sections.
5. If a feature cannot load data, check the browser console and backend terminal for errors.

**Important:** Live API access depends on the relevant NASA service, network availability, and any required API keys. Configure API keys through environment variables where supported, and never commit private keys to GitHub.

##  Backend API

The backend includes the following endpoints, based on the current implementation:

| Endpoint | Purpose |
|---|---|
| `GET /` | Basic backend response |
| `GET /api/health` | Check backend availability |
| `GET /api/asteroids` | Retrieve asteroid information |
| `GET /api/asteroid-clusters` | Provide asteroid clustering results |
| `GET /api/nasa-images` | Support NASA image search |

The exact response fields and query parameters should be checked in the backend implementation and the interactive API documentation at `/docs`.

##  Machine Learning Approach

The ML Lab uses **K-Means clustering**, an unsupervised machine-learning algorithm.

K-Means groups observations based on similarities in selected numerical features. In this project, asteroid characteristics such as relative velocity, distance, and absolute magnitude can be used to investigate patterns in the data.

The workflow is broadly:

1. Retrieve asteroid observations.
2. Select suitable numerical features.
3. Handle missing or invalid values.
4. Scale features when appropriate.
5. Apply K-Means clustering.
6. Visualize and interpret the resulting groups.

Clustering identifies patterns in the selected features; it does not independently establish whether an asteroid will impact Earth or whether it is scientifically hazardous.

##  Future Improvements

- **More robust data handling:** Add retries, timeouts, API validation, and informative error states.
- **Reliable caching:** Cache API responses with timestamps and clearly distinguish live, cached, and illustrative data.
- **Improved asteroid analysis:** Add historical close-approach comparisons, configurable filters, and clearer explanations of risk-related measurements.
- **Better machine-learning evaluation:** Compare cluster configurations, evaluate clustering quality, and document feature selection.
- **Expanded visualizations:** Add richer charts, filters, timelines, and comparisons across observations.
- **Persistent favorites:** Add optional account-based synchronization instead of browser-only storage.
- **Automated testing:** Add frontend tests, backend endpoint tests, and tests for API failures.
- **Deployment:** Publish the frontend and backend so users can access the application online.
- **Accessibility and responsiveness:** Improve keyboard navigation, screen-reader support, and mobile layouts.
- **Documentation:** Add screenshots, architecture diagrams, sample API responses, and troubleshooting instructions.

##  Project Goals

Cosmic Archive aims to combine space exploration, data visualization, and machine learning in an accessible application. It provides a foundation for learning from public space data and can be expanded with additional datasets, analysis methods, and scientific visualizations.

##  Data and Scientific Limitations

- Data availability depends on external APIs and their service limits.
- Cached historical observations are not real-time measurements.
- Visual simulations may simplify the actual scale and motion of celestial objects.
- Machine-learning clusters are exploratory groupings, not authoritative scientific classifications.
- The application is an educational and exploratory tool, not a substitute for official planetary-defense assessments.

##  License

Choose and add a license before distributing the project publicly. For example, an MIT License can permit broad reuse subject to its terms.

##  Acknowledgements

Thanks to NASA and NASA/JPL for providing space-related data and imagery services used by the application. Consult the relevant source documentation for attribution requirements and data-use conditions.
