import React from "react";
import ReactDOM from "react-dom/client";
import PersonQuizGame from './game/PersonQuizGame'; // 새로운 경로로 임포트


import "./index.css";

function App() {
  return (
    <div className="App">
      <header style={{
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#282c34',
        color: 'white',
        fontSize: 'calc(10px + 2vmin)',
        marginBottom: '30px'
      }}>
        <h1>인물 퀴즈 챌린지</h1>
      </header>
      <main>
        <PersonQuizGame />
      </main>
    </div>
  );
}

export default App;

