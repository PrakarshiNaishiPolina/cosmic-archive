// // import React, { useEffect, useState } from 'react';
// // import { ArrowUpRight, Image as ImageIcon, Search, SlidersHorizontal } from 'lucide-react';
// // import { searchNasaMedia } from '../services/nasa.js';
// // import MediaGallery from '../components/MediaGallery.jsx';

// // const topics = ['nebula','galaxy','Jupiter','Saturn','Moon','Earth from space','Hubble','James Webb','Apollo','spacewalk','rocket launch','Mars rover'];
// // export default function Images() {
// //   const [query, setQuery] = useState('nebula');
// //   const [draft, setDraft] = useState('nebula');
// //   const [type, setType] = useState('image');
// //   const [items, setItems] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');
// //   const [page, setPage] = useState(1);
// //   const runSearch = async (term=query, mediaType=type, pageNum=1, append=false) => {
// //     setLoading(true); setError('');
// //     try {
// //       const result = await searchNasaMedia(term, mediaType, pageNum);
// //       setItems(prev => append ? [...prev, ...result] : result);
// //       setQuery(term); setDraft(term); setType(mediaType); setPage(pageNum);
// //     } catch { setError('Could not reach NASA’s image archive. Check your connection and retry.'); if(!append) setItems([]); }
// //     finally { setLoading(false); }
// //   };
// //   useEffect(() => { runSearch('nebula','image',1); }, []);
// //   return <main className="page page-images theme-images">
// //     <section className="hero sub-hero image-hero">
// //       <div className="hero-overlay"/>
// //       <div className="hero-content">
// //         <span className="script-label">A library without an edge</span>
// //         <span className="eyebrow hero-eyebrow">NASA IMAGE & VIDEO ARCHIVE</span>
// //         <h1>Worlds within<br/><em>wonder.</em></h1>
// //         <p className="hero-copy">Search real photographs, videos and mission media from across NASA's extraordinary archive.</p>
// //         <div className="archive-search"><Search size={18}/><input value={draft} onChange={e=>setDraft(e.target.value)} onKeyDown={e=>e.key==='Enter'&&runSearch(draft,type,1)} placeholder="Try “Saturn”, “nebula” or “Apollo”…"/><button onClick={()=>runSearch(draft,type,1)}>Search archive</button></div>
// //       </div>
// //       <div className="image-hero-note"><ImageIcon size={17}/><span>REAL NASA MEDIA<br/><small>Source links on every card</small></span></div>
// //     </section>
// //     <section className="section-wrap data-section">
// //       <div className="section-heading"><div><span className="eyebrow">EXPLORE BY SUBJECT</span><h2>Find your <em>universe.</em></h2></div><label className="select-field"><SlidersHorizontal size={15}/><select value={type} onChange={e=>runSearch(query,e.target.value,1)}><option value="image">Images</option><option value="video">Videos</option><option value="audio">Audio</option></select></label></div>
// //       <div className="topic-chips">{topics.map(t=><button key={t} className={`topic-chip ${query===t?'selected':''}`} onClick={()=>runSearch(t,type,1)}>{t}</button>)}</div>
// //       <div className="gallery-status"><span>{loading ? 'Searching the NASA archive…' : `Showing ${items.length} results for “${query}”`}</span><a href="https://images.nasa.gov/" target="_blank" rel="noreferrer">Official archive <ArrowUpRight size={13}/></a></div>
// //       <MediaGallery items={items} loading={loading} error={error} onLoadMore={()=>runSearch(query,type,page+1,true)}/>
// //     </section>
// //     <footer className="site-footer"><span>THE NASA IMAGE ARCHIVE</span><span>Media and metadata supplied by NASA's Image and Video Library API.</span></footer>
// //   </main>;
// // }

// import React, { useEffect, useMemo, useState } from 'react';
// import {
//   ArrowUpRight,
//   Image as ImageIcon,
//   Search,
//   SlidersHorizontal,
//   Bookmark,
//   X,
//   ExternalLink,
//   CalendarDays,
//   RotateCcw,
// } from 'lucide-react';
// import { searchNasaMedia } from '../services/nasa.js';
// import MediaGallery from '../components/MediaGallery.jsx';

