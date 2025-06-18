import React from "react";
import PersonQuizGame from './game/PersonQuizGame';
import "./index.css";
import "versus-game/src/components/VersusPlay.css"; // game-header, game-card 등 스타일 공유
import CountryQuizGame from "./game/CountryQuizGame";
import AnimalQuizGame from "./game/AnimalQuizGame";

function App() {
  return (
    <div className="versus-play">
      <header className="game-header">
        <h1>퀴즈 챌린지</h1>
        <div className="game-info">
          <span>세 가지 퀴즈 중 하나를 선택해보세요!</span>
        </div>
      </header>

      <div className="game-arena">
        <div className="game-card">
          <div className="card-content">
            <h3 className="item-name">인물 퀴즈</h3>
            <PersonQuizGame />
          </div>
        </div>

        <div className="game-card">
          <div className="card-content">
            <h3 className="item-name">나라 퀴즈</h3>
            <CountryQuizGame />
          </div>
        </div>

        <div className="game-card">
          <div className="card-content">
            <h3 className="item-name">동물 퀴즈</h3>
           <AnimalQuizGame />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
