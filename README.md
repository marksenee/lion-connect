# ConnectLion Frontend

ConnectLion의 프론트엔드 레포지토리입니다.

## 🚀 기술 스택

- **React**: 18.2.0
- **React Router**: 6.22.0
- **Styled Components**: 6.1.8
- **React Icons**: 5.0.1
- **Axios**: 1.6.7

## 📁 프로젝트 구조

```
src/
├── components/     # 재사용 가능한 컴포넌트
├── pages/          # 페이지 컴포넌트
├── styles/         # 스타일 관련 파일
│   ├── theme.js    # 테마 설정
│   └── GlobalStyle.js  # 전역 스타일
├── utils/          # 유틸리티 함수
└── App.jsx         # 메인 앱 컴포넌트
```

## 🛠️ 개발 환경 설정

1. **의존성 설치**

```bash
npm install
```

2. **개발 서버 실행**

```bash
npm start
```

3. **빌드**

```bash
npm run build
```

## 🔧 주요 기능

### 1. 회원가입/로그인

- 이메일/비밀번호 기반 회원가입
- 소셜 로그인 (구글, 깃허브)
- JWT 기반 인증

### 2. 프로필 관리

- 개인 정보 수정
- 포트폴리오 관리
- 기술 스택 설정

### 3. 커뮤니티

- 게시글 CRUD
- 댓글 기능
- 좋아요/북마크

### 4. 매칭 시스템

- 프로필 기반 매칭
- 실시간 채팅
- 알림 시스템

## 📝 API 통신

### API 기본 설정

```javascript
// utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### 주요 API 엔드포인트

- 회원가입: `POST /api/auth/signup`
- 로그인: `POST /api/auth/login`
- 프로필 조회: `GET /api/users/profile`
- 게시글 목록: `GET /api/posts`
- 매칭 요청: `POST /api/matches`

## 🎨 스타일 가이드

### 테마 설정

```javascript
// styles/theme.js
export const theme = {
  colors: {
    primary: "#ff7710",
    secondary: "#ff8c00",
    white: "#ffffff",
    gray: "#666666",
    lightGray: "#f5f5f5",
    border: "#e0e0e0",
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "3rem",
  },
  // ... 기타 테마 설정
};
```

### 컴포넌트 스타일링

- Styled Components 사용
- 테마 변수 활용
- 반응형 디자인 적용

## 🔄 상태 관리

### 주요 상태

- 사용자 인증 상태
- 프로필 정보
- 게시글 목록
- 매칭 상태

## 🧪 테스트

### 테스트 실행

```bash
npm test
```

### 테스트 커버리지 확인

```bash
npm run test:coverage
```

## 📦 배포

### 빌드 및 배포 과정

1. `npm run build`로 프로덕션 빌드
2. 빌드된 파일을 서버에 업로드
3. Nginx/Apache 설정

## 🤝 기여 가이드

1. 이슈 생성
2. 브랜치 생성 (`feature/기능명`)
3. 코드 작성 및 테스트
4. PR 생성
5. 코드 리뷰
6. 머지

## �� 라이센스

MIT License