// const topics = [
//   'nebula',
//   'galaxy',
//   'Jupiter',
//   'Saturn',
//   'Moon',
//   'Earth from space',
//   'Hubble',
//   'James Webb',
//   'Apollo',
//   'spacewalk',
//   'rocket launch',
//   'Mars rover',
// ];

// const FAVORITES_KEY = 'cosmic-archive-nasa-favorites';

// function readFavorites() {
//   try {
//     const stored = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
//     return Array.isArray(stored) ? stored : [];
//   } catch {
//     return [];
//   }
// }

// function formatDate(date) {
//   if (!date) return 'Date unavailable';

//   const parsed = new Date(date);
//   if (Number.isNaN(parsed.getTime())) return 'Date unavailable';

//   return parsed.toLocaleDateString(undefined, {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric',
//   });
// }

// export default function Images() {
//   const [query, setQuery] = useState('nebula');
//   const [draft, setDraft] = useState('nebula');
//   const [type, setType] = useState('image');
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [page, setPage] = useState(1);
//   const [sort, setSort] = useState('relevance');
//   const [favorites, setFavorites] = useState(readFavorites);
//   const [showFavorites, setShowFavorites] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);

//   async function runSearch(
//     term = query,
//     mediaType = type,
//     pageNum = 1,
//     append = false
//   ) {
//     const cleanTerm = term.trim();

//     if (!cleanTerm) {
//       setError('Enter a subject to search the NASA archive.');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       const result = await searchNasaMedia(cleanTerm, mediaType, pageNum);

//       setItems((previous) => {
//         if (!append) return result;

//         const seen = new Set(previous.map((item) => item.id));
//         return [
//           ...previous,
//           ...result.filter((item) => !seen.has(item.id)),
//         ];
//       });

//       setQuery(cleanTerm);
//       setDraft(cleanTerm);
//       setType(mediaType);
//       setPage(pageNum);
//       setShowFavorites(false);
//     } catch {
//       setError(
//         'Could not reach NASA’s image archive. Check your connection and retry.'
//       );

//       if (!append) setItems([]);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     runSearch('nebula', 'image', 1);
//   }, []);

//   useEffect(() => {
//     try {
//       localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
//     } catch {
//       // Favorites remain available in memory if browser storage is unavailable.
//     }
//   }, [favorites]);

//   function toggleFavorite(item) {
//     setFavorites((previous) => {
//       const exists = previous.some((favorite) => favorite.id === item.id);

//       if (exists) {
//         return previous.filter((favorite) => favorite.id !== item.id);
//       }

//       return [item, ...previous];
//     });
//   }

//   const favoriteIds = useMemo(
//     () => new Set(favorites.map((item) => item.id)),
//     [favorites]
//   );

//   const displayedItems = useMemo(() => {
//     const source = showFavorites ? favorites : items;
//     const sorted = [...source];

//     if (sort === 'newest') {
//       sorted.sort(
//         (a, b) =>
//           new Date(b.date || 0).getTime() -
//           new Date(a.date || 0).getTime()
//       );
//     } else if (sort === 'oldest') {
//       sorted.sort(
//         (a, b) =>
//           new Date(a.date || 0).getTime() -
//           new Date(b.date || 0).getTime()
//       );
//     } else if (sort === 'title') {
//       sorted.sort((a, b) => a.title.localeCompare(b.title));
//     }

//     return sorted;
//   }, [items, favorites, showFavorites, sort]);

//   function resetSearch() {
//     setSort('relevance');
//     setShowFavorites(false);
//     setDraft('nebula');
//     runSearch('nebula', type, 1);
//   }

//   return (
//     <main className="page page-images theme-images">
//       <section className="hero sub-hero image-hero">
//         <div className="hero-overlay" />

//         <div className="hero-content">
//           <span className="script-label">A library without an edge</span>
//           <span className="eyebrow hero-eyebrow">
//             NASA IMAGE & VIDEO ARCHIVE
//           </span>

//           <h1>
//             Worlds within
//             <br />
//             <em>wonder.</em>
//           </h1>

//           <p className="hero-copy">
//             Search real photographs, videos and mission media from across
//             NASA&apos;s extraordinary archive.
//           </p>

//           <div className="archive-search">
//             <Search size={18} />

