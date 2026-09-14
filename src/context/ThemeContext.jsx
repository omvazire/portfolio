import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({
  themeMode: 'default',
  isRapMode: false,
  isTransitioning: false,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_theme_mode');
      return saved === 'rap' ? 'rap' : 'default';
    }
    return 'default';
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
    localStorage.setItem('portfolio_theme_mode', themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    const nextMode = themeMode === 'default' ? 'rap' : 'default';
    
    // Trigger transition flash
    setIsTransitioning(true);
    setThemeMode(nextMode);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  };

  const isRapMode = themeMode === 'rap';

  return (
    <ThemeContext.Provider value={{ themeMode, isRapMode, isTransitioning, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
