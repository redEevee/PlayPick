import React, { useState } from 'react';
import "./VersusGame.css";

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
}

const VersusGame: React.FC<VersusGameProps> = ({ onBackToLanding }) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [gameStatus, setGameStatus] = useState("Ready");

  const categories: VersusCategory[] = [
    {
      id: 1,
      title: "가장 최악의 상황 고르기",
      description: "어떤 상황이 더 최악일까요",
      icon: "",
      color: "from-pink-400 to-rose-500",
      imageUrl: "http://localhost:3004/slic.jpeg",
      participantCount: 32,
      difficulty: "popular",
      status: "Yes"
    },
    {
      id: 2,
      title: "애니메이션 캐릭터",
      description: "최고의 애니메이션 캐릭터를 가려보세요",
      icon: "🌟",
      color: "from-purple-400 to-indigo-500",
      imageUrl: "/api/placeholder/300/200",
      participantCount: 16,
      difficulty: "Easy",
      status: "No"
    },
    {
      id: 3,
      title: "영화 배우",
      description: "할리우드부터 한국까지, 최고의 배우는?",
      icon: "🎬",
      color: "from-amber-400 to-orange-500",
      imageUrl: "/api/placeholder/300/200",
      participantCount: 32,
      difficulty: "Hard",
      status: "No"
    },
    {
      id: 4,
      title: "음식",
      description: "전 세계 음식 중 최고의 맛을 찾아보세요",
      icon: "🍕",
      color: "from-green-400 to-emerald-500",
      imageUrl: "/api/placeholder/300/200",
      participantCount: 16,
      difficulty: "Easy",
      status: "No"
    },
    {
      id: 5,
      title: "여행지",
      description: "꿈의 여행지를 선택해보세요",
      icon: "✈️",
      color: "from-blue-400 to-cyan-500",
      imageUrl: "/api/placeholder/300/200",
      participantCount: 32,
      difficulty: "Normal",
      status: "No"
    },
    {
      id: 6,
      title: "자동차",
      description: "최고의 드림카를 선택해보세요",
      icon: "🚗",
      color: "from-gray-400 to-slate-500",
      imageUrl: "/api/placeholder/300/200",
      participantCount: 16,
      difficulty: "Hard",
      status: "No"
    },
    {
      id: 7,
      title: "게임",
      description: "역대 최고의 게임을 가려보세요",
      icon: "🎮",
      color: "from-violet-400 to-purple-500",
      imageUrl: "/api/placeholder/300/200",
      participantCount: 32,
      difficulty: "Normal",
      status: "No"
    },
    {
      id: 8,
      title: "패션 브랜드",
      description: "최고의 럭셔리 브랜드는?",
      icon: "👗",
      color: "from-rose-400 to-pink-500",
      imageUrl: "/api/placeholder/300/200",
      participantCount: 16,
      difficulty: "Hard",
      status: "No"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Normal': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId);
    console.log('게임 시작:', categoryId);
    setGameStatus("start");
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
                  어떤 <span className="hero-highlight">카테고리</span>에서<br />
                  <span className="hero-highlight">승부</span>를 겨뤄볼까요?
                </h1>
                <p className="versus-description">
                  vsvsvsvsvsvsvsv svsvsvsvsvs vsvs
                </p>
              </div>

              <div className="categories-grid">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className={`category-card ${selectedCategory === category.id ? 'selected' : ''}`}
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
                  {categories.slice(0, 3).map((category) => (
                      <div key={category.id} className="popular-card">
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
              <h2>게임 진행 중: 카테고리 ID {selectedCategory}</h2>
              <button onClick={() => setGameStatus("end")}>게임 끝내기</button>
            </div>
        ) : (
            <div className="game-end-screen">
              <h2>게임이 종료되었습니다!</h2>
              <button onClick={handleBackToLanding}>처음으로 돌아가기</button>
            </div>
        )}
      </div>
  );
};

export default VersusGame;
