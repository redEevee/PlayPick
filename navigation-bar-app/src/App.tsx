import React from 'react';
import './navbar.css';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  return (
      <div className="Navbar">
        <header className="header">
          <div className="header-content">
            <div className="logo-section">
              <div className="logo">
                <div className="logo-icon" onClick={() => navigate("/")}>
                  <img src={"http://localhost:3002/Logo.png"}

                    style={{width:"100%", height:"100%"}}

                  />
                </div>
              </div>
              <nav className="nav">
                <a href="#" className="nav-link">Vs게임</a>
                <a href="#" className="nav-link">틀린 그림 찾기</a>
                <a href="#" className="nav-link">인물 맞추기</a>
                <a href="#" className="nav-link">시나리오 게임</a>
                <a href="#" className="nav-link">EEE</a>
              </nav>
            </div>
            <div className="header-actions">
              <select className="language-select">
                <option>한국어(KR)</option>
              </select>
              <button className="btn btn-secondary">로그인</button>
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
