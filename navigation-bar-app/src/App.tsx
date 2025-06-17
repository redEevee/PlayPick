import React from 'react';
import './navbar.css';

function App() {
  return (
    <div className="Navbar">
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo">
              <div className="logo-icon">
                <span>FJ</span>
              </div>
              <span className="logo-text">+ WELLCOME</span>
            </div>
            <nav className="nav">
              <a href="#" className="nav-link">AAA</a>
              <a href="#" className="nav-link">BBB</a>
              <a href="#" className="nav-link">CCC</a>
              <a href="#" className="nav-link">DDD</a>
              <a href="#" className="nav-link">EEE</a>
              <a href="#" className="nav-link">FFF</a>
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
