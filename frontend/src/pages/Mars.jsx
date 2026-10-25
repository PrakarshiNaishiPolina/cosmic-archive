
// import React, { useEffect, useState } from 'react';
// import {
//   ArrowUpRight,
//   ExternalLink,
//   Radio,
//   Telescope,
//   Orbit,
//   Radar,
//   Mountain,
//   Sparkles,
//   RefreshCw,
//   Thermometer,
//   Clock3,
//   Globe2,
//   Camera,
// } from 'lucide-react';
// import { searchNasaMedia } from '../services/nasa.js';
// import MediaGallery from '../components/MediaGallery.jsx';
// import MarsWeatherDashboard from '../components/MarsWeatherDashboard.jsx';

// const expeditions = [
//   {
//     id: 'perseverance',
//     number: '01',
//     icon: Radio,
//     status: 'ROVER EXPLORATION',
//     name: 'The Surface Seekers',
//     subtitle: 'Hunting for traces of ancient life',
//     description:
//       'Explore ancient river deltas and weathered rocks in the search for clues to Mars’ watery past.',
//     color: 'expedition-red',
//     query: 'Perseverance rover Mars surface',
//     link: 'https://science.nasa.gov/mission/mars-2020-perseverance/',
//   },
//   {
//     id: 'curiosity',
//     number: '02',
//     icon: Mountain,
//     status: 'GEOLOGY FRONTIER',
//     name: 'The Mountain Files',
//     subtitle: 'Reading the planet’s ancient layers',
//     description:
//       'Investigate Gale Crater and Mount Sharp to understand how the Martian environment changed.',
//     color: 'expedition-gold',
//     query: 'Curiosity rover Mount Sharp Mars',
//     link: 'https://science.nasa.gov/mission/msl-curiosity/',
//   },
//   {
//     id: 'orbiter',
//     number: '03',
//     icon: Radar,
//     status: 'ORBITAL INTELLIGENCE',
//     name: 'The Orbital Watch',
//     subtitle: 'Mapping a world from above',
//     description:
//       'Explore craters, dusty plains and dramatic terrain captured by spacecraft observing Mars from orbit.',
//     color: 'expedition-blue',
//     query: 'Mars Reconnaissance Orbiter Mars surface',
//     link: 'https://science.nasa.gov/mission/mars-reconnaissance-orbiter/',
//   },
// ];

// const discoveries = [
//   {
//     icon: Clock3,
//     value: '24h 37m',
//     label: 'ONE MARTIAN DAY',
//     detail: 'A Martian day is called a sol.',
//   },
//   {
//     icon: Thermometer,
//     value: '−63°C',
//     label: 'AVERAGE TEMPERATURE',
//     detail: 'A commonly cited average; actual temperatures vary widely.',
//   },
//   {
//     icon: Globe2,
//     value: '2 MOONS',
//     label: 'CELESTIAL COMPANIONS',
//     detail: 'Phobos and Deimos orbit the Red Planet.',
//   },
//   {
//     icon: Orbit,
//     value: '4TH',
//     label: 'PLANET FROM THE SUN',
//     detail: 'Mars is a rocky planet beyond Earth.',
//   },
// ];

// export default function Mars() {
//   const [media, setMedia] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [selectedMission, setSelectedMission] = useState('perseverance');
//   const [imagePage, setImagePage] = useState(1);

//   const activeMission =
//     expeditions.find((mission) => mission.id === selectedMission) ||
//     expeditions[0];

//   async function loadMissionImages(mission = activeMission, page = 1, append = false) {
//     setLoading(true);
//     setError('');

//     try {
//       const results = await searchNasaMedia(
//         mission.query,
//         'image',
//         page
//       );

//       setMedia((previous) => {
//         if (!append) return results.slice(0, 9);

//         const existing = new Set(previous.map((item) => item.id));
//         const newItems = results.filter((item) => !existing.has(item.id));

//         return [...previous, ...newItems];
//       });

//       setImagePage(page);
//     } catch (err) {
//       console.error('Mars imagery error:', err);
//       setError(
//         'Mars imagery could not be loaded. Check that your backend is running and try again.'
//       );

