import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import SpotTheDifferenceGame from "./game/SpotTheDifferenceGame.tsx";

function App() {
    return (
        <div className="App">
            <header style={{
                textAlign: 'center',
                padding: '20px',
                backgroundColor: '14b8a6',
                color: '14b8a6',
                fontSize: 'calc(10px + 2vmin)',
                marginBottom: '30px'
            }}>
                <div className=""><h1 className="text-black font-bold">인물 퀴즈 챌린지</h1></div>
            </header>
            <main>
                <SpotTheDifferenceGame />
            </main>
        </div>
    );
}

export default App;

