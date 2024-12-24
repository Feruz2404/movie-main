import React from 'react';
import Router from './router';
import { FavoritesProvider } from './components/saved/FavoritesContext';
import { DarkModeProvider } from './components/dark/DarkModeProvider';

const App = () => {
  return (
    <DarkModeProvider>
      <FavoritesProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
          <Router />
        </div>
      </FavoritesProvider>
    </DarkModeProvider>
  );
};

export default App;
