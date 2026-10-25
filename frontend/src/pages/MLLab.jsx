
// import React, { useEffect, useState } from 'react';
// import { getAsteroidClusters } from '../services/nasa.js';
// import Plot from 'react-plotly.js';

// const CLUSTER_COLORS = [
//   '#8b7cff',
//   '#48d6c8',
//   '#ffb86b',
//   '#ff729b',
//   '#82b7ff',
//   '#c5e879',
//   '#e6a4ff',
//   '#ffdf75',
// ];

// export default function MLLab() {
//   const [days, setDays] = useState(30);
//   const [clusterCount, setClusterCount] = useState(3);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   async function runClustering() {
//     setLoading(true);
//     setError('');

//     try {
//       const data = await getAsteroidClusters(days, clusterCount);
//       setResult(data);
//     } catch (err) {
//       setError(err.message || 'Unable to load asteroid clusters.');
//       setResult(null);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     runClustering();
//   }, []);

//   const clusterColors = CLUSTER_COLORS;

//   // Create one scatter series for each cluster.
//   const scatterData = result
//     ? Array.from(
//         { length: result.requested_clusters },
//         (_, clusterId) => {
//           const points = result.data.filter(
//             (asteroid) => asteroid.cluster === clusterId
//           );

//           return {
//             x: points.map((asteroid) => asteroid.distance_au),
//             y: points.map(
//               (asteroid) => asteroid.relative_velocity_km_s
//             ),
//             text: points.map(
//               (asteroid) => asteroid.designation || 'Unknown asteroid'
//             ),
//             customdata: points.map((asteroid) => [
//               asteroid.absolute_magnitude,
//               asteroid.close_approach_date || 'Unknown',
//             ]),
//             type: 'scatter',
//             mode: 'markers',
//             name: `Cluster ${clusterId + 1}`,
//             marker: {
//               color: clusterColors[clusterId % clusterColors.length],
//               size: 10,
//               opacity: 0.85,
//               line: {
//                 width: 1,
//                 color: 'rgba(255,255,255,0.25)',
//               },
//             },
//             hovertemplate:
//               '<b>%{text}</b><br>' +
//               'Distance: %{x:.6f} AU<br>' +
//               'Velocity: %{y:.2f} km/s<br>' +
//               'Magnitude: %{customdata[0]}<br>' +
//               'Approach: %{customdata[1]}' +
//               `<extra>Cluster ${clusterId + 1}</extra>`,
//           };
//         }
//       )
//     : [];

//   // Use separate axes because distance and velocity have different units.
//   const comparisonData = result
//     ? [
//         {
//           type: 'bar',
//           name: 'Average distance (AU)',
//           x: result.summaries.map(
//             (cluster) => `Cluster ${cluster.cluster + 1}`
//           ),
//           y: result.summaries.map(
//             (cluster) => cluster.average_distance_au
//           ),
//           marker: { color: '#8b7cff' },
//           hovertemplate:
//             '%{x}<br>Average distance: %{y:.6f} AU<extra></extra>',
//         },
//         {
//           type: 'bar',
//           name: 'Average velocity (km/s)',
//           x: result.summaries.map(
//             (cluster) => `Cluster ${cluster.cluster + 1}`
//           ),
//           y: result.summaries.map(
//             (cluster) => cluster.average_velocity_km_s
//           ),
//           yaxis: 'y2',
//           marker: { color: '#48d6c8' },
//           hovertemplate:
//             '%{x}<br>Average velocity: %{y:.2f} km/s<extra></extra>',
//         },
//       ]
//     : [];

//   const chartLayout = {
//     autosize: true,
//     paper_bgcolor: 'rgba(0,0,0,0)',
//     plot_bgcolor: 'rgba(0,0,0,0)',
//     font: {
//       color: '#d8d8e8',
//       family: 'inherit',
//       size: 12,
//     },
//     hoverlabel: {
//       bgcolor: '#191927',
//       bordercolor: '#45455c',
//       font: { color: '#f2f2ff' },
//     },
//   };

