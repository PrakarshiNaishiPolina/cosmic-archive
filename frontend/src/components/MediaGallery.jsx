

import React from 'react';
import { ExternalLink, Image as ImageIcon, Play, Music2 } from 'lucide-react';

export default function MediaGallery({
  items = [],
  loading = false,
  error = '',
  onLoadMore
}) {
  if (loading && items.length === 0) {
    return (
      <div className="state-panel" role="status">
        <div className="loader" />
        <p>Searching NASA's media archive…</p>
      </div>
    );
  }

  if (error && items.length === 0) {
    return (
      <div className="state-panel" role="alert">
        <p>{error}</p>
        <small>Check your connection and try the search again.</small>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="state-panel">
        <p>No media found.</p>
        <small>Try another keyword or choose a different media type.</small>
      </div>
    );
  }

  return (
    <>
      {error && (
        <div className="state-panel" role="alert">
          <p>{error}</p>
        </div>
      )}

      <div className="media-grid">
        {items.map((item, index) => {
          const type = item.mediaType || 'image';
          const TypeIcon =
            type === 'video' ? Play : type === 'audio' ? Music2 : ImageIcon;

          return (
            <article
              className="media-card"
              key={item.id || item.nasaId || `${item.title}-${index}`}
            >
              <a
                className="media-image"
                href={item.pageUrl || 'https://images.nasa.gov/'}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open NASA record for ${item.title || 'media item'}`}
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title || 'NASA media preview'}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="media-placeholder">
                    <TypeIcon size={38} aria-hidden="true" />
                    <span>{type.toUpperCase()} · PREVIEW UNAVAILABLE</span>
                  </div>
                )}

                {type === 'video' && (
                  <span className="play-badge" aria-hidden="true">
                    <Play size={36} />
                  </span>
                )}
              </a>

              <div className="media-card-body">
                <span className="eyebrow">
                  {item.center || 'NASA'} · {type}
                </span>

                <h3>{item.title || 'Untitled NASA media'}</h3>

                <p>
                  {item.description || 'No description supplied by NASA.'}
                </p>

                {item.date && (
                  <p>
                    <strong>Date:</strong>{' '}
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                )}

                <a
                  className="text-link"
                  href={item.pageUrl || 'https://images.nasa.gov/'}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open NASA record <ExternalLink size={13} />
                </a>
              </div>
            </article>
          );
        })}
      </div>

      {loading && items.length > 0 && (
        <div className="state-panel" role="status">
          <div className="loader" />
          <p>Loading more NASA media…</p>
        </div>
      )}

      {typeof onLoadMore === 'function' && (
        <button
          type="button"
          className="button button-ghost load-more"
          onClick={onLoadMore}
          disabled={loading}
        >
          {loading ? 'Loading…' : 'Load more'}
        </button>
      )}
    </>
  );
}
