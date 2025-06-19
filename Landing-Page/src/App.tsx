import React, { useState } from 'react';
import './LandingPage.css';
import LandingPage from './LandingPage';

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

        <LandingPage onStartGame={showVersusGame} />

    </div>
  );
}

export default App;
