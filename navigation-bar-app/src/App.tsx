import React from 'react';
import './navbar.css';
import { useNavigate, useLocation } from 'react-router-dom';


function App() {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 URL 경로

  const isActive = (path: string) => location.pathname === path;


  return (
      <div className="Navbar">
        <header className="header">
          <div className="header-content">
            <div className="logo-section">
              <div className="logo">
                <div className="logo-icon" onClick={() => window.location.href = "/"}>
                  <img src={"http://localhost:3002/Logo.png"} className="logo-img" />
                </div>
              </div>
              <nav className="nav">
                <a href="/versus-game" className={`nav-link ${isActive('/versus-game') ? 'active' : ''}`}>Vs게임</a>
                <a href="/spot-the-difference" className={`nav-link ${isActive('/spot-the-difference') ? 'active' : ''}`}>틀린 그림 찾기</a>
                <a href="/person-quiz-game" className={`nav-link ${isActive('/person-quiz-game') ? 'active' : ''}`}>인물 맞추기</a>
                <a href="/choices-of-a-spring-day" className={`nav-link ${isActive('/choices-of-a-spring-day') ? 'active' : ''}`}>시나리오 게임</a>
              </nav>
            </div>
            <div className="header-actions">
              <select className="language-select">
                <option>한국어(KR)</option>
              </select>
              <button className="btn btn-secondary" onClick={() => navigate("/login")}>로그인</button>
              <button className="btn btn-primary">
                가입
              </button>
            </div>
          </div>
        </header>
      </div>
  );
}

export default App;
