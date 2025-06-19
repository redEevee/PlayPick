# PlayPick
It's for PlayPick

---
## 👤 팀원 구성

<table class="tg"><thead>
  <tr>
    <th class="tg-9353"><span style="font-weight:bold">최현수</span></th>
    <th class="tg-9353"><span style="font-weight:bold">김정민</span></th>
    <th class="tg-9353"><span style="font-weight:bold">이신원</span></th>
    <th class="tg-9353"><span style="font-weight:bold">전지연</span></th>
  </tr></thead>
<tbody>
  <tr>
    <td class="tg-9353"><img src="https://cdn.discordapp.com/attachments/1383999022238273586/1384715997809741945/image.png?ex=685370c4&is=68521f44&hm=a179a00ce94ed8a5958c96b23ad7bffe5b7f4daddb69ae2b87bd6bc187ef71f8&" alt="Image" width="109" height="100"></td>
   <td class="tg-9353"><img src="https://avatars.githubusercontent.com/u/6846349?s=80&v=4" alt="Image" width="109" height="109"></td>
    <td class="tg-9353"><img src="https://mblogthumb-phinf.pstatic.net/MjAxNzExMTNfOTkg/MDAxNTEwNTE5MDU1OTAx.CgrsefuknGH3WyTiveT8LsFGXw288baNiov22l9sCywg.x3YtB2I7VXitiMcvgOkRkiH5umtLrNWj7IothphFwF0g.PNG.211grims/136.png?type=w800" alt="Image" width="109" height="100"></td>
    <td class="tg-9353"><img src="https://cdn.discordapp.com/attachments/1383999022238273586/1384715530136715366/1750066148038.jpg?ex=68537055&is=68521ed5&hm=74fb22315aca7246b65fbf04678837fb854606ec610d37f84029ecbba24a583b&" alt="Image" width="109" height="100"></td>
  </tr>
  <tr>
<td class="tg-7btt" style="text-align: center;">
  <a href="https://github.com/IMCODER0000" target="_blank" rel="noopener noreferrer" >GitHub</a>
</td>
<td class="tg-7btt" style="text-align: center;">
  <a href="https://github.com/Mur-pixel" target="_blank" rel="noopener noreferrer">GitHub</a>
</td>
<td class="tg-9353" style="text-align: center;">
  <a href="https://github.com/redEevee" target="_blank" rel="noopener noreferrer">GitHub</a>
</td>
<td class="tg-7btt" style="text-align: center;">
  <a href="https://github.com/dia0723" target="_blank" rel="noopener noreferrer">GitHub</a>
</td>

  </tr>
</tbody></table>
  
  
</div>

---

## 🧩 구조 설명

- **모노레포 기반 구조**로 구성되어 있으며, `Lerna`를 통해 각 앱을 효율적으로 관리합니다.
- `main-container`는 전체 앱의 진입점 역할을 하며, Micro Frontend 방식으로 각 앱(`Landing-Page`, `choices-of-a-spring-day`, `navigation-bar-app`,`person-quiz-game`,`spot-the-difference`,`versus-game`,`navigation-bar-app`)을 로드합니다.
- 각 앱은 **독립적으로 개발 및 배포 가능**하도록 설계되어 있습니다.
  
---
기술스택
---
시작페이지 
---

---

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
 PlayPick 프로젝트 구조
 
</head>
<body>
  <div>
    <p><span class="folder">📁 PlayPick</span></p>
    <p>├── <span class="folder">📁 choices-of-a-spring-day/</span> # 게임 페이지</p>
    <p>│   ├── <span class="folder">📁 public/</span> # 이미지 리소스</p>
    <p>│   └── <span class="folder">📁 src/</span> # React 기반 게임 로직</p>
    <p>├── <span class="folder">📁 Landing-Page/</span> # 랜딩 페이지 프론트엔드</p>
    <p>│   ├── <span class="folder">📁 public/</span> # 이미지 및 LandingImage 하위 폴더</p>
    <p>│   └── <span class="folder">📁 src/</span> # React 기반 UI 구성</p>
    <p>├── <span class="folder">📁 main-container/</span> # 메인 컨테이너 (모듈 연동 및 통합 관리)</p>
    <p>│   ├── <span class="folder">📁 @mf-types/</span> # 모듈 간 타입 정의</p>
    <p>│   └── <span class="folder">📁 src/</span> # 메인 앱 진입점</p>
    <p>├── <span class="folder">📁 person-quiz-game/</span> # 게임 페이지</p>
    <p>│   └── <span class="folder">📁 src/</span> # 메인 앱 진입점</p>
    <p>├── <span class="folder">📁 spot-the-difference/</span> # 게임 페이지</p>
    <p>│   └── <span class="folder">📁 src/</span> # 메인 앱 진입점</p>
    <p>├── <span class="folder">📁 versus-game/</span> # 게임 페이지</p>
    <p>│   └── <span class="folder">📁 src/</span> # 메인 앱 진입점</p>
    <p>├── <span class="folder">📁 navigation-bar-app/</span> # 네비게이션 바 모듈 앱</p>
    <p>│   └── <span class="folder">📁 src/</span> # 컴포넌트 및 스타일</p>
    <p>├── <span class="folder">📁 node_modules/</span> # 의존성 모듈 (자동 생성)</p>
    <p>├── <span class="folder">📁 .idea/</span> # JetBrains IDE 설정</p>
    <p>├── <span class="file">package.json</span> # 루트 패키지 의존성</p>
    <p>├── <span class="file">lerna.json</span> # Lerna 설정 (모노레포 관리)</p>
    <p>└── <span class="file">README.md</span> # 프로젝트 소개 파일</p>
  </div>
</body>
</html>

---

필요하면 여기에 실행 방법, 기술 스택, 데모 링크 등을 추가
