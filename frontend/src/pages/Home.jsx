
// import React, { useEffect, useState } from 'react';
// import {
//   ArrowDownRight,
//   ArrowUpRight,
//   ExternalLink,
//   Globe2,
//   Orbit,
//   Telescope,
//   Image as ImageIcon,
//   Sparkles
// } from 'lucide-react';
// import { searchNasaMedia } from '../services/nasa.js';

// const sections = [
//   {
//     id: 'asteroids',
//     title: 'Asteroids & near-Earth objects',
//     kicker: 'THE SOLAR NEIGHBOURHOOD',
//     copy: 'Explore ancient rocky worlds, follow their journeys around the Sun, and discover when they pass near Earth.',
//     action: 'Explore asteroids',
//     imageQuery: 'asteroid Bennu NASA',
//     icon: Orbit,
//     theme: 'asteroid-tile'
//   },
//   {
//     id: 'images',
//     title: 'A universe of images',
//     kicker: 'THE NASA COLLECTION',
//     copy: 'Travel through nebulae, distant galaxies, planetary worlds and extraordinary moments in space exploration.',
//     action: 'Enter the archive',
//     imageQuery: 'James Webb nebula NASA',
//     icon: ImageIcon,
//     theme: 'image-tile'
//   },
//   {
//     id: 'mars',
//     title: 'The Mars expedition',
//     kicker: 'ANOTHER WORLD',
//     copy: 'Discover the landscapes of Mars through the eyes of robotic explorers searching for clues to its past.',
//     action: 'Explore Mars',
//     imageQuery: 'Perseverance rover Mars NASA',
//     icon: Telescope,
//     theme: 'mars-tile'
//   }
// ];

// export default function Home({ setPage }) {
//   const [hero, setHero] = useState('');
//   const [featured, setFeatured] = useState([]);
//   const [exploreImages, setExploreImages] = useState({});
//   const [imageError, setImageError] = useState(false);

//   useEffect(() => {
//     let active = true;

//     async function loadHomeMedia() {
//       try {
//         const [earth, discoveries] = await Promise.all([
//           searchNasaMedia('Earth Blue Marble from space', 'image', 1),
//           searchNasaMedia('James Webb Space Telescope nebula galaxy', 'image', 1)
//         ]);

//         if (!active) return;

//         const earthImage = earth.find(item => item.image);
//         if (earthImage) setHero(earthImage.image);

//         setFeatured(discoveries.filter(item => item.image).slice(0, 3));
//       } catch {
//         if (active) setImageError(true);
//       }
//     }

//     async function loadExploreImages() {
//       const results = await Promise.all(
//         sections.map(async section => {
//           try {
//             const items = await searchNasaMedia(
//               section.imageQuery,
//               'image',
//               1
//             );
//             return [section.id, items.find(item => item.image)?.image || ''];
//           } catch {
//             return [section.id, ''];
//           }
//         })
//       );

//       if (active) {
//         setExploreImages(Object.fromEntries(results));
//       }
//     }

//     loadHomeMedia();
//     loadExploreImages();

//     return () => {
//       active = false;
//     };
//   }, []);

//   return (
//     <main className="page page-home">
//       <section
//         className="hero home-hero"
//         style={hero ? { '--hero-image': `url("${hero}")` } : {}}
//       >
//         <div className="hero-overlay" />

//         <div className="hero-content">
//           <span className="script-label">
//             Somewhere, everything begins
//           </span>

//           <p className="eyebrow hero-eyebrow">
//             <span className="status-dot" />
//             A WINDOW INTO THE UNIVERSE
//           </p>

//           <h1>
//             The universe,
//             <br />
//             <em>unfolding.</em>
//           </h1>

//           <p className="hero-copy">
//             From the blue edge of our home planet to distant galaxies
//             and unexplored worlds, discover the stories written across space.
//           </p>

//           <div className="hero-actions">
//             <button
//               className="button button-light"
//               onClick={() => setPage('images')}
//             >
//               Wander the archive <ArrowUpRight size={16} />
//             </button>

//             <a
//               className="button button-outline"
//               href="https://science.nasa.gov/"
//               target="_blank"
//               rel="noreferrer"
//             >
//               Discover NASA science <ExternalLink size={15} />
//             </a>
//           </div>

//           <div className="hero-footnote">
//             <span>LOOK CLOSER. WONDER MORE.</span>
//           </div>
//         </div>

