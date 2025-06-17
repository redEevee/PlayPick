import React, { useState } from 'react';
import './App.css';
import LandingPage from './LandingPage';
import VersusGame from './VersusGame';

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'versus'>('landing');

  const showVersusGame = () => {
    setCurrentPage('versus');
  };

  const showLandingPage = () => {
    setCurrentPage('landing');
  };

  return (
    <div className="App">
      {currentPage === 'landing' ? (
        <LandingPage onStartGame={showVersusGame} />
      ) : (
        <VersusGame onBackToLanding={showLandingPage} />
      )}
    </div>
  );
}

export default App;
