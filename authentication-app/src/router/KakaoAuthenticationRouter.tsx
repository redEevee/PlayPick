// router/KakaoAuthenticationRouter.tsx
import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import KakaoAuthenticationPage from "../pages/KakaoAuthenticationPage.tsx";
import KakaoAuthenticationCallback from "../redirection/KakaoAuthenticationCallback.tsx";
import Login from "../Login.tsx";

const KakaoAuthenticationRouter = () => {
    return (
        <Suspense fallback={<div>로딩중 ........</div>}>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/kakao" element={<KakaoAuthenticationPage/>}/>
                <Route path="/callback" element={<KakaoAuthenticationCallback />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Suspense>
    );
};

export default KakaoAuthenticationRouter;