//             <input
//               value={draft}
//               onChange={(event) => setDraft(event.target.value)}
//               onKeyDown={(event) => {
//                 if (event.key === 'Enter') {
//                   runSearch(draft, type, 1);
//                 }
//               }}
//               placeholder="Try “Saturn”, “nebula” or “Apollo”…"
//               aria-label="Search NASA media"
//             />

//             <button
//               onClick={() => runSearch(draft, type, 1)}
//               disabled={loading}
//             >
//               {loading ? 'Searching…' : 'Search archive'}
//             </button>
//           </div>
//         </div>

//         <div className="image-hero-note">
//           <ImageIcon size={17} />
//           <span>
//             REAL NASA MEDIA
//             <br />
//             <small>Source links on every card</small>
//           </span>
//         </div>
//       </section>

//       <section className="section-wrap data-section">
//         <div className="section-heading">
//           <div>
//             <span className="eyebrow">EXPLORE BY SUBJECT</span>
//             <h2>
//               Find your <em>universe.</em>
//             </h2>
//           </div>

//           <label className="select-field">
//             <SlidersHorizontal size={15} />

//             <select
//               value={type}
//               onChange={(event) =>
//                 runSearch(query, event.target.value, 1)
//               }
//               aria-label="Media type"
//             >
//               <option value="image">Images</option>
//               <option value="video">Videos</option>
//               <option value="audio">Audio</option>
//             </select>
//           </label>
//         </div>

//         <div className="topic-chips">
//           {topics.map((topic) => (
//             <button
//               key={topic}
//               className={`topic-chip ${
//                 query.toLowerCase() === topic.toLowerCase() &&
//                 !showFavorites
//                   ? 'selected'
//                   : ''
//               }`}
//               onClick={() => runSearch(topic, type, 1)}
//               disabled={loading}
//             >
//               {topic}
//             </button>
//           ))}
//         </div>

//         <div className="gallery-toolbar">
//           <div className="gallery-status">
//             <span>
//               {loading
//                 ? 'Searching the NASA archive…'
//                 : showFavorites
//                   ? `${displayedItems.length} saved favorites`
//                   : `${displayedItems.length} results for “${query}”`}
//             </span>

//             <a
//               href="https://images.nasa.gov/"
//               target="_blank"
//               rel="noreferrer"
//             >
//               Official archive <ArrowUpRight size={13} />
//             </a>
//           </div>

//           <div className="gallery-actions">
//             <label className="gallery-sort">
//               <SlidersHorizontal size={14} />
//               <span>Sort</span>
//               <select
//                 value={sort}
//                 onChange={(event) => setSort(event.target.value)}
//                 aria-label="Sort gallery"
//               >
//                 <option value="relevance">Default order</option>
//                 <option value="newest">Newest first</option>
//                 <option value="oldest">Oldest first</option>
//                 <option value="title">Title A–Z</option>
//               </select>
//             </label>

//             <button
//               type="button"
//               className={`favorites-toggle ${
//                 showFavorites ? 'is-active' : ''
//               }`}
//               onClick={() => setShowFavorites((previous) => !previous)}
//             >
//               <Bookmark size={15} />
//               {showFavorites ? 'All results' : 'Favorites'}
//               <span>{favorites.length}</span>
//             </button>

//             <button
//               type="button"
//               className="gallery-reset"
//               onClick={resetSearch}
//               title="Reset gallery"
//             >
//               <RotateCcw size={14} />
//             </button>
//           </div>
//         </div>

//         {error && (
//           <div className="gallery-error" role="alert">
//             <p>{error}</p>
//             <button onClick={() => runSearch(query, type, 1)}>
//               Try again
//             </button>
//           </div>
//         )}

//         {showFavorites ? (
//           <div className="favorites-gallery">
//             {displayedItems.length === 0 ? (
//               <div className="favorites-empty">
//                 <Bookmark size={26} />
//                 <h3>No favorites saved yet</h3>
//                 <p>
//                   Browse the NASA archive and save interesting media to
//                   find it here later.
//                 </p>
//                 <button onClick={() => setShowFavorites(false)}>
//                   Explore the archive
//                 </button>
//               </div>
//             ) : (
//               <div className="favorites-grid">
//                 {displayedItems.map((item) => (
//                   <article className="favorite-card" key={item.id}>
//                     <button
//                       className="favorite-image-button"
//                       onClick={() => setSelectedItem(item)}
//                       aria-label={`View ${item.title}`}
//                     >
//                       <img src={item.image} alt={item.title} loading="lazy" />
//                     </button>