//   return (
//     <main className="ml-lab-page">
//       <section className="ml-lab-header">
//         <p className="ml-script-tagline">
//           Patterns beyond the visible universe
//         </p>

//         <p className="ml-eyebrow">
//           COSMIC ARCHIVE / MACHINE LEARNING
//         </p>

//         <h1>
//           Asteroid <span className="ml-title-accent">ML Lab.</span>
//         </h1>

//         <p>
//           Discover hidden patterns in real NASA/JPL close-approach data.
//           Explore celestial wanderers through the lens of machine learning.
//         </p>
//       </section>

//       <section className="ml-controls">
//         <div>
//           <label htmlFor="ml-days">Observation window</label>
//           <select
//             id="ml-days"
//             value={days}
//             onChange={(event) => setDays(Number(event.target.value))}
//           >
//             <option value={7}>Next 7 days</option>
//             <option value={14}>Next 14 days</option>
//             <option value={30}>Next 30 days</option>
//             <option value={60}>Next 60 days</option>
//             <option value={90}>Next 90 days</option>
//           </select>
//         </div>

//         <div>
//           <label htmlFor="ml-clusters">Number of clusters (K)</label>
//           <select
//             id="ml-clusters"
//             value={clusterCount}
//             onChange={(event) =>
//               setClusterCount(Number(event.target.value))
//             }
//           >
//             {[2, 3, 4, 5, 6, 7, 8].map((number) => (
//               <option key={number} value={number}>
//                 {number} clusters
//               </option>
//             ))}
//           </select>
//         </div>

//         <button
//           type="button"
//           onClick={runClustering}
//           disabled={loading}
//         >
//           {loading ? 'Analyzing...' : 'Run K-Means'}
//         </button>
//       </section>

//       {loading && (
//         <p className="ml-status">
//           Analyzing live asteroid records...
//         </p>
//       )}

//       {error && (
//         <section className="ml-error" role="alert">
//           <h2>Clustering unavailable</h2>
//           <p>{error}</p>
//           <button type="button" onClick={runClustering}>
//             Try again
//           </button>
//         </section>
//       )}

//       {result && !loading && (
//         <>
//           <section className="ml-stats">
//             <article className="ml-stat-card">
//               <span>Records received</span>
//               <strong>{result.records_received}</strong>
//             </article>

//             <article className="ml-stat-card">
//               <span>Records analyzed</span>
//               <strong>{result.records_clustered}</strong>
//             </article>

//             <article className="ml-stat-card">
//               <span>Clusters created</span>
//               <strong>{result.requested_clusters}</strong>
//             </article>
//           </section>

//           <section className="ml-section">
//             <div className="ml-section-heading">
//               <div>
//                 <p className="ml-eyebrow">MODEL OUTPUT</p>
//                 <h2>Cluster profiles</h2>
//               </div>
//               <span className="ml-live-label">NASA/JPL DATA</span>
//             </div>

//             <div className="ml-cluster-grid">
//               {result.summaries.map((cluster) => (
//                 <article
//                   className="ml-cluster-card"
//                   key={cluster.cluster}
//                   style={{
//                     '--cluster-color':
//                       clusterColors[
//                         cluster.cluster % clusterColors.length
//                       ],
//                   }}
//                 >
//                   <div className="ml-cluster-title">
//                     <span className="ml-cluster-dot" />
//                     <h3>Cluster {cluster.cluster + 1}</h3>
//                   </div>

//                   <strong className="ml-cluster-count">
//                     {cluster.count}
//                   </strong>
//                   <span className="ml-muted">
//                     close-approach records
//                   </span>

