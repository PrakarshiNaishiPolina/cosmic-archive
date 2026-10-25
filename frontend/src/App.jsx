// import React, { useState } from 'react';
// import TopNav from './components/TopNav.jsx';
// import Home from './pages/Home.jsx';
// import Asteroids from './pages/Asteroids.jsx';
// import Images from './pages/Images.jsx';
// import Mars from './pages/Mars.jsx';
// import MLLab from './pages/MLLab.jsx';
// import SolarSystem from './pages/SolarSystem.jsx';
// import { ArrowUpRight } from 'lucide-react';

// export default function App() {
//   const [page, setPage] = useState('home');

//   const pages = {
//     home: <Home setPage={setPage} />,
//     asteroids: <Asteroids />,
//     images: <Images />,
//     mars: <Mars />,
//     'ml-lab': <MLLab />,
//     'solar-system': <SolarSystem />,
//   };

//   return (
//     <div className={`app-shell active-${page}`}>
//       <TopNav page={page} setPage={setPage} />

//       {pages[page] || <Home setPage={setPage} />}

//       <a
//         className="source-pill"
//         href="https://www.nasa.gov/"
//         target="_blank"
//         rel="noreferrer"
//       >
//         BUILT AROUND NASA DATA <ArrowUpRight size={12} />
//       </a>
//     </div>
//   );
// }


import React, { useState } from 'react';
import TopNav from './components/TopNav.jsx';
import Home from './pages/Home.jsx';
import Asteroids from './pages/Asteroids.jsx';
import Images from './pages/Images.jsx';
import Mars from './pages/Mars.jsx';
import MLLab from './pages/MLLab.jsx';
import SolarSystem from './pages/SolarSystem.jsx';
import Favorites from './pages/Favorites.jsx';
import { FavoritesProvider } from './context/FavoritesContext.jsx';
import { ArrowUpRight } from 'lucide-react';

export default function App() {
  const [page, setPage] = useState('home');

  const pages = {
    home: <Home setPage={setPage} />,
    asteroids: <Asteroids />,
    images: <Images />,
    mars: <Mars />,
    'ml-lab': <MLLab />,
    'solar-system': <SolarSystem />,
    favorites: <Favorites setPage={setPage} />
  };

  return (
    <FavoritesProvider>
      <div className={`app-shell active-${page}`}>
        <TopNav page={page} setPage={setPage} />

        {pages[page] || <Home setPage={setPage} />}

        <a
          className="source-pill"
          href="https://www.nasa.gov/"
          target="_blank"
          rel="noreferrer"
        >
          BUILT AROUND NASA DATA <ArrowUpRight size={12} />
        </a>
      </div>
    </FavoritesProvider>
  );
}