//                     <div className="favorite-card-body">
//                       <h3>{item.title}</h3>
//                       <p>{formatDate(item.date)}</p>

//                       <div className="favorite-card-actions">
//                         <button onClick={() => setSelectedItem(item)}>
//                           View details
//                         </button>
//                         <button
//                           onClick={() => toggleFavorite(item)}
//                           aria-label={`Remove ${item.title} from favorites`}
//                         >
//                           <Bookmark size={15} fill="currentColor" />
//                         </button>
//                       </div>
//                     </div>
//                   </article>
//                 ))}
//               </div>
//             )}
//           </div>
//         ) : (
//           <>
//             <MediaGallery
//               items={displayedItems}
//               loading={loading}
//               error={error}
//               onLoadMore={() => runSearch(query, type, page + 1, true)}
//             />

//             {!loading && items.length > 0 && (
//               <div className="gallery-enhance-grid">
//                 {items.map((item) => (
//                   <article className="gallery-enhance-card" key={item.id}>
//                     <button
//                       className="gallery-preview"
//                       onClick={() => setSelectedItem(item)}
//                       aria-label={`View details for ${item.title}`}
//                     >
//                       <img src={item.image} alt={item.title} loading="lazy" />
//                       <span>View details</span>
//                     </button>

//                     <div className="gallery-card-footer">
//                       <span title={item.title}>{item.title}</span>
//                       <button
//                         className={`favorite-icon-button ${
//                           favoriteIds.has(item.id) ? 'is-saved' : ''
//                         }`}
//                         onClick={() => toggleFavorite(item)}
//                         aria-label={
//                           favoriteIds.has(item.id)
//                             ? 'Remove from favorites'
//                             : 'Save to favorites'
//                         }
//                         title={
//                           favoriteIds.has(item.id)
//                             ? 'Remove favorite'
//                             : 'Save favorite'
//                         }
//                       >
//                         <Bookmark
//                           size={16}
//                           fill={
//                             favoriteIds.has(item.id)
//                               ? 'currentColor'
//                               : 'none'
//                           }
//                         />
//                       </button>
//                     </div>
//                   </article>
//                 ))}
//               </div>
//             )}
//           </>
//         )}
//       </section>

//       {selectedItem && (
//         <div
//           className="media-modal-backdrop"
//           role="presentation"
//           onClick={() => setSelectedItem(null)}
//         >
//           <section
//             className="media-modal"
//             role="dialog"
//             aria-modal="true"
//             aria-label={selectedItem.title}
//             onClick={(event) => event.stopPropagation()}
//           >
//             <div className="media-modal-header">
//               <span className="eyebrow">NASA MEDIA RECORD</span>
//               <button
//                 onClick={() => setSelectedItem(null)}
//                 aria-label="Close media details"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             <img
//               className="media-modal-image"
//               src={selectedItem.image}
//               alt={selectedItem.title}
//             />

//             <div className="media-modal-content">
//               <p className="media-modal-date">
//                 <CalendarDays size={14} />
//                 {formatDate(selectedItem.date)}
//                 {' · '}
//                 {selectedItem.center || 'NASA'}
//               </p>

//               <h2>{selectedItem.title}</h2>
//               <p className="media-modal-description">
//                 {selectedItem.description || 'No description supplied.'}
//               </p>

//               <div className="media-modal-actions">
//                 <button
//                   onClick={() => toggleFavorite(selectedItem)}
//                   className="modal-favorite-button"
//                 >
//                   <Bookmark
//                     size={16}
//                     fill={
//                       favoriteIds.has(selectedItem.id)
//                         ? 'currentColor'
//                         : 'none'
//                     }
//                   />
//                   {favoriteIds.has(selectedItem.id)
//                     ? 'Remove favorite'
//                     : 'Save favorite'}
//                 </button>

