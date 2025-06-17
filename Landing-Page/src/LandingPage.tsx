import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LandingPageProps {
  onStartGame: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartGame }) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const navigate = useNavigate();

  const serviceCards = [
    {
      id: 1,
      title: "이상형 월드컵",
      description: "라라 라라랄ㄹ랄 라랄 ㅏ랄 ㅏ랄 ",
      bgColor: "card-teal",
      iconBg: "icon-bg-white",
      badge: "MULTI DRM",
      badgeStyle: "badge-teal",
      actionBtn: "action-btn-white",
      url: "/versus-game"
    },
    {
      id: 2,
      title: "틀린그림 찾기",
      description: "라라 라라랄ㄹ랄 라랄 ㅏ랄 ㅏ랄 ",
      bgColor: "card-white",
      iconBg: "icon-bg-gray",
      badge: "FREE PLAN",
      badgeStyle: "badge-white",
      actionBtn: "action-btn-teal",
      url: "/versus-game"
    },
    {
      id: 3,
      title: "인물 맞추기",
      description: "라라 라라랄ㄹ랄 라랄 ㅏ랄 ㅏ랄 ",
      bgColor: "card-blue",
      iconBg: "icon-bg-white",
      badge: "OS PLAYER",
      badgeStyle: "badge-teal",
      actionBtn: "action-btn-white",
      url: "/person-quiz-game"
    },
    {
      id: 4,
      title: "시나리오 게임",
      description: "라라 라라랄ㄹ랄 라랄 ㅏ랄 ㅏ랄 ",
      bgColor: "card-blue",
      iconBg: "icon-bg-white",
      badge: "OS PLAYER",
      badgeStyle: "badge-teal",
      actionBtn: "action-btn-white",
      url: "/versus-game"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide(prev => prev === serviceCards.length ? 1 : prev + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => prev === 1 ? serviceCards.length : prev - 1);
  };

  return (
    <div className="landing-container">
      

      <main className="main-content">
        <div className="hero">
          <p className="hero-subtitle">어1111</p>
          <h1 className="hero-title">
            원하는 모든 오락 컨텐츠
          </h1>
          <h2 className="hero-subtitle">
            <span className="hero-highlight">PlayPick</span>
            <span className="hero-highlight">에서 지금 바로 시작하세요</span>
          </h2>

          <div className="hero-actions">
            <button className="btn btn-primary" onClick={onStartGame}>무료로 시작하기</button>
            <button className="btn btn-outline">야삐</button>
          </div>
        </div>

        <div className="carousel-container">
          <button className="carousel-btn prev" onClick={prevSlide}>
            ←
          </button>
          <button className="carousel-btn next" onClick={nextSlide}>
            →
          </button>
          
          <div className="carousel-content">
            <div className="cards-container">
              {serviceCards.map((card, index) => (
                <div
                  key={card.id}
                  onClick={() => navigate(card.url)}
                  className={`service-card ${card.bgColor} ${
                    currentSlide === card.id
                      ? 'active'
                      : 'inactive'
                  }`}
                >
                  <div>
                    <span className={`card-badge ${card.badgeStyle}`}>{card.badge}</span>
                    
                    <div className="card-icon-area">
                      <div className={`card-icon-container ${card.iconBg}`}>
                        <div style={{ 
                          width: '60px', 
                          height: '60px', 
                          background: card.id === 2 ? '#14b8a6' : 'rgba(0,0,0,0.1)', 
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '24px',
                          color: card.id === 2 ? 'white' : '#666'
                        }}>
                          {card.id === 1 ? '🛡️' : card.id === 2 ? '💰' : '▶️'}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card-content">
                    <h3 className="card-title">{card.title}</h3>
                    <p className="card-description">{card.description}</p>
                    <button className={`card-action-btn ${card.actionBtn}`}>
                      →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="carousel-indicators">
            {serviceCards.map((_, index) => (
              <button
                key={index}
                className={`indicator ${currentSlide === index + 1 ? 'active' : 'inactive'}`}
                onClick={() => setCurrentSlide(index + 1)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
