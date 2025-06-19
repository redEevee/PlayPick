import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface LandingPageProps {
  onStartGame: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartGame }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const serviceCards = [
    {
      id: 1,
      title: "밸런스 게임",
      description: "두 가지 선택지 중 하나를 골라 당신의 취향을 알아보세요.",
      bgColor: "card-teal",
      iconBg: "icon-bg-white",
      badge: "GAME",
      badgeStyle: "badge-teal",
      actionBtn: "action-btn-white",
      url: "/versus-game",
      image: "http://localhost:3001/vs.jpeg"
    },
    {
      id: 2,
      title: "틀린그림 찾기",
      description: "집중력을 발휘하여 두 그림의 다른 점을 모두 찾아보세요.",
      bgColor: "card-white",
      iconBg: "icon-bg-gray",
      badge: "GAME",
      badgeStyle: "badge-white",
      actionBtn: "action-btn-teal",
      url: "/spot-the-difference",
      image: "http://localhost:3001/diff.jpeg"
    },
    {
      id: 3,
      title: "인물 맞추기",
      description: "사진 속 인물이 누구인지 맞춰보세요. 당신의 K-지식 레벨은?",
      bgColor: "card-blue",
      iconBg: "icon-bg-white",
      badge: "GAME",
      badgeStyle: "badge-teal",
      actionBtn: "action-btn-white",
      url: "/person-quiz-game",
      image: "http://localhost:3001/who.jpeg"
    },
    {
      id: 4,
      title: "시뮬레이션 게임",
      description: "당신의 선택이 엔딩을 결정합니다. 흥미진진한 스토리를 경험하세요.",
      bgColor: "card-blue",
      iconBg: "icon-bg-white",
      badge: "GAMER",
      badgeStyle: "badge-teal",
      actionBtn: "action-btn-white",
      url: "/choices-of-a-spring-day",
      image: "http://localhost:3001/si.jpg"
    }
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
      mirror: false
    });

    const slideInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % serviceCards.length);
    }, 5000); // 5초마다 자동 슬라이드

    return () => {
      clearInterval(slideInterval);
      AOS.refresh();
    };
  }, [serviceCards.length]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % serviceCards.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + serviceCards.length) % serviceCards.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const flowingImages = [
    'A.jpg', 'B.jpg', 'C.jpg', 'D.jpg',
    'E.jpg', 'F.jpg', 'G.jpg'
  ];

  return (
      <div className="landing-container">
        <main className="main-content">
          <div className="hero">
            <h1 className="hero-title">원하는 모든 오락 컨텐츠</h1>
            <h2 className="hero-subtitle">
              <span className="hero-highlight">PlayPick</span>
              <span>에서 지금 바로 시작하세요</span>
            </h2>
          </div>

          <div className="flowing-animation-container">
            <div className="flowing-boxes">
              {[...Array(24)].map((_, index) => (
                  <div key={index} className={`flowing-box box-${index % 4}`}>
                    <img
                        src={`http://localhost:3001/LandingImge/${flowingImages[index % flowingImages.length]}`}
                        alt={`Flowing image ${index + 1}`}
                        className="flowing-box-image"
                    />
                  </div>
              ))}
            </div>
          </div>

          <div className="carousel-section">
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
                              currentSlide === index ? 'active' : 'inactive'
                          }`}
                      >
                        <div>
                          <span className={`card-badge ${card.badgeStyle}`}>{card.badge}</span>

                          <div className="card-icon-area">
                            {index === 0 ? (
                                <div className={`card-icon-container ${card.iconBg}`}>
                                  <img src={card.image} alt={card.title}/>
                                </div>
                            ) : (
                                <div className={`card-icon-container2 ${card.iconBg}`}>
                                  <img src={card.image} alt={card.title}/>
                                </div>
                            )}
                          </div>
                        </div>

                        <div className="card-content">
                          <h3 className="card-title">{card.title}</h3>
                          <p className="card-description">{card.description}</p>
                          <button className={`card-action-btn ${card.actionBtn}`}>→</button>
                        </div>
                      </div>
                  ))}
                </div>
              </div>

              <div className="carousel-indicators">
                {serviceCards.map((_, index) => (
                    <button
                        key={index}
                        className={`indicator ${currentSlide === index ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Slide ${index + 1}`}
                    >
                      <span className="indicator-progress"></span>
                    </button>
                ))}
              </div>
            </div>
          </div>

          <div className="features-section">
            <div className="section-header" data-aos="fade-up" data-aos-duration="1000">
              <h2 className="section-title">PlayPick?</h2>
              {/*<p className="section-subtitle">PlayPick만의 특별한 경험을 만나보세요</p>*/}
            </div>
            <div className="features-grid">
              <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
                <div className="feature-icon-wrapper">
                  <i className="fas fa-gamepad feature-icon"></i>
                </div>
                <h3>다양한 컨텐츠</h3>
                <p>다양한 장르의 게임으로 지루할 틈이 없이 여러 게임을 즐겨보세요</p>
              </div>
              <div className="feature-card" data-aos="zoom-in" data-aos-delay="300">
                <div className="feature-icon-wrapper">
                  <i className="fas fa-users feature-icon"></i>
                </div>
                <h3>혼자 그리고 함께</h3>
                <p>혼자일때 그리고 함께일때 모두 즐길 수 있는 컨텐츠를 제공합니다</p>
              </div>
              <div className="feature-card" data-aos="zoom-in" data-aos-delay="300">
                <div className="feature-icon-wrapper">
                  <i className="fas fa-trophy feature-icon"></i>
                </div>
                <h3>성취와 보상</h3>
                <p>게임을 통한 성취감과 다양한 보상으로 더욱 재미있는 경험을 제공합니다</p>
              </div>
              <div className="feature-card" data-aos="zoom-in" data-aos-delay="300">
                <div className="feature-icon-wrapper">
                  <i className="fas fa-trophy feature-icon"></i>
                </div>
                <h3>성취와 보상</h3>
                <p>게임을 통한 성취감과 다양한 보상으로 더욱 재미있는 경험을 제공합니다</p>
              </div>
            </div>
          </div>


          <div className="testimonials-section">
            <div className="section-header" data-aos="fade-up">
              <h2 className="section-title">유저들의 생생한 후기</h2>
            </div>
            <div className="testimonials-grid">
              <div className="testimonial" data-aos="fade-up" data-aos-delay="100">
                <p className="testimonial-text">"시간 가는 줄 모르고 했네요. 밸런스 게임 최고!"</p>
                <div className="testimonial-author">
                  <img src="http://localhost:3001/profile3.png" alt="김민준"/>
                  <span>김민준 님</span>
                </div>
              </div>
              <div className="testimonial" data-aos="fade-up" data-aos-delay="200">
                <p className="testimonial-text">"틀린그림 찾기 하다가 밤 샜어요. 업데이트 더 해주세요!"</p>
                <div className="testimonial-author">
                  <img src="http://localhost:3001/profile3.png" alt="이서아"/>
                  <span>이서아 님</span>
                </div>
              </div>
              <div className="testimonial" data-aos="fade-up" data-aos-delay="300">
                <p className="testimonial-text">"친구랑 점수 내기하기 딱 좋아요. 완전 꿀잼!"</p>
                <div className="testimonial-author">
                  <img src="http://localhost:3001/profile3.png" alt="박도윤"/>
                  <span>박도윤 님</span>
                </div>
              </div>
              <div className="testimonial" data-aos="fade-up" data-aos-delay="300">
                <p className="testimonial-text">"친구랑 점수 내기하기 딱 좋아요. 완전 꿀잼!"</p>
                <div className="testimonial-author">
                  <img src="http://localhost:3001/profile3.png" alt="박도윤"/>
                  <span>박도윤 님</span>
                </div>
              </div>
              <div className="testimonial" data-aos="fade-up" data-aos-delay="300">
                <p className="testimonial-text">"친구랑 점수 내기하기 딱 좋아요. 완전 꿀잼!"</p>
                <div className="testimonial-author">
                  <img src="http://localhost:3001/profile3.png" alt="박도윤"/>
                  <span>박도윤 님</span>
                </div>
              </div>
            </div>
          </div>

          <div className="cta-section" data-aos="fade-up">
            <div className="cta-content">
              <h2>지금 바로 시작할 준비가 되셨나요?</h2>
              <p>간단한 가입으로 PlayPick의 모든 게임을 무료로 즐겨보세요!</p>
              <button className="cta-button" onClick={() => navigate('/login')}>
                무료로 시작하기
              </button>
            </div>
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
              <a href="#" aria-label="Facebook" className="social-icon">F</a>
            </div>
            <p className="copyright">© 2025 PlayPick. All rights reserved.</p>
          </div>
        </footer>
      </div>
  );
};

export default LandingPage;