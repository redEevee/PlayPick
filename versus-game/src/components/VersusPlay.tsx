import React, { useState, useEffect } from 'react';
import { GameItem, getRandomPair, getFilteredDatasets, getRandomPairFromFiltered, getAllItems } from '../data/gameData';
import './VersusPlay.css';
import { useNavigate } from 'react-router-dom';

interface GameStats {
  totalGames: number;
  wins: { [key: number]: number };
}

interface VersusPlayProps {
  gameIds?: number[];
  categoryId?: number;
  selectedRound?: number;
  onBackToCategories?: () => void;
}

const VersusPlay: React.FC<VersusPlayProps> = ({ gameIds, categoryId, selectedRound = 4, onBackToCategories }) => {
  const [currentPair, setCurrentPair] = useState<[GameItem, GameItem] | null>(null);
  const [usedItemIds, setUsedItemIds] = useState<number[]>([]);
  const [stats, setStats] = useState<GameStats>({ totalGames: 0, wins: {} });
  const [gameHistory, setGameHistory] = useState<{ winner: GameItem; loser: GameItem }[]>([]);
  const [showStats, setShowStats] = useState(false);
  const [winnerAnimation, setWinnerAnimation] = useState<'left' | 'right' | null>(null);
  const [filteredDatasets, setFilteredDatasets] = useState<GameItem[]>([]);
  const [gameItems, setGameItems] = useState<GameItem[]>([]);
  
  // 토너먼트 관련 상태
  const [tournamentRounds, setTournamentRounds] = useState<GameItem[][]>([]);
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [winners, setWinners] = useState<GameItem[]>([]);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [champion, setChampion] = useState<GameItem | null>(null);

  const navigate = useNavigate();
  // 게임 완료 여부 확인
  const isComplete = isGameComplete && champion;

  // 라운드에 따라 필요한 아이템 개수 계산 (4강 = 8개, 8강 = 16개)
  const getRequiredItemCount = (round: number) => {
    return round === 4 ? 8 : 16;
  };

  // 토너먼트 초기화
  const initializeTournament = (items: GameItem[]) => {
    const shuffledItems = [...items].sort(() => Math.random() - 0.5);
    setTournamentRounds([shuffledItems]);
    setCurrentRoundIndex(0);
    setCurrentMatchIndex(0);
    setWinners([]);
    setIsGameComplete(false);
    setChampion(null);
    
    // 첫 번째 매치 설정
    if (shuffledItems.length >= 2) {
      setCurrentPair([shuffledItems[0], shuffledItems[1]]);
    }
  };

  useEffect(() => {
    const requiredCount = getRequiredItemCount(selectedRound);
    
    if (gameIds && gameIds.length > 0) {
      const filtered = getFilteredDatasets(gameIds);
      // 필요한 개수만큼만 아이템 선택
      const selectedItems = filtered.slice(0, requiredCount);
      setFilteredDatasets(selectedItems);
      setGameItems(selectedItems);
      
      if (selectedItems.length >= 2) {
        initializeTournament(selectedItems);
      }
    } else {
      // 전체 카테고리에서 필요한 개수만큼 선택
      const allItems = getAllItems();
      const selectedItems = allItems.slice(0, requiredCount);
      setGameItems(selectedItems);
      
      if (selectedItems.length >= 2) {
        initializeTournament(selectedItems);
      }
    }
  }, [gameIds, selectedRound]);

  const handleChoice = (winner: GameItem, loser: GameItem) => {
    setWinnerAnimation(currentPair![0].id === winner.id ? 'left' : 'right');
    
    setTimeout(() => {
      setStats(prev => ({
        totalGames: prev.totalGames + 1,
        wins: {
          ...prev.wins,
          [winner.id]: (prev.wins[winner.id] || 0) + 1
        }
      }));

      setGameHistory(prev => [...prev, { winner, loser }]);
      
      // 승자를 winners 배열에 추가
      const newWinners = [...winners, winner];
      setWinners(newWinners);
      
      const currentRound = tournamentRounds[currentRoundIndex];
      const nextMatchIndex = currentMatchIndex + 2; // 다음 매치는 2개씩 건너뛰기
      
      // 현재 라운드의 모든 매치가 끝났는지 확인
      if (nextMatchIndex >= currentRound.length) {
        // 현재 라운드 완료
        if (newWinners.length === 1) {
          // 토너먼트 완료 - 챔피언 결정
          setChampion(newWinners[0]);
          setIsGameComplete(true);
          setCurrentPair(null);
        } else {
          // 다음 라운드로 진행 - 승자들로 새로운 라운드 구성
          setTournamentRounds(prev => [...prev, newWinners]);
          setCurrentRoundIndex(prev => prev + 1);
          setCurrentMatchIndex(0);
          setWinners([]);
          
          // 다음 라운드 첫 매치 설정
          if (newWinners.length >= 2) {
            setCurrentPair([newWinners[0], newWinners[1]]);
          }
        }
      } else {
        // 같은 라운드 내 다음 매치
        setCurrentMatchIndex(nextMatchIndex);
        if (nextMatchIndex + 1 < currentRound.length) {
          setCurrentPair([currentRound[nextMatchIndex], currentRound[nextMatchIndex + 1]]);
        }
      }
      
      setWinnerAnimation(null);
    }, 1000);
  };

  const resetGame = () => {
    navigate("/");
  };

  const getRoundName = () => {
    const currentRound = tournamentRounds[currentRoundIndex];
    if (!currentRound) return '';
    
    const roundSize = currentRound.length;
    if (roundSize === 2) return '결승';
    if (roundSize === 4) return '준결승';
    if (roundSize === 8) return '4강';
    if (roundSize === 16) return '8강';
    return `${roundSize}강`;
  };

  if (!currentPair && !isGameComplete) {
    return <div className="loading">게임을 로딩 중...</div>;
  }

  if (isGameComplete && champion) {
    return (
      <div className="versus-play">
        <div className="game-complete">
          <h2>🏆 게임 완료!</h2>
          <div className="champion-container">
            <img src={champion.image} alt={champion.name} className="champion-image" />
            <h3 className="champion-name">{champion.name}</h3>
            <p className="champion-description">{champion.description}</p>
          </div>
          <button onClick={resetGame}>게임종료</button>
        </div>
      </div>
    );
  }

  if (!currentPair) {
    return <div className="loading">게임을 로딩 중...</div>;
  }

  const [leftItem, rightItem] = currentPair;

  return (
    <div className="versus-play">
      <header className="game-header">
        <h1> 가장 최악은 ? </h1>
        <div className="game-info">
          <span>라운드: {getRoundName()}</span>
        </div>
      </header>

      {showStats && (
        <div className="stats-panel">
          <h3>게임 통계</h3>
          <div className="stats-grid">
            {gameHistory.length > 0 && (
              <div className="recent-games">
                <h4>최근 게임 결과:</h4>
                {gameHistory.slice(-5).reverse().map((game, index) => (
                  <div key={index} className="game-result">
                    <span className="winner">{game.winner.image} {game.winner.name}</span>
                    <span className="vs">vs</span>
                    <span className="loser">{game.loser.image} {game.loser.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="game-arena">
        <div 
          className={`game-card ${winnerAnimation === 'left' ? 'winner' : ''}`}
          onClick={() => handleChoice(leftItem, rightItem)}
        >
          <div className="card-content">
            <div className="item-image-container">
              <img src={leftItem.image} alt={leftItem.name} className="item-image" />
            </div>
            <div className="item-info">
              <h3 className="item-name">{leftItem.name}</h3>
              <p className="item-description">{leftItem.description}</p>
              <div className="item-category">{leftItem.category}</div>
            </div>
          </div>
          <div className="card-overlay">
            <div className="click-indicator">클릭!</div>
          </div>
        </div>

        <div className="versus-indicator">
          <span className="vs-text">VS</span>
          <div className="vs-circle"></div>
        </div>

        <div 
          className={`game-card ${winnerAnimation === 'right' ? 'winner' : ''}`}
          onClick={() => handleChoice(rightItem, leftItem)}
        >
          <div className="card-content">
            <div className="item-image-container">
              <img src={rightItem.image} alt={rightItem.name} className="item-image" />
            </div>
            <div className="item-info">
              <h3 className="item-name">{rightItem.name}</h3>
              <p className="item-description">{rightItem.description}</p>
              <div className="item-category">{rightItem.category}</div>
            </div>
          </div>
          <div className="card-overlay">
            <div className="click-indicator">클릭!</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VersusPlay;
