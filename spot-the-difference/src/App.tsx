import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import SpotTheDifferenceGame from "./game/SpotTheDifferenceGame.tsx";
import SpotTheDifferenceGameSelect from "./game-select/SpotTheDifferenceGameSelect.tsx";

function App() {
    return (
        <div className="App">
            <main>
                <SpotTheDifferenceGameSelect />
            </main>
        </div>
    );
}

export default App;