//                   <dl>
//                     <div>
//                       <dt>Average distance</dt>
//                       <dd>
//                         {cluster.average_distance_au ?? '—'} AU
//                       </dd>
//                     </div>
//                     <div>
//                       <dt>Average velocity</dt>
//                       <dd>
//                         {cluster.average_velocity_km_s ?? '—'} km/s
//                       </dd>
//                     </div>
//                     <div>
//                       <dt>Average magnitude</dt>
//                       <dd>
//                         {cluster.average_absolute_magnitude ?? '—'}
//                       </dd>
//                     </div>
//                   </dl>
//                 </article>
//               ))}
//             </div>
//           </section>

//           {/* Chart 1: Distance versus velocity */}
//           <section className="ml-section">
//             <p className="ml-eyebrow">VISUAL ANALYSIS</p>
//             <h2>Asteroid Cluster Map</h2>
//             <p className="ml-muted">
//               Each color represents a cluster discovered by K-Means.
//               Hover over a point to inspect its measurements.
//             </p>

//             <div className="ml-chart">
//               <Plot
//                 data={scatterData}
//                 layout={{
//                   ...chartLayout,
//                   height: 430,
//                   margin: { t: 25, r: 25, b: 75, l: 75 },
//                   xaxis: {
//                     title: 'Close-approach distance (AU)',
//                     gridcolor: 'rgba(145,145,180,0.15)',
//                     zeroline: false,
//                   },
//                   yaxis: {
//                     title: 'Relative velocity (km/s)',
//                     gridcolor: 'rgba(145,145,180,0.15)',
//                     zeroline: false,
//                   },
//                   legend: {
//                     orientation: 'h',
//                     y: -0.24,
//                   },
//                 }}
//                 config={{
//                   responsive: true,
//                   displaylogo: false,
//                 }}
//                 style={{ width: '100%' }}
//                 useResizeHandler
//               />
//             </div>
//           </section>

//           {/* Chart 2: Compare average distance and velocity */}
//           <section className="ml-section">
//             <p className="ml-eyebrow">GROUP COMPARISON</p>
//             <h2>Average Measurements by Cluster</h2>
//             <p className="ml-muted">
//               Distance and velocity use separate axes because they
//               represent different physical quantities.
//             </p>

//             <div className="ml-chart">
//               <Plot
//                 data={comparisonData}
//                 layout={{
//                   ...chartLayout,
//                   height: 400,
//                   barmode: 'group',
//                   margin: { t: 25, r: 75, b: 70, l: 70 },
//                   xaxis: {
//                     gridcolor: 'rgba(145,145,180,0.15)',
//                   },
//                   yaxis: {
//                     title: 'Average distance (AU)',
//                     gridcolor: 'rgba(145,145,180,0.15)',
//                     rangemode: 'tozero',
//                   },
//                   yaxis2: {
//                     title: 'Average velocity (km/s)',
//                     overlaying: 'y',
//                     side: 'right',
//                     showgrid: false,
//                     rangemode: 'tozero',
//                   },
//                   legend: {
//                     orientation: 'h',
//                     y: -0.22,
//                   },
//                 }}
//                 config={{
//                   responsive: true,
//                   displaylogo: false,
//                 }}
//                 style={{ width: '100%' }}
//                 useResizeHandler
//               />
//             </div>
//           </section>

//           {/* Individual asteroid records */}
//           <section className="ml-section">
//             <p className="ml-eyebrow">INDIVIDUAL RECORDS</p>
//             <h2>Asteroid assignments</h2>

//             <div className="ml-table-wrap">
//               <table className="ml-table">
//                 <thead>
//                   <tr>
//                     <th>Designation</th>
//                     <th>Approach date</th>
//                     <th>Distance (AU)</th>
//                     <th>Velocity (km/s)</th>
//                     <th>Magnitude</th>
//                     <th>Cluster</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {result.data.map((asteroid, index) => (
//                     <tr
//                       key={`${asteroid.designation}-${asteroid.close_approach_date}-${index}`}
//                     >
//                       <td>{asteroid.designation || 'Unknown'}</td>
//                       <td>{asteroid.close_approach_date || '—'}</td>
//                       <td>
//                         {Number(asteroid.distance_au).toFixed(6)}
//                       </td>
//                       <td>
//                         {Number(
//                           asteroid.relative_velocity_km_s
//                         ).toFixed(2)}
//                       </td>
//                       <td>{asteroid.absolute_magnitude}</td>
//                       <td>
//                         <span
//                           className="ml-cluster-tag"
//                           style={{
//                             '--cluster-color':
//                               clusterColors[
//                                 asteroid.cluster % clusterColors.length
//                               ],
//                           }}
//                         >
//                           Cluster {asteroid.cluster + 1}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}