//       if (!append) setMedia([]);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     loadMissionImages(expeditions[0], 1);
//   }, []);

//   function chooseMission(mission) {
//     if (mission.id === selectedMission && !error) return;

//     setSelectedMission(mission.id);
//     setImagePage(1);
//     loadMissionImages(mission, 1);
//   }

//   return (
//     <main className="page page-mars theme-mars">
//       <section className="hero sub-hero mars-hero">
//         <div className="hero-overlay" />

//         <div className="hero-content">
//           <span className="script-label">Somewhere beyond Earth</span>
//           <span className="eyebrow hero-eyebrow">
//             EXPEDITION MARS · FIELD LOG
//           </span>

//           <h1>
//             Another world.
//             <br />
//             <em>Another story.</em>
//           </h1>

//           <p className="hero-copy">
//             Dust storms, lost rivers, alien horizons. Explore the missions
//             and images helping us understand the Red Planet.
//           </p>

//           <a
//             className="button button-light"
//             href="https://science.nasa.gov/mars/"
//             target="_blank"
//             rel="noreferrer"
//           >
//             Begin the expedition <ArrowUpRight size={16} />
//           </a>
//         </div>

//         <div className="mars-stamp">
//           <Orbit size={26} />
//           <span>
//             TARGET: MARS
//             <br />
//             DESTINATION: 4TH PLANET
//           </span>
//         </div>
//       </section>

//       <section className="section-wrap data-section">
//         <div className="section-heading">
//           <div>
//             <span className="eyebrow">CHOOSE YOUR MISSION</span>
//             <h2>
//               Three paths.
//               <br />
//               <em>One red planet.</em>
//             </h2>
//           </div>

//           <span className="text-link">
//             <Sparkles size={14} /> EXPLORE THE UNKNOWN
//           </span>
//         </div>

//         <div className="mission-grid">
//           {expeditions.map((mission) => {
//             const MissionIcon = mission.icon;
//             const isActive = selectedMission === mission.id;

//             return (
//               <article
//                 className={`mission-card ${mission.color} ${
//                   isActive ? 'mars-mission-active' : ''
//                 }`}
//                 key={mission.id}
//               >
//                 <div className="mission-number">{mission.number}</div>

//                 <MissionIcon size={27} strokeWidth={1.5} />

//                 <span className="eyebrow">{mission.status}</span>
//                 <h3>{mission.name}</h3>

//                 <p>
//                   <strong>{mission.subtitle}</strong>
//                 </p>

//                 <p>{mission.description}</p>

//                 <button
//                   type="button"
//                   className="text-link mars-explore-button"
//                   onClick={() => chooseMission(mission)}
//                   disabled={loading && isActive}
//                 >
//                   {isActive ? 'Mission selected' : 'Explore this mission'}
//                   <ArrowUpRight size={13} />
//                 </button>

//                 <a
//                   className="text-link mars-official-link"
//                   href={mission.link}
//                   target="_blank"
//                   rel="noreferrer"
//                 >
//                   Official mission page <ExternalLink size={13} />
//                 </a>
//               </article>
//             );
//           })}
//         </div>
//       </section>

//       <section className="mars-facts">
//         <div className="section-wrap">
//           <span className="eyebrow">FIELD INTELLIGENCE</span>

//           <h2>
//             Not just a planet.
//             <br />
//             <em>A world of mysteries.</em>
//           </h2>

//           <div className="fact-grid">
//             {discoveries.map((fact, index) => {
//               const FactIcon = fact.icon;

//               return (
//                 <div key={fact.label}>
//                   <span>0{index + 1}</span>
//                   <FactIcon size={21} />
//                   <strong>{fact.value}</strong>
//                   <small>{fact.label}</small>
//                   <p>{fact.detail}</p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* Historical Mars weather dashboard */}
//       <MarsWeatherDashboard />

//       <section className="section-wrap data-section mars-data-lab">
//         <div className="section-heading">
//           <div>
//             <span className="eyebrow">MARS DATA LAB</span>
//             <h2>
//               Science beyond
//               <br />
//               <em>the surface.</em>
//             </h2>
//           </div>

