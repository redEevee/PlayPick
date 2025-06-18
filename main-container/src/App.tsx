import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import "./index.css";
import AppRoutes from "./AppRoutes.tsx";


const App = () => (
    <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
            <AppRoutes />
        </Suspense>
    </BrowserRouter>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(<App />);