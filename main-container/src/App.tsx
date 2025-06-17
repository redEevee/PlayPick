import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import "./index.css";


const LandingPageApp = lazy(() => import("LandingPageApp/App"));
const NavigationBar = lazy(() => import("NavigationBar/App"));
const VersusGame = lazy(() => import("VersusGame/App"));
const PersonQuizGame = lazy(() => import("PersonQuizGame/App"));
const ChoicesOfASpringDay = lazy(() => import("choicesOfASpringDay/App"));
const SpotTheDifference = lazy(() => import("spotTheDifference/App"));


const App = () => (
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
     <NavigationBar />
      <Routes>
        <Route path="/" element={<LandingPageApp />} />
        <Route path="/versus-game" element={<VersusGame />} />
        <Route path="/person-quiz-game" element={<PersonQuizGame />} />
        <Route path="/choices-of-a-spring-day" element={<ChoicesOfASpringDay />} />
        <Route path="/spot-the-difference" element={<SpotTheDifference />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);