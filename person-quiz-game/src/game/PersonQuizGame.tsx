// src/game/PersonQuizGame.tsx
import React, { useState, useCallback } from 'react';
import './PersonQuizGame.css';

// --- 이미지 파일 임포트 ---
// 경로를 'asset' (s가 없는) 폴더로 수정했습니다.
// 파일명과 확장자가 정확한지 다시 한번 확인해주세요! (예: .jpg, .png 등)
import person1Img from '../asset/person1.jpg'; // 모차르트
import person2Img from '../asset/person2.jpg';
import person3Img from '../asset/person3.jpg';
import person4Img from '../asset/person4.jpg';
import person5Img from '../asset/person5.jpg';
import person6Img from '../asset/person6.jpg';
import person7Img from '../asset/person7.jpg';
import person8Img from '../asset/person8.jpg';
import person9Img from '../asset/person9.jpg';
import person10Img from '../asset/person10.jpg';
import person11Img from '../asset/person11.jpg'; // 예지
import person12Img from '../asset/person12.jpg'; // 뷔
import person13Img from '../asset/person13.jpg'; // 손석구
import person14Img from '../asset/person14.jpg'; // 손흥민
import person15Img from '../asset/person15.jpg'; // 김연경
import person16Img from '../asset/person16.jpg'; // 정찬성
import person17Img from '../asset/person17.jpg'; // 오바마
import person18Img from '../asset/person18.jpg'; // 간디
import person19Img from '../asset/person19.jpg'; // 트럼프
import person20Img from '../asset/person20.jpg'; // 김동현
// -------------------------

// 퀴즈 데이터의 타입 정의 (이전과 동일)
interface QuizItem {
  id: number;
  imageUrl: string;
  answer: string;
}

// 모든 퀴즈 데이터 (10명) - 이미지 변수명은 변경 없음
const allQuizData: QuizItem[] = [
  { id: 1, imageUrl: person1Img, answer: '모차르트' },
  { id: 2, imageUrl: person2Img, answer: '안유진' },
  { id: 3, imageUrl: person3Img, answer: '아이유' },
  { id: 4, imageUrl: person4Img, answer: '박찬호' },
  { id: 5, imageUrl: person5Img, answer: '박정민' },
  { id: 6, imageUrl: person6Img, answer: '이말년' },
  { id: 7, imageUrl: person7Img, answer: '세종대왕' },
  { id: 8, imageUrl: person8Img, answer: '조진웅' },
  { id: 9, imageUrl: person9Img, answer: '일론머스크' },
  { id: 10, imageUrl: person10Img, answer: '제니' },
  // 새롭게 추가된 데이터
  { id: 11, imageUrl: person11Img, answer: '예지' },
  { id: 12, imageUrl: person12Img, answer: '뷔' },
  { id: 13, imageUrl: person13Img, answer: '손석구' },
  { id: 14, imageUrl: person14Img, answer: '손흥민' },
  { id: 15, imageUrl: person15Img, answer: '김연경' },
  { id: 16, imageUrl: person16Img, answer: '정찬성' },
  { id: 17, imageUrl: person17Img, answer: '오바마' },
  { id: 18, imageUrl: person18Img, answer: '간디' },
  { id: 19, imageUrl: person19Img, answer: '트럼프' },
  { id: 20, imageUrl: person20Img, answer: '김동현' },
];

const NUMBER_OF_QUESTIONS = 10; // 퀴즈에서 풀 문제의 개수 (10문제)

