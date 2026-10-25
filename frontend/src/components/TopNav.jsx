
// // import React from 'react';
// // import {
// //   Orbit,
// //   Telescope,
// //   Image,
// //   Globe2,
// //   Radio,
// //   Menu,
// //   BrainCircuit,
// // } from 'lucide-react';

// // const items = [
// //   ['home', 'NASA Universe', Globe2],
// //   ['asteroids', 'Asteroids', Orbit],
// //   ['images', 'Image Explorer', Image],
// //   ['mars', 'Mars Expedition', Telescope],
// //   ['ml-lab', 'ML Lab', BrainCircuit],
// // ];

// // export default function TopNav({ page, setPage }) {
// //   return (
// //     <header className="topnav">
// //       <button
// //         className="brand"
// //         onClick={() => setPage('home')}
// //         aria-label="Cosmic Archive home"
// //       >
// //         <span className="brand-mark">
// //           <Orbit size={20} />
// //         </span>
// //         <span>
// //           COSMIC<span className="brand-light"> ARCHIVE</span>
// //         </span>
// //       </button>

// //       <nav className="nav-links" aria-label="Main navigation">
// //         {items.map(([id, label, Icon]) => (
// //           <button
// //             key={id}
// //             className={`nav-link ${page === id ? 'active' : ''}`}
// //             onClick={() => setPage(id)}
// //           >
// //             <Icon size={15} />
// //             <span>{label}</span>
// //           </button>
// //         ))}
// //       </nav>

// //       <a
// //         className="nav-status"
// //         href="https://www.nasa.gov/"
// //         target="_blank"
// //         rel="noreferrer"
// //       >
// //         <Radio size={14} />
// //         NASA SOURCE
// //         <span className="status-dot" />
// //       </a>

// //       <button className="mobile-menu" aria-label="Menu">
// //         <Menu />
// //       </button>
// //     </header>
// //   );
// // }
// import React from 'react';
// import {
//   Orbit,
//   Telescope,
//   Image,
//   Globe2,
//   Radio,
//   Menu,
//   BrainCircuit,
//   Orbit as SolarSystemIcon,
// } from 'lucide-react';

// const items = [
//   ['home', 'NASA Universe', Globe2],
//   ['asteroids', 'Asteroids', Orbit],
//   ['images', 'Image Explorer', Image],
//   ['mars', 'Mars Expedition', Telescope],
//   ['ml-lab', 'ML Lab', BrainCircuit],
//   ['solar-system', 'Solar System', SolarSystemIcon],
// ];

// export default function TopNav({ page, setPage }) {
//   return (
//     <header className="topnav">
//       <button
//         className="brand"
//         onClick={() => setPage('home')}
//         aria-label="Cosmic Archive home"
//       >
//         <span className="brand-mark">
//           <Orbit size={20} />
//         </span>
//         <span>
//           COSMIC<span className="brand-light"> ARCHIVE</span>
//         </span>
//       </button>

//       <nav className="nav-links" aria-label="Main navigation">
//         {items.map(([id, label, Icon]) => (
//           <button
//             key={id}
//             className={`nav-link ${page === id ? 'active' : ''}`}
//             onClick={() => setPage(id)}
//           >
//             <Icon size={15} />
//             <span>{label}</span>
//           </button>
//         ))}
//       </nav>

//       <a
//         className="nav-status"
//         href="https://www.nasa.gov/"
//         target="_blank"
//         rel="noreferrer"
//       >
//         <Radio size={14} />
//         NASA SOURCE
//         <span className="status-dot" />
//       </a>

//       <button className="mobile-menu" aria-label="Menu">
//         <Menu />
//       </button>
//     </header>
//   );
// }


import React from 'react';
import {
  Orbit,
  Telescope,
  Image,
  Globe2,
  Radio,
  Menu,
  BrainCircuit,
  Heart
} from 'lucide-react';

const items = [
  ['home', 'NASA Universe', Globe2],
  ['asteroids', 'Asteroids', Orbit],
  ['images', 'Image Explorer', Image],
  ['mars', 'Mars Expedition', Telescope],
  ['ml-lab', 'ML Lab', BrainCircuit],
  ['solar-system', 'Solar System', Orbit],
  ['favorites', 'Favorites', Heart]
];

export default function TopNav({ page, setPage }) {
  return (
    <header className="topnav">
      <button
        className="brand"
        onClick={() => setPage('home')}
        aria-label="Cosmic Archive home"
      >
        <span className="brand-mark">
          <Orbit size={20} />
        </span>
        <span>
          COSMIC<span className="brand-light"> ARCHIVE</span>
        </span>
      </button>

      <nav className="nav-links" aria-label="Main navigation">
        {items.map(([id, label, Icon]) => (
          <button
            key={id}
            className={`nav-link ${page === id ? 'active' : ''}`}
            onClick={() => setPage(id)}
            aria-current={page === id ? 'page' : undefined}
          >
            <Icon size={15} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <a
        className="nav-status"
        href="https://www.nasa.gov/"
        target="_blank"
        rel="noreferrer"
      >
        <Radio size={14} />
        NASA SOURCE
        <span className="status-dot" />
      </a>

      <button
        className="mobile-menu"
        aria-label="Menu"
        onClick={() => setPage('favorites')}
        title="Open Favorites"
      >
        <Menu />
      </button>
    </header>
  );
}