//           <span className="text-link">
//             <Radio size={14} /> MISSION RESEARCH
//           </span>
//         </div>

//         <div className="mars-lab-grid">
//           <article className="mars-lab-card">
//             <span className="mars-lab-icon">
//               <Camera size={22} />
//             </span>
//             <span className="eyebrow">IMAGE INVESTIGATION</span>
//             <h3>Explore real mission imagery</h3>
//             <p>
//               Search NASA’s image archive for rover landscapes, geological
//               features and spacecraft observations.
//             </p>
//             <button
//               className="text-link"
//               onClick={() =>
//                 document
//                   .getElementById('mars-image-explorer')
//                   ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
//               }
//             >
//               Open image explorer <ArrowUpRight size={13} />
//             </button>
//           </article>

//           <article className="mars-lab-card">
//             <span className="mars-lab-icon">
//               <Thermometer size={22} />
//             </span>
//             <span className="eyebrow">ATMOSPHERIC SCIENCE</span>
//             <h3>Understand Martian weather</h3>
//             <p>
//               Mars weather observations include temperature, pressure and
//               wind. Historical InSight measurements should not be mistaken
//               for current conditions.
//             </p>
//             <a
//               className="text-link"
//               href="https://science.nasa.gov/mission/insight/"
//               target="_blank"
//               rel="noreferrer"
//             >
//               Read about InSight <ExternalLink size={13} />
//             </a>
//           </article>

//           <article className="mars-lab-card">
//             <span className="mars-lab-icon">
//               <Mountain size={22} />
//             </span>
//             <span className="eyebrow">PLANETARY GEOLOGY</span>
//             <h3>Read the ancient landscape</h3>
//             <p>
//               Craters, layered rocks and ancient river-delta features help
//               scientists investigate Mars’ geological history.
//             </p>
//             <a
//               className="text-link"
//               href="https://science.nasa.gov/mars/"
//               target="_blank"
//               rel="noreferrer"
//             >
//               Explore Mars science <ExternalLink size={13} />
//             </a>
//           </article>
//         </div>

//         <p className="mars-data-note">
//           Data note: this page currently retrieves NASA archive imagery.
//           The weather and geology panels are educational information, not
//           a live sensor feed.
//         </p>
//       </section>

//       <section
//         className="section-wrap data-section"
//         id="mars-image-explorer"
//       >
//         <div className="section-heading">
//           <div>
//             <span className="eyebrow">TRANSMISSIONS FROM MARS</span>
//             <h2>
//               The planet,
//               <br />
//               <em>unfiltered.</em>
//             </h2>
//           </div>

//           <a
//             className="text-link"
//             href="https://images.nasa.gov/"
//             target="_blank"
//             rel="noreferrer"
//           >
//             Browse NASA archive <ExternalLink size={14} />
//           </a>
//         </div>

//         <p className="hero-copy">
//           Browse NASA archive results for the selected mission. Each search
//           uses the existing NASA Image and Video Library integration.
//         </p>

//         <div className="mars-gallery-toolbar">
//           <div>
//             <span className="eyebrow">CURRENT MISSION</span>
//             <h3>{activeMission.name}</h3>
//             <p>{activeMission.subtitle}</p>
//           </div>

//           <button
//             type="button"
//             className="button button-ghost"
//             onClick={() => loadMissionImages(activeMission, 1)}
//             disabled={loading}
//           >
//             <RefreshCw size={14} />
//             {loading ? 'Loading imagery…' : 'Refresh images'}
//           </button>
//         </div>

//         <MediaGallery
//           items={media}
//           loading={loading}
//           error={error}
//           onLoadMore={() =>
//             loadMissionImages(activeMission, imagePage + 1, true)
//           }
//         />

//         {error && (
//           <button
//             className="button button-ghost mars-retry"
//             type="button"
//             onClick={() => loadMissionImages(activeMission, 1)}
//             disabled={loading}
//           >
//             <RefreshCw size={14} /> Try again
//           </button>
//         )}
//       </section>

