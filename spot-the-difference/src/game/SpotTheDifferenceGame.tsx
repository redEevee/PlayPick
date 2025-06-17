import React, { useState, useEffect, useRef } from "react";
import "./SpotTheDifferenceGame.css";
import image01 from "../assets/image01.jpg";
import HeartFull from "../assets/HeartFull.png";
import HeartEmpty from "../assets/HeartEmpty.png";

const answerAreas = [
    { x: 100, y: 80, radius: 40 },
    { x: 200, y: 150, radius: 40 },
    { x: 300, y: 220, radius: 40 },
    { x: 400, y: 100, radius: 40 },
    { x: 500, y: 300, radius: 40 }
];

const SpotTheDifferenceGame = () => {
    const [isStarted, setIsStarted] = useState(false);
    const [life, setLife] = useState(5);
    const [hintCount, setHintCount] = useState(0);
    const [temporaryHintIndex, setTemporaryHintIndex] = useState(null);
    const [foundAreas, setFoundAreas] = useState([]);
    const [milliseconds, setMilliseconds] = useState(60000); // 60초 = 60000ms

    const MAX_HINTS = 3;
    const hintTimeoutRef = useRef(null); // 🔹 타이머 저장용 ref 추가


    useEffect(() => {
        if (milliseconds <= 0) return;

        const timer = setInterval(() => {
            setMilliseconds(prev => Math.max(prev - 100, 0));
        }, 100); // 100ms 간격

        return () => clearInterval(timer);
    }, [milliseconds]);

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
        if (hintCount >= MAX_HINTS) return;

        const remainingHints = answerAreas
            .map((_, index) => index)
            .filter(index => !foundAreas.includes(index) && index !== temporaryHintIndex);

        if (remainingHints.length === 0) return;

        const nextIndex = remainingHints[0];

        // 이전 타이머가 남아있다면 제거
        if (hintTimeoutRef.current) {
            clearTimeout(hintTimeoutRef.current);
        }

        setTemporaryHintIndex(nextIndex);
        setHintCount(prev => prev + 1);

        // 새로운 타이머 설정
        hintTimeoutRef.current = setTimeout(() => {
            setTemporaryHintIndex(null);
            hintTimeoutRef.current = null;
        }, 3000);
    };

    const renderOverlay = () => (
        <div className="overlay">
            {answerAreas.map((area, index) => {
                const show = foundAreas.includes(index) || index === temporaryHintIndex;

                if (!show) return null;

                return (
                    <div
                        key={index}
                        className={`hint-circle ${index === temporaryHintIndex ? "fade-hint" : ""}`}
                        style={{
                            left: `${area.x - area.radius}px`,
                            top: `${area.y - area.radius}px`,
                            width: `${area.radius * 2}px`,
                            height: `${area.radius * 2}px`,
                            borderRadius: "50%"
                        }}
                    />
                );
            })}
        </div>
    );

    const formatTime = (ms) => {
        const sec = String(Math.floor(ms / 1000)).padStart(2, "0");
        const msec = String(Math.floor((ms % 1000) / 10)).padStart(2, "0");
        return `${sec}:${msec}`;
    };
    
    if(!isStarted){
        <div className="quiz-container">
            <h2>틀린 그림 찾기</h2>
            <p>그림에서 틀린 부분을 찾아보세요!</p>
            <button className="start-button" onClick={() => setIsStarted(true)}>퀴즈 시작</button>
        </div>
    }

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
                    <div
                        className="timer-box"
                    >
                        {formatTime(milliseconds)}
                    </div>
                    <div className={`hint-box ${hintCount >= MAX_HINTS ? "disabled" : ""}`} onClick={toggleHint}>
                        HINT ({MAX_HINTS - hintCount})
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpotTheDifferenceGame;