//         <div className="hero-stamp">
//           <Globe2 />
//           <span>
//             OUR HOME
//             <br />
//             IN A VAST UNIVERSE
//           </span>
//         </div>

//         <a
//           className="home-scroll"
//           href="#discover"
//           aria-label="Scroll to discoveries"
//         >
//           <span>SCROLL TO DISCOVER</span>
//           <ArrowDownRight size={17} />
//         </a>
//       </section>

//       <section className="intro-strip section-wrap" id="discover">
//         <div>
//           <span className="eyebrow">A LIVING COSMIC ATLAS</span>
//           <h2>
//             There is more
//             <br />
//             <em>out there.</em>
//           </h2>
//         </div>

//         <p>
//           Explore real NASA imagery, follow near-Earth objects and
//           journey across other worlds. Every discovery begins with
//           a closer look.
//         </p>
//       </section>

//       <section className="explore-grid section-wrap">
//         {sections.map(section => {
//           const Icon = section.icon;
//           const image = exploreImages[section.id];

//           return (
//             <article
//               className={`explore-card ${section.theme}`}
//               key={section.id}
//               style={image ? {
//                 '--card-image': `url("${image}")`
//               } : {}}
//             >
//               <div className="explore-card-image" />

//               <div className="explore-card-content">
//                 <div className="explore-card-top">
//                   <span className="explore-icon"><Icon size={19} /></span>
//                   <span className="explore-arrow">
//                     <ArrowUpRight size={18} />
//                   </span>
//                 </div>

//                 <span className="eyebrow">{section.kicker}</span>
//                 <h3>{section.title}</h3>
//                 <p>{section.copy}</p>

//                 <button
//                   className="card-action"
//                   onClick={() => setPage(section.id)}
//                 >
//                   {section.action} <ArrowDownRight size={17} />
//                 </button>
//               </div>
//             </article>
//           );
//         })}
//       </section>

//       <section className="section-wrap feature-section">
//         <div className="section-heading">
//           <div>
//             <span className="eyebrow">COLLECTED FROM THE COSMOS</span>
//             <h2>
//               A glimpse of
//               <br />
//               <em>infinity.</em>
//             </h2>
//           </div>

//           <a
//             className="text-link"
//             href="https://images.nasa.gov/"
//             target="_blank"
//             rel="noreferrer"
//           >
//             Explore NASA's collection <ExternalLink size={14} />
//           </a>
//         </div>

//         {featured.length > 0 ? (
//           <div className="featured-row">
//             {featured.map((item, index) => (
//               <a
//                 className={`featured-image featured-image-${index + 1}`}
//                 key={item.id}
//                 href={item.pageUrl}
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 <img src={item.image} alt={item.title} loading="lazy" />
//                 <span className="featured-image-caption">
//                   <small>{item.center || 'NASA ARCHIVE'}</small>
//                   {item.title}
//                   <ArrowUpRight size={17} />
//                 </span>
//               </a>
//             ))}
//           </div>
//         ) : (
//           <div className="feature-fallback">
//             <Sparkles size={22} />
//             <p>
//               {imageError
//                 ? 'The NASA archive could not be reached. Try again when your connection is available.'
//                 : 'Discoveries from the NASA archive will appear here.'}
//             </p>
//           </div>
//         )}
//       </section>

//       <section className="home-quote">
//         <div className="home-quote-inner">
//           <span className="eyebrow">A SMALL PLANET. AN ENDLESS STORY.</span>
//           <p>
//             “Somewhere, something incredible is waiting to be known.”
//           </p>
//           <span className="home-quote-credit">
//             — A reminder to keep exploring
//           </span>
//         </div>
//       </section>

//       <section className="news-band">
//         <div className="news-band-inner">
//           <div>
//             <span className="eyebrow">THE STORY CONTINUES</span>
//             <h2>
//               Space never
//               <br />
//               <em>stands still.</em>
//             </h2>
//           </div>

//           <div className="news-actions">
//             <p>
//               Follow new discoveries, mission updates and upcoming
//               events through official NASA sources.
//             </p>

//             <a
//               className="button button-light"
//               href="https://www.nasa.gov/news/"
//               target="_blank"
//               rel="noreferrer"
//             >
//               Latest NASA news <ArrowUpRight size={16} />
//             </a>

