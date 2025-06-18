import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import SpotTheDifferenceGame from "./game/SpotTheDifferenceGame.tsx";

function App() {
    return (
        <div className="App">
            <main>
                <SpotTheDifferenceGame />
            </main>
        </div>
    );
}

export default App;