const PersonQuizGame: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>('');
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string>(''); // 정답/오답 피드백
  const [quizStarted, setQuizStarted] = useState<boolean>(false); // 퀴즈 시작 여부
  const [selectedQuizData, setSelectedQuizData] = useState<QuizItem[]>([]); // 랜덤으로 선택된 5문제

  // 퀴즈 시작 시 NUMBER_OF_QUESTIONS 개수만큼 문제를 랜덤으로 선택하는 함수
  const initializeQuiz = useCallback(() => {
    // 배열을 섞어서 원하는 개수만큼 선택
    const shuffled = [...allQuizData].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, NUMBER_OF_QUESTIONS);
    setSelectedQuizData(selected);

    // 퀴즈 상태 초기화
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserInput('');
    setQuizFinished(false);
    setFeedbackMessage('');
    setQuizStarted(true); // 퀴즈 시작 상태로 변경
  }, []); // 이 함수는 컴포넌트 마운트 시 한 번만 생성됩니다.

  const currentQuestion: QuizItem | undefined = selectedQuizData[currentQuestionIndex];

  // 정답 제출 핸들러
  const handleSubmitAnswer = () => {
    // 퀴즈 종료 상태이거나 현재 문제가 없거나 이미 피드백이 있는 경우 (중복 제출 방지)
    if (quizFinished || !currentQuestion || feedbackMessage) return;

    const isCorrect = userInput.trim().toLowerCase() === currentQuestion.answer.toLowerCase();

    if (isCorrect) {
      setScore(prevScore => prevScore + 1); // 함수형 업데이트로 정확한 최신 상태 반영
      setFeedbackMessage('정답입니다!');
    } else {
      setFeedbackMessage(`오답입니다! 정답은 '${currentQuestion.answer}' 입니다.`);
    }
  };

  // 다음 문제로 이동 핸들러
  const handleNextQuestion = () => {
    setUserInput(''); // 입력 필드 초기화
    setFeedbackMessage(''); // 피드백 메시지 초기화

    if (currentQuestionIndex < selectedQuizData.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1); // 다음 문제로
    } else {
      setQuizFinished(true); // 모든 문제를 풀었으면 퀴즈 종료
    }
  };

  // 퀴즈 재시작 핸들러
  const handleRestartQuiz = () => {
    initializeQuiz(); // 퀴즈 재시작 시 다시 10문제 랜덤 선택 및 상태 초기화
  };

  // --- UI 렌더링 부분 ---

  // 퀴즈 시작 전 화면
  if (!quizStarted) {
    return (
      <div className="quiz-container">
        <h2>인물 퀴즈 게임</h2>
        <p>20장의 사진 중 {NUMBER_OF_QUESTIONS}문제를 랜덤으로 풀어보세요!</p>
        <button className="start-button" onClick={initializeQuiz}>퀴즈 시작</button>
      </div>
    );
  }

  // 퀴즈 종료 화면
  if (quizFinished) {
    return (
      <div className="quiz-container">
        <h2>퀴즈 종료!</h2>
        <p className="final-score-display">최종 점수: {score} / {selectedQuizData.length} 입니다!</p>
        <button className="restart-button" onClick={handleRestartQuiz}>다시 시작</button>
      </div>
    );
  }

  // 퀴즈 진행 중 화면
  return (
    <div className="quiz-container content-center">
      <h2>인물 퀴즈 ({currentQuestionIndex + 1}/{selectedQuizData.length})</h2>
      {currentQuestion ? ( // currentQuestion이 있을 때만 렌더링
        <>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={currentQuestion.imageUrl} alt="인물 사진" className="person-image items-center"/>
        </div>
          <h3>이 인물은 누구일까요?</h3>
          <div className="input-area">
            <input
              type="text"
              value={userInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserInput(e.target.value)}
              onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  // Enter 키를 눌렀을 때, 피드백 메시지가 없을 경우에만 제출
                  if (e.key === 'Enter' && feedbackMessage === '') {
                      handleSubmitAnswer();
                  }
              }}
              placeholder="이름을 입력하세요"
              className="answer-input"
              disabled={feedbackMessage !== ''} // 정답 제출 후에는 입력 필드 비활성화
            />
            <button className="submit-button" onClick={handleSubmitAnswer} disabled={feedbackMessage !== ''}>
              정답 제출
            </button>
          </div>

          {feedbackMessage && ( // 피드백 메시지가 있을 때만 표시
            <p className={`feedback-message ${feedbackMessage.includes('정답입니다') ? 'correct' : 'wrong'}`}>
              {feedbackMessage}
            </p>
          )}

          {feedbackMessage && ( // 피드백 메시지가 있을 때만 다음 문제 버튼 표시
            <button className="next-button" onClick={handleNextQuestion}>
              {currentQuestionIndex < selectedQuizData.length - 1 ? '다음 문제' : '결과 보기'}
            </button>
          )}

          <p className="current-score-display">현재 점수: {score}</p>
        </>
      ) : (
        <p>문제를 불러오는 중...</p> // 데이터가 아직 로드되지 않았을 경우
      )}
    </div>
  );
};

export default PersonQuizGame;