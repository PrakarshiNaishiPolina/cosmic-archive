
// import React, { useEffect, useState } from 'react';
// import {
//   Thermometer,
//   Gauge,
//   Wind,
//   RefreshCw,
//   Clock3,
//   AlertCircle,
// } from 'lucide-react';

// const API_URL = 'http://localhost:8000/api/mars-weather';

// function TrendChart({ title, unit, data, field, color, icon: Icon }) {
//   const values = data
//     .map((item) => item[field])
//     .filter((value) => Number.isFinite(value));

//   if (!values.length) {
//     return (
//       <article className="mars-weather-chart">
//         <h3>{title}</h3>
//         <p>No measurements available for this chart.</p>
//       </article>
//     );
//   }

//   const width = 520;
//   const height = 190;
//   const padX = 30;
//   const padY = 24;
//   const min = Math.min(...values);
//   const max = Math.max(...values);
//   const range = max - min || 1;

//   const points = data
//     .map((item, index) => {
//       const value = item[field];

//       if (!Number.isFinite(value)) return null;

//       const x =
//         padX +
//         (index / Math.max(data.length - 1, 1)) * (width - padX * 2);

//       const y =
//         height -
//         padY -
//         ((value - min) / range) * (height - padY * 2);

//       return { x, y, value, sol: item.sol };
//     })
//     .filter(Boolean);

//   const line = points.map((point) => `${point.x},${point.y}`).join(' ');

//   return (
//     <article className="mars-weather-chart">
//       <div className="mars-weather-chart-heading">
//         <span className="mars-weather-chart-icon" style={{ color }}>
//           <Icon size={19} />
//         </span>
//         <div>
//           <h3>{title}</h3>
//           <p>Measurements across available Martian days</p>
//         </div>
//       </div>

//       <div className="mars-weather-chart-value">
//         {min === max
//           ? min.toFixed(2)
//           : `${min.toFixed(1)} – ${max.toFixed(1)}`}
//         <span> {unit}</span>
//       </div>

//       <div className="mars-weather-svg-wrap">
//         <svg
//           viewBox={`0 0 ${width} ${height}`}
//           role="img"
//           aria-label={`${title} trend across the available Martian sols`}
//         >
//           {[0, 1, 2, 3].map((step) => {
//             const y =
//               padY + (step / 3) * (height - padY * 2);

//             return (
//               <line
//                 key={step}
//                 x1={padX}
//                 y1={y}
//                 x2={width - padX}
//                 y2={y}
//                 stroke="currentColor"
//                 opacity="0.12"
//                 strokeDasharray="4 5"
//               />
//             );
//           })}

//           <polyline
//             points={line}
//             fill="none"
//             stroke={color}
//             strokeWidth="3"
//             strokeLinejoin="round"
//             strokeLinecap="round"
//           />

//           {points.map((point) => (
//             <circle
//               key={point.sol}
//               cx={point.x}
//               cy={point.y}
//               r="4"
//               fill={color}
//               stroke="currentColor"
//               strokeOpacity="0.25"
//               strokeWidth="1"
//             >
//               <title>
//                 Sol {point.sol}: {point.value.toFixed(2)} {unit}
//               </title>
//             </circle>
//           ))}
//         </svg>
//       </div>

//       <div className="mars-weather-chart-footer">
//         <span>Sol {points[0].sol}</span>
//         <span>Sol {points[points.length - 1].sol}</span>
//       </div>
//     </article>
//   );
// }

// export default function MarsWeatherDashboard() {
//   const [weather, setWeather] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   async function loadWeather() {
//     setLoading(true);
//     setError('');

//     try {
//       const response = await fetch(API_URL);
//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           result.detail || 'Unable to retrieve Mars weather data.'
//         );
//       }

//       if (!Array.isArray(result.observations) ||
//           result.observations.length === 0) {
//         throw new Error('No weather observations are currently available.');
//       }