//             <a
//               className="text-link"
//               href="https://www.nasa.gov/events/"
//               target="_blank"
//               rel="noreferrer"
//             >
//               Upcoming NASA events <ExternalLink size={14} />
//             </a>
//           </div>
//         </div>
//       </section>

//       <footer className="site-footer">
//         <span>COSMIC ARCHIVE · AN EXPLORATION OF OUR UNIVERSE</span>
//         <span>Imagery and scientific data linked to their original sources.</span>
//       </footer>
//     </main>
//   );
// }


import React, { useEffect, useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  ExternalLink,
  Globe2,
  Orbit,
  Telescope,
  Image as ImageIcon,
  Sparkles,
  Thermometer,
  Wind,
  Activity,
  RefreshCw,
  Satellite,
  ChevronRight
} from 'lucide-react';
import { searchNasaMedia } from '../services/nasa.js';

const API_BASE = 'http://localhost:8000';

const sections = [
  {
    id: 'asteroids',
    title: 'Asteroids & near-Earth objects',
    kicker: 'THE SOLAR NEIGHBOURHOOD',
    copy: 'Explore ancient rocky worlds, follow their journeys around the Sun, and discover when they pass near Earth.',
    action: 'Explore asteroids',
    imageQuery: 'asteroid Bennu NASA',
    icon: Orbit,
    theme: 'asteroid-tile'
  },
  {
    id: 'images',
    title: 'A universe of images',
    kicker: 'THE NASA COLLECTION',
    copy: 'Travel through nebulae, distant galaxies, planetary worlds and extraordinary moments in space exploration.',
    action: 'Enter the archive',
    imageQuery: 'James Webb nebula NASA',
    icon: ImageIcon,
    theme: 'image-tile'
  },
  {
    id: 'mars',
    title: 'The Mars expedition',
    kicker: 'ANOTHER WORLD',
    copy: 'Discover the landscapes of Mars through the eyes of robotic explorers searching for clues to its past.',
    action: 'Explore Mars',
    imageQuery: 'Perseverance rover Mars NASA',
    icon: Telescope,
    theme: 'mars-tile'
  }
];

const quickLinks = [
  {
    id: 'asteroids',
    title: 'Asteroid Explorer',
    detail: 'Close approaches and orbital data',
    icon: Orbit
  },
  {
    id: 'mars',
    title: 'Mars Expedition',
    detail: 'Rover missions and weather',
    icon: Satellite
  },
  {
    id: 'images',
    title: 'Image Archive',
    detail: 'Explore NASA imagery',
    icon: ImageIcon
  },
  {
    id: 'solar-system',
    title: 'Solar System',
    detail: 'Explore the planets',
    icon: Globe2
  },
  {
    id: 'ml-lab',
    title: 'Asteroid ML Lab',
    detail: 'Discover patterns in asteroid data',
    icon: Activity
  }
];

function getArray(payload, possibleKeys = []) {
  if (Array.isArray(payload)) return payload;

  if (payload && typeof payload === 'object') {
    for (const key of possibleKeys) {
      if (Array.isArray(payload[key])) return payload[key];
    }
  }

  return [];
}

