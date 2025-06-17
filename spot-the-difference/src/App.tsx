import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import image01 from "./assets/image01.jpg";
import HeartFull from "./assets/HeartFull.png";
import HeartEmpty from "./assets/HeartEmpty.png";

const answerAreas = [
    { x:100, y:80, radius: 40 },
    { x:200, y:150, radius: 40 },
    { x:300, y:220, radius: 40 },
    { x:400, y:100, radius: 40 },
    { x:500, y:300, radius: 40 }
];

const App = () => {

    const [life, setLife] = useState(5);
    const [hintCount, setHintCount] = useState(0);

    const [foundAreas, setFoundAreas] = useState([]);

    const handleWrongClick = () => {
        setLife((prev) => (prev > 0 ? prev - 1 : 0));
    };

    const handleImageClick = (e) => {
        e.stopPropagation();
        const rect = e.target.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        const foundIndex = answerAreas.findIndex((area, index) => {
            const dx = clickX - area.x;
            const dy = clickY - area.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance <= area.radius && !foundAreas.includes(index);
        });

        if (foundIndex !== -1) {
            setFoundAreas([...foundAreas, foundIndex]);
        } else {
            handleWrongClick();
        }
    };

    const toggleHint = () => {
        setHintCount((prev) => Math.min(prev + 1, answerAreas.length));
    };

    const renderOverlay = () => (
        <div className="overlay">
            {answerAreas.map((area, index) =>
                foundAreas.includes(index) || index < hintCount ? (
                    <div
                        key={index}
                        className="hint-circle"
                        style={{
                            left: `${area.x - area.radius}px`,
                            top: `${area.y - area.radius}px`,
                            width: `${area.radius * 2}px`,
                            height: `${area.radius * 2}px`,
                            borderRadius: "50%"
                        }}
                    />
                ) : null
            )}
        </div>
    );

    return (
        <div>
            <div className="gradient-bg">
                <h1 className="title">틀린 그림 찾기</h1>
                <h5 className="subtitle">두 개의 그림을 비교하여 서로 다른 곳을 찾아보세요</h5>

                <div className="life-container">
                    {[...Array(5)].map((_, i) => (
                        <img
                            key={i}
                            src={i < life ? HeartFull : HeartEmpty}
                            alt="life"
                            className="heart-img"
                        />
                    ))}
                </div>

                <div className="image-box-container">
                    <div className="image-box">
                        <img src={image01} alt="틀린그림1" className="game-image" onClick={handleImageClick} />
                        {renderOverlay()}
                    </div>
                    <div className="image-box">
                        <img src={image01} alt="틀린그림2" className="game-image" onClick={handleImageClick} />
                        {renderOverlay()}
                    </div>
                </div>
                <div className="status-container">
                    <div className="timer-box">00:00:00</div>
                    <div className="hint-box" onClick={toggleHint}>HINT</div>
                </div>
            </div>
        </div>

    )
}

export default App