//       setWeather(result);
//     } catch (err) {
//       setError(err.message || 'Could not connect to the weather service.');
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     loadWeather();
//   }, []);

//   const observations = weather?.observations || [];

//   const average = (field) => {
//     const values = observations
//       .map((item) => item[field])
//       .filter(Number.isFinite);

//     if (!values.length) return null;

//     return values.reduce((sum, value) => sum + value, 0) / values.length;
//   };

//   const format = (value, digits = 1) =>
//     Number.isFinite(value) ? value.toFixed(digits) : 'N/A';

//   return (
//     <section className="mars-weather-dashboard" id="mars-weather">
//       <div className="mars-weather-header">
//         <div>
//           <span className="mars-weather-eyebrow">
//             <Clock3 size={13} /> ARCHIVED MISSION DATA
//           </span>
//           <h2>Mars Weather Station</h2>
//           <p>
//             Explore atmospheric measurements collected by NASA's InSight
//             lander at Elysium Planitia.
//           </p>
//         </div>

//         <button
//           type="button"
//           className="mars-weather-refresh"
//           onClick={loadWeather}
//           disabled={loading}
//         >
//           <RefreshCw size={15} className={loading ? 'mars-weather-spinning' : ''} />
//           {loading ? 'Loading...' : 'Refresh data'}
//         </button>
//       </div>

//       <div className="mars-weather-notice">
//         <AlertCircle size={18} />
//         <div>
//           <strong>Historical observations — not live weather</strong>
//           <p>
//             NASA's InSight mission ended in 2022. These are archived
//             measurements returned by the connected data source.
//           </p>
//         </div>
//       </div>

//       {loading && (
//         <div className="mars-weather-message">
//           Loading archived Martian weather...
//         </div>
//       )}

//       {!loading && error && (
//         <div className="mars-weather-error">
//           <AlertCircle size={20} />
//           <div>
//             <strong>Weather data unavailable</strong>
//             <p>{error}</p>
//             <button type="button" onClick={loadWeather}>
//               Try again
//             </button>
//           </div>
//         </div>
//       )}

//       {!loading && !error && weather && (
//         <>
//           <div className="mars-weather-location">
//             <span>LOCATION</span>
//             <strong>{weather.location}</strong>
//             <span>
//               {observations.length} observations · Sol{' '}
//               {observations[0]?.sol}–{observations[observations.length - 1]?.sol}
//             </span>
//           </div>

//           <div className="mars-weather-stats">
//             <article className="mars-weather-stat">
//               <span className="mars-weather-stat-icon temp">
//                 <Thermometer size={21} />
//               </span>
//               <span className="mars-weather-stat-label">Average temperature</span>
//               <strong>{format(average('temperature_c'))}°C</strong>
//               <small>Atmospheric temperature</small>
//             </article>

//             <article className="mars-weather-stat">
//               <span className="mars-weather-stat-icon pressure">
//                 <Gauge size={21} />
//               </span>
//               <span className="mars-weather-stat-label">Average pressure</span>
//               <strong>{format(average('pressure_pa'))} Pa</strong>
//               <small>Surface atmospheric pressure</small>
//             </article>

//             <article className="mars-weather-stat">
//               <span className="mars-weather-stat-icon wind">
//                 <Wind size={21} />
//               </span>
//               <span className="mars-weather-stat-label">Average wind speed</span>
//               <strong>{format(average('wind_speed_m_s'))} m/s</strong>
//               <small>Measured wind speed</small>
//             </article>
//           </div>

//           <div className="mars-weather-chart-grid">
//             <TrendChart
//               title="Temperature trend"
//               unit="°C"
//               data={observations}
//               field="temperature_c"
//               color="#f29a62"
//               icon={Thermometer}
//             />

//             <TrendChart
//               title="Atmospheric pressure"
//               unit="Pa"
//               data={observations}
//               field="pressure_pa"
//               color="#80aaff"
//               icon={Gauge}
//             />

