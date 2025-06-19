import React, { useState } from 'react';
import "./VersusGame.css";
import VersusPlay from "./components/VersusPlay.tsx";
import { getAllCategories, getCategoryIds } from "./data/gameData";

interface VersusGameProps {
  onBackToLanding: () => void;
}

interface VersusCategory {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  imageUrl: string;
  participantCount: number;
  difficulty: 'Easy' | 'Normal' | 'Hard' | 'popular';
  status: 'No' | 'Yes';
  categoryName?: string;
}

const VersusGame: React.FC<VersusGameProps> = ({ onBackToLanding }) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [gameStatus, setGameStatus] = useState("Ready");
  const [selectedGameIds, setSelectedGameIds] = useState<number[]>([]);
  const [showRoundModal, setShowRoundModal] = useState(false);
  const [selectedRound, setSelectedRound] = useState<number>(4);
  const [currentCategory, setCurrentCategory] = useState<VersusCategory | null>(null);

  const categories: VersusCategory[] = [
    {
      id: 1,
      title: "가장 최악인 상황은 ?",
      description: "최악의 상황중 최악의 상황을 골라보세요",
      icon: "",
      color: "from-pink-400 to-rose-500",
      imageUrl: "http://localhost:3004/slic.jpeg",
      participantCount: 16,
      difficulty: "popular",
      status: "Yes",
      categoryName: "가장 최악인 상황은 ?"
    },
    {
      id: 2,
      title: "남사친 여사친",
      description: `너는 남녀사이에 친구가 있다고 생각해? / 어디까지가 친구일까?`,
      icon: "",
      color: "from-purple-400 to-indigo-500",
      imageUrl: "/api/placeholder/300/200",
      participantCount: 8,
      difficulty: "Easy",
      status: "No",
      categoryName: "스포츠"
    },
    {
      id: 3,
      title: "최악의 소개팅 상대",
      description: "",
      icon: "",
      color: "from-orange-400 to-red-500",
      imageUrl: "/api/placeholder/300/200",
      participantCount: 8,
      difficulty: "Easy",
      status: "No",
      categoryName: "동물"
    },
    {
      id: 4,
      title: "가장 키우고 싶은 동물?",
      description: "가장 재미있는 취미 활동은?",
      icon: "",
      color: "from-green-400 to-emerald-500",
      imageUrl: "/api/placeholder/300/200",
      participantCount: 8,
      difficulty: "Easy",
      status: "No",
      categoryName: "취미"
    },
    {
      id: 5,
      title: "준비중",
      description: "준     비     중 ",
      icon: "",
      color: "from-blue-400 to-cyan-500",
      imageUrl: "/api/placeholder/300/200",
      participantCount: 32,
      difficulty: "Hard",
      status: "No",
      categoryName: "전체"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Normal': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      case 'popular': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const roundOptions = [
    { value: 4, label: '4강' },
    { value: 8, label: '8강' },
    { value: 16, label: '16강' }
  ];

  const handleCategorySelect = (categoryId: number) => {
    const selectedCat = categories.find(cat => cat.id === categoryId);
    if (!selectedCat || selectedCat.status === "No") return;
    
    setCurrentCategory(selectedCat);
    setShowRoundModal(true);
  };

  const handleRoundSelect = (round: number) => {
    setSelectedRound(round);
  };

  const handleStartGame = () => {
    if (!currentCategory) return;
    
    setSelectedCategory(currentCategory.id);
    
    if (currentCategory.categoryName === "전체") {
      setSelectedGameIds([]);
    } else if (currentCategory.categoryName) {
      const ids = getCategoryIds(currentCategory.categoryName);
      setSelectedGameIds(ids);
    }
    
    setShowRoundModal(false);
    setGameStatus("start");
  };

  const handleCloseModal = () => {
    setShowRoundModal(false);
    setCurrentCategory(null);
  };

  const handleBackToCategories = () => {
    setGameStatus("Ready");
    setSelectedCategory(null);
    setSelectedGameIds([]);
  };

  const handleBackToLanding = () => {
    onBackToLanding();
  };

  return (
      <div className="landing-container">
        {gameStatus === "Ready" ? (
            <main className="main-content">
              <div className="hero">
                <h1 className="hero-title">
                  <span className="hero-highlight">Versus</span>game
                  {/*<br />*/}
                  {/*<span className="hero-highlight">승부</span>를 겨뤄볼까요?*/}
                </h1>
                <p className="versus-description">
                  원하는 카테고리를 선택하고 최고를 가려보세요!
                </p>
              </div>

              <div className="categories-grid">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className={`category-card ${selectedCategory === category.id ? 'selected' : ''} ${category.status === 'No' ? 'disabled' : ''}`}
                        onClick={() => handleCategorySelect(category.id)}
                    >
                      <div className="category-card-inner">
                        <div className="category-header">
                          <div className="category-badges">
                      <span className={`difficulty-badge ${getDifficultyColor(category.difficulty)}`}>
                        {category.difficulty}
                      </span>
                            <span className="participant-badge">
                        {category.participantCount}강
                      </span>
                          </div>
                          <div className="category-icon">
                            {category.icon}
                          </div>
                        </div>

                        {category.status === "Yes" ? (
                            <div className="category-image">
                              <img
                                  src={category.imageUrl}
                                  alt="category"
                                  className="w-full h-full object-cover"
                              />
                              <div className="image-overlay">
                                <div className="play-button">
                                  <span className="start-button text-white">START</span>
                                </div>
                              </div>
                            </div>
                        ) : (
                            <div className="non-status">
                              준 비 중
                            </div>
                        )}

                        <div className="category-content">
                          <h3 className="category-title">{category.title}</h3>
                          <p className="category-description">{category.description}</p>
                        </div>
                      </div>
                    </div>
                ))}
              </div>

              <div className="popular-section">
                <h2 className="section-title">🔥 인기 카테고리</h2>
                <div className="popular-cards">
                  {categories.filter(cat => cat.status === "Yes").slice(0, 3).map((category) => (
                      <div key={category.id} className="popular-card" onClick={() => handleCategorySelect(category.id)}>
                        <div className="popular-rank">#{category.id}</div>
                        <div className="popular-info">
                          <span className="popular-icon">{category.icon}</span>
                          <span className="popular-title">{category.title}</span>
                        </div>
                        <div className="popular-stats">
                          <span className="play-count">1.2K 플레이</span>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </main>
        ) : gameStatus === "start" ? (
            <div className="game-screen">

              <VersusPlay 
                gameIds={selectedGameIds.length > 0 ? selectedGameIds : undefined}
                categoryId={selectedCategory || undefined}
                selectedRound={selectedRound}
                onBackToCategories={handleBackToCategories}
              />
            </div>
        ) : (
            <div className="game-end-screen">
              <h2>게임이 종료되었습니다!</h2>
              <button onClick={handleBackToLanding}>처음으로 돌아가기</button>
            </div>
        )}
        
        {showRoundModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2 className="modal-title">Game</h2>
              <div className="round-options">
                {roundOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`round-button ${selectedRound === option.value ? 'selected' : ''}`}
                    onClick={() => handleRoundSelect(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <button className="start-button" onClick={handleStartGame}>시작하기</button>
              <button className="close-button" onClick={handleCloseModal}>닫기</button>
            </div>
          </div>
        )}
      </div>
  );
};

export default VersusGame;
