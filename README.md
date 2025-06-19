# 🎮 PlayPick
PlayPick은 다양한 게임 콘텐츠를 하나의 플랫폼에서 즐길 수 있도록 구성된 마이크로 프론트엔드(Micro Frontend) 기반 웹 애플리케이션입니다.

---

## 👥 팀원 구성

| 최현수 | 김정민 | 이신원 | 전지연 |
|--------|--------|--------|--------|
| <img src="https://cdn.discordapp.com/attachments/1383999022238273586/1384715997809741945/image.png?ex=685370c4&is=68521f44&hm=a179a00ce94ed8a5958c96b23ad7bffe5b7f4daddb69ae2b87bd6bc187ef71f8&" width="109" height="100"/> | <img src="https://avatars.githubusercontent.com/u/6846349?s=80&v=4" width="109" height="109"/> | <img src="https://mblogthumb-phinf.pstatic.net/MjAxNzExMTNfOTkg/MDAxNTEwNTE5MDU1OTAx.CgrsefuknGH3WyTiveT8LsFGXw288baNiov22l9sCywg.x3YtB2I7VXitiMcvgOkRkiH5umtLrNWj7IothphFwF0g.PNG.211grims/136.png?type=w800" width="109" height="100"/> | <img src="https://cdn.discordapp.com/attachments/1383999022238273586/1384715530136715366/1750066148038.jpg?ex=68537055&is=68521ed5&hm=74fb22315aca7246b65fbf04678837fb854606ec610d37f84029ecbba24a583b&" width="109" height="100"/> |
| [GitHub](https://github.com/IMCODER0000) | [GitHub](https://github.com/Mur-pixel) | [GitHub](https://github.com/redEevee) | [GitHub](https://github.com/dia0723) |

---

## 🧩 구조 설명

- **모노레포 기반 구조**로 구성되어 있으며, `Lerna`를 통해 각 앱을 효율적으로 관리합니다.
- `main-container`는 전체 앱의 진입점 역할을 하며, Micro Frontend 방식으로 각 앱(`Landing-Page`, `choices-of-a-spring-day`, `navigation-bar-app`, `person-quiz-game`, `spot-the-difference`, `versus-game`, `authentication-app`)을 로드합니다.
- 각 앱은 **독립적으로 개발 및 배포 가능**하도록 설계되어 있습니다.

---

## 🧱 기술 스택

| 분류            | 기술 스택                            | 설명 |
|------------------|--------------------------------------|------|
| **언어**         | TypeScript                           | 정적 타입을 지원하는 JavaScript 상위 언어 |
| **프레임워크**   | React                                | 컴포넌트 기반 UI 라이브러리 |
| **스타일링**     | Tailwind CSS                         | 유틸리티 기반 CSS 프레임워크 |
|                  | Autoprefixer                         | CSS 벤더 프리픽스를 자동으로 처리 |
| **패키지 관리**  | npm Workspaces                       | 모노레포 패키지 관리 도구 |
|                  | Lerna                                | 여러 패키지를 병렬 실행 및 버전 관리 |
| **환경 설정**    | cross-env                            | OS 환경 변수 설정을 통일하는 도구 |
| **빌드 도구**    | Rspack                               | 빠른 프론트엔드 번들러 |
| **아키텍처**     | Micro Frontend Architecture          | 앱 단위로 독립 구성된 마이크로 프론트엔드 구조 |
| **디렉토리 구조**| `main-container`, `apps/*` 구조      | 각각의 앱이 개별적으로 관리되는 모노레포 방식 |
| **실행 스크립트**| `lerna run start --parallel`         | 모든 앱을 병렬로 실행하여 개발 환경 구성 |

---

## 🖼 실행화면

## 시작 페이지

## VS 게임

## 틀린 그림 찾기
![틀린 그림 찾기](https://media.discordapp.net/attachments/1383999022238273586/1385085635504898069/651f2f96e72ea7f4.png?ex=6854c905&is=68537785&hm=1700f9728d7d40b5bae719cfadb3453c25bd7b7c8cd4ebd74b9b53d971daa29a&=&format=webp&quality=lossless&width=1010&height=568)

## 퀴즈 게임

## 시나리오 게임
---

## 📁디텍토리 구조

```text
📁 PlayPick
├── 📁 choices-of-a-spring-day/     # 게임 페이지
│   ├── 📁 public/                   # 이미지 리소스
│   └── 📁 src/                      # React 기반 게임 로직
├── 📁 Landing-Page/                # 랜딩 페이지 프론트엔드
│   ├── 📁 public/                   # 이미지 및 리소스
│   └── 📁 src/                      # React 기반 UI 구성
├── 📁 main-container/              # 메인 컨테이너 (모듈 연동 및 통합 관리)
│   ├── 📁 @mf-types/               # 모듈 간 타입 정의
│   └── 📁 src/                      # 메인 앱 진입점
├── 📁 person-quiz-game/            # 인물 맞추기 게임
│   └── 📁 src/
├── 📁 spot-the-difference/         # 틀린 그림 찾기 게임
│   └── 📁 src/
├── 📁 versus-game/                 # 대결 게임
│   └── 📁 src/
├── 📁 navigation-bar-app/          # 네비게이션 바 모듈
│   └── 📁 src/
├── 📁 authentication-app/          # 로그인 / 회원가입 기능
│   └── 📁 src/
├── 📁 node_modules/                # 의존성 모듈
├── 📁 .idea/                       # JetBrains IDE 설정
├── 📄 package.json                 # 루트 패키지 의존성
├── 📄 lerna.json                   # Lerna 설정
└── 📄 README.md                    # 프로젝트 소개 문서
