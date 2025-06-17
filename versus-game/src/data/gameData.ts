export interface GameItem {
  id: number;
  name: string;
  image: string;
  description: string;
  category: string;
}

export const gameDatasets: GameItem[] = [

  { id: 1, name: "피자", image: "🍕", description: "이탈리아의 대표 음식", category: "가장 최악인 상황은 ?" },
  { id: 2, name: "햄버거", image: "🍔", description: "미국의 대표 패스트푸드", category: "가장 최악인 상황은 ?" },
  { id: 3, name: "초밥", image: "🍣", description: "일본의 전통 음식", category: "가장 최악인 상황은 ?" },
  { id: 4, name: "파스타", image: "🍝", description: "이탈리아의 면 요리", category: "가장 최악인 상황은 ?" },
  { id: 5, name: "타코", image: "🌮", description: "멕시코의 전통 음식", category: "가장 최악인 상황은 ?" },
  { id: 6, name: "라면", image: "🍜", description: "한국의 인기 인스턴트 음식", category: "가장 최악인 상황은 ?" },
  { id: 7, name: "치킨", image: "🍗", description: "바삭한 닭고기 요리", category: "가장 최악인 상황은 ?" },
  { id: 8, name: "스테이크", image: "🥩", description: "고급 쇠고기 요리", category: "가장 최악인 상황은 ?" },

  // 스포츠 카테고리
  { id: 9, name: "축구", image: "⚽", description: "세계에서 가장 인기있는 스포츠", category: "스포츠" },
  { id: 10, name: "농구", image: "🏀", description: "미국에서 인기있는 실내 스포츠", category: "스포츠" },
  { id: 11, name: "야구", image: "⚾", description: "미국의 국민 스포츠", category: "스포츠" },
  { id: 12, name: "테니스", image: "🎾", description: "라켓으로 하는 스포츠", category: "스포츠" },
  { id: 13, name: "수영", image: "🏊", description: "물에서 하는 운동", category: "스포츠" },
  { id: 14, name: "골프", image: "⛳", description: "정확성이 중요한 스포츠", category: "스포츠" },
  { id: 15, name: "복싱", image: "🥊", description: "격투 스포츠", category: "스포츠" },
  { id: 16, name: "스키", image: "🎿", description: "겨울 스포츠", category: "스포츠" },

  // 동물 카테고리
  { id: 17, name: "강아지", image: "🐕", description: "인간의 가장 친한 친구", category: "동물" },
  { id: 18, name: "고양이", image: "🐱", description: "독립적인 애완동물", category: "동물" },
  { id: 19, name: "사자", image: "🦁", description: "백수의 왕", category: "동물" },
  { id: 20, name: "코끼리", image: "🐘", description: "거대한 육지 동물", category: "동물" },
  { id: 21, name: "팬더", image: "🐼", description: "귀여운 흑백 곰", category: "동물" },
  { id: 22, name: "펭귄", image: "🐧", description: "남극의 정장 입은 새", category: "동물" },
  { id: 23, name: "원숭이", image: "🐵", description: "나무를 잘 타는 영장류", category: "동물" },
  { id: 24, name: "토끼", image: "🐰", description: "빠르게 뛰는 귀여운 동물", category: "동물" },

  // 취미 카테고리
  { id: 25, name: "독서", image: "📚", description: "지식을 쌓는 활동", category: "취미" },
  { id: 26, name: "영화감상", image: "🎬", description: "스크린을 통한 즐거움", category: "취미" },
  { id: 27, name: "게임", image: "🎮", description: "디지털 엔터테인먼트", category: "취미" },
  { id: 28, name: "요리", image: "👨‍🍳", description: "음식을 만드는 예술", category: "취미" },
  { id: 29, name: "그림그리기", image: "🎨", description: "창의적인 표현 활동", category: "취미" },
  { id: 30, name: "음악듣기", image: "🎵", description: "소리를 통한 감성 활동", category: "취미" },
  { id: 31, name: "사진촬영", image: "📸", description: "순간을 기록하는 활동", category: "취미" },
  { id: 32, name: "여행", image: "✈️", description: "새로운 곳을 탐험하는 활동", category: "취미" }
];

export const getRandomPair = (excludeIds: number[] = []): [GameItem, GameItem] => {
  const availableItems = gameDatasets.filter(item => !excludeIds.includes(item.id));
  
  if (availableItems.length < 2) {
    const shuffled = [...gameDatasets].sort(() => Math.random() - 0.5);
    return [shuffled[0], shuffled[1]];
  }
  
  const shuffled = availableItems.sort(() => Math.random() - 0.5);
  return [shuffled[0], shuffled[1]];
};

export const getFilteredDatasets = (ids: number[]): GameItem[] => {
  return gameDatasets.filter(item => ids.includes(item.id));
};

export const getRandomPairFromFiltered = (filteredDatasets: GameItem[], excludeIds: number[] = []): [GameItem, GameItem] => {
  const availableItems = filteredDatasets.filter(item => !excludeIds.includes(item.id));
  
  if (availableItems.length < 2) {
    const shuffled = [...filteredDatasets].sort(() => Math.random() - 0.5);
    return [shuffled[0], shuffled[1]];
  }
  
  const shuffled = availableItems.sort(() => Math.random() - 0.5);
  return [shuffled[0], shuffled[1]];
};

export const getCategoryIds = (category: string): number[] => {
  return gameDatasets.filter(item => item.category === category).map(item => item.id);
};

export const getAllCategories = (): string[] => {
  const categories = [...new Set(gameDatasets.map(item => item.category))];
  return categories;
};
