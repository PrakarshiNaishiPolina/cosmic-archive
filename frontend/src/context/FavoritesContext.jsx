
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';

const FavoritesContext = createContext(null);
const STORAGE_KEY = 'cosmic-archive-favorites';

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Could not save favorites:', error);
    }
  }, [favorites]);

  const isFavorite = useCallback(
    (id) => favorites.some(item => item.id === id),
    [favorites]
  );

  const toggleFavorite = useCallback((item) => {
    if (!item?.id || !item?.title) return;

    setFavorites(current => {
      const exists = current.some(saved => saved.id === item.id);

      if (exists) {
        return current.filter(saved => saved.id !== item.id);
      }

      return [
        ...current,
        {
          ...item,
          savedAt: new Date().toISOString()
        }
      ];
    });
  }, []);

  const removeFavorite = useCallback((id) => {
    setFavorites(current => current.filter(item => item.id !== id));
  }, []);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        removeFavorite,
        clearFavorites
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      'useFavorites must be used inside FavoritesProvider.'
    );
  }

  return context;
}
