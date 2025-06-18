import React, { useState, useEffect, useRef } from "react";
import "./SpotTheDifferenceGame.css";
import image01 from "../assets/image01_01.jpg";
import image02 from "../assets/image01_02.jpg";
import HeartFull from "../assets/HeartFull.png";
import HeartEmpty from "../assets/HeartEmpty.png";

const answerAreas = [
    { x: 789.2, y: 158.0, radius: 60 },
    { x: 196.8, y: 226.1, radius: 60 },
    { x: 134.1, y: 468.1, radius: 60 },
    { x: 540.5, y: 441.6, radius: 60 },
    { x: 1046.5, y: 689.3, radius: 60 }
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
    }, [isStarted]);

    useEffect(() => {
        const handleResize = () => {
            setMilliseconds(prev => prev); // 강제 렌더링
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleWrongClick = () => {
        setLife((prev) => (prev > 0 ? prev - 1 : 0));
    };

    const handleImageClick = (e) => {
        e.stopPropagation();
        const rect = e.target.getBoundingClientRect();

        const scaleX = 1280 / rect.width;
        const scaleY = 720 / rect.height;

        const clickX = (e.clientX - rect.left) * scaleX;
        const clickY = (e.clientY - rect.top) * scaleY;

        // 어떤 이미지 박스를 클릭했는지 확인
        const isRightImage = e.target.alt?.includes("틀린그림2"); // 오른쪽 이미지는 alt="틀린그림2"로 구분

        const adjustedX = clickX;
        const adjustedY = clickY;

        console.log(
            `New point → { x: ${adjustedX.toFixed(1)}, y: ${adjustedY.toFixed(1)}, radius: 40 },`
        );

        const foundIndex = answerAreas.findIndex((area, index) => {
            const dx = adjustedX - area.x;
            const dy = adjustedY - area.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance <= area.radius && !foundAreas.includes(index);
        });

        if (foundIndex !== -1) {
            // console.log("정답 인식됨! foundIndex:", foundIndex); // 개발자 도구 콘솔창에서 제대로 인식되고 있는지 확인하는 용도
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

    const renderOverlay = (imageRef) => {
        if (!imageRef.current) return null;

        const rect = imageRef.current.getBoundingClientRect();
        const scaleX = rect.width / 1280;
        const scaleY = rect.height / 720;

        return (
            <div className="overlay">
                {answerAreas.map((area, index) => {
                    const show = foundAreas.includes(index) || index === temporaryHintIndex;
                    if (!show) return null;

                    return (
                        <div
                            key={index}
                            className={`hint-circle ${index === temporaryHintIndex ? "fade-hint" : ""}`}
                            style={{
                                left: `${area.x * scaleX}px`,
                                top: `${area.y * scaleY}px`,
                                width: `${area.radius * 2 * scaleX}px`,
                                height: `${area.radius * 2 * scaleY}px`,
                                transform: "translate(-50%, -50%)"
                            }}
                        />
                    );
                })}
            </div>
        );
    };

    const leftImageRef = useRef(null);
    const rightImageRef = useRef(null);

    const formatTime = (ms) => {
        const sec = String(Math.floor(ms / 1000)).padStart(2, "0");
        const msec = String(Math.floor((ms % 1000) / 10)).padStart(2, "0");
        return `${sec}:${msec}`;
    };

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
                        <img
                            src={image01}
                            alt="틀린그림1"
                            className="game-image"
                            onClick={handleImageClick}
                            ref={leftImageRef}
                        />
                        {renderOverlay(leftImageRef)}
                    </div>
                    <div className="image-box">
                        <img
                            src={image02}
                            alt="틀린그림2"
                            className="game-image"
                            onClick={handleImageClick}
                            ref={rightImageRef}
                        />
                        {renderOverlay(rightImageRef)}
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