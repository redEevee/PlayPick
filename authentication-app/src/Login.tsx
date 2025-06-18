import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import image from "./assets/kakao_login.png"

const Login = () => {
    const navigate = useNavigate();

    const handleKakaoLogin = () => {
        window.location.href = "/login/kakao";
        // navigate("/kakao");
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="logo-container">
                    <div className="logo-image-box">
                        <img
                            src="http://localhost:3002/Logo.png"
                            alt="PlayPick 로고"
                            className="logo"
                            onClick={()=>   window.location.href = "/"}
                        />
                    </div>
                    <h1 className="welcome-text">PlayPick에 오신 것을 환영합니다</h1>
                    <p className="subtitle">다양한 게임을 즐기고 공유해보세요</p>
                </div>

                <div className="login-form">
                    <button
                        className="kakao-login-btn"
                        onClick={handleKakaoLogin}
                    >
                        <img
                            src={image}
                            alt="카카오 로그인"
                            className="kakao-logo"
                        />
                    </button>

                    <div className="divider">
                        <span>또는</span>
                    </div>

                    <div className="guest-login" onClick={() => navigate('/')}>
                        게스트로 계속하기
                        <span className="arrow">→</span>
                    </div>
                </div>

                <div className="footer">
                    <p>© 2025 PlayPick. All rights reserved.</p>
                    <div className="links">
                        <a href="#">이용약관</a>
                        <span>•</span>
                        <a href="#">개인정보처리방침</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;