import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState({
    tests: [],
    packages: []
  });

  // Load favorites from localStorage on component mount
  useEffect(() => {
    if (user) {
      const savedFavorites = localStorage.getItem(`favorites_${user.email}`);
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    }
  }, [user]);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`favorites_${user.email}`, JSON.stringify(favorites));
    }
  }, [favorites, user]);

  const addToFavorites = (item, type) => {
    setFavorites(prev => ({
      ...prev,
      [type]: [...prev[type], item]
    }));
  };

  const removeFromFavorites = (itemId, type) => {
    setFavorites(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item.id !== itemId)
    }));
  };

  const isFavorite = (itemId, type) => {
    return favorites[type].some(item => item.id === itemId);
  };

  const toggleFavorite = (item, type) => {
    if (isFavorite(item.id, type)) {
      removeFromFavorites(item.id, type);
    } else {
      addToFavorites(item, type);
    }
  };

  const clearFavorites = () => {
    setFavorites({ tests: [], packages: [] });
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    clearFavorites
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
