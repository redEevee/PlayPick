import React, { useState, useEffect, useRef } from "react";
import "./SpotTheDifferenceGame.css";
import image01_01 from "../assets/image01_01.jpg";
import image01_02 from "../assets/image01_02.jpg";
import image02_01 from "../assets/image02_01.jpg";
import image02_02 from "../assets/image02_02.jpg";
import HeartFull from "../assets/HeartFull.png";
import HeartEmpty from "../assets/HeartEmpty.png";

// 타입 정의
type AnswerArea = {
    x: number;
    y: number;
    radius: number;
};

type Stage = {
    image1: string;
    image2: string;
    answerAreas: AnswerArea[];
};

// 문제 스테이지
const quizStages: Stage[] = [
    {
        image1: image01_01,
        image2: image01_02,
        answerAreas: [
            { x: 100, y: 80, radius: 40 },
            { x: 150, y: 120, radius: 40 },
            { x: 200, y: 150, radius: 40 },
            { x: 300, y: 220, radius: 40 },
            { x: 350, y: 260, radius: 40 },
        ],
    },
    {
        image1: image02_01,
        image2: image02_02,
        answerAreas: [
            { x: 80, y: 100, radius: 40 },
            { x: 130, y: 140, radius: 40 },
            { x: 180, y: 180, radius: 40 },
            { x: 250, y: 200, radius: 40 },
            { x: 300, y: 240, radius: 40 },
        ],
    },
];

const MAX_HINTS = 3;
const MAX_LIFE = 5;
const MAX_TIME = 60000;

