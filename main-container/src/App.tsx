import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import "./index.css";

const LandingPageApp = lazy(() => import("LandingPageApp/App"));
const NavigationBar = lazy(() => import("NavigationBar/App"));

const App = () => (
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
     <NavigationBar />
      <Routes>
        <Route path="/" element={<LandingPageApp />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);