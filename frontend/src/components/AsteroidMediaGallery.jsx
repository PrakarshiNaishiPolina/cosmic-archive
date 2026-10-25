
import React, { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';

const API = 'http://localhost:8000/api/nasa-images';

const SEARCHES = [
  {
    id: 'bennu',
    name: 'Bennu',
    queries: [
      '2019-02-25_regolith_image_compilation',
      'Bennu surface boulders',
      'Bennu asteroid surface'
    ]
  },
  {
    id: 'vesta',
    name: 'Vesta',
    queries: ['asteroid Vesta Dawn spacecraft']
  },
  {
    id: 'eros',
    name: 'Eros',
    queries: ['asteroid Eros NEAR Shoemaker']
  }
];

const UNWANTED_TERMS = [
  'rollout',
  'launch vehicle',
  'launch complex',
  'rocket rollout',
  'spacecraft rollout'
];

function getImageUrl(item) {
  const links = item.links || [];

  const preview =
    links.find(link => link.rel === 'preview' && link.render === 'image') ||
    links.find(link => link.rel === 'preview') ||
    links.find(link => link.render === 'image');

  return preview?.href || '';
}

function cleanDescription(description = '') {
  return String(description)
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getBennuScore(item) {
  const text = `${item.title} ${item.description}`.toLowerCase();

  const terms = [
    'surface',
    'boulder',
    'regolith',
    'crater',
    'polycam',
    'northern hemisphere'
  ];

  return terms.reduce(
    (score, term) => score + (text.includes(term) ? 1 : 0),
    0
  );
}

export default function AsteroidMediaGallery() {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadImages() {
      setLoading(true);
      setErrors('');

      const results = await Promise.all(
        SEARCHES.map(async search => {
          try {
            const batches = await Promise.all(
              search.queries.map(async query => {
                const params = new URLSearchParams({
                  q: query,
                  media_type: 'image',
                  page: '1',
                  page_size: '50'
                });

                const response = await fetch(`${API}?${params}`);

                if (!response.ok) {
                  throw new Error(`NASA API returned ${response.status}`);
                }

                const json = await response.json();
                return json.collection?.items || [];
              })
            );

            const uniqueImages = new Map();

            batches.flat().forEach(item => {
              const data = item.data?.[0] || {};
              const image = getImageUrl(item);

              if (!image) return;

              const title = data.title || `${search.name} image`;
              const description = cleanDescription(data.description || '');

              const searchableText = (
                `${title} ${description} ${(data.keywords || []).join(' ')}`
              ).toLowerCase();

              if (
                search.id === 'bennu' &&
                UNWANTED_TERMS.some(term => searchableText.includes(term))
              ) {
                return;
              }

              if (
                search.id === 'bennu' &&
                !searchableText.includes('bennu') &&
                !searchableText.includes('asteroid') &&
                !searchableText.includes('regolith')
              ) {
                return;
              }

              const id = data.nasa_id || image;

              if (!uniqueImages.has(id)) {
                uniqueImages.set(id, {
                  id,
                  title,
                  description:
                    description ||
                    `NASA archive image related to asteroid ${search.name}.`,
                  image,
                  pageUrl: data.nasa_id
                    ? `https://images.nasa.gov/details/${encodeURIComponent(data.nasa_id)}`
                    : 'https://images.nasa.gov/'
                });
              }
            });

            let images = Array.from(uniqueImages.values());

            if (search.id === 'bennu') {
              images.sort((a, b) => getBennuScore(b) - getBennuScore(a));
            }

            return {
              ...search,
              images: images.slice(0, search.id === 'bennu' ? 3 : 12)
            };
          } catch (error) {
            return {
              ...search,
              images: [],
              error: error.message
            };
          }
        })
      );

      if (cancelled) return;

      setGalleries(results);

      setErrors(
        results.every(result => result.images.length === 0)
          ? 'NASA image search returned no usable images. Check that the backend is running at localhost:8000.'
          : ''
      );

      setLoading(false);
    }

    loadImages();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="state-panel">
        <span className="loader" />
        <p>Loading asteroid images from NASA's archive…</p>
      </div>
    );
  }

  return (
    <div>
      {errors && (
        <div className="state-panel">
          <p>{errors}</p>
        </div>
      )}

      {galleries.map(gallery => (
        <section key={gallery.id} style={{ marginBottom: '32px' }}>
          <h2>{gallery.name}</h2>

          {gallery.error && gallery.images.length === 0 && (
            <p>Could not load images for {gallery.name}: {gallery.error}</p>
          )}

          {gallery.images.length === 0 && !gallery.error && (
            <p>No relevant images were returned for this search.</p>
          )}

          <div className="media-grid">
            {gallery.images.map(item => (
              <article className="media-card" key={item.id}>
                <a
                  className="media-image"
                  href={item.pageUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    onError={event => {
                      event.currentTarget.style.display = 'none';
                    }}
                  />
                </a>

                <div className="media-card-body">
                  <span className="eyebrow">NASA IMAGE ARCHIVE</span>
                  <h3>{item.title}</h3>
                  <p>{item.description.slice(0, 180)}</p>

                  <a
                    className="text-link"
                    href={item.pageUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View NASA source <ExternalLink size={13} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
