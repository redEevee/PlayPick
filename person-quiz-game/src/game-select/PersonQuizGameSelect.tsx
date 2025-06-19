import React, { useState } from 'react';
import "./PersonQuizGameSelect.css";
import PersonQuizGame from '../game/PersonQuizGame';
import AnimalQuizGame from '../game/AnimalQuizGame';
import CountryQuizGame from '../game/CountryQuizGame';

interface VersusGameProps {
    onBackToLanding: () => void;
}

interface VersusCategory {
    id: number;
    title: string;
    description: string;
    icon: string;
    color: string;
    imageUrl: string;
    status: 'No' | 'Yes';
    categoryName?: string;
}

const PersonQuizGameSelect: React.FC<VersusGameProps> = ({ onBackToLanding }) => {
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [gameStatus, setGameStatus] = useState("Ready");
    
    
    const [currentCategory, setCurrentCategory] = useState<VersusCategory | null>(null);

    const categories: VersusCategory[] = [
        {
            id: 1,
            title: "인물 퀴즈",
            description: "",
            icon: "",
            color: "from-pink-400 to-rose-500",
            imageUrl: "http://localhost:3003/person.jpeg",
            status: "Yes",
            categoryName: "가장 최악인 상황은 ?"
        },
        {
            id: 2,
            title: "동물 퀴즈!",
            description: ``,
            icon: "",
            color: "from-purple-400 to-indigo-500",
            imageUrl: "http://localhost:3003/chill.jpeg",
            status: "Yes",
            categoryName: "스포츠"
        },
        {
            id: 3,
            title: "나라 맞추기",
            description: "",
            icon: "",
            color: "from-orange-400 to-red-500",
            imageUrl: "http://localhost:3003/con.jpeg",
            status: "Yes",
            categoryName: "동물"
        },
        {
            id: 4,
            title: "",
            description: "",
            icon: "",
            color: "from-green-400 to-emerald-500",
            imageUrl: "/api/placeholder/300/200",
            status: "No",
            categoryName: "취미"
        },
        {
            id: 5,
            title: "준비중",
            description: "준     비     중 ",
            icon: "",
            color: "from-blue-400 to-cyan-500",
            imageUrl: "/api/placeholder/300/200",
            status: "No",
            categoryName: "전체"
        }
    ];



    

    const handleCategorySelect = (categoryId: number) => {
        const selectedCat = categories.find(cat => cat.id === categoryId);
        if (!selectedCat || selectedCat.status === "No") return;

        setSelectedCategory(categoryId);
        setCurrentCategory(selectedCat);
        setGameStatus("start");
    };

    

    const handleBackToCategories = () => {
        setGameStatus("Ready");
        setSelectedCategory(null);
        
    };

    const handleBackToLanding = () => {
        onBackToLanding();
    };

    return (
        <div className="landing-container">
            {gameStatus === "Ready" ? (
                <main className="main-content">
                    <div className="hero">
                        <h1 className="hero-title">
                             <span className="hero-highlight">Quiz </span>게임
                            {/*<br />*/}
                            {/*<span className="hero-highlight">승부</span>를 겨뤄볼까요?*/}
                        </h1>
                        <p className="versus-description">
                            원하는 카테고리를 선택하고 최고를 가려보세요!
                        </p>
                    </div>

                    <div className="categories-grid">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className={`category-card ${selectedCategory === category.id ? 'selected' : ''} ${category.status === 'No' ? 'disabled' : ''}`}
                                onClick={() => handleCategorySelect(category.id)}
                            >
                                <div className="category-card-inner">
                                    <div className="category-header">

                                        <div className="category-icon">
                                            {category.icon}
                                        </div>
                                    </div>

                                    {category.status === "Yes" ? (
                                        <div className="category-image">
                                            <img
                                                src={category.imageUrl}
                                                alt="category"
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="image-overlay">
                                                <div className="play-button">
                                                    <span className="start-button text-white">START</span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="non-status">
                                            준 비 중
                                        </div>
                                    )}

                                    <div className="category-content">

                                        <div className="description-box">
                                            <p className="category-description-person-quiz">{category.title}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="popular-section">
                        <h2 className="section-title">🔥 인기 카테고리</h2>
                        <div className="popular-cards">
                            {categories.filter(cat => cat.status === "Yes").slice(0, 3).map((category) => (
                                <div key={category.id} className="popular-card" onClick={() => handleCategorySelect(category.id)}>
                                    <div className="popular-rank">#{category.id}</div>
                                    <div className="popular-info">
                                        <span className="popular-icon">{category.icon}</span>
                                        <span className="popular-title">{category.title}</span>
                                    </div>
                                    <div className="popular-stats">
                                        <span className="play-count">1.2K 플레이</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            ) : gameStatus === "start" ? (
                <div className="game-screen">
                    <button onClick={handleBackToCategories} className="back-button" style={{ position: 'absolute', top: '20px', left: '20px', background: '#fff', border: '1px solid #ccc', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}>← Back</button>
                    {selectedCategory === 1 && <PersonQuizGame />}
                    {selectedCategory === 2 && <AnimalQuizGame />}
                    {selectedCategory === 3 && <CountryQuizGame />}
                </div>
            ) : (
                <div className="game-end-screen">
                    <h2>게임이 종료되었습니다!</h2>
                    <button onClick={handleBackToLanding}>처음으로 돌아가기</button>
                </div>
            )}

            
        </div>
    );
};

export default PersonQuizGameSelect;
