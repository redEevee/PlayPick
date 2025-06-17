import React, { useState, useEffect } from 'react';
import { GameItem, getRandomPair, getFilteredDatasets, getRandomPairFromFiltered } from '../data/gameData';
import './VersusPlay.css';

interface GameStats {
  totalGames: number;
  wins: { [key: number]: number };
}

interface VersusPlayProps {
  gameIds?: number[];
}

const VersusPlay: React.FC<VersusPlayProps> = ({ gameIds }) => {
  const [currentPair, setCurrentPair] = useState<[GameItem, GameItem] | null>(null);
  const [usedItemIds, setUsedItemIds] = useState<number[]>([]);
  const [stats, setStats] = useState<GameStats>({ totalGames: 0, wins: {} });
  const [gameHistory, setGameHistory] = useState<{ winner: GameItem; loser: GameItem }[]>([]);
  const [showStats, setShowStats] = useState(false);
  const [winnerAnimation, setWinnerAnimation] = useState<'left' | 'right' | null>(null);
  const [filteredDatasets, setFilteredDatasets] = useState<GameItem[]>([]);

  useEffect(() => {
    if (gameIds && gameIds.length > 0) {
      const filtered = getFilteredDatasets(gameIds);
      setFilteredDatasets(filtered);
      if (filtered.length >= 2) {
        const pair = getRandomPairFromFiltered(filtered);
        setCurrentPair(pair);
      }
    } else {
      const pair = getRandomPair();
      setCurrentPair(pair);
    }
  }, [gameIds]);

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

      const newUsedIds = [...usedItemIds, winner.id, loser.id];
      setUsedItemIds(newUsedIds);

      const newPair = gameIds && gameIds.length > 0 
        ? getRandomPairFromFiltered(filteredDatasets, newUsedIds)
        : getRandomPair(newUsedIds);
      setCurrentPair(newPair);
      setWinnerAnimation(null);
    }, 1000);
  };

  const resetGame = () => {
    setUsedItemIds([]);
    setStats({ totalGames: 0, wins: {} });
    setGameHistory([]);
    const pair = gameIds && gameIds.length > 0 
      ? getRandomPairFromFiltered(filteredDatasets)
      : getRandomPair();
    setCurrentPair(pair);
    setShowStats(false);
  };

  const getWinRate = (itemId: number): number => {
    const wins = stats.wins[itemId] || 0;
    return stats.totalGames > 0 ? (wins / stats.totalGames) * 100 : 0;
  };

  if (!currentPair) {
    return <div className="loading">게임을 로딩 중...</div>;
  }

  const [leftItem, rightItem] = currentPair;

  return (
    <div className="versus-play">
      <header className="game-header">
        <h1> Versus Game</h1>
        <div className="game-info">
          <span>게임 횟수: {stats.totalGames}</span>

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
            <div className="item-image">{leftItem.image}</div>
            <h3 className="item-name">{leftItem.name}</h3>
            <p className="item-description">{leftItem.description}</p>
            <div className="item-category">{leftItem.category}</div>
            {stats.wins[leftItem.id] && (
              <div className="win-count">
                승리: {stats.wins[leftItem.id]}회 ({getWinRate(leftItem.id).toFixed(1)}%)
              </div>
            )}
          </div>
        </div>

        <div className="versus-indicator">
          <span className="vs-text">VS</span>
        </div>

        <div 
          className={`game-card ${winnerAnimation === 'right' ? 'winner' : ''}`}
          onClick={() => handleChoice(rightItem, leftItem)}
        >
          <div className="card-content">
            <div className="item-image">{rightItem.image}</div>
            <h3 className="item-name">{rightItem.name}</h3>
            <p className="item-description">{rightItem.description}</p>
            <div className="item-category">{rightItem.category}</div>
            {stats.wins[rightItem.id] && (
              <div className="win-count">
                승리: {stats.wins[rightItem.id]}회 ({getWinRate(rightItem.id).toFixed(1)}%)
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="game-instructions">
        <p>💡 두 선택지 중 더 선호하는 것을 클릭하세요!</p>
        <p>🎯 {gameIds && gameIds.length > 0 ? `${gameIds.length}개` : '32개'}의 항목으로 무한히 즐길 수 있습니다.</p>
      </div>
    </div>
  );
};

export default VersusPlay;
