import React from "react";
import PersonQuizGame from './game/PersonQuizGame';
import "./index.css";
import "versus-game/src/components/VersusPlay.css"; // game-header, game-card 등 스타일 공유
import CountryQuizGame from "./game/CountryQuizGame";
import AnimalQuizGame from "./game/AnimalQuizGame";
import SpotTheDifferenceGameSelect from "spot-the-difference/src/game-select/SpotTheDifferenceGameSelect.tsx";
import PersonQuizGameSelect from "./game-select/PersonQuizGameSelect.tsx";

function App() {
  return (
      <div className="App">
        <main>
          <PersonQuizGameSelect />
        </main>
      </div>
  );
}

export default App;
