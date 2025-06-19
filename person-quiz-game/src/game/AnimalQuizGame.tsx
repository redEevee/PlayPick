    // ./game/AnimalQuizGame.tsx

import React, { useState } from 'react';
import './QuizGame.css';

interface Animal {
  name: string;
  imageUrl: string;
  options: string[];
}

const quizData: Animal[] = [
  {
    name: '호랑이',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Tiger.50.jpg/640px-Tiger.50.jpg',
    options: ['사자', '호랑이', '치타', '표범'],
  },
  {
    name: '기린',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Giraffe_standing.jpg/640px-Giraffe_standing.jpg',
    options: ['코끼리', '기린', '낙타', '말'],
  },
  {
    name: '펭귄',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Aptenodytes_forsteri_-Snow_Hill_Island%2C_Antarctica_-adults_and_chicks-8.jpg/640px-Aptenodytes_forsteri_-Snow_Hill_Island%2C_Antarctica_-adults_and_chicks-8.jpg',
    options: ['펭귄', '백조', '오리', '갈매기'],
  },
];

const AnimalQuizGame: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const startGame = () => {
    setGameStarted(true);
  };

  const currentQuestion = quizData[currentIndex];

  const handleOptionClick = (option: string) => {
    setSelectedAnswer(option);
    setShowResult(true);

    setTimeout(() => {
      setShowResult(false);
      setSelectedAnswer(null);
      setCurrentIndex((prev) => (prev + 1) % quizData.length);
    }, 1000);
  };

  if (!gameStarted) {
    return (
      <div className="quiz-intro">
        <h2>동물 퀴즈</h2>
        <p>사진을 보고 어떤 동물인지 맞혀보세요!</p>
        <button className="start-button" onClick={startGame}>시작하기</button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="flag-container">
        <img src={currentQuestion.imageUrl} alt={currentQuestion.name} className="flag-image" />
      </div>
      <div className="options-container">
        {currentQuestion.options.map((option) => (
          <button
            key={option}
            className={`option-button ${
              showResult
                ? option === currentQuestion.name
                  ? 'correct'
                  : option === selectedAnswer
                  ? 'incorrect'
                  : ''
                : ''
            }`}
            onClick={() => handleOptionClick(option)}
            disabled={showResult}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AnimalQuizGame;