const SpotTheDifferenceGame: React.FC = () => {
    const [isStarted, setIsStarted] = useState(false);
    const [currentStageIndex, setCurrentStageIndex] = useState(0);
    const currentStage = quizStages[currentStageIndex];
    const answerAreas = currentStage.answerAreas;

    const [life, setLife] = useState(MAX_LIFE);
    const [hintCount, setHintCount] = useState(0);
    const [usedHintIndexes, setUsedHintIndexes] = useState<number[]>([]);
    const [temporaryHintIndex, setTemporaryHintIndex] = useState<number | null>(null);
    const [foundAreas, setFoundAreas] = useState<number[]>([]);
    const [milliseconds, setMilliseconds] = useState(MAX_TIME);
    const [isGameOver, setIsGameOver] = useState(false);
    const [gameOverReason, setGameOverReason] = useState<"life" | "time" | "clear" | "">("");

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const hintTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // 타이머 설정
    useEffect(() => {
        if (!isStarted || isGameOver) return;

        timerRef.current = setInterval(() => {
            setMilliseconds((prev) => {
                const next = Math.max(prev - 100, 0);
                if (next === 0) {
                    setIsGameOver(true);
                    setGameOverReason("time");
                }
                return next;
            });
        }, 100);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isStarted, isGameOver]);

    // 게임 시작 전 오버레이
    const renderStartOverlay = () =>
        !isStarted && (
            <div className="game-over-overlay">
                <div className="game-over-popup">
                    <h2>틀린 그림 찾기</h2>
                    <p>두 개의 사진을 비교하여 다른 곳 5군데를 찾아보세요.</p>
                    <button className="start-button" onClick={() => setIsStarted(true)}>
                        게임 시작하기
                    </button>
                </div>
            </div>
        );

    const handleWrongClick = () => {
        setLife((prev) => {
            const next = prev - 1;
            if (next <= 0) {
                setIsGameOver(true);
                setGameOverReason("life");
                return 0;
            }
            return next;
        });
    };

    const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        const foundIndex = answerAreas.findIndex((area, idx) => {
            const dx = clickX - area.x;
            const dy = clickY - area.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance <= area.radius && !foundAreas.includes(idx);
        });

        if (foundIndex !== -1) {
            setFoundAreas([...foundAreas, foundIndex]);
        } else {
            handleWrongClick();
        }
    };

    const toggleHint = () => {
        if (hintCount >= MAX_HINTS || isGameOver) return;

        const remainingHints = answerAreas
            .map((_, index) => index)
            .filter((idx) => !foundAreas.includes(idx) && !usedHintIndexes.includes(idx));

        if (remainingHints.length === 0) return;

        const nextHintIndex = remainingHints[0];
        setHintCount((prev) => prev + 1);
        setUsedHintIndexes((prev) => [...prev, nextHintIndex]);
        setTemporaryHintIndex(nextHintIndex);

        if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
        hintTimeoutRef.current = setTimeout(() => setTemporaryHintIndex(null), 3000);
    };

    const renderOverlay = () => (
        <div className="overlay">
            {answerAreas.map((area, index) => {
                const show = foundAreas.includes(index) || index === temporaryHintIndex;
                if (!show || isGameOver) return null;

                return (
                    <div
                        key={index}
                        className={`hint-circle ${index === temporaryHintIndex ? "fade-hint" : ""}`}
                        style={{
                            left: `${area.x - area.radius}px`,
                            top: `${area.y - area.radius}px`,
                            width: `${area.radius * 2}px`,
                            height: `${area.radius * 2}px`,
                        }}
                    />
                );
            })}
        </div>
    );

    const renderGameOverOverlay = () =>
        isGameOver && (
            <div className="game-over-overlay">
                <div className="game-over-popup">
                    <h2>{gameOverReason === "clear" ? "🎉 CLEAR!" : "GAME OVER"}</h2>
                    <p>
                        {gameOverReason === "life"
                            ? "라이프를 모두 소진했습니다."
                            : gameOverReason === "time"
                                ? "시간이 모두 소진되었습니다."
                                : "축하합니다! 모든 차이를 찾았습니다."}
                    </p>
                    {gameOverReason === "clear" ? (
                        <>
                            <button className="start-button" onClick={handleNextStage}>
                                다음 단계로
                            </button>
                            <button className="start-button" onClick={() => resetGame(true)}>
                                종료하기
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="start-button" onClick={resetGame}>
                                다시 시작하기
                            </button>
                            <button className="start-button" onClick={() => resetGame(true)}>
                                종료하기
                            </button>
                        </>
                    )}
                </div>
            </div>
        );

    const resetGame = (isExit: boolean = false) => {
        if (isExit) {
            setIsStarted(false);
            return;
        }

        setCurrentStageIndex(0);
        setLife(MAX_LIFE);
        setHintCount(0);
        setTemporaryHintIndex(null);
        setUsedHintIndexes([]);
        setFoundAreas([]);
        setMilliseconds(MAX_TIME);
        setIsGameOver(false);
        setGameOverReason("");
        setIsStarted(true);
    };

    const handleNextStage = () => {
        if (currentStageIndex < quizStages.length - 1) {
            setCurrentStageIndex((prev) => prev + 1);
            setLife(MAX_LIFE);
            setHintCount(0);
            setTemporaryHintIndex(null);
            setUsedHintIndexes([]);
            setFoundAreas([]);
            setMilliseconds(MAX_TIME);
            setIsGameOver(false);
            setGameOverReason("");
        } else {
            alert("🎉 모든 스테이지를 완료했습니다!");
            setIsStarted(false);
        }
    };

    useEffect(() => {
        if (foundAreas.length === answerAreas.length && !isGameOver) {
            setIsGameOver(true);
            setGameOverReason("clear");
        }
    }, [foundAreas, answerAreas.length, isGameOver]);

    const formatTime = (ms: number): string => {
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
                    {Array.from({ length: MAX_LIFE }).map((_, i) => (
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
                            src={currentStage.image1}
                            alt="원본"
                            className="game-image"
                            onClick={handleImageClick}
                        />
                    </div>
                    <div className="image-box">
                        <img
                            src={currentStage.image2}
                            alt="다른 그림"
                            className="game-image"
                            onClick={handleImageClick}
                        />
                    </div>
                    {renderOverlay()}
                </div>

                <div className="status-container">
                    <div className="timer-box">{formatTime(milliseconds)}</div>
                    <div
                        className={`hint-box ${hintCount >= MAX_HINTS || isGameOver ? "disabled" : ""}`}
                        onClick={toggleHint}
                    >
                        HINT ({MAX_HINTS - hintCount})
                    </div>
                </div>
            </div>

            {renderStartOverlay()}
            {renderGameOverOverlay()}
        </div>
    );
};

export default SpotTheDifferenceGame;
