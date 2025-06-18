import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import image from "./assets/kakao_login.png"
import env from "./env.ts";

const Login = () => {
    const navigate = useNavigate();



    const handleKakaoLogin = () => {
        const kakaoAuthenticationUrl = env.api.KAKAO_AUTHENTICATION_URL;
        const popup = window.open(kakaoAuthenticationUrl, '_blank', 'width=500,height=600');

        if (!popup) {
            alert('팝업 차단되어 있습니다. 팝업 허용 후 다시 시도하세요.');
            return;
        }

        const receiveMessage = (event: MessageEvent) => {
            console.log('📨 받은 메시지:', event.origin, event.data);

            // origin 검사 완화
            if (!event.origin.startsWith('http://localhost')) {
                console.warn('❌ 허용되지 않은 origin:', event.origin);
                return;
            }

            const { accessToken, user } = event.data;
            if (!accessToken) {
                console.warn('❌ accessToken 없음');
                return;
            }

            localStorage.setItem('userToken', accessToken);
            window.dispatchEvent(new Event("user-token-changed"));

            window.removeEventListener('message', receiveMessage);

            // 팝업 닫기
            try {
                popup.close();
            } catch (e) {
                console.warn('팝업 닫기 실패:', e);
            }

            // navigate 딜레이
            setTimeout(() => {
                navigate('/');
            }, 100);
        };

        window.addEventListener('message', receiveMessage);
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