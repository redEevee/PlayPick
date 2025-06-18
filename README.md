# PlayPick
It's for PlayPick

## 📁 프로젝트 폴더 구조
PlayPick/
├── .idea/                           # IDE 설정 (JetBrains 등)
├── node_modules/                   # 의존성 모듈
├── choices-of-a-spring-day/        # 미니게임 1: 봄날의 선택
│   ├── public/                     # 게임 이미지
│   └── src/                        # 게임 로직 (React + TypeScript)
│       ├── App.tsx
│       ├── SimulationGame.tsx
│       └── ...
│
├── Landing-Page/                   # 랜딩 페이지 프론트엔드
│   ├── public/                     # 이미지 및 정적 파일
│   │   └── LandingImage/          # 배경 이미지 모음
│   └── src/                        # React UI 구성
│       ├── LandingPage.tsx
│       └── ...
│
├── main-container/                 # 메인 앱 컨테이너 (모든 앱 통합)
│   ├── @mf-types/                 # 모듈 간 타입 공유
│   └── src/
│       ├── App.tsx                # 진입점
│       └── ...
│
├── navigation-bar-app/            # 네비게이션 바 앱 (Micro Frontend)
│   └── src/
│       ├── App.tsx
│       └── navbar.css
│
├── .gitignore
├── README.md
├── lerna.json                      # 모노레포 설정
├── package.json                   # 루트 패키지 정보
└── folder_structure.txt           # 이 구조 파일


---

## 🧩 구조 설명

- **모노레포 기반 구조**로 구성되어 있으며, `Lerna`를 통해 각 앱을 효율적으로 관리합니다.
- `main-container`는 전체 앱의 진입점 역할을 하며, Micro Frontend 방식으로 각 앱(`Landing-Page`, `choices-of-a-spring-day`, `navigation-bar-app`)을 로드합니다.
- 각 앱은 **독립적으로 개발 및 배포 가능**하도록 설계되어 있습니다.

---

필요하면 여기에 실행 방법, 기술 스택, 데모 링크 등을 이어서 작성하시면 됩니다. 추가 요청도 언제든지 환영입니다! 😄
