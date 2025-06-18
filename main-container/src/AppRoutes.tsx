import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

const LandingPageApp = lazy(() => import("LandingPageApp/App"));
const NavigationBar = lazy(() => import("NavigationBar/App"));
const VersusGame = lazy(() => import("VersusGame/App"));
const PersonQuizGame = lazy(() => import("PersonQuizGame/App"));
const ChoicesOfASpringDay = lazy(() => import("choicesOfASpringDay/App"));
const SpotTheDifference = lazy(() => import("spotTheDifference/App"));
const AuthenticationApp = lazy(() => import("AuthenticationApp/App"));

const AppRoutes = () => {
    const location = useLocation();
    const isLoginRoute = location.pathname.startsWith("/login");

    return (
        <>
            {!isLoginRoute && <NavigationBar />}
            <Routes>
                <Route path="/" element={<LandingPageApp />} />
                <Route path="/versus-game" element={<VersusGame />} />
                <Route path="/person-quiz-game" element={<PersonQuizGame />} />
                <Route path="/choices-of-a-spring-day" element={<ChoicesOfASpringDay />} />
                <Route path="/spot-the-difference" element={<SpotTheDifference />} />
                <Route path="/login/*" element={<AuthenticationApp />} />
            </Routes>
        </>
    );
};

export default AppRoutes;