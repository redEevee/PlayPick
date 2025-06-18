import React, { useState, useEffect, useRef } from "react";
import "./SpotTheDifferenceGame.css";
import image01_01 from "../assets/image01_01.jpg";
import image01_02 from "../assets/image01_02.jpg";
import image02_01 from "../assets/image02_01.jpg";
import image02_02 from "../assets/image02_02.jpg";
import image03_01 from "../assets/image02_01.jpg";
import image03_02 from "../assets/image02_02.jpg";
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
            { x: 75, y: 103, radius: 20 },
            { x: 51, y: 213, radius: 20 },
            { x: 210, y: 202, radius: 20 },
            { x: 308, y: 76, radius: 20 },
            { x: 407, y: 311, radius: 20 },
        ],
    },
    {
        image1: image02_01,
        image2: image02_02,
        answerAreas: [
            { x: 206, y: 168, radius: 20 },
            { x: 361, y: 286, radius: 20 },
            { x: 454, y: 266, radius: 20 },
            { x: 367, y: 110, radius: 20 },
            { x: 425, y: 126, radius: 20 },
        ],
    },
    {
        image1: image03_01,
        image2: image03_02,
        answerAreas: [
            { x: 120, y: 321, radius: 20 },
            { x: 117, y: 175, radius: 20 },
            { x: 213, y: 201, radius: 20 },
            { x: 244, y: 62, radius: 20 },
            { x: 404, y: 229, radius: 20 },
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
    const lifeRef = useRef(MAX_LIFE);

    const updateLife = (next: number) => {
        lifeRef.current = next;
        setLife(next);
    };

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

    // 클릭 시 정답 영역 판별 (좌표 보정 포함)
    const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
        if (!isStarted || isGameOver) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const naturalWidth = e.currentTarget.naturalWidth;
        const naturalHeight = e.currentTarget.naturalHeight;
        const renderedWidth = e.currentTarget.width;
        const renderedHeight = e.currentTarget.height;

        const scaleX = naturalWidth / renderedWidth;
        const scaleY = naturalHeight / renderedHeight;

        const adjustedX = x * scaleX;
        const adjustedY = y * scaleY;

        const foundIndex = answerAreas.findIndex((area, idx) => {
            if (foundAreas.includes(idx)) return false;

            const dx = adjustedX - area.x;
            const dy = adjustedY - area.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance <= area.radius;
        });

        if (foundIndex !== -1) {
            setFoundAreas([...foundAreas, foundIndex]);
        } else {
            handleWrongClick();
        }
    };

    const handleWrongClick = () => {
        if (lifeRef.current <= 1) {
            updateLife(0);
            setIsGameOver(true);
            setGameOverReason("life");
        } else {
            updateLife(lifeRef.current - 1);
        }
    };

    // 힌트 토글 (힌트 위치 표시, 3초 후 사라짐)
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

    // 힌트 및 발견된 정답 영역 표시 (좌표 렌더 크기로 보정)
    const renderOverlay = () => {
        // 첫 번째 이미지 엘리먼트 선택 (렌더된 크기 얻기 위해)
        const imageElement = document.querySelector(".image-box .game-image") as HTMLImageElement | null;
        if (!imageElement) return null;

        const renderedWidth = imageElement.clientWidth;
        const renderedHeight = imageElement.clientHeight;
        const naturalWidth = imageElement.naturalWidth;
        const naturalHeight = imageElement.naturalHeight;

        const scaleX = renderedWidth / naturalWidth;
        const scaleY = renderedHeight / naturalHeight;

        return (
            <div className="overlay">
                {answerAreas.map((area, index) => {
                    const show = foundAreas.includes(index) || index === temporaryHintIndex;
                    if (!show || isGameOver) return null;

                    return (
                        <div
                            key={index}
                            className={`hint-circle ${index === temporaryHintIndex ? "fade-hint" : ""}`}
                            style={{
                                left: `${area.x * scaleX - area.radius * scaleX}px`,
                                top: `${area.y * scaleY - area.radius * scaleY}px`,
                                width: `${area.radius * 2 * scaleX}px`,
                                height: `${area.radius * 2 * scaleY}px`,
                            }}
                        />
                    );
                })}
            </div>
        );
    };

    const renderStartOverlay = () =>
        !isStarted && !isGameOver && (
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
            setIsGameOver(false);
            return;
        }

        if (timerRef.current) clearInterval(timerRef.current);
        if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);

        setIsGameOver(false);
        setGameOverReason("");
        setCurrentStageIndex(0);

        updateLife(MAX_LIFE);
        setHintCount(0);
        setTemporaryHintIndex(null);
        setUsedHintIndexes([]);
        setFoundAreas([]);
        setMilliseconds(MAX_TIME);
        setIsStarted(true);
    };

    const handleNextStage = () => {
        if (currentStageIndex < quizStages.length - 1) {
            setCurrentStageIndex((prev) => prev + 1);
            updateLife(MAX_LIFE);
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

    // 모든 정답 찾았을 때 클리어 처리
    useEffect(() => {
        if (foundAreas.length === answerAreas.length && !isGameOver && isStarted) {
            setIsGameOver(true);
            setGameOverReason("clear");
        }
    }, [foundAreas, answerAreas.length, isGameOver, isStarted]);

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
                            onClick={isStarted && !isGameOver ? handleImageClick : undefined}
                        />
                    </div>
                    <div className="image-box">
                        <img
                            src={currentStage.image2}
                            alt="다른 그림"
                            className="game-image"
                            onClick={isStarted && !isGameOver ? handleImageClick : undefined}
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
