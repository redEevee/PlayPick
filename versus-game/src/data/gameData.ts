export interface GameItem {
  id: number;
  name: string;
  image: string;
  description: string;
  category: string;
}

export const gameDatasets: GameItem[][] = [

  [
    { id: 1, name: "술 먹고 기억 안 나는데, \n 전 여친/남친한테 장문의 카톡 + 전화 13통",
      image: "http://localhost:3004/phone.jpg", description: "아침에 핸드폰 보면 후회가,,,", category: "가장 최악인 상황은 ?" },
    { id: 2, name: "친구한테 상사 뒷담화 했는데 알고보니 상사에게 보냄",
      image: "http://localhost:3004/drink.jpg", description: "다음 날 회사 분위기 얼어붙음", category: "가장 최악인 상황은 ?" },
    { id: 3, name: "고백하고 거절당했는데, \n  그 장면이 몰카 유튜브로 올라감 ",
      image: "http://localhost:3004/yotube.jpg", description: "그런데 조회수가 100만", category: "가장 최악인 상황은 ?" },
    { id: 4, name: "3시간 웨이팅 줄 섰는데 알고보니 다른 줄",
      image: "http://localhost:3004/line.jpg", description: "심지어 가려던곳 마감 10전 알아차림", category: "가장 최악인 상황은 ?" },
    { id: 5, name: "화상 회의중 노래 부르면서 \n 물을 가져 왔는데 마이크와 캠이 켜져있음",
      image: "http://localhost:3004/haw.jpg", description: "심지어 캐릭터 잠옷 입고 있음", category: "가장 최악인 상황은 ?" },
    { id: 6, name: "중요한 프레젠테이션 중에 PPT에 직장 상사 험담 적어놓은게 나옴",
      image: "http://localhost:3004/ppt.jpg", description: "심지어 회의실 모든 상사분들 험담이 있음", category: "가장 최악인 상황은 ?" },
    { id: 7, name: "내가 싫어하던 사람한테 회식 자리에서 \n 모두 다 보는 앞에서 진지하게 공개 고백 받음",
      image: "http://localhost:3004/public2.jpg", description: "심지어 자동차 이벤트를 곁들인", category: "가장 최악인 상황은 ?" },
    { id: 8, name: "소개팅이 완전 성공적이었지만, \n 집에 와서 보니 이에 고추가루가 끼어 있었던 나,",
      image: "http://localhost:3004/go.jpg", description: "심지어 반대쪽엔 야채가,,,", category: "가장 최악인 상황은 ?" },
  ],
  [
    { id: 9, name: "축구", image: "⚽", description: "세계에서 가장 인기있는 스포츠", category: "스포츠" },
    { id: 10, name: "농구", image: "🏀", description: "미국에서 인기있는 실내 스포츠", category: "스포츠" },
    { id: 11, name: "야구", image: "⚾", description: "미국의 국민 스포츠", category: "스포츠" },
    { id: 12, name: "테니스", image: "🎾", description: "라켓으로 하는 스포츠", category: "스포츠" },
    { id: 13, name: "수영", image: "🏊", description: "물에서 하는 운동", category: "스포츠" },
    { id: 14, name: "골프", image: "⛳", description: "정확성이 중요한 스포츠", category: "스포츠" },
    { id: 15, name: "복싱", image: "🥊", description: "격투 스포츠", category: "스포츠" },
    { id: 16, name: "스키", image: "🎿", description: "겨울 스포츠", category: "스포츠" },
  ],
  [
    { id: 17, name: "강아지", image: "🐕", description: "인간의 가장 친한 친구", category: "동물" },
    { id: 18, name: "고양이", image: "🐱", description: "독립적인 애완동물", category: "동물" },
    { id: 19, name: "사자", image: "🦁", description: "백수의 왕", category: "동물" },
    { id: 20, name: "코끼리", image: "🐘", description: "거대한 육지 동물", category: "동물" },
    { id: 21, name: "팬더", image: "🐼", description: "귀여운 흑백 곰", category: "동물" },
    { id: 22, name: "펭귄", image: "🐧", description: "남극의 정장 입은 새", category: "동물" },
    { id: 23, name: "원숭이", image: "🐵", description: "나무를 잘 타는 영장류", category: "동물" },
    { id: 24, name: "토끼", image: "🐰", description: "빠르게 뛰는 귀여운 동물", category: "동물" },
  ],
  [
    { id: 25, name: "독서", image: "📚", description: "지식을 쌓는 활동", category: "취미" },
    { id: 26, name: "영화감상", image: "🎬", description: "스크린을 통한 즐거움", category: "취미" },
    { id: 27, name: "게임", image: "🎮", description: "디지털 엔터테인먼트", category: "취미" },
    { id: 28, name: "요리", image: "👨‍🍳", description: "음식을 만드는 예술", category: "취미" },
    { id: 29, name: "그림그리기", image: "🎨", description: "창의적인 표현 활동", category: "취미" },
    { id: 30, name: "음악듣기", image: "🎵", description: "소리를 통한 감성 활동", category: "취미" },
    { id: 31, name: "사진촬영", image: "📸", description: "순간을 기록하는 활동", category: "취미" },
    { id: 32, name: "여행", image: "✈️", description: "새로운 곳을 탐험하는 활동", category: "취미" }
  ]
];

export const getRandomPair = (excludeIds: number[] = []): [GameItem, GameItem] => {
  const availableItems = gameDatasets.flat().filter(item => !excludeIds.includes(item.id));
  
  if (availableItems.length < 2) {
    const shuffled = [...gameDatasets.flat()].sort(() => Math.random() - 0.5);
    return [shuffled[0], shuffled[1]];
  }
  
  const shuffled = availableItems.sort(() => Math.random() - 0.5);
  return [shuffled[0], shuffled[1]];
};

export const getFilteredDatasets = (ids: number[]): GameItem[] => {
  return gameDatasets.flat().filter(item => ids.includes(item.id));
};

export const getAllItems = (): GameItem[] => {
  return gameDatasets.flat();
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
  return gameDatasets.flat().filter(item => item.category === category).map(item => item.id);
};

export const getAllCategories = (): string[] => {
  const categories = [...new Set(gameDatasets.flat().map(item => item.category))];
  return categories;
};