//       <section className="section-wrap mars-note">
//         <Telescope size={24} />

//         <div>
//           <h3>Your next destination is out there.</h3>
//           <p>
//             Follow NASA’s Mars missions for discoveries, rover updates and
//             new views of the Red Planet.
//           </p>
//         </div>

//         <a
//           className="button button-ghost"
//           href="https://science.nasa.gov/mars/"
//           target="_blank"
//           rel="noreferrer"
//         >
//           Follow the mission <ArrowUpRight size={14} />
//         </a>
//       </section>

//       <footer className="site-footer">
//         <span>EXPEDITION MARS</span>
//         <span>Real missions. Real discoveries. Another world.</span>
//       </footer>
//     </main>
//   );
// }




import React, { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  ExternalLink,
  Radio,
  Telescope,
  Orbit,
  Radar,
  Mountain,
  Sparkles,
  RefreshCw,
  Thermometer,
  Clock3,
  Globe2,
  Camera,
} from 'lucide-react';
import { searchNasaMedia } from '../services/nasa.js';
import MediaGallery from '../components/MediaGallery.jsx';
import MarsWeatherDashboard from '../components/MarsWeatherDashboard.jsx';
import MarsGeologyExplorer from '../components/MarsGeologyExplorer.jsx';

const expeditions = [
  {
    id: 'perseverance',
    number: '01',
    icon: Radio,
    status: 'ROVER EXPLORATION',
    name: 'The Surface Seekers',
    subtitle: 'Hunting for traces of ancient life',
    description:
      'Explore ancient river deltas and weathered rocks in the search for clues to Mars’ watery past.',
    color: 'expedition-red',
    query: 'Perseverance rover Mars surface',
    link: 'https://science.nasa.gov/mission/mars-2020-perseverance/',
  },
  {
    id: 'curiosity',
    number: '02',
    icon: Mountain,
    status: 'GEOLOGY FRONTIER',
    name: 'The Mountain Files',
    subtitle: 'Reading the planet’s ancient layers',
    description:
      'Investigate Gale Crater and Mount Sharp to understand how the Martian environment changed.',
    color: 'expedition-gold',
    query: 'Curiosity rover Mount Sharp Mars',
    link: 'https://science.nasa.gov/mission/msl-curiosity/',
  },
  {
    id: 'orbiter',
    number: '03',
    icon: Radar,
    status: 'ORBITAL INTELLIGENCE',
    name: 'The Orbital Watch',
    subtitle: 'Mapping a world from above',
    description:
      'Explore craters, dusty plains and dramatic terrain captured by spacecraft observing Mars from orbit.',
    color: 'expedition-blue',
    query: 'Mars Reconnaissance Orbiter Mars surface',
    link: 'https://science.nasa.gov/mission/mars-reconnaissance-orbiter/',
  },
];

const discoveries = [
  {
    icon: Clock3,
    value: '24h 37m',
    label: 'ONE MARTIAN DAY',
    detail: 'A Martian day is called a sol.',
  },
  {
    icon: Thermometer,
    value: '−63°C',
    label: 'AVERAGE TEMPERATURE',
    detail: 'A commonly cited average; actual temperatures vary widely.',
  },
  {
    icon: Globe2,
    value: '2 MOONS',
    label: 'CELESTIAL COMPANIONS',
    detail: 'Phobos and Deimos orbit the Red Planet.',
  },
  {
    icon: Orbit,
    value: '4TH',
    label: 'PLANET FROM THE SUN',
    detail: 'Mars is a rocky planet beyond Earth.',
  },
];

