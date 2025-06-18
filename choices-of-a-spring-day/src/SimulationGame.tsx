import React, { useState, useEffect } from 'react';
import './SimulationGame.css';

type Dialogue = {
  id: number;
  text: string;
  background: string;
  choices?: {
    text: string;
    next: number;
  }[];
};

const SimulationGame: React.FC = () => {
  const [currentDialogue, setCurrentDialogue] = useState<number>(0);
  const [displayText, setDisplayText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState(false);
  

  const dialogues: Dialogue[] = [
    {
      id: 0,
      text: "봄날의 공원에서 길을 걷고 있던 당신, 갑자기 이상한 고양이를 만났습니다.",
      background: "http://localhost:3006/cat.PNG",
      choices: [
        { text: "고양이를 따라간다", next: 1 },
        { text: "무시하고 지나간다", next: 99 }
      ]
    },
    {
      id: 1,
      text: "고양이가 당신을 쳐다보며 말을 겁니다. \"안녕하세요, 저와 함께 모험을 떠나시겠어요?\"",
      background: "http://localhost:3006/go.jpg",
      choices: [
        { text: "네, 좋아요!", next: 2 },
        { text: "아니요, 괜찮아요.", next: 3 }
      ]
    },
    {
      id: 2,
      text: "고양이는 기뻐하며 꼬리를 흔들었습니다. \"좋아요! 함께 신나는 모험을 떠나요!\"",
      background: "http://localhost:3006/nice.jpg"
    },
    {
      id: 3,
      text: "고양이는 실망한 표정을 지었습니다. \"아쉽군요. 다음에,,, ㅠ\"",
      background: "http://localhost:3006/omg.jpg"
    },
    {
      id: 99,
      text: "고양이가 폴폴폴 떠나갑니다.  \"아쉽군요. 다음에 또 만나요!\"",
      background: "http://localhost:3006/bye.jpg"
    }
  ];


  useEffect(() => {
    console.log('Starting typing animation...');
    setIsTyping(true);
    const dialogue = dialogues.find(d => d.id === currentDialogue);
    if (!dialogue) {
      console.log('No dialogue found for id:', currentDialogue);
      return;
    }
    
    let currentIndex = 0;
    setDisplayText('');
    
    const typingInterval = setInterval(() => {
      if (currentIndex < dialogue.text.length) {
        setDisplayText(dialogue.text.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        console.log('Typing animation complete');
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 50);
    
    return () => {
      console.log('Cleaning up typing interval');
      clearInterval(typingInterval);
    };
  }, [currentDialogue]);

  const handleChoice = (nextDialogueId: number) => {
    if(nextDialogueId === 99 || nextDialogueId === 2) setIsEnd(true)
    setCurrentDialogue(nextDialogueId);
  };

  const currentDialogueData = dialogues.find(d => d.id === currentDialogue);
  
  if (!currentDialogueData) return <div>게임을 불러올 수 없습니다.</div>;
  
 
  console.log('Current Dialogue:', currentDialogueData);
  console.log('Is Typing:', isTyping);

  
  
  const handleGoHome = () => {
    // 홈으로 이동하는 로직 (예: React Router의 useNavigate 사용)
    window.location.href = '/'; // 임시로 홈으로 이동
  };

  return (
    <div className="game-container">
      <div className="background-wrapper">
        <img 
          src={currentDialogueData.background} 
          alt="배경 이미지" 
          className="simulation-background"
        />
      </div>
      <div className="simulation-container">
        <div className="dialogue-box">
          <div className="dialogue-text">
            {displayText}
            {isTyping && <span className="cursor">|</span>}
          </div>
          
          {!isTyping && currentDialogueData.choices && (
            <div className="choices-container">
              {currentDialogueData.choices.map((choice, index) => (
                <button 
                  key={index}
                  className="choice-button"
                  onClick={() => handleChoice(choice.next)}
                >
                  {choice.text}
                </button>
              ))}
            </div>
          )}

          {isEnd && !isTyping && (
            <div className="home-button-container">
              <button 
                className="home-button"
                onClick={handleGoHome}
              >
                홈으로 돌아가기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimulationGame;
