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
      title: "밸런스 게임",
      description: "라라 라라랄ㄹ랄 라랄 ㅏ랄 ㅏ랄 ",
      bgColor: "card-teal",
      iconBg: "icon-bg-white",
      badge: "GAME",
      badgeStyle: "badge-teal",
      actionBtn: "action-btn-white",
      url: "/versus-game",
      image:"http://localhost:3001/vs.jpeg"
    },
    {
      id: 2,
      title: "틀린그림 찾기",
      description: "라라 라라랄ㄹ랄 라랄 ㅏ랄 ㅏ랄 ",
      bgColor: "card-white",
      iconBg: "icon-bg-gray",
      badge: "GAME",
      badgeStyle: "badge-white",
      actionBtn: "action-btn-teal",
      url: "/spot-the-difference",
      image:"http://localhost:3001/diff.jpeg"
    },
    {
      id: 3,
      title: "인물 맞추기",
      description: "라라 라라랄ㄹ랄 라랄 ㅏ랄 ㅏ랄 ",
      bgColor: "card-blue",
      iconBg: "icon-bg-white",
      badge: "GAME",
      badgeStyle: "badge-teal",
      actionBtn: "action-btn-white",
      url: "/person-quiz-game",
      image:"http://localhost:3001/who.jpeg"
    },
    {
      id: 4,
      title: "시뮬레이션 게임",
      description: "라라 라라랄ㄹ랄 라랄 ㅏ랄 ㅏ랄 ",
      bgColor: "card-blue",
      iconBg: "icon-bg-white",
      badge: "GAMER",
      badgeStyle: "badge-teal",
      actionBtn: "action-btn-white",
      url: "/choices-of-a-spring-day",
      image:"http://localhost:3001/si.jpg"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide(prev => prev === serviceCards.length ? 1 : prev + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => prev === 1 ? serviceCards.length : prev - 1);
  };

  const flowingImages = [
    'A.jpg', 'B.jpg', 'C.jpg', 'D.jpg', 
    'E.jpg', 'F.jpg', 'G.jpg'
  ];

  return (
    <div className="landing-container">
      

      <main className="main-content">
        <div className="hero">
          <h1 className="hero-title">
            원하는 모든 오락 컨텐츠
          </h1>
          <h2 className="hero-subtitle">
            <span className="hero-highlight">PlayPick</span>
            <span className="hero-highlight">에서 지금 바로 시작하세요</span>
          </h2>

          <div className="hero-actions">

          </div>
        </div>

        <div className="flowing-animation-container">
          <div className="flowing-boxes">
            {[...Array(24)].map((_, index) => (
              <div key={index} className={`flowing-box box-${index % 4}`}>
                <img 
                  // src={`/LandingImge/${flowingImages[index % flowingImages.length]}`}
                  src={`http://localhost:3001/LandingImge/${flowingImages[index % flowingImages.length]}`}
                  alt={`Flowing image ${index + 1}`}
                  className="flowing-box-image"
                  
                />
               
              </div>
            ))}
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
                      {card.id === 1 ? (
                          <div className={`card-icon-container ${card.iconBg}`}>
                            <img src={card.image} />
                          </div>
                      ) : (

                        <div className={`card-icon-container2 ${card.iconBg}`}>
                          <img src={card.image} />
                        </div>
                      )};

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