//             <TrendChart
//               title="Wind speed"
//               unit="m/s"
//               data={observations}
//               field="wind_speed_m_s"
//               color="#83d8bd"
//               icon={Wind}
//             />
//           </div>

//           <div className="mars-weather-table-wrap">
//             <h3>Observation log</h3>
//             <div className="mars-weather-table-scroll">
//               <table className="mars-weather-table">
//                 <thead>
//                   <tr>
//                     <th>Martian day</th>
//                     <th>Temperature</th>
//                     <th>Pressure</th>
//                     <th>Wind speed</th>
//                     <th>Wind direction</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {observations.map((item) => (
//                     <tr key={item.sol}>
//                       <td>Sol {item.sol}</td>
//                       <td>{format(item.temperature_c)}°C</td>
//                       <td>{format(item.pressure_pa)} Pa</td>
//                       <td>{format(item.wind_speed_m_s)} m/s</td>
//                       <td>{item.wind_direction || 'N/A'}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           <p className="mars-weather-source">
//             Source: {weather.source} · Units: °C, Pa, m/s · Historical
//             measurements supplied by your FastAPI backend.
//           </p>
//         </>
//       )}
//     </section>
//   );
// }


import React, { useEffect, useState } from 'react';
import {
  Thermometer,
  Gauge,
  Wind,
  RefreshCw,
  Clock3,
  AlertCircle,
  Database,
} from 'lucide-react';

const API_URL = 'http://localhost:8000/api/mars-weather';

const METRICS = {
  temperature_c: {
    label: 'Temperature',
    unit: '°C',
    color: '#f29a62',
    icon: Thermometer,
  },
  pressure_pa: {
    label: 'Atmospheric pressure',
    unit: 'Pa',
    color: '#80aaff',
    icon: Gauge,
  },
  wind_speed_m_s: {
    label: 'Wind speed',
    unit: 'm/s',
    color: '#83d8bd',
    icon: Wind,
  },
};

function format(value, digits = 1) {
  return Number.isFinite(value) ? value.toFixed(digits) : 'N/A';
}

function TrendChart({ data, field, metric }) {
  const values = data
    .map((item) => item[field])
    .filter(Number.isFinite);

  if (!values.length) {
    return <p>No measurements are available for this metric.</p>;
  }

  const width = 600;
  const height = 220;
  const padX = 42;
  const padY = 28;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const points = data
    .map((item, index) => {
      const value = item[field];

      if (!Number.isFinite(value)) return null;

      const x =
        padX +
        (index / Math.max(data.length - 1, 1)) *
          (width - padX * 2);

      const y =
        height -
        padY -
        ((value - min) / range) * (height - padY * 2);

      return { x, y, value, sol: item.sol };
    })
    .filter(Boolean);

  return (
    <article className="mars-weather-chart">
      <div className="mars-weather-chart-heading">
        <span
          className="mars-weather-chart-icon"
          style={{ color: metric.color }}
        >
          <metric.icon size={19} />
        </span>

        <div>
          <h3>{metric.label} trend</h3>
          <p>Historical measurements across Martian days</p>
        </div>
      </div>

      <div className="mars-weather-chart-value">
        {format(min)} – {format(max)}
        <span> {metric.unit}</span>
      </div>

      <div className="mars-weather-svg-wrap">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={`${metric.label} across recorded Martian sols`}
        >
          {[0, 1, 2, 3].map((step) => {
            const y =
              padY + (step / 3) * (height - padY * 2);

            return (
              <line
                key={step}
                x1={padX}
                y1={y}
                x2={width - padX}
                y2={y}
                stroke="currentColor"
                opacity="0.12"
                strokeDasharray="4 5"
              />
            );
          })}

          <polyline
            points={points
              .map((point) => `${point.x},${point.y}`)
              .join(' ')}
            fill="none"
            stroke={metric.color}
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {points.map((point) => (
            <circle
              key={point.sol}
              cx={point.x}
              cy={point.y}
              r="5"
              fill={metric.color}
              stroke="currentColor"
              strokeOpacity="0.3"
            >
              <title>
                Sol {point.sol}: {format(point.value)} {metric.unit}
              </title>
            </circle>
          ))}
        </svg>
      </div>

      <div className="mars-weather-chart-footer">
        <span>Sol {points[0]?.sol}</span>
        <span>Sol {points[points.length - 1]?.sol}</span>
      </div>
    </article>
  );
}