//                 <a
//                   href={selectedItem.pageUrl || 'https://images.nasa.gov/'}
//                   target="_blank"
//                   rel="noreferrer"
//                 >
//                   Open NASA record <ExternalLink size={14} />
//                 </a>
//               </div>
//             </div>
//           </section>
//         </div>
//       )}

//       <footer className="site-footer">
//         <span>THE NASA IMAGE ARCHIVE</span>
//         <span>
//           Media and metadata supplied by NASA&apos;s Image and Video Library API.
//         </span>
//       </footer>
//     </main>
//   );
// }


import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Image as ImageIcon,
  Search,
  SlidersHorizontal,
  Bookmark,
  X,
  ExternalLink,
  CalendarDays,
  RotateCcw
} from 'lucide-react';
import { searchNasaMedia } from '../services/nasa.js';
import MediaGallery from '../components/MediaGallery.jsx';
import { useFavorites } from '../context/FavoritesContext.jsx';

const topics = [
  'nebula',
  'galaxy',
  'Jupiter',
  'Saturn',
  'Moon',
  'Earth from space',
  'Hubble',
  'James Webb',
  'Apollo',
  'spacewalk',
  'rocket launch',
  'Mars rover'
];

const LEGACY_FAVORITES_KEY = 'cosmic-archive-nasa-favorites';

