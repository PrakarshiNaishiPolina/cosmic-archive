
import React from 'react';
import {
  Heart,
  Trash2,
  ArrowUpRight,
  Sparkles,
  Bookmark
} from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext.jsx';

export default function Favorites({ setPage }) {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();

  return (
    <main className="page favorites-page">
      <section className="favorites-hero section-wrap">
        <span className="script-label">
          The discoveries worth keeping
        </span>

        <p className="eyebrow">COSMIC ARCHIVE / YOUR COLLECTION</p>

        <h1>
          Saved <em>discoveries.</em>
        </h1>

        <p className="favorites-intro">
          Your personal collection of planets, asteroids, and images
          from across the universe.
        </p>

        <div className="favorites-count">
          <Heart size={16} />
          {favorites.length} saved{' '}
          {favorites.length === 1 ? 'discovery' : 'discoveries'}
        </div>
      </section>

      <section className="favorites-content section-wrap">
        {favorites.length === 0 ? (
          <div className="favorites-empty">
            <span className="favorites-empty-icon">
              <Bookmark size={30} />
            </span>

            <Sparkles size={19} />

            <h2>Your collection begins here.</h2>

            <p>
              When you find a planet, asteroid, or NASA image you love,
              save it here to revisit it later.
            </p>

            <div className="favorites-empty-actions">
              <button
                className="button button-light"
                onClick={() => setPage('asteroids')}
              >
                Explore asteroids <ArrowUpRight size={15} />
              </button>

              <button
                className="button button-outline"
                onClick={() => setPage('images')}
              >
                Browse images <ArrowUpRight size={15} />
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="favorites-toolbar">
              <div>
                <span className="eyebrow">PERSONAL ARCHIVE</span>
                <h2>Your collection</h2>
              </div>

              <button
                className="favorites-clear"
                onClick={() => {
                  if (
                    window.confirm(
                      'Remove all saved discoveries from your collection?'
                    )
                  ) {
                    clearFavorites();
                  }
                }}
              >
                <Trash2 size={15} />
                Clear all
              </button>
            </div>

            <div className="favorites-grid">
              {favorites.map(item => (
                <article className="favorite-card" key={item.id}>
                  {item.image ? (
                    <img
                      className="favorite-card-image"
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                    />
                  ) : (
                    <div className="favorite-card-placeholder">
                      <Sparkles size={28} />
                      <span>COSMIC ARCHIVE</span>
                    </div>
                  )}

                  <div className="favorite-card-body">
                    <span className="eyebrow">
                      {item.type || 'DISCOVERY'}
                    </span>

                    <h3>{item.title}</h3>

                    {item.description && (
                      <p>{item.description}</p>
                    )}

                    <div className="favorite-card-actions">
                      {item.url && (
                        <a
                          className="favorite-open-link"
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View source <ArrowUpRight size={14} />
                        </a>
                      )}

                      <button
                        className="favorite-remove"
                        onClick={() => removeFavorite(item.id)}
                        aria-label={`Remove ${item.title} from favorites`}
                        title="Remove from favorites"
                      >
                        <Heart size={17} fill="currentColor" />
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
