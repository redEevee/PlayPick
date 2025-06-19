import React, { useState, useEffect, useRef } from "react";
import "./SpotTheDifferenceGame.css";

import image01_01 from "../assets/image01_01.jpg";
import image01_02 from "../assets/image01_02.jpg";
import image02_01 from "../assets/image02_01.jpg";
import image02_02 from "../assets/image02_02.jpg";
import image03_01 from "../assets/image03_01.jpg";
import image03_02 from "../assets/image03_02.jpg";

import HeartFull from "../assets/HeartFull.png";
import HeartEmpty from "../assets/HeartEmpty.png";

const imageGroups = [
    {
        left: image01_01,
        right: image01_02,
        answerAreas: [
            { x: 789.2, y: 158.0, radius: 60 },
            { x: 196.8, y: 226.1, radius: 60 },
            { x: 134.1, y: 468.1, radius: 60 },
            { x: 540.5, y: 441.6, radius: 60 },
            { x: 1046.5, y: 689.3, radius: 60 },
        ],
    },
    {
        left: image02_01,
        right: image02_02,
        answerAreas: [
            { x: 934.1, y: 241.2, radius: 60 },
            { x: 1087.6, y: 271.4, radius: 60 },
            { x: 1156.8, y: 583.4, radius: 60 },
            { x: 927.6, y: 632.6, radius: 60 },
            { x: 525.4, y: 367.9, radius: 60 },
        ],
    },
    {
        left: image03_01,
        right: image03_02,
        answerAreas: [
            { x: 624.9, y: 135.3, radius: 60 },
            { x: 540.5, y: 441.6, radius: 60 },
            { x: 298.4, y: 383.0, radius: 60 },
            { x: 309.2, y: 712.0, radius: 60 },
            { x: 1035.7, y: 505.9, radius: 60 },
        ],
    },
];

