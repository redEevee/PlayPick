import React, { useState } from 'react';
import "./SpotTheDifferenceGameSelect.css";
import SpotTheDifferenceGame from '../game/SpotTheDifferenceGame';

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

const SpotTheDifferenceGameSelect: React.FC<VersusGameProps> = ({ onBackToLanding }) => {
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [gameStatus, setGameStatus] = useState("Ready");
    
    
    const [currentCategory, setCurrentCategory] = useState<VersusCategory | null>(null);

    const categories: VersusCategory[] = [
        {
            id: 1,
            title: "",
            description: "",
            icon: "",
            color: "from-pink-400 to-rose-500",
            imageUrl: "http://localhost:3005/one.jpg",
            status: "Yes",
            categoryName: "가장 최악인 상황은 ?"
        },
        {
            id: 2,
            title: "",
            description: ``,
            icon: "",
            color: "from-purple-400 to-indigo-500",
            imageUrl: "http://localhost:3005/two.png",
            status: "Yes",
            categoryName: "스포츠"
        },
        {
            id: 3,
            title: "",
            description: "",
            icon: "",
            color: "from-orange-400 to-red-500",
            imageUrl: "http://localhost:3005/three.png",
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

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy': return 'bg-green-100 text-green-800';
            case 'Normal': return 'bg-yellow-100 text-yellow-800';
            case 'Hard': return 'bg-red-100 text-red-800';
            case 'popular': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    

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
                            어떤 <span className="hero-highlight">카테고리</span>에서<br />
                            <span className="hero-highlight">승부</span>를 겨뤄볼까요?
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
                                        <div className="category-badges">
                      <span className={`difficulty-badge ${getDifficultyColor(category.difficulty)}`}>
                        {category.difficulty}
                      </span>
                                            <span className="participant-badge">
                      </span>
                                        </div>
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
                                        <h3 className="category-title">{category.title}</h3>
                                        <p className="category-description">{category.description}</p>
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
                    {selectedCategory !== null && (
                        <SpotTheDifferenceGame
                            gameId={selectedCategory}
                            onBack={handleBackToCategories}
                        />
                    )}
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

export default SpotTheDifferenceGameSelect;
