# Tistory AI Blog Generator

Google Gemini AI를 활용한 Tistory 블로그 포스팅 자동 생성기입니다.

## 주요 기능

- **AI 기반 블로그 글 생성**: Gemini 3.0 Pro를 활용한 고품질 콘텐츠 생성
- **AI 이미지 생성**: Imagen 3.0을 활용한 블로그 대표 이미지 자동 생성 (4:3 비율)
- **사실 기반 콘텐츠**: System Instruction을 통한 정확하고 신뢰할 수 있는 정보 제공
- **2컬럼 뷰어**: 미리보기와 Raw HTML 코드를 동시에 확인
- **원클릭 복사**: Tistory에 바로 붙여넣을 수 있는 HTML 코드 복사

## 기술 스택

- **Frontend**: React + Vite, Tailwind CSS, Lucide React
- **Backend**: Netlify Functions (Serverless)
- **AI**: Google Generative AI SDK (Gemini 3.0 Pro, Imagen 3.0)
- **Deployment**: Netlify

## 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.example` 파일을 복사하여 `.env` 파일을 생성하고, Gemini API 키를 입력합니다.

```bash
cp .env.example .env
```

`.env` 파일을 열어 API 키를 입력합니다:

```
GEMINI_API_KEY=your_actual_api_key_here
```

**Gemini API 키 발급 방법:**
1. [Google AI Studio](https://aistudio.google.com/app/apikey)에 접속
2. "Create API Key" 버튼 클릭
3. 생성된 API 키를 복사하여 `.env` 파일에 붙여넣기

### 3. 개발 서버 실행

**중요**: Netlify Functions를 로컬에서 실행하려면 반드시 `netlify dev`를 사용해야 합니다.

```bash
npm run dev
```

이 명령어는 자동으로 `netlify dev`를 실행하여:
- Vite 개발 서버 시작 (`http://localhost:8888`)
- Netlify Functions 로컬 실행
- 환경 변수 (.env) 자동 로드

브라우저에서 **`http://localhost:8888`**로 접속합니다.

> **참고**: 기존 Vite만 실행하려면 `npm run dev:vite`를 사용하세요 (단, Netlify Functions는 작동하지 않습니다).

## 배포 (Netlify)

### 1. GitHub 연동

1. GitHub에 새 리포지토리 생성
2. 로컬 프로젝트를 GitHub에 푸시

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. Netlify 배포

1. [Netlify](https://netlify.com)에 로그인
2. "New site from Git" 클릭
3. GitHub 리포지토리 선택
4. 빌드 설정 확인:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. 환경 변수 설정:
   - `GEMINI_API_KEY`: Gemini API 키 입력
6. "Deploy site" 클릭

## 사용 방법

1. 메인 화면에서 블로그 포스팅 주제를 입력합니다.
2. "블로그 글 생성하기" 버튼을 클릭합니다.
3. AI가 블로그 글과 이미지를 생성할 때까지 기다립니다 (약 30초).
4. 생성된 결과를 미리보기와 HTML 코드로 확인합니다.
5. "HTML 복사하기" 버튼을 클릭하여 코드를 복사합니다.
6. Tistory 관리자 페이지에서 HTML 모드로 붙여넣습니다.

## 프로젝트 구조

```
tistory-ai-agent/
├── src/
│   ├── App.jsx              # 메인 앱 컴포넌트
│   ├── main.jsx             # 앱 진입점
│   ├── index.css            # 글로벌 스타일
│   └── components/
│       ├── TopicInput.jsx   # 주제 입력 컴포넌트
│       └── ResultDisplay.jsx # 결과 표시 컴포넌트
├── netlify/
│   └── functions/
│       └── generate-blog.js # Gemini API 호출 함수
├── public/                  # 정적 파일
├── index.html              # HTML 템플릿
├── package.json            # 프로젝트 설정
├── vite.config.js          # Vite 설정
├── tailwind.config.js      # Tailwind CSS 설정
├── postcss.config.js       # PostCSS 설정
├── netlify.toml            # Netlify 배포 설정
└── .env.example            # 환경 변수 예제
```

## 주요 특징

### AI System Instruction

블로그 생성 시 다음 원칙을 따릅니다:

1. 사실 기반의 정보만 제공
2. 신뢰할 수 있는 출처 명시
3. 추측성 글쓰기 금지
4. HTML 시맨틱 태그 사용 (h2, h3, p, ul, li, b)
5. CSS 인라인 스타일 사용하지 않음

### 이미지 생성

- Imagen 3.0을 사용한 고품질 이미지
- 4:3 비율 (1024x768)
- 블로그 주제와 연관된 이미지 자동 생성
- Base64 인코딩으로 HTML에 직접 삽입

## 라이선스

MIT License

## 기여

이슈와 PR은 언제나 환영합니다!

## 문의

프로젝트 관련 문의사항은 GitHub Issues를 이용해주세요.