export default function MarsWeatherDashboard() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMetric, setSelectedMetric] = useState('temperature_c');
  const [selectedSol, setSelectedSol] = useState('');

  async function loadWeather() {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(API_URL);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.detail || 'Unable to retrieve Mars weather data.'
        );
      }

      if (
        !Array.isArray(result.observations) ||
        result.observations.length === 0
      ) {
        throw new Error('No weather observations are available.');
      }

      setWeather(result);
      setSelectedSol(String(result.observations[0].sol));
    } catch (err) {
      setError(
        err.message || 'Could not connect to the weather service.'
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWeather();
  }, []);

  const observations = weather?.observations || [];
  const metric = METRICS[selectedMetric];
  const selectedObservation =
    observations.find((item) => String(item.sol) === selectedSol) ||
    observations[0];

  function average(field) {
    const values = observations
      .map((item) => item[field])
      .filter(Number.isFinite);

    if (!values.length) return null;

    return values.reduce((sum, value) => sum + value, 0) / values.length;
  }

  return (
    <section className="mars-weather-dashboard" id="mars-weather">
      <div className="mars-weather-header">
        <div>
          <span className="mars-weather-eyebrow">
            <Clock3 size={13} /> ARCHIVED MISSION DATA
          </span>

          <h2>Mars Weather Station</h2>

          <p>
            Explore atmospheric measurements collected by NASA's
            InSight lander at Elysium Planitia.
          </p>
        </div>

        <button
          type="button"
          className="mars-weather-refresh"
          onClick={loadWeather}
          disabled={loading}
        >
          <RefreshCw
            size={15}
            className={loading ? 'mars-weather-spinning' : ''}
          />
          {loading ? 'Loading...' : 'Refresh data'}
        </button>
      </div>

      <div className="mars-weather-notice">
        <AlertCircle size={18} />
        <div>
          <strong>Historical observations — not live weather</strong>
          <p>
            NASA's InSight mission ended in 2022. These measurements
            describe the archived dataset, not current conditions on Mars.
          </p>
        </div>
      </div>

      {!loading && weather?.fallback_used && (
        <div className="mars-weather-notice">
          <Database size={18} />
          <div>
            <strong>Cached sample is being displayed</strong>
            <p>
              The NASA endpoint was unavailable. This is a cached
              historical sample, not a fresh response from NASA.
            </p>
          </div>
        </div>
      )}

      {loading && (
        <div className="mars-weather-message">
          Loading archived Martian weather...
        </div>
      )}

      {!loading && error && (
        <div className="mars-weather-error">
          <AlertCircle size={20} />
          <div>
            <strong>Weather data unavailable</strong>
            <p>{error}</p>
            <button type="button" onClick={loadWeather}>
              Try again
            </button>
          </div>
        </div>
      )}

      {!loading && !error && weather && (
        <>
          <div className="mars-weather-location">
            <span>LOCATION</span>
            <strong>{weather.location}</strong>
            <span>
              {observations.length} observations · Sol{' '}
              {observations[0]?.sol}–{observations[observations.length - 1]?.sol}
            </span>
          </div>

          <div className="mars-weather-stats">
            <article className="mars-weather-stat">
              <span className="mars-weather-stat-icon temp">
                <Thermometer size={21} />
              </span>
              <span className="mars-weather-stat-label">
                Average temperature
              </span>
              <strong>{format(average('temperature_c'))}°C</strong>
              <small>Across available observations</small>
            </article>

            <article className="mars-weather-stat">
              <span className="mars-weather-stat-icon pressure">
                <Gauge size={21} />
              </span>
              <span className="mars-weather-stat-label">
                Average pressure
              </span>
              <strong>{format(average('pressure_pa'))} Pa</strong>
              <small>Atmospheric pressure</small>
            </article>

            <article className="mars-weather-stat">
              <span className="mars-weather-stat-icon wind">
                <Wind size={21} />
              </span>
              <span className="mars-weather-stat-label">
                Average wind speed
              </span>
              <strong>{format(average('wind_speed_m_s'))} m/s</strong>
              <small>Recorded wind speed</small>
            </article>
          </div>

          <div className="mars-weather-explorer">
            <div className="mars-weather-explorer-heading">
              <div>
                <span className="mars-weather-eyebrow">
                  <Database size={13} /> DATA EXPLORER
                </span>
                <h3>Explore a measurement</h3>
                <p>
                  Choose a variable and a Martian day to inspect the
                  available readings.
                </p>
              </div>
            </div>

            <div className="mars-weather-controls">
              <label>
                Measurement
                <select
                  value={selectedMetric}
                  onChange={(event) => setSelectedMetric(event.target.value)}
                >
                  {Object.entries(METRICS).map(([key, item]) => (
                    <option key={key} value={key}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Martian day (sol)
                <select
                  value={selectedSol}
                  onChange={(event) => setSelectedSol(event.target.value)}
                >
                  {observations.map((item) => (
                    <option key={item.sol} value={String(item.sol)}>
                      Sol {item.sol}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {selectedObservation && (
              <div className="mars-weather-selected-reading">
                <span>{metric.label} · Sol {selectedObservation.sol}</span>
                <strong>
                  {format(selectedObservation[selectedMetric])} {metric.unit}
                </strong>
                <p>
                  {selectedMetric === 'temperature_c' &&
                    'This is the recorded atmospheric temperature for the selected sol.'}
                  {selectedMetric === 'pressure_pa' &&
                    'This is the recorded atmospheric pressure for the selected sol.'}
                  {selectedMetric === 'wind_speed_m_s' &&
                    'This is the recorded wind speed for the selected sol.'}
                </p>
              </div>
            )}
          </div>

          <div className="mars-weather-chart-grid">
            <TrendChart
              data={observations}
              field="temperature_c"
              metric={METRICS.temperature_c}
            />
            <TrendChart
              data={observations}
              field="pressure_pa"
              metric={METRICS.pressure_pa}
            />
            <TrendChart
              data={observations}
              field="wind_speed_m_s"
              metric={METRICS.wind_speed_m_s}
            />
          </div>

          <div className="mars-weather-table-wrap">
            <h3>Observation log</h3>
            <div className="mars-weather-table-scroll">
              <table className="mars-weather-table">
                <thead>
                  <tr>
                    <th>Martian day</th>
                    <th>Temperature</th>
                    <th>Pressure</th>
                    <th>Wind speed</th>
                    <th>Wind direction</th>
                  </tr>
                </thead>
                <tbody>
                  {observations.map((item) => (
                    <tr
                      key={item.sol}
                      className={
                        String(item.sol) === selectedSol
                          ? 'mars-weather-row-selected'
                          : ''
                      }
                    >
                      <td>Sol {item.sol}</td>
                      <td>{format(item.temperature_c)}°C</td>
                      <td>{format(item.pressure_pa)} Pa</td>
                      <td>{format(item.wind_speed_m_s)} m/s</td>
                      <td>{item.wind_direction || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mars-weather-source">
            Source: {weather.source} · Units: °C, Pa, m/s · Historical
            measurements supplied by your FastAPI backend.
          </p>
        </>
      )}
    </section>
  );
}