function getNumber(value) {
  if (value === null || value === undefined || value === '') return null;

  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function formatNumber(value, digits = 2) {
  const number = getNumber(value);
  return number === null
    ? '—'
    : number.toLocaleString(undefined, {
        maximumFractionDigits: digits
      });
}

function DashboardCard({ icon: Icon, label, value, detail, children }) {
  return (
    <article className="mc-stat-card">
      <div className="mc-stat-top">
        <span className="mc-stat-icon">
          <Icon size={19} />
        </span>
        <span className="mc-stat-label">{label}</span>
      </div>

      <div className="mc-stat-value">{value}</div>

      {detail && <p className="mc-stat-detail">{detail}</p>}

      {children}
    </article>
  );
}

function StatusLine({ loading, error, children }) {
  if (loading) {
    return <p className="mc-status">Retrieving available data…</p>;
  }

  if (error) {
    return <p className="mc-status mc-status-muted">{error}</p>;
  }

  return children;
}

export default function Home({ setPage }) {
  const [hero, setHero] = useState('');
  const [featured, setFeatured] = useState([]);
  const [exploreImages, setExploreImages] = useState({});
  const [imageError, setImageError] = useState(false);

  const [asteroids, setAsteroids] = useState([]);
  const [asteroidLoading, setAsteroidLoading] = useState(true);
  const [asteroidError, setAsteroidError] = useState('');

  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState('');

  const [refreshing, setRefreshing] = useState(false);

  async function loadAsteroids() {
    setAsteroidLoading(true);
    setAsteroidError('');

    try {
      const response = await fetch(`${API_BASE}/api/asteroids`);

      if (!response.ok) {
        throw new Error('Asteroid data is temporarily unavailable.');
      }

      const payload = await response.json();

      const items = getArray(payload, [
        'asteroids',
        'data',
        'near_earth_objects',
        'results'
      ]);

      setAsteroids(items);
    } catch {
      setAsteroidError(
        'Start your FastAPI backend to load asteroid data.'
      );
      setAsteroids([]);
    } finally {
      setAsteroidLoading(false);
    }
  }

  async function loadMarsWeather() {
    setWeatherLoading(true);
    setWeatherError('');

    try {
      const response = await fetch(`${API_BASE}/api/mars-weather`);

      if (!response.ok) {
        throw new Error('Mars weather is temporarily unavailable.');
      }

      const payload = await response.json();

      if (!Array.isArray(payload.observations)) {
        throw new Error('No historical observations were returned.');
      }

      setWeather(payload);
    } catch {
      setWeatherError(
        'Mars weather could not be loaded. Check your backend.'
      );
      setWeather(null);
    } finally {
      setWeatherLoading(false);
    }
  }

  async function refreshMissionControl() {
    setRefreshing(true);

    try {
      await Promise.all([loadAsteroids(), loadMarsWeather()]);
    } finally {
      setRefreshing(false);
    }
  }

  useEffect(() => {
    let active = true;

    async function loadHomeMedia() {
      try {
        const [earth, discoveries] = await Promise.all([
          searchNasaMedia('Earth Blue Marble from space', 'image', 1),
          searchNasaMedia(
            'James Webb Space Telescope nebula galaxy',
            'image',
            1
          )
        ]);

        if (!active) return;

        const earthImage = earth.find(item => item.image);

        if (earthImage) setHero(earthImage.image);

        setFeatured(
          discoveries.filter(item => item.image).slice(0, 3)
        );
      } catch {
        if (active) setImageError(true);
      }
    }

    async function loadExploreImages() {
      const results = await Promise.all(
        sections.map(async section => {
          try {
            const items = await searchNasaMedia(
              section.imageQuery,
              'image',
              1
            );

            return [
              section.id,
              items.find(item => item.image)?.image || ''
            ];
          } catch {
            return [section.id, ''];
          }
        })
      );

      if (active) {
        setExploreImages(Object.fromEntries(results));
      }
    }

    loadHomeMedia();
    loadExploreImages();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    loadAsteroids();
    loadMarsWeather();
  }, []);

  const nearestAsteroid = asteroids.reduce((nearest, asteroid) => {
    const distance = getNumber(
      asteroid.dist ?? asteroid.distance_au ?? asteroid.distance
    );

    if (distance === null) return nearest;

    if (!nearest || distance < nearest.distance) {
      return {
        name:
          asteroid.des ??
          asteroid.name ??
          asteroid.designation ??
          'Unnamed object',
        distance,
        date: asteroid.cd ?? asteroid.close_approach_date ?? ''
      };
    }

    return nearest;
  }, null);

  const observations = weather?.observations || [];

  const latestObservation = observations.reduce((latest, item) => {
    if (!latest) return item;

    return Number(item.sol) > Number(latest.sol) ? item : latest;
  }, null);

  const averageTemperature = observations.length
    ? observations.reduce(
        (sum, item) => sum + (getNumber(item.temperature_c) ?? 0),
        0
      ) /
      Math.max(
        1,
        observations.filter(
          item => getNumber(item.temperature_c) !== null
        ).length
      )
    : null;

  const temperatureCount = observations.filter(
    item => getNumber(item.temperature_c) !== null
  ).length;

  const temperatureValue =
    temperatureCount > 0 ? averageTemperature : null;

  return (
    <main className="page page-home">
      {/* HERO */}
      <section
        className="hero home-hero"
        style={hero ? { '--hero-image': `url("${hero}")` } : {}}
      >
        <div className="hero-overlay" />

        <div className="hero-content">
          <span className="script-label">
            Somewhere, everything begins
          </span>

          <p className="eyebrow hero-eyebrow">
            <span className="status-dot" />
            A WINDOW INTO THE UNIVERSE
          </p>

          <h1>
            The universe,
            <br />
            <em>unfolding.</em>
          </h1>

          <p className="hero-copy">
            From the blue edge of our home planet to distant galaxies
            and unexplored worlds, discover the stories written across space.
          </p>

          <div className="hero-actions">
            <button
              className="button button-light"
              onClick={() => setPage('images')}
            >
              Wander the archive <ArrowUpRight size={16} />
            </button>

            <a
              className="button button-outline"
              href="https://science.nasa.gov/"
              target="_blank"
              rel="noreferrer"
            >
              Discover NASA science <ExternalLink size={15} />
            </a>
          </div>

          <div className="hero-footnote">
            <span>LOOK CLOSER. WONDER MORE.</span>
          </div>
        </div>

        <div className="hero-stamp">
          <Globe2 />
          <span>
            OUR HOME
            <br />
            IN A VAST UNIVERSE
          </span>
        </div>

        <a
          className="home-scroll"
          href="#discover"
          aria-label="Scroll to discoveries"
        >
          <span>SCROLL TO DISCOVER</span>
          <ArrowDownRight size={17} />
        </a>
      </section>

      {/* INTRODUCTION */}
      <section className="intro-strip section-wrap" id="discover">
        <div>
          <span className="eyebrow">A LIVING COSMIC ATLAS</span>
          <h2>
            There is more
            <br />
            <em>out there.</em>
          </h2>
        </div>

        <p>
          Explore real NASA imagery, follow near-Earth objects and
          journey across other worlds. Every discovery begins with
          a closer look.
        </p>
      </section>

      {/* NEW: MISSION CONTROL */}
      <section className="mission-control section-wrap" id="mission-control">
        <div className="mc-heading">
          <div>
            <span className="script-label">
              Your window into the cosmos
            </span>
            <span className="eyebrow">COSMIC ARCHIVE / OVERVIEW</span>
            <h2>
              Mission <em>Control.</em>
            </h2>
            <p>
              A central view of your explorations, from near-Earth
              asteroids to the weather of another world.
            </p>
          </div>

          <button
            className="mc-refresh-button"
            onClick={refreshMissionControl}
            disabled={refreshing}
          >
            <RefreshCw
              size={15}
              className={refreshing ? 'mc-spinning' : ''}
            />
            {refreshing ? 'Refreshing…' : 'Refresh data'}
          </button>
        </div>

        <div className="mc-status-strip">
          <span className="mc-status-indicator" />
          <span>
            {asteroidLoading || weatherLoading
              ? 'Checking available data sources'
              : 'Dashboard loaded'}
          </span>
          <span className="mc-status-note">
            Historical and retrieved data
          </span>
        </div>

        <div className="mc-stats-grid">
          <DashboardCard
            icon={Orbit}
            label="ASTEROID DATA"
            value={
              asteroidLoading
                ? '…'
                : asteroidError
                  ? '—'
                  : asteroids.length.toLocaleString()
            }
            detail="Objects returned by your backend"
          >
            <StatusLine
              loading={asteroidLoading}
              error={asteroidError}
            >
              <span className="mc-card-footnote">
                <span className="mc-mini-dot" />
                API response received
              </span>
            </StatusLine>
          </DashboardCard>

          <DashboardCard
            icon={Activity}
            label="CLOSEST RECORDED APPROACH"
            value={
              asteroidLoading
                ? '…'
                : nearestAsteroid
                  ? formatNumber(nearestAsteroid.distance, 6)
                  : '—'
            }
            detail={
              nearestAsteroid
                ? `Distance value · ${nearestAsteroid.name}`
                : 'Distance unavailable'
            }
          >
            <p className="mc-card-footnote">
              Based on the returned asteroid records
            </p>
          </DashboardCard>

          <DashboardCard
            icon={Thermometer}
            label="MARS TEMPERATURE"
            value={
              weatherLoading
                ? '…'
                : temperatureValue === null
                  ? '—'
                  : `${formatNumber(temperatureValue, 1)}°C`
            }
            detail="Average of available observations"
          >
            <StatusLine
              loading={weatherLoading}
              error={weatherError}
            >
              <span className="mc-card-footnote">
                {weather?.fallback_used
                  ? 'Cached historical sample'
                  : 'Historical observations'}
              </span>
            </StatusLine>
          </DashboardCard>

          <DashboardCard
            icon={Wind}
            label="LATEST MARS SOL"
            value={
              weatherLoading
                ? '…'
                : latestObservation
                  ? latestObservation.sol
                  : '—'
            }
            detail="Latest sol in the returned sample"
          >
            <p className="mc-card-footnote">
              {weather?.source || 'Mars weather source'}
            </p>
          </DashboardCard>
        </div>

        {weather?.fallback_used && (
          <div className="mc-fallback-notice">
            <Sparkles size={17} />
            <div>
              <strong>Cached historical data is being displayed.</strong>
              <p>
                NASA's weather endpoint was unavailable. These readings
                are historical samples, not live Martian weather.
              </p>
            </div>
          </div>
        )}

        <div className="mc-lower-grid">
          <article className="mc-panel mc-asteroid-panel">
            <div className="mc-panel-heading">
              <span className="mc-panel-icon">
                <Orbit size={19} />
              </span>
              <div>
                <span className="eyebrow">NEAR-EARTH OBJECTS</span>
                <h3>Asteroid watch</h3>
              </div>
            </div>

            <StatusLine
              loading={asteroidLoading}
              error={asteroidError}
            >
              {nearestAsteroid ? (
                <div className="mc-nearest-content">
                  <span className="mc-small-label">
                    LOWEST DISTANCE VALUE IN THIS RESPONSE
                  </span>
                  <h4>{nearestAsteroid.name}</h4>
                  <div className="mc-distance-value">
                    {formatNumber(nearestAsteroid.distance, 6)}
                  </div>
                  {nearestAsteroid.date && (
                    <p className="mc-panel-copy">
                      Recorded date: {nearestAsteroid.date}
                    </p>
                  )}
                  <p className="mc-panel-copy">
                    This is a distance comparison within the returned
                    records, not an official hazard rating.
                  </p>
                </div>
              ) : (
                <p className="mc-panel-copy">
                  No usable distance values were returned. Check your
                  asteroid API response.
                </p>
              )}
            </StatusLine>

            <button
              className="mc-panel-link"
              onClick={() => setPage('asteroids')}
            >
              Open Asteroid Explorer <ChevronRight size={16} />
            </button>
          </article>

          <article className="mc-panel mc-mars-panel">
            <div className="mc-panel-heading">
              <span className="mc-panel-icon">
                <Thermometer size={19} />
              </span>
              <div>
                <span className="eyebrow">MARS / INSIGHT</span>
                <h3>Weather observations</h3>
              </div>
            </div>

            <StatusLine loading={weatherLoading} error={weatherError}>
              {latestObservation ? (
                <>
                  <div className="mc-weather-reading">
                    <div>
                      <span className="mc-small-label">
                        TEMPERATURE
                      </span>
                      <strong>
                        {getNumber(latestObservation.temperature_c) === null
                          ? '—'
                          : `${formatNumber(
                              latestObservation.temperature_c,
                              1
                            )}°C`}
                      </strong>
                    </div>

                    <div>
                      <span className="mc-small-label">PRESSURE</span>
                      <strong>
                        {getNumber(latestObservation.pressure_pa) === null
                          ? '—'
                          : `${formatNumber(
                              latestObservation.pressure_pa,
                              1
                            )} Pa`}
                      </strong>
                    </div>

                    <div>
                      <span className="mc-small-label">WIND SPEED</span>
                      <strong>
                        {getNumber(latestObservation.wind_speed_m_s) === null
                          ? '—'
                          : `${formatNumber(
                              latestObservation.wind_speed_m_s,
                              1
                            )} m/s`}
                      </strong>
                    </div>
                  </div>

                  <p className="mc-panel-copy">
                    Sol {latestObservation.sol} · Historical data, not
                    a live sensor feed.
                  </p>
                </>
              ) : (
                <p className="mc-panel-copy">
                  No historical weather observations are available right now.
                </p>
              )}
            </StatusLine>

            <button
              className="mc-panel-link"
              onClick={() => setPage('mars')}
            >
              Open Mars Expedition <ChevronRight size={16} />
            </button>
          </article>
        </div>

        <div className="mc-quick-section">
          <div className="mc-quick-heading">
            <div>
              <span className="eyebrow">CONTINUE EXPLORING</span>
              <h3>Your destinations</h3>
            </div>
            <Sparkles size={19} />
          </div>

          <div className="mc-quick-grid">
            {quickLinks.map(item => {
              const Icon = item.icon;

              return (
                <button
                  className="mc-quick-link"
                  key={item.id}
                  onClick={() => setPage(item.id)}
                >
                  <span className="mc-quick-icon">
                    <Icon size={19} />
                  </span>
                  <span className="mc-quick-text">
                    <strong>{item.title}</strong>
                    <small>{item.detail}</small>
                  </span>
                  <ChevronRight size={17} className="mc-quick-arrow" />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* EXPLORE CARDS */}
      <section className="explore-grid section-wrap">
        {sections.map(section => {
          const Icon = section.icon;
          const image = exploreImages[section.id];

          return (
            <article
              className={`explore-card ${section.theme}`}
              key={section.id}
              style={image ? { '--card-image': `url("${image}")` } : {}}
            >
              <div className="explore-card-image" />

              <div className="explore-card-content">
                <div className="explore-card-top">
                  <span className="explore-icon">
                    <Icon size={19} />
                  </span>
                  <span className="explore-arrow">
                    <ArrowUpRight size={18} />
                  </span>
                </div>

                <span className="eyebrow">{section.kicker}</span>
                <h3>{section.title}</h3>
                <p>{section.copy}</p>

                <button
                  className="card-action"
                  onClick={() => setPage(section.id)}
                >
                  {section.action} <ArrowDownRight size={17} />
                </button>
              </div>
            </article>
          );
        })}
      </section>

      {/* FEATURED NASA IMAGERY */}
      <section className="section-wrap feature-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">COLLECTED FROM THE COSMOS</span>
            <h2>
              A glimpse of
              <br />
              <em>infinity.</em>
            </h2>
          </div>

          <a
            className="text-link"
            href="https://images.nasa.gov/"
            target="_blank"
            rel="noreferrer"
          >
            Explore NASA's collection <ExternalLink size={14} />
          </a>
        </div>

        {featured.length > 0 ? (
          <div className="featured-row">
            {featured.map((item, index) => (
              <a
                className={`featured-image featured-image-${index + 1}`}
                key={item.id}
                href={item.pageUrl}
                target="_blank"
                rel="noreferrer"
              >
                <img src={item.image} alt={item.title} loading="lazy" />
                <span className="featured-image-caption">
                  <small>{item.center || 'NASA ARCHIVE'}</small>
                  {item.title}
                  <ArrowUpRight size={17} />
                </span>
              </a>
            ))}
          </div>
        ) : (
          <div className="feature-fallback">
            <Sparkles size={22} />
            <p>
              {imageError
                ? 'The NASA archive could not be reached. Try again when your connection is available.'
                : 'Discoveries from the NASA archive will appear here.'}
            </p>
          </div>
        )}
      </section>

      {/* QUOTE */}
      <section className="home-quote">
        <div className="home-quote-inner">
          <span className="eyebrow">A SMALL PLANET. AN ENDLESS STORY.</span>
          <p>
            “Somewhere, something incredible is waiting to be known.”
          </p>
          <span className="home-quote-credit">
            — A reminder to keep exploring
          </span>
        </div>
      </section>

      {/* NEWS */}
      <section className="news-band">
        <div className="news-band-inner">
          <div>
            <span className="eyebrow">THE STORY CONTINUES</span>
            <h2>
              Space never
              <br />
              <em>stands still.</em>
            </h2>
          </div>

          <div className="news-actions">
            <p>
              Follow new discoveries, mission updates and upcoming
              events through official NASA sources.
            </p>

            <a
              className="button button-light"
              href="https://www.nasa.gov/news/"
              target="_blank"
              rel="noreferrer"
            >
              Latest NASA news <ArrowUpRight size={16} />
            </a>

            <a
              className="text-link"
              href="https://www.nasa.gov/events/"
              target="_blank"
              rel="noreferrer"
            >
              Upcoming NASA events <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <span>COSMIC ARCHIVE · AN EXPLORATION OF OUR UNIVERSE</span>
        <span>Imagery and scientific data linked to their original sources.</span>
      </footer>
    </main>
  );
}
