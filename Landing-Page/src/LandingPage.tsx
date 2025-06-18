import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface LandingPageProps {
  onStartGame: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartGame }) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
      mirror: false
    });
    
    return () => {
      AOS.refresh();
    };
  }, []);

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
                className={`indicator ${currentSlide === index + 1 ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index + 1)}
                aria-label={`Slide ${index + 1}`}
              >
                <span className="indicator-progress"></span>
              </button>
            ))}
          </div>
        </div>

        <div className="features-section">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-title">Why Choose Our Games?</h2>
            <p className="section-subtitle">PlayPick만의 특별한 경험을 만나보세요</p>
          </div>
          <div className="features-grid">
            <div className="feature-card" data-aos="fade-up" data-aos-delay="100">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">🎮</div>
                <div className="icon-bg"></div>
              </div>
              <h3>다양한 게임</h3>
              <p>다양한 장르의 게임으로 지루할 틈이 없어요. 매주 새로운 게임이 업데이트됩니다.</p>
              <span className="feature-highlight"></span>
            </div>
            <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">🎯</div>
                <div className="icon-bg"></div>
              </div>
              <h3>도전 과제</h3>
              <p>도전과제를 달성하며 성취감을 느껴보세요. 특별한 보상이 여러분을 기다립니다.</p>
              <span className="feature-highlight"></span>
            </div>
            <div className="feature-card" data-aos="fade-up" data-aos-delay="300">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">🏆</div>
                <div className="icon-bg"></div>
              </div>
              <h3>순위 경쟁</h3>
              <p>전국 유저들과 실시간 순위를 경쟁하세요. 최고의 자리를 차지해보세요!</p>
              <span className="feature-highlight"></span>
            </div>
          </div>
        </div>

        <div className="testimonials-section">
          <h2 className="section-title">유저들의 후기</h2>
          <div className="testimonials-slider">
            <div className="testimonial" data-aos="zoom-in">
              <p className="testimonial-text">"재미있게 놀다 보니 시간 가는 줄 몰랐어요!"</p>
              <p className="testimonial-author">- 김유저 님</p>
            </div>
          </div>
        </div>

        <div className="cta-section" data-aos="fade-up">
          <h2>지금 바로 시작하세요!</h2>
          <p>지금 가입하면 특별한 혜택을 드립니다</p>
          <button 
            className="cta-button"
            onClick={() => navigate('/signup')}
          >
            무료로 시작하기
          </button>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">PlayPick</div>
          <div className="footer-links">
            <a href="/about">회사소개</a>
            <a href="/privacy">개인정보처리방침</a>
            <a href="/terms">이용약관</a>
            <a href="/contact">문의하기</a>
          </div>
          <div className="social-links">
            <a href="#" className="social-icon">📱</a>
            <a href="#" className="social-icon">💬</a>
            <a href="#" className="social-icon">📧</a>
          </div>
          <p className="copyright">© 2025 PlayPick. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