function readLegacyFavorites() {
  try {
    const stored = JSON.parse(
      localStorage.getItem(LEGACY_FAVORITES_KEY) || '[]'
    );
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

function formatDate(date) {
  if (!date) return 'Date unavailable';

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return 'Date unavailable';
  }

  return parsed.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export default function Images() {
  const {
    favorites,
    isFavorite,
    toggleFavorite
  } = useFavorites();

  const [query, setQuery] = useState('nebula');
  const [draft, setDraft] = useState('nebula');
  const [type, setType] = useState('image');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('relevance');
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Migrate bookmarks saved by the older Images page.
  useEffect(() => {
    const legacyFavorites = readLegacyFavorites();

    legacyFavorites.forEach(item => {
      if (!item?.id || !item?.title || isFavorite(item.id)) {
        return;
      }

      toggleFavorite({
        ...item,
        type: 'NASA MEDIA',
        url: item.url || item.pageUrl || ''
      });
    });

    try {
      localStorage.removeItem(LEGACY_FAVORITES_KEY);
    } catch {
      // The shared collection remains usable without this cleanup.
    }
  }, [isFavorite, toggleFavorite]);

  async function runSearch(
    term = query,
    mediaType = type,
    pageNum = 1,
    append = false
  ) {
    const cleanTerm = term.trim();

    if (!cleanTerm) {
      setError('Enter a subject to search the NASA archive.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await searchNasaMedia(
        cleanTerm,
        mediaType,
        pageNum
      );

      setItems(previous => {
        if (!append) return result;

        const seen = new Set(previous.map(item => item.id));

        return [
          ...previous,
          ...result.filter(item => !seen.has(item.id))
        ];
      });

      setQuery(cleanTerm);
      setDraft(cleanTerm);
      setType(mediaType);
      setPage(pageNum);
      setShowFavorites(false);
    } catch {
      setError(
        'Could not reach NASA’s image archive. Check your connection and retry.'
      );

      if (!append) setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    runSearch('nebula', 'image', 1);
  }, []);

  function toggleMediaFavorite(item) {
    if (!item?.id || !item?.title) return;

    // Store a consistent item format for the shared Favorites page.
    toggleFavorite({
      ...item,
      type: 'NASA MEDIA',
      url: item.pageUrl || item.url || 'https://images.nasa.gov/'
    });
  }

  const nasaFavorites = useMemo(
    () => favorites.filter(item => item.type === 'NASA MEDIA'),
    [favorites]
  );

  const displayedItems = useMemo(() => {
    const source = showFavorites ? nasaFavorites : items;
    const sorted = [...source];

    if (sort === 'newest') {
      sorted.sort(
        (a, b) =>
          new Date(b.date || 0).getTime() -
          new Date(a.date || 0).getTime()
      );
    } else if (sort === 'oldest') {
      sorted.sort(
        (a, b) =>
          new Date(a.date || 0).getTime() -
          new Date(b.date || 0).getTime()
      );
    } else if (sort === 'title') {
      sorted.sort((a, b) =>
        (a.title || '').localeCompare(b.title || '')
      );
    }

    return sorted;
  }, [items, nasaFavorites, showFavorites, sort]);

  function resetSearch() {
    setSort('relevance');
    setShowFavorites(false);
    setDraft('nebula');
    runSearch('nebula', type, 1);
  }

  return (
    <main className="page page-images theme-images">
      <section className="hero sub-hero image-hero">
        <div className="hero-overlay" />

        <div className="hero-content">
          <span className="script-label">
            A library without an edge
          </span>

          <span className="eyebrow hero-eyebrow">
            NASA IMAGE & VIDEO ARCHIVE
          </span>

          <h1>
            Worlds within
            <br />
            <em>wonder.</em>
          </h1>

          <p className="hero-copy">
            Search real photographs, videos and mission media from across
            NASA&apos;s extraordinary archive.
          </p>

          <div className="archive-search">
            <Search size={18} />

            <input
              value={draft}
              onChange={event => setDraft(event.target.value)}
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  runSearch(draft, type, 1);
                }
              }}
              placeholder="Try “Saturn”, “nebula” or “Apollo”…"
              aria-label="Search NASA media"
            />

            <button
              onClick={() => runSearch(draft, type, 1)}
              disabled={loading}
            >
              {loading ? 'Searching…' : 'Search archive'}
            </button>
          </div>
        </div>

        <div className="image-hero-note">
          <ImageIcon size={17} />
          <span>
            REAL NASA MEDIA
            <br />
            <small>Source links on every card</small>
          </span>
        </div>
      </section>

      <section className="section-wrap data-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">EXPLORE BY SUBJECT</span>
            <h2>
              Find your <em>universe.</em>
            </h2>
          </div>

          <label className="select-field">
            <SlidersHorizontal size={15} />

            <select
              value={type}
              onChange={event =>
                runSearch(query, event.target.value, 1)
              }
              aria-label="Media type"
            >
              <option value="image">Images</option>
              <option value="video">Videos</option>
              <option value="audio">Audio</option>
            </select>
          </label>
        </div>

        <div className="topic-chips">
          {topics.map(topic => (
            <button
              key={topic}
              className={`topic-chip ${
                query.toLowerCase() === topic.toLowerCase() &&
                !showFavorites
                  ? 'selected'
                  : ''
              }`}
              onClick={() => runSearch(topic, type, 1)}
              disabled={loading}
            >
              {topic}
            </button>
          ))}
        </div>

        <div className="gallery-toolbar">
          <div className="gallery-status">
            <span>
              {loading
                ? 'Searching the NASA archive…'
                : showFavorites
                  ? `${displayedItems.length} saved NASA favorites`
                  : `${displayedItems.length} results for “${query}”`}
            </span>

            <a
              href="https://images.nasa.gov/"
              target="_blank"
              rel="noreferrer"
            >
              Official archive <ArrowUpRight size={13} />
            </a>
          </div>

          <div className="gallery-actions">
            <label className="gallery-sort">
              <SlidersHorizontal size={14} />
              <span>Sort</span>

              <select
                value={sort}
                onChange={event => setSort(event.target.value)}
                aria-label="Sort gallery"
              >
                <option value="relevance">Default order</option>
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="title">Title A–Z</option>
              </select>
            </label>

            <button
              type="button"
              className={`favorites-toggle ${
                showFavorites ? 'is-active' : ''
              }`}
              onClick={() =>
                setShowFavorites(previous => !previous)
              }
            >
              <Bookmark size={15} />
              {showFavorites ? 'All results' : 'Favorites'}
              <span>{nasaFavorites.length}</span>
            </button>

            <button
              type="button"
              className="gallery-reset"
              onClick={resetSearch}
              title="Reset gallery"
              aria-label="Reset gallery"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>

        {error && (
          <div className="gallery-error" role="alert">
            <p>{error}</p>
            <button onClick={() => runSearch(query, type, 1)}>
              Try again
            </button>
          </div>
        )}

        {showFavorites ? (
          <div className="favorites-gallery">
            {displayedItems.length === 0 ? (
              <div className="favorites-empty">
                <Bookmark size={26} />
                <h3>No NASA favorites saved yet</h3>
                <p>
                  Browse the archive and bookmark interesting media.
                  Your saved NASA items will also appear on the main
                  Favorites page.
                </p>
                <button onClick={() => setShowFavorites(false)}>
                  Explore the archive
                </button>
              </div>
            ) : (
              <div className="favorites-grid">
                {displayedItems.map(item => (
                  <article className="favorite-card" key={item.id}>
                    <button
                      className="favorite-image-button"
                      onClick={() => setSelectedItem(item)}
                      aria-label={`View ${item.title}`}
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                        />
                      )}
                    </button>

                    <div className="favorite-card-body">
                      <h3>{item.title}</h3>
                      <p>{formatDate(item.date)}</p>

                      <div className="favorite-card-actions">
                        <button onClick={() => setSelectedItem(item)}>
                          View details
                        </button>

                        <button
                          onClick={() => toggleMediaFavorite(item)}
                          aria-label={`Remove ${item.title} from favorites`}
                          title="Remove favorite"
                        >
                          <Bookmark size={15} fill="currentColor" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            <MediaGallery
              items={displayedItems}
              loading={loading}
              error={error}
              onLoadMore={() =>
                runSearch(query, type, page + 1, true)
              }
            />

            {!loading && items.length > 0 && (
              <div className="gallery-enhance-grid">
                {items.map(item => {
                  const saved = isFavorite(item.id);

                  return (
                    <article
                      className="gallery-enhance-card"
                      key={item.id}
                    >
                      <button
                        className="gallery-preview"
                        onClick={() => setSelectedItem(item)}
                        aria-label={`View details for ${item.title}`}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                        />
                        <span>View details</span>
                      </button>

                      <div className="gallery-card-footer">
                        <span title={item.title}>{item.title}</span>

                        <button
                          className={`favorite-icon-button ${
                            saved ? 'is-saved' : ''
                          }`}
                          onClick={() => toggleMediaFavorite(item)}
                          aria-label={
                            saved
                              ? 'Remove from favorites'
                              : 'Save to favorites'
                          }
                          title={
                            saved
                              ? 'Remove favorite'
                              : 'Save favorite'
                          }
                        >
                          <Bookmark
                            size={16}
                            fill={saved ? 'currentColor' : 'none'}
                          />
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </>
        )}
      </section>

      {selectedItem && (
        <div
          className="media-modal-backdrop"
          role="presentation"
          onClick={() => setSelectedItem(null)}
        >
          <section
            className="media-modal"
            role="dialog"
            aria-modal="true"
            aria-label={selectedItem.title}
            onClick={event => event.stopPropagation()}
          >
            <div className="media-modal-header">
              <span className="eyebrow">NASA MEDIA RECORD</span>

              <button
                onClick={() => setSelectedItem(null)}
                aria-label="Close media details"
              >
                <X size={20} />
              </button>
            </div>

            {selectedItem.image && (
              <img
                className="media-modal-image"
                src={selectedItem.image}
                alt={selectedItem.title}
              />
            )}

            <div className="media-modal-content">
              <p className="media-modal-date">
                <CalendarDays size={14} />
                {formatDate(selectedItem.date)}
                {' · '}
                {selectedItem.center || 'NASA'}
              </p>

              <h2>{selectedItem.title}</h2>

              <p className="media-modal-description">
                {selectedItem.description || 'No description supplied.'}
              </p>

              <div className="media-modal-actions">
                <button
                  onClick={() => toggleMediaFavorite(selectedItem)}
                  className="modal-favorite-button"
                >
                  <Bookmark
                    size={16}
                    fill={
                      isFavorite(selectedItem.id) ? 'currentColor' : 'none'
                    }
                  />
                  {isFavorite(selectedItem.id)
                    ? 'Remove favorite'
                    : 'Save favorite'}
                </button>

                <a
                  href={
                    selectedItem.pageUrl ||
                    selectedItem.url ||
                    'https://images.nasa.gov/'
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  Open NASA record <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </section>
        </div>
      )}

      <footer className="site-footer">
        <span>THE NASA IMAGE ARCHIVE</span>
        <span>
          Media and metadata supplied by NASA&apos;s Image and Video Library API.
        </span>
      </footer>
    </main>
  );
}
