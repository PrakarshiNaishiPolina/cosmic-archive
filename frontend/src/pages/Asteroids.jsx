
import React, { useEffect, useMemo, useState } from 'react';
import Plot from 'react-plotly.js';
import {
  ArrowUpRight,
  Calendar,
  CircleAlert,
  ExternalLink,
  Orbit,
  RefreshCw,
  Search,
  Radar,
  Gauge,
  Info
} from 'lucide-react';
import {
  getAsteroidApproaches
} from '../services/nasa.js';
import AsteroidMediaGallery from '../components/AsteroidMediaGallery.jsx';

const AU_TO_KM = 149597870.7;
const MOON_DISTANCE_KM = 384400;

const iso = (date) => date.toISOString().slice(0, 10);

const ASTEROID_SEARCHES = [
  {
    name: 'Bennu',
    source: 'NASA · OSIRIS-REx',
    url: 'https://science.nasa.gov/mission/osiris-rex/'
  },
  {
    name: 'Vesta',
    source: 'NASA · Dawn',
    url: 'https://science.nasa.gov/mission/dawn/'
  },
  {
    name: 'Eros',
    source: 'NASA · NEAR Shoemaker',
    url: 'https://science.nasa.gov/solar-system/asteroids/'
  }
];

function normalizeDistance(record) {
  if (record['dist-km'] != null) {
    const km = Number(record['dist-km']);
    if (Number.isFinite(km)) return km;
  }

  if (record.dist != null) {
    const au = Number(record.dist);
    if (Number.isFinite(au)) return au * AU_TO_KM;
  }

  return null;
}

function formatNumber(value, digits = 0) {
  const number = Number(value);

  return Number.isFinite(number)
    ? number.toLocaleString(undefined, {
        maximumFractionDigits: digits
      })
    : '—';
}

function distanceKm(row) {
  const value = normalizeDistance(row);
  return value != null && value >= 0 ? value : null;
}

function velocityValue(row) {
  const value = Number(row['v-rel'] ?? row.v_rel);
  return Number.isFinite(value) && value >= 0 ? value : null;
}

/* -------------------------------------------------------
   ASTEROID ORBIT EXPLORER
   Interactive view of reported close approaches.
   This is not a reconstructed orbital trajectory.
------------------------------------------------------- */