//                   {result.data.length === 0 && (
//                     <tr>
//                       <td colSpan="6">
//                         No usable records found.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </section>

//           <p className="ml-disclaimer">{result.note}</p>
//         </>
//       )}
//     </main>
//   );
// }


import React, { useEffect, useState } from 'react';
import { getAsteroidClusters } from '../services/nasa.js';
import Plot from 'react-plotly.js';

const CLUSTER_COLORS = [
  '#8b7cff',
  '#48d6c8',
  '#ffb86b',
  '#ff729b',
  '#82b7ff',
  '#c5e879',
  '#e6a4ff',
  '#ffdf75',
];

export default function MLLab() {
  const [days, setDays] = useState(30);
  const [clusterCount, setClusterCount] = useState(3);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function runClustering() {
    setLoading(true);
    setError('');

    try {
      const data = await getAsteroidClusters(days, clusterCount);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Unable to load asteroid clusters.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    runClustering();
  }, []);

  const clusterColors = CLUSTER_COLORS;

  // Create one scatter series for each cluster.
  const scatterData = result
    ? Array.from(
        { length: result.requested_clusters },
        (_, clusterId) => {
          const points = result.data.filter(
            (asteroid) => asteroid.cluster === clusterId
          );

          return {
            x: points.map((asteroid) => asteroid.distance_au),
            y: points.map(
              (asteroid) => asteroid.relative_velocity_km_s
            ),
            text: points.map(
              (asteroid) => asteroid.designation || 'Unknown asteroid'
            ),
            customdata: points.map((asteroid) => [
              asteroid.absolute_magnitude,
              asteroid.close_approach_date || 'Unknown',
            ]),
            type: 'scatter',
            mode: 'markers',
            name: `Cluster ${clusterId + 1}`,
            marker: {
              color: clusterColors[clusterId % clusterColors.length],
              size: 10,
              opacity: 0.85,
              line: {
                width: 1,
                color: 'rgba(255,255,255,0.25)',
              },
            },
            hovertemplate:
              '<b>%{text}</b><br>' +
              'Distance: %{x:.6f} AU<br>' +
              'Velocity: %{y:.2f} km/s<br>' +
              'Magnitude: %{customdata[0]}<br>' +
              'Approach: %{customdata[1]}' +
              `<extra>Cluster ${clusterId + 1}</extra>`,
          };
        }
      )
    : [];

  // Use separate axes because distance and velocity have different units.
  const comparisonData = result
    ? [
        {
          type: 'bar',
          name: 'Average distance (AU)',
          x: result.summaries.map(
            (cluster) => `Cluster ${cluster.cluster + 1}`
          ),
          y: result.summaries.map(
            (cluster) => cluster.average_distance_au
          ),
          marker: { color: '#8b7cff' },
          hovertemplate:
            '%{x}<br>Average distance: %{y:.6f} AU<extra></extra>',
        },
        {
          type: 'bar',
          name: 'Average velocity (km/s)',
          x: result.summaries.map(
            (cluster) => `Cluster ${cluster.cluster + 1}`
          ),
          y: result.summaries.map(
            (cluster) => cluster.average_velocity_km_s
          ),
          yaxis: 'y2',
          marker: { color: '#48d6c8' },
          hovertemplate:
            '%{x}<br>Average velocity: %{y:.2f} km/s<extra></extra>',
        },
      ]
    : [];

  const chartLayout = {
    autosize: true,
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: {
      color: '#d8d8e8',
      family: 'inherit',
      size: 12,
    },
    hoverlabel: {
      bgcolor: '#191927',
      bordercolor: '#45455c',
      font: { color: '#f2f2ff' },
    },
  };

  return (
    <main className="ml-lab-page">
      <section className="ml-lab-header">
        <p className="ml-script-tagline">
          Where data meets the cosmos
        </p>

        <p className="ml-eyebrow">
          COSMIC ARCHIVE / MACHINE LEARNING
        </p>

        <h1>
          Asteroid <span className="ml-title-accent">ML Lab.</span>
        </h1>

        <p>
          Discover hidden patterns in real NASA/JPL close-approach data.
          Explore celestial wanderers through the lens of machine learning.
        </p>
      </section>

      <section className="ml-controls">
        <div>
          <label htmlFor="ml-days">Observation window</label>
          <select
            id="ml-days"
            value={days}
            onChange={(event) => setDays(Number(event.target.value))}
          >
            <option value={7}>Next 7 days</option>
            <option value={14}>Next 14 days</option>
            <option value={30}>Next 30 days</option>
            <option value={60}>Next 60 days</option>
            <option value={90}>Next 90 days</option>
          </select>
        </div>

        <div>
          <label htmlFor="ml-clusters">Number of clusters (K)</label>
          <select
            id="ml-clusters"
            value={clusterCount}
            onChange={(event) =>
              setClusterCount(Number(event.target.value))
            }
          >
            {[2, 3, 4, 5, 6, 7, 8].map((number) => (
              <option key={number} value={number}>
                {number} clusters
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={runClustering}
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Run K-Means'}
        </button>
      </section>

      {loading && (
        <p className="ml-status">
          Analyzing live asteroid records...
        </p>
      )}

      {error && (
        <section className="ml-error" role="alert">
          <h2>Clustering unavailable</h2>
          <p>{error}</p>
          <button type="button" onClick={runClustering}>
            Try again
          </button>
        </section>
      )}

      {result && !loading && (
        <>
          <section className="ml-stats">
            <article className="ml-stat-card">
              <span>Records received</span>
              <strong>{result.records_received}</strong>
            </article>

            <article className="ml-stat-card">
              <span>Records analyzed</span>
              <strong>{result.records_clustered}</strong>
            </article>

            <article className="ml-stat-card">
              <span>Clusters created</span>
              <strong>{result.requested_clusters}</strong>
            </article>
          </section>

          <section className="ml-section">
            <div className="ml-section-heading">
              <div>
                <p className="ml-eyebrow">MODEL OUTPUT</p>
                <h2>Cluster profiles</h2>
              </div>
              <span className="ml-live-label">NASA/JPL DATA</span>
            </div>

            <div className="ml-cluster-grid">
              {result.summaries.map((cluster) => (
                <article
                  className="ml-cluster-card"
                  key={cluster.cluster}
                  style={{
                    '--cluster-color':
                      clusterColors[
                        cluster.cluster % clusterColors.length
                      ],
                  }}
                >
                  <div className="ml-cluster-title">
                    <span className="ml-cluster-dot" />
                    <h3>Cluster {cluster.cluster + 1}</h3>
                  </div>

                  <strong className="ml-cluster-count">
                    {cluster.count}
                  </strong>
                  <span className="ml-muted">
                    close-approach records
                  </span>

                  <dl>
                    <div>
                      <dt>Average distance</dt>
                      <dd>
                        {cluster.average_distance_au ?? '—'} AU
                      </dd>
                    </div>
                    <div>
                      <dt>Average velocity</dt>
                      <dd>
                        {cluster.average_velocity_km_s ?? '—'} km/s
                      </dd>
                    </div>
                    <div>
                      <dt>Average magnitude</dt>
                      <dd>
                        {cluster.average_absolute_magnitude ?? '—'}
                      </dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </section>

          {/* Chart 1: Distance versus velocity */}
          <section className="ml-section">
            <p className="ml-eyebrow">VISUAL ANALYSIS</p>
            <h2>Asteroid Cluster Map</h2>
            <p className="ml-muted">
              Each color represents a cluster discovered by K-Means.
              Hover over a point to inspect its measurements.
            </p>

            <div className="ml-chart">
              <Plot
                data={scatterData}
                layout={{
                  ...chartLayout,
                  height: 430,
                  margin: { t: 25, r: 25, b: 75, l: 75 },
                  xaxis: {
                    title: 'Close-approach distance (AU)',
                    gridcolor: 'rgba(145,145,180,0.15)',
                    zeroline: false,
                  },
                  yaxis: {
                    title: 'Relative velocity (km/s)',
                    gridcolor: 'rgba(145,145,180,0.15)',
                    zeroline: false,
                  },
                  legend: {
                    orientation: 'h',
                    y: -0.24,
                  },
                }}
                config={{
                  responsive: true,
                  displaylogo: false,
                }}
                style={{ width: '100%' }}
                useResizeHandler
              />
            </div>
          </section>

          {/* Chart 2: Compare average distance and velocity */}
          <section className="ml-section">
            <p className="ml-eyebrow">GROUP COMPARISON</p>
            <h2>Average Measurements by Cluster</h2>
            <p className="ml-muted">
              Distance and velocity use separate axes because they
              represent different physical quantities.
            </p>

            <div className="ml-chart">
              <Plot
                data={comparisonData}
                layout={{
                  ...chartLayout,
                  height: 400,
                  barmode: 'group',
                  margin: { t: 25, r: 75, b: 70, l: 70 },
                  xaxis: {
                    gridcolor: 'rgba(145,145,180,0.15)',
                  },
                  yaxis: {
                    title: 'Average distance (AU)',
                    gridcolor: 'rgba(145,145,180,0.15)',
                    rangemode: 'tozero',
                  },
                  yaxis2: {
                    title: 'Average velocity (km/s)',
                    overlaying: 'y',
                    side: 'right',
                    showgrid: false,
                    rangemode: 'tozero',
                  },
                  legend: {
                    orientation: 'h',
                    y: -0.22,
                  },
                }}
                config={{
                  responsive: true,
                  displaylogo: false,
                }}
                style={{ width: '100%' }}
                useResizeHandler
              />
            </div>
          </section>

          {/* Individual asteroid records */}
          <section className="ml-section">
            <p className="ml-eyebrow">INDIVIDUAL RECORDS</p>
            <h2>Asteroid assignments</h2>

            <div className="ml-table-wrap">
              <table className="ml-table">
                <thead>
                  <tr>
                    <th>Designation</th>
                    <th>Approach date</th>
                    <th>Distance (AU)</th>
                    <th>Velocity (km/s)</th>
                    <th>Magnitude</th>
                    <th>Cluster</th>
                  </tr>
                </thead>

                <tbody>
                  {result.data.map((asteroid, index) => (
                    <tr
                      key={`${asteroid.designation}-${asteroid.close_approach_date}-${index}`}
                    >
                      <td>{asteroid.designation || 'Unknown'}</td>
                      <td>{asteroid.close_approach_date || '—'}</td>
                      <td>
                        {Number(asteroid.distance_au).toFixed(6)}
                      </td>
                      <td>
                        {Number(
                          asteroid.relative_velocity_km_s
                        ).toFixed(2)}
                      </td>
                      <td>{asteroid.absolute_magnitude}</td>
                      <td>
                        <span
                          className="ml-cluster-tag"
                          style={{
                            '--cluster-color':
                              clusterColors[
                                asteroid.cluster % clusterColors.length
                              ],
                          }}
                        >
                          Cluster {asteroid.cluster + 1}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {result.data.length === 0 && (
                    <tr>
                      <td colSpan="6">
                        No usable records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <p className="ml-disclaimer">{result.note}</p>
        </>
      )}
    </main>
  );
}