const SpotTheDifferenceGame = () => {
    const [stageIndex, setStageIndex] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    const [life, setLife] = useState(5);
    const [hintCount, setHintCount] = useState(0);
    const [temporaryHintIndex, setTemporaryHintIndex] = useState(null);
    const [foundAreas, setFoundAreas] = useState([]);
    const [milliseconds, setMilliseconds] = useState(60000);

    const [isStageCleared, setIsStageCleared] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);

    const leftImageRef = useRef(null);
    const rightImageRef = useRef(null);
    const hintTimeoutRef = useRef(null);

    const MAX_HINTS = 3;
    const currentStage = imageGroups[stageIndex];
    const answerAreas = currentStage.answerAreas;

    const handleStart = () => setIsStarted(true);

    useEffect(() => {
        if (!isStarted || isGameOver || isStageCleared) return;

        const timer = setInterval(() => {
            setMilliseconds((prev) => {
                const updated = Math.max(prev - 100, 0);
                if (updated === 0) {
                    setIsGameOver(true); // 시간 다 되면 GAME OVER 상태로 전환
                }
                return updated;
            });
        }, 100);

        return () => clearInterval(timer);
    }, [isStarted, isGameOver, isStageCleared]);


    useEffect(() => {
        if (isStageCleared) {
            const container = document.querySelector(".gameover-overlay");
            if (container) {
                for (let i = 0; i < 20; i++) {
                    const petal = document.createElement("div");
                    petal.className = "flower-burst";

                    const angle = Math.random() * 2 * Math.PI;
                    const distance = 100 + Math.random() * 100;
                    const dx = Math.cos(angle) * distance;
                    const dy = Math.sin(angle) * distance;

                    petal.style.left = "50%";
                    petal.style.top = "50%";
                    petal.style.setProperty("--dx", `${dx}px`);
                    petal.style.setProperty("--dy", `${dy}px`);

                    container.appendChild(petal);

                    setTimeout(() => petal.remove(), 1000);
                }
            }
        }
    }, [isStageCleared]);

    const handleWrongClick = () => {
        setLife((prev) => {
            const updated = Math.max(prev - 1, 0);
            if (updated === 0) {
                setIsGameOver(true);
            }
            return updated;
        });
    };

    const handleImageClick = (e) => {
        e.stopPropagation();
        const rect = e.target.getBoundingClientRect();
        const scaleX = 1280 / rect.width;
        const scaleY = 720 / rect.height;

        const clickX = (e.clientX - rect.left) * scaleX;
        const clickY = (e.clientY - rect.top) * scaleY;

        const foundIndex = answerAreas.findIndex((area, index) => {
            const dx = clickX - area.x;
            const dy = clickY - area.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance <= area.radius && !foundAreas.includes(index);
        });

        if (foundIndex !== -1) {
            const updatedFound = [...foundAreas, foundIndex];
            setFoundAreas(updatedFound);
            if (updatedFound.length === answerAreas.length) setIsStageCleared(true);
        } else {
            handleWrongClick();
        }
    };

    const [usedHintIndexes, setUsedHintIndexes] = useState([]);

    const toggleHint = () => {
        if (hintCount >= MAX_HINTS) return;

        const remainingHints = answerAreas
            .map((_, index) => index)
            .filter(
                (index) =>
                    !foundAreas.includes(index) &&
                    index !== temporaryHintIndex &&
                    !usedHintIndexes.includes(index)
            );

        if (remainingHints.length === 0) return;

        const nextIndex = remainingHints[0];
        if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);

        setTemporaryHintIndex(nextIndex);
        setHintCount((prev) => prev + 1);
        setUsedHintIndexes((prev) => [...prev, nextIndex]);

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
                                transform: "translate(-50%, -50%)",
                            }}
                        />
                    );
                })}
            </div>
        );
    };

    const formatTime = (ms) => {
        const sec = String(Math.floor(ms / 1000)).padStart(2, "0");
        const msec = String(Math.floor((ms % 1000) / 10)).padStart(2, "0");
        return `${sec}:${msec}`;
    };

    const goToNextStage = () => {
        if (stageIndex >= imageGroups.length - 1) return;
        setStageIndex((prev) => prev + 1);
        setFoundAreas([]);
        setHintCount(0);
        setLife(5);
        setMilliseconds(60000);
        setUsedHintIndexes([]);
        setIsStageCleared(false);
    };

    const handleExit = () => {
        // 예: confirm 창 띄우기 또는 메인화면으로 이동
        const confirmed = window.confirm("게임을 종료하시겠습니까?");
        if (confirmed) {
            window.close(); // 또는 메인화면 리디렉션
        }
    };

    return (
        <div>
            {isGameOver && (
                <div className="gameover-overlay">
                    <div className="gameover-container">
                        <h2>💀 GAME OVER 💀</h2>
                        <button onClick={() => {
                            setIsStarted(true);        // 게임 다시 시작
                            setIsGameOver(false);      // 게임오버 상태 해제
                            setLife(5);                // 라이프 복구
                            setMilliseconds(60000);    // 타이머 초기화
                            setFoundAreas([]);         // 정답 찾은 위치 초기화
                            setHintCount(0);           // 힌트 수 초기화
                            setUsedHintIndexes([]);    // 사용한 힌트 초기화
                        }}>
                            다시 시작
                        </button>
                        <button onClick={handleExit}>종료하기</button>
                    </div>
                </div>
            )}

            {isStageCleared && (
                <div className="gameover-overlay">
                    <div className="sparkle-container" />
                    <div className="gameover-container">
                        <h2>
                            {stageIndex === imageGroups.length - 1 ? (
                                <>
                                    모든 스테이지를 통과하셨습니다!
                                    <br />
                                    🎉 축하합니다! 🎉
                                </>
                            ) : (
                                "🎉 정답을 모두 맞췄어요!"
                            )}
                        </h2>

                        {stageIndex === imageGroups.length - 1 ? (
                            <button onClick={() => setIsStarted(false)}>종료하기</button>
                        ) : (
                            <button
                                onClick={() => {
                                    goToNextStage();
                                }}
                            >
                                다음 문제 풀기
                            </button>
                        )}

                        {/* 마지막 스테이지든 아니든 종료 버튼은 항상 제공 */}
                        {stageIndex !== imageGroups.length - 1 && (
                            <button onClick={() => setIsStarted(false)}>종료하기</button>
                        )}
                    </div>
                </div>
            )}

            {!isStarted && (
                <div className="start-screen">
                    <div className="start-card">
                        <div className="magnifier-icon" />
                        <div className="game-title">틀린 그림 찾기</div>
                        <p className="start-subtitle">
                            제한 시간 안에 두 그림 속 <br />5가지 차이점을 모두 찾아보세요!
                        </p>
                        <button className="start-button" onClick={handleStart}>게임 시작하기</button>
                    </div>
                </div>
            )}

            {isStarted && (
                <div className="gradient-bg">
                    <h1 className="title">틀린 그림 찾기</h1>
                    <h5 className="subtitle">제한 시간 안에 두 그림 속 5가지 차이점을 모두 찾아보세요!</h5>

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
                                src={currentStage.left}
                                alt="틀린 그림1"
                                className="game-image"
                                onClick={handleImageClick}
                                ref={leftImageRef}
                            />
                            {renderOverlay(leftImageRef)}
                        </div>
                        <div className="image-box">
                            <img
                                src={currentStage.right}
                                alt="틀린 그림2"
                                className="game-image"
                                onClick={handleImageClick}
                                ref={rightImageRef}
                            />
                            {renderOverlay(rightImageRef)}
                        </div>
                    </div>

                    <div className="status-container">
                        <div className="timer-box">{formatTime(milliseconds)}</div>
                        <div
                            className={`hint-box ${hintCount >= MAX_HINTS ? "disabled" : ""}`}
                            onClick={toggleHint}
                        >
                            HINT ({MAX_HINTS - hintCount})
                        </div>

                        {/* 테스트 수행 후 아래 버튼은 비활성화할 것*/}
                        {!isStageCleared && (
                            <button className="hint-box" onClick={goToNextStage}>다음 문제 →</button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SpotTheDifferenceGame;