function AsteroidOrbitExplorer({ rows }) {
  const [selectedKey, setSelectedKey] = useState('');
  const [sortBy, setSortBy] = useState('distance');

  const usableRows = useMemo(() => {
    return rows
      .map((row, index) => ({
        ...row,
        _key: `${row.des || row.fullname || 'object'}-${row.cd || index}`,
        _distanceKm: distanceKm(row),
        _velocity: velocityValue(row)
      }))
      .filter((row) => row._distanceKm != null);
  }, [rows]);

  const closestRows = useMemo(() => {
    return [...usableRows].sort(
      (a, b) => a._distanceKm - b._distanceKm
    );
  }, [usableRows]);

  useEffect(() => {
    if (!usableRows.some((row) => row._key === selectedKey)) {
      setSelectedKey(closestRows[0]?._key || '');
    }
  }, [usableRows, closestRows, selectedKey]);

  const selected = usableRows.find(
    (row) => row._key === selectedKey
  ) || closestRows[0];

  const chartRows = useMemo(() => {
    const sorted = [...usableRows];

    if (sortBy === 'velocity') {
      sorted.sort(
        (a, b) => (b._velocity ?? -1) - (a._velocity ?? -1)
      );
    } else {
      sorted.sort((a, b) => a._distanceKm - b._distanceKm);
    }

    return sorted;
  }, [usableRows, sortBy]);

  const plotData = chartRows.filter((row) => row._velocity != null);

  const chartLayout = {
    autosize: true,
    height: 370,
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: {
      color: '#f1dfce',
      family: 'DM Sans, sans-serif',
      size: 11
    },
    margin: { l: 75, r: 25, t: 25, b: 65 },
    xaxis: {
      title: 'Distance from Earth (lunar distances)',
      gridcolor: 'rgba(255,255,255,.09)',
      zerolinecolor: 'rgba(255,255,255,.12)'
    },
    yaxis: {
      title: 'Relative velocity (km/s)',
      gridcolor: 'rgba(255,255,255,.09)',
      zerolinecolor: 'rgba(255,255,255,.12)'
    },
    hoverlabel: {
      bgcolor: '#17191f',
      font: { color: '#fff' }
    }
  };

  return (
    <section className="asteroid-explorer">
      <div className="asteroid-explorer-heading">
        <div>
          <span className="eyebrow">INTERACTIVE DATA EXPLORER</span>
          <h2>
            The <em>approach map.</em>
          </h2>
          <p>
            Compare the listed approach distances and relative speeds
            for objects in your selected time window.
          </p>
        </div>

        <div className="asteroid-explorer-icon">
          <Orbit size={29} />
        </div>
      </div>

      <div className="asteroid-explorer-controls">
        <label className="select-field">
          <Radar size={15} />
          <select
            value={selected?._key || ''}
            onChange={(event) => setSelectedKey(event.target.value)}
          >
            {closestRows.map((row) => (
              <option key={row._key} value={row._key}>
                {row.fullname || row.des || 'Unknown object'}
              </option>
            ))}
          </select>
        </label>

        <label className="select-field">
          <Gauge size={15} />
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="distance">Order by closest distance</option>
            <option value="velocity">Order by highest velocity</option>
          </select>
        </label>
      </div>

      {usableRows.length === 0 ? (
        <div className="notice">
          <Info size={20} />
          <div>
            <strong>No usable approach distances</strong>
            <p>
              Try a different search term or date range.
            </p>
          </div>
        </div>
      ) : (
        <>
          {selected && (
            <div className="asteroid-selected-card">
              <div>
                <span className="eyebrow">SELECTED OBJECT</span>
                <h3>{selected.fullname || selected.des || 'Unknown object'}</h3>
                <p>
                  Approach date: <strong>{selected.cd || 'Not supplied'}</strong>
                </p>
              </div>

              <div className="asteroid-selected-metrics">
                <div>
                  <span>Distance</span>
                  <strong>{formatNumber(selected._distanceKm)} km</strong>
                </div>
                <div>
                  <span>Moon distances</span>
                  <strong>
                    {formatNumber(
                      selected._distanceKm / MOON_DISTANCE_KM,
                      2
                    )}
                  </strong>
                </div>
                <div>
                  <span>Relative speed</span>
                  <strong>
                    {selected._velocity == null
                      ? '—'
                      : `${formatNumber(selected._velocity, 2)} km/s`}
                  </strong>
                </div>
              </div>
            </div>
          )}

          <div className="asteroid-explorer-chart">
            <div className="chart-title">
              <span className="eyebrow">DISTANCE VS SPEED</span>
              <span>Each point represents a reported approach</span>
            </div>

            {plotData.length > 0 ? (
              <Plot
                data={[
                  {
                    type: 'scatter',
                    mode: 'markers',
                    x: plotData.map(
                      (row) => row._distanceKm / MOON_DISTANCE_KM
                    ),
                    y: plotData.map((row) => row._velocity),
                    text: plotData.map(
                      (row) =>
                        `${row.fullname || row.des || 'Unknown object'}<br>` +
                        `Date: ${row.cd || '—'}`
                    ),
                    customdata: plotData.map((row) => row._key),
                    marker: {
                      size: plotData.map((row) =>
                        row._key === selected?._key ? 15 : 9
                      ),
                      color: plotData.map((row) =>
                        row._key === selected?._key ? '#e9a45e' : '#91a9c8'
                      ),
                      opacity: 0.88,
                      line: {
                        color: 'rgba(255,255,255,.55)',
                        width: 1
                      }
                    },
                    hovertemplate:
                      '%{text}<br>' +
                      'Distance: %{x:.2f} lunar distances<br>' +
                      'Relative speed: %{y:.2f} km/s' +
                      '<extra></extra>'
                  }
                ]}
                layout={chartLayout}
                config={{
                  responsive: true,
                  displayModeBar: false
                }}
                style={{ width: '100%' }}
                useResizeHandler
                onClick={(event) => {
                  const key = event.points?.[0]?.customdata;
                  if (key) setSelectedKey(key);
                }}
              />
            ) : (
              <p className="disclaimer">
                Relative velocity is not available for the plotted records.
              </p>
            )}

            <p className="asteroid-chart-hint">
              Select a point to inspect its reported approach. A closer
              distance does not automatically mean an object is hazardous.
            </p>
          </div>

          <div className="asteroid-explorer-table">
            <div className="chart-title">
              <span className="eyebrow">CLOSEST LISTED APPROACHES</span>
              <span>Top {Math.min(10, closestRows.length)} by distance</span>
            </div>

            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Object</th>
                    <th>Approach date</th>
                    <th>Distance (km)</th>
                    <th>Moon distances</th>
                    <th>Speed (km/s)</th>
                  </tr>
                </thead>
                <tbody>
                  {closestRows.slice(0, 10).map((row) => (
                    <tr
                      key={row._key}
                      className={
                        row._key === selected?._key
                          ? 'asteroid-row-selected'
                          : ''
                      }
                      onClick={() => setSelectedKey(row._key)}
                      tabIndex={0}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                          setSelectedKey(row._key);
                        }
                      }}
                    >
                      <td>{row.fullname || row.des || 'Unknown object'}</td>
                      <td>{row.cd || '—'}</td>
                      <td>{formatNumber(row._distanceKm)}</td>
                      <td>
                        {formatNumber(
                          row._distanceKm / MOON_DISTANCE_KM,
                          2
                        )}
                      </td>
                      <td>
                        {row._velocity == null
                          ? '—'
                          : formatNumber(row._velocity, 2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      <div className="asteroid-science-note">
        <Info size={17} />
        <p>
          <strong>How to read this:</strong> this chart compares reported
          close-approach distance with relative velocity. It does not show
          the asteroid’s complete orbit, impact probability, or an official
          hazard classification. Use NASA/JPL’s official data for risk
          assessments.
        </p>
      </div>

      <style>{`
        .asteroid-explorer {
          margin: 34px 0 42px;
          padding: clamp(18px, 3vw, 30px);
          border: 1px solid rgba(217, 139, 72, .25);
          border-radius: 18px;
          background: linear-gradient(145deg, rgba(217,139,72,.07), rgba(20,24,34,.5));
        }

        .asteroid-explorer-heading {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 24px;
        }

        .asteroid-explorer-heading h2 {
          margin: 8px 0;
        }

        .asteroid-explorer-heading p,
        .asteroid-chart-hint {
          color: rgba(241,223,206,.72);
          line-height: 1.7;
          max-width: 720px;
        }

        .asteroid-explorer-icon {
          display: grid;
          place-items: center;
          min-width: 54px;
          height: 54px;
          border-radius: 15px;
          color: #e9a45e;
          background: rgba(217,139,72,.12);
        }

        .asteroid-explorer-controls {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          margin-bottom: 20px;
        }

        .asteroid-selected-card {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
          gap: 24px;
          align-items: center;
          padding: 22px;
          border: 1px solid rgba(255,255,255,.09);
          border-radius: 14px;
          background: rgba(0,0,0,.16);
        }

        .asteroid-selected-card h3 {
          margin: 8px 0;
          overflow-wrap: anywhere;
        }

        .asteroid-selected-card p {
          color: rgba(241,223,206,.7);
        }

        .asteroid-selected-metrics {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }

        .asteroid-selected-metrics div {
          min-width: 0;
          padding: 12px;
          border-radius: 10px;
          background: rgba(255,255,255,.035);
        }

        .asteroid-selected-metrics span,
        .asteroid-selected-metrics strong {
          display: block;
          overflow-wrap: anywhere;
        }

        .asteroid-selected-metrics span {
          margin-bottom: 8px;
          color: rgba(241,223,206,.62);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: .08em;
        }

        .asteroid-selected-metrics strong {
          font-size: clamp(13px, 1.5vw, 17px);
        }

        .asteroid-explorer-chart,
        .asteroid-explorer-table {
          margin-top: 22px;
          padding: 16px;
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 14px;
          background: rgba(0,0,0,.12);
          min-width: 0;
        }

        .asteroid-explorer .chart-title {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 8px;
        }

        .asteroid-explorer .chart-title > span:last-child {
          color: rgba(241,223,206,.62);
          font-size: 12px;
        }

        .asteroid-explorer .table-wrap {
          overflow-x: auto;
        }

        .asteroid-explorer .data-table tbody tr {
          cursor: pointer;
        }

        .asteroid-explorer .data-table tbody tr:focus {
          outline: 1px solid #e9a45e;
          outline-offset: -1px;
        }

        .asteroid-explorer .data-table tbody tr.asteroid-row-selected td {
          background: rgba(217,139,72,.12);
        }

        .asteroid-science-note {
          display: flex;
          align-items: flex-start;
          gap: 11px;
          margin-top: 20px;
          padding: 15px;
          border-radius: 10px;
          background: rgba(145,169,200,.08);
          color: rgba(241,223,206,.8);
        }

        .asteroid-science-note svg {
          flex-shrink: 0;
          margin-top: 2px;
          color: #91a9c8;
        }

        .asteroid-science-note p {
          margin: 0;
          font-size: 13px;
          line-height: 1.7;
        }

        @media (max-width: 760px) {
          .asteroid-explorer-controls,
          .asteroid-selected-card {
            grid-template-columns: 1fr;
          }

          .asteroid-selected-metrics {
            grid-template-columns: 1fr;
          }

          .asteroid-explorer-icon {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}

/* -------------------------------------------------------
   MAIN ASTEROIDS PAGE
------------------------------------------------------- */

export default function Asteroids() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [days, setDays] = useState(7);

  async function load() {
    setLoading(true);
    setError('');

    const start = new Date();
    const end = new Date();
    end.setDate(end.getDate() + days);

    try {
      const data = await getAsteroidApproaches(iso(start), iso(end));

      setRows(
        data.map((record) => ({
          ...record,
          'dist-km': normalizeDistance(record),
          'v-rel': record['v-rel'] ?? record.v_rel ?? null,
          fullname: record.fullname || record.des || 'Unknown object',
          des: record.des || '',
          cd: record.cd || '',
          diameter: record.diameter ?? null
        }))
      );
    } catch (err) {
      console.error('JPL close-approach error:', err);
      setRows([]);
      setError(
        'Live close-approach data could not be loaded. Check that your backend is running.'
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // Reload when the selected date window changes.
  }, [days]);

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();

    return rows.filter((row) =>
      `${row.fullname || ''} ${row.des || ''}`
        .toLowerCase()
        .includes(search)
    );
  }, [rows, query]);

  const distanceRows = useMemo(
    () =>
      filtered
        .filter((row) => distanceKm(row) != null)
        .sort((a, b) => distanceKm(a) - distanceKm(b))
        .slice(0, 25),
    [filtered]
  );

  const velocityRows = useMemo(
    () =>
      filtered
        .filter((row) => velocityValue(row) != null)
        .sort((a, b) => velocityValue(b) - velocityValue(a))
        .slice(0, 15),
    [filtered]
  );

  const chartLayout = {
    autosize: true,
    height: 340,
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: {
      color: '#f1dfce',
      family: 'DM Sans, sans-serif',
      size: 11
    },
    margin: { l: 70, r: 20, t: 15, b: 100 },
    xaxis: {
      tickangle: -35,
      gridcolor: 'rgba(255,255,255,.06)'
    },
    yaxis: {
      gridcolor: 'rgba(255,255,255,.1)'
    }
  };

  return (
    <main className="page page-asteroids theme-asteroid">
      <section className="hero sub-hero asteroid-hero">
        <div className="hero-overlay" />

        <div className="hero-content">
          <span className="script-label">
            Ancient travellers. Future trajectories.
          </span>

          <span className="eyebrow hero-eyebrow">
            NEAR-EARTH OBJECT OBSERVATORY
          </span>

          <h1>
            Track the
            <br />
            <em>wanderers.</em>
          </h1>

          <p className="hero-copy">
            Explore small bodies passing through our cosmic neighbourhood
            with data from NASA's Jet Propulsion Laboratory.
          </p>

          <a
            className="button button-light"
            href="https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html"
            target="_blank"
            rel="noreferrer"
          >
            JPL small-body database <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="orbit-decoration">
          <Orbit size={74} />
          <span>
            EARTH
            <br />
            ORBIT
          </span>
        </div>
      </section>

      <section className="section-wrap data-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">LIVE DATA · NASA/JPL</span>
            <h2>
              Close approaches <em>ahead.</em>
            </h2>
          </div>

          <button
            type="button"
            className="button button-ghost"
            onClick={load}
            disabled={loading}
          >
            <RefreshCw size={15} /> {loading ? 'Refreshing…' : 'Refresh data'}
          </button>
        </div>

        <div className="filter-bar">
          <label className="search-field">
            <Search size={16} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search object name or designation…"
            />
          </label>

          <label className="select-field">
            <Calendar size={15} />
            <select
              value={days}
              onChange={(event) => setDays(Number(event.target.value))}
            >
              <option value="7">Next 7 days</option>
              <option value="14">Next 14 days</option>
              <option value="30">Next 30 days</option>
            </select>
          </label>
        </div>

        {loading ? (
          <div className="state-panel">
            <span className="loader" />
            <p>Calculating the next approaches…</p>
          </div>
        ) : error ? (
          <div className="notice">
            <CircleAlert />
            <div>
              <strong>Live data temporarily unavailable</strong>
              <p>{error}</p>
              <a
                href={`${import.meta.env.VITE_API_URL || "http://localhost:8000"}/api/asteroids?days=7`}
                target="_blank"
                rel="noreferrer"
              >
                Test backend data <ExternalLink size={13} />
              </a>
            </div>
          </div>
        ) : (
          <>
            <div className="stat-row">
              <div className="stat-card">
                <span className="eyebrow">MATCHING APPROACHES</span>
                <strong>{filtered.length}</strong>
                <small>within selected date window</small>
              </div>

              <div className="stat-card">
                <span className="eyebrow">CLOSEST DISTANCE</span>
                <strong>
                  {distanceRows.length
                    ? `${formatNumber(distanceKm(distanceRows[0]) / 1000)}k km`
                    : '—'}
                </strong>
                <small>from Earth's centre</small>
              </div>

              <div className="stat-card">
                <span className="eyebrow">MOON DISTANCES</span>
                <strong>
                  {distanceRows.length
                    ? formatNumber(
                        distanceKm(distanceRows[0]) / MOON_DISTANCE_KM,
                        2
                      )
                    : '—'}
                </strong>
                <small>closest approach in lunar-distance units</small>
              </div>

              <div className="stat-card">
                <span className="eyebrow">SOURCE</span>
                <strong>JPL</strong>
                <small>Close-Approach Data API</small>
              </div>
            </div>

            <AsteroidOrbitExplorer rows={filtered} />

            {distanceRows.length > 0 && (
              <div className="chart-panel">
                <div className="chart-title">
                  <span className="eyebrow">DISTANCE COMPARISON</span>
                  <span>Closest listed objects</span>
                </div>

                <Plot
                  data={[
                    {
                      type: 'bar',
                      x: distanceRows.map(
                        (row) => row.fullname || row.des
                      ),
                      y: distanceRows.map(
                        (row) => distanceKm(row) / 1000
                      ),
                      marker: { color: '#d98b48' },
                      hovertemplate:
                        '%{x}<br>%{y:,.0f} thousand km<extra></extra>'
                    }
                  ]}
                  layout={{
                    ...chartLayout,
                    yaxis: {
                      ...chartLayout.yaxis,
                      title: 'Distance (thousand km)'
                    }
                  }}
                  config={{
                    responsive: true,
                    displayModeBar: false
                  }}
                  style={{ width: '100%' }}
                  useResizeHandler
                />
              </div>
            )}

            {velocityRows.length > 0 && (
              <div className="chart-panel">
                <div className="chart-title">
                  <span className="eyebrow">RELATIVE VELOCITY</span>
                  <span>Fastest listed approaches</span>
                </div>

                <Plot
                  data={[
                    {
                      type: 'bar',
                      orientation: 'h',
                      y: velocityRows.map(
                        (row) => row.fullname || row.des
                      ),
                      x: velocityRows.map((row) => velocityValue(row)),
                      marker: { color: '#8fa9c7' },
                      hovertemplate:
                        '%{y}<br>%{x:.2f} km/s<extra></extra>'
                    }
                  ]}
                  layout={{
                    ...chartLayout,
                    height: Math.max(340, velocityRows.length * 32 + 100),
                    margin: { l: 130, r: 20, t: 15, b: 55 },
                    xaxis: {
                      title: 'Relative velocity (km/s)',
                      gridcolor: 'rgba(255,255,255,.1)'
                    },
                    yaxis: {
                      ...chartLayout.yaxis,
                      autorange: 'reversed'
                    }
                  }}
                  config={{
                    responsive: true,
                    displayModeBar: false
                  }}
                  style={{ width: '100%' }}
                  useResizeHandler
                />
              </div>
            )}

            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Object</th>
                    <th>Approach date</th>
                    <th>Distance (km)</th>
                    <th>Moon distances</th>
                    <th>Velocity (km/s)</th>
                    <th>Diameter estimate</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.slice(0, 80).map((row, index) => {
                    const km = distanceKm(row);

                    return (
                      <tr key={`${row.des}-${row.cd}-${index}`}>
                        <td>{row.fullname || row.des || 'Unknown object'}</td>
                        <td>{row.cd || '—'}</td>
                        <td>{km == null ? '—' : formatNumber(km)}</td>
                        <td>
                          {km == null
                            ? '—'
                            : formatNumber(km / MOON_DISTANCE_KM, 2)}
                        </td>
                        <td>
                          {velocityValue(row) == null
                            ? '—'
                            : formatNumber(velocityValue(row), 2)}
                        </td>
                        <td>
                          {row.diameter == null || row.diameter === ''
                            ? 'Not provided'
                            : `${row.diameter} km`}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filtered.length === 0 && (
              <div className="state-panel">
                <p>No objects match this search. Try another name or designation.</p>
              </div>
            )}
          </>
        )}

        <p className="disclaimer">
          A close approach does not automatically mean an impact risk.
          The JPL close-approach data used here does not provide a diameter
          for every object. Missing measurements are shown as unavailable,
          not estimated.
        </p>
      </section>

      <section className="section-wrap data-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">MISSION IMAGERY</span>
            <h2>
              Portraits of <em>asteroids.</em>
            </h2>
          </div>

          <a
            className="text-link"
            href="https://science.nasa.gov/solar-system/asteroids/multimedia/"
            target="_blank"
            rel="noreferrer"
          >
            NASA asteroid media <ArrowUpRight size={14} />
          </a>
        </div>

        <AsteroidMediaGallery />

        <div className="filter-bar">
          {ASTEROID_SEARCHES.map((asteroid) => (
            <a
              key={asteroid.name}
              className="text-link"
              href={asteroid.url}
              target="_blank"
              rel="noreferrer"
            >
              Official {asteroid.name} mission <ExternalLink size={13} />
            </a>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <span>ASTEROID OBSERVATORY</span>
        <span>Live data provided by NASA/JPL APIs.</span>
      </footer>
    </main>
  );
}
