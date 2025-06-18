// ./game/CountryQuizGame.tsx

import React, { useState } from 'react';
import './QuizGame.css';

interface Country {
  name: string;
  flagUrl: string;
  options: string[];
}

const quizData: Country[] = [
  {
    name: '대한민국',
    flagUrl: 'https://flagcdn.com/w320/kr.png',
    options: ['일본', '대한민국', '중국', '북한'],
  },
  {
    name: '프랑스',
    flagUrl: 'https://flagcdn.com/w320/fr.png',
    options: ['독일', '이탈리아', '프랑스', '영국'],
  },
  {
    name: '브라질',
    flagUrl: 'https://flagcdn.com/w320/br.png',
    options: ['멕시코', '브라질', '콜롬비아', '아르헨티나'],
  },
];

const CountryQuizGame: React.FC = () => {
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
        <h2>나라 퀴즈</h2>
        <p>국기를 보고 나라를 맞혀보세요!</p>
        <button className="start-button" onClick={startGame}>시작하기</button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="flag-container">
        <img src={currentQuestion.flagUrl} alt={currentQuestion.name} className="flag-image" />
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

export default CountryQuizGame;