export default function Mars() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMission, setSelectedMission] = useState('perseverance');
  const [imagePage, setImagePage] = useState(1);

  const activeMission =
    expeditions.find((mission) => mission.id === selectedMission) ||
    expeditions[0];

  async function loadMissionImages(mission = activeMission, page = 1, append = false) {
    setLoading(true);
    setError('');

    try {
      const results = await searchNasaMedia(
        mission.query,
        'image',
        page
      );

      setMedia((previous) => {
        if (!append) return results.slice(0, 9);

        const existing = new Set(previous.map((item) => item.id));
        const newItems = results.filter((item) => !existing.has(item.id));

        return [...previous, ...newItems];
      });

      setImagePage(page);
    } catch (err) {
      console.error('Mars imagery error:', err);
      setError(
        'Mars imagery could not be loaded. Check that your backend is running and try again.'
      );

      if (!append) setMedia([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMissionImages(expeditions[0], 1);
  }, []);

  function chooseMission(mission) {
    if (mission.id === selectedMission && !error) return;

    setSelectedMission(mission.id);
    setImagePage(1);
    loadMissionImages(mission, 1);
  }

  return (
    <main className="page page-mars theme-mars">
      <section className="hero sub-hero mars-hero">
        <div className="hero-overlay" />

        <div className="hero-content">
          <span className="script-label">Somewhere beyond Earth</span>
          <span className="eyebrow hero-eyebrow">
            EXPEDITION MARS · FIELD LOG
          </span>

          <h1>
            Another world.
            <br />
            <em>Another story.</em>
          </h1>

          <p className="hero-copy">
            Dust storms, lost rivers, alien horizons. Explore the missions
            and images helping us understand the Red Planet.
          </p>

          <a
            className="button button-light"
            href="https://science.nasa.gov/mars/"
            target="_blank"
            rel="noreferrer"
          >
            Begin the expedition <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="mars-stamp">
          <Orbit size={26} />
          <span>
            TARGET: MARS
            <br />
            DESTINATION: 4TH PLANET
          </span>
        </div>
      </section>

      <section className="section-wrap data-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">CHOOSE YOUR MISSION</span>
            <h2>
              Three paths.
              <br />
              <em>One red planet.</em>
            </h2>
          </div>

          <span className="text-link">
            <Sparkles size={14} /> EXPLORE THE UNKNOWN
          </span>
        </div>

        <div className="mission-grid">
          {expeditions.map((mission) => {
            const MissionIcon = mission.icon;
            const isActive = selectedMission === mission.id;

            return (
              <article
                className={`mission-card ${mission.color} ${
                  isActive ? 'mars-mission-active' : ''
                }`}
                key={mission.id}
              >
                <div className="mission-number">{mission.number}</div>

                <MissionIcon size={27} strokeWidth={1.5} />

                <span className="eyebrow">{mission.status}</span>
                <h3>{mission.name}</h3>

                <p>
                  <strong>{mission.subtitle}</strong>
                </p>

                <p>{mission.description}</p>

                <button
                  type="button"
                  className="text-link mars-explore-button"
                  onClick={() => chooseMission(mission)}
                  disabled={loading && isActive}
                >
                  {isActive ? 'Mission selected' : 'Explore this mission'}
                  <ArrowUpRight size={13} />
                </button>

                <a
                  className="text-link mars-official-link"
                  href={mission.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  Official mission page <ExternalLink size={13} />
                </a>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mars-facts">
        <div className="section-wrap">
          <span className="eyebrow">FIELD INTELLIGENCE</span>

          <h2>
            Not just a planet.
            <br />
            <em>A world of mysteries.</em>
          </h2>

          <div className="fact-grid">
            {discoveries.map((fact, index) => {
              const FactIcon = fact.icon;

              return (
                <div key={fact.label}>
                  <span>0{index + 1}</span>
                  <FactIcon size={21} />
                  <strong>{fact.value}</strong>
                  <small>{fact.label}</small>
                  <p>{fact.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Historical Mars weather dashboard */}
      <MarsWeatherDashboard />

      <MarsGeologyExplorer />

      <section className="section-wrap data-section mars-data-lab">
        <div className="section-heading">
          <div>
            <span className="eyebrow">MARS DATA LAB</span>
            <h2>
              Science beyond
              <br />
              <em>the surface.</em>
            </h2>
          </div>

          <span className="text-link">
            <Radio size={14} /> MISSION RESEARCH
          </span>
        </div>

        <div className="mars-lab-grid">
          <article className="mars-lab-card">
            <span className="mars-lab-icon">
              <Camera size={22} />
            </span>
            <span className="eyebrow">IMAGE INVESTIGATION</span>
            <h3>Explore real mission imagery</h3>
            <p>
              Search NASA’s image archive for rover landscapes, geological
              features and spacecraft observations.
            </p>
            <button
              className="text-link"
              onClick={() =>
                document
                  .getElementById('mars-image-explorer')
                  ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            >
              Open image explorer <ArrowUpRight size={13} />
            </button>
          </article>

          <article className="mars-lab-card">
            <span className="mars-lab-icon">
              <Thermometer size={22} />
            </span>
            <span className="eyebrow">ATMOSPHERIC SCIENCE</span>
            <h3>Understand Martian weather</h3>
            <p>
              Mars weather observations include temperature, pressure and
              wind. Historical InSight measurements should not be mistaken
              for current conditions.
            </p>
            <a
              className="text-link"
              href="https://science.nasa.gov/mission/insight/"
              target="_blank"
              rel="noreferrer"
            >
              Read about InSight <ExternalLink size={13} />
            </a>
          </article>

          <article className="mars-lab-card">
            <span className="mars-lab-icon">
              <Mountain size={22} />
            </span>
            <span className="eyebrow">PLANETARY GEOLOGY</span>
            <h3>Read the ancient landscape</h3>
            <p>
              Craters, layered rocks and ancient river-delta features help
              scientists investigate Mars’ geological history.
            </p>
            <a
              className="text-link"
              href="https://science.nasa.gov/mars/"
              target="_blank"
              rel="noreferrer"
            >
              Explore Mars science <ExternalLink size={13} />
            </a>
          </article>
        </div>

        <p className="mars-data-note">
          Data note: this page currently retrieves NASA archive imagery.
          The weather and geology panels are educational information, not
          a live sensor feed.
        </p>
      </section>

      <section
        className="section-wrap data-section"
        id="mars-image-explorer"
      >
        <div className="section-heading">
          <div>
            <span className="eyebrow">TRANSMISSIONS FROM MARS</span>
            <h2>
              The planet,
              <br />
              <em>unfiltered.</em>
            </h2>
          </div>

          <a
            className="text-link"
            href="https://images.nasa.gov/"
            target="_blank"
            rel="noreferrer"
          >
            Browse NASA archive <ExternalLink size={14} />
          </a>
        </div>

        <p className="hero-copy">
          Browse NASA archive results for the selected mission. Each search
          uses the existing NASA Image and Video Library integration.
        </p>

        <div className="mars-gallery-toolbar">
          <div>
            <span className="eyebrow">CURRENT MISSION</span>
            <h3>{activeMission.name}</h3>
            <p>{activeMission.subtitle}</p>
          </div>

          <button
            type="button"
            className="button button-ghost"
            onClick={() => loadMissionImages(activeMission, 1)}
            disabled={loading}
          >
            <RefreshCw size={14} />
            {loading ? 'Loading imagery…' : 'Refresh images'}
          </button>
        </div>

        <MediaGallery
          items={media}
          loading={loading}
          error={error}
          onLoadMore={() =>
            loadMissionImages(activeMission, imagePage + 1, true)
          }
        />

        {error && (
          <button
            className="button button-ghost mars-retry"
            type="button"
            onClick={() => loadMissionImages(activeMission, 1)}
            disabled={loading}
          >
            <RefreshCw size={14} /> Try again
          </button>
        )}
      </section>

      <section className="section-wrap mars-note">
        <Telescope size={24} />

        <div>
          <h3>Your next destination is out there.</h3>
          <p>
            Follow NASA’s Mars missions for discoveries, rover updates and
            new views of the Red Planet.
          </p>
        </div>

        <a
          className="button button-ghost"
          href="https://science.nasa.gov/mars/"
          target="_blank"
          rel="noreferrer"
        >
          Follow the mission <ArrowUpRight size={14} />
        </a>
      </section>

      <footer className="site-footer">
        <span>EXPEDITION MARS</span>
        <span>Real missions. Real discoveries. Another world.</span>
      </footer>
    </main>
  );
}
