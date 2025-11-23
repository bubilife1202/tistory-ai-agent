# Tistory AI Blog Generator

Google Gemini AI를 활용한 Tistory 블로그 포스팅 자동 생성기입니다.

## 주요 기능

- **AI 기반 블로그 글 생성**: Gemini 1.5 Pro를 활용한 고품질 콘텐츠 생성
- **AI 이미지 생성**: Gemini 3 Pro Image (Nano Banana Pro)로 프로페셔널 이미지 자동 생성
  - **Thinking Mode**: 고급 추론을 통한 정확한 이미지 생성
  - **해상도 선택**: 1K, 2K, 4K 지원
  - **비율 선택**: 1:1, 16:9, 4:3, 3:2, 9:16 등 다양한 비율
- **사실 기반 콘텐츠**: System Instruction을 통한 정확하고 신뢰할 수 있는 정보 제공
- **2컬럼 뷰어**: 미리보기와 Raw HTML 코드를 동시에 확인
- **원클릭 복사**: Tistory에 바로 붙여넣을 수 있는 HTML 코드 복사
- **간편한 API 키 관리**: 브라우저에서 직접 API 키 입력 및 저장

## 기술 스택

- **Frontend**: React + Vite, Tailwind CSS, Lucide React
- **AI SDK**: @google/genai (최신 Google Gen AI SDK)
- **AI Models**:
  - Gemini 1.5 Pro (텍스트 생성)
  - Gemini 3 Pro Image (이미지 생성 - Nano Banana Pro)
- **Deployment**: Netlify (정적 사이트)

## 빠른 시작

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속합니다.

### 3. API 키 입력

1. [Google AI Studio](https://aistudio.google.com/app/apikey)에서 무료 API 키 발급
2. 앱 상단의 "Gemini API 키 설정" 섹션에 API 키 입력
3. "저장" 버튼 클릭 (브라우저에 안전하게 저장됨)

### 4. 블로그 글 생성

1. **주제 입력** (예: "인공지능의 미래")
2. **이미지 옵션 선택**:
   - AI 이미지 자동 생성 체크
   - 해상도 선택 (1K, 2K, 4K)
   - 비율 선택 (1:1, 16:9, 4:3 등)
3. **"블로그 글 생성하기"** 버튼 클릭
4. **40-60초 대기** (Thinking Mode 작동 중)
5. 생성된 HTML을 미리보기로 확인하거나 복사하여 Tistory에 붙여넣기

## 배포 (Netlify)

### GitHub 연동 배포

1. GitHub에 리포지토리 푸시

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. [Netlify](https://netlify.com)에 로그인
3. "New site from Git" 클릭
4. GitHub 리포지토리 선택
5. 빌드 설정:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. "Deploy site" 클릭

**환경 변수 설정 불필요**: API 키는 사용자가 브라우저에서 직접 입력합니다.

## 사용 방법

### 1단계: API 키 설정

- 페이지 상단의 API 키 입력란에 Gemini API 키를 입력하고 저장
- API 키는 브라우저의 localStorage에 안전하게 보관됩니다
- 삭제 버튼으로 언제든지 제거할 수 있습니다

### 2단계: 블로그 주제 입력

- 구체적인 주제를 입력할수록 더 정확한 결과를 얻을 수 있습니다
- 예시: "건강한 식습관을 위한 10가지 팁", "파이썬 기초 문법 정리"

### 3단계: 이미지 옵션 선택

- **AI 이미지 자동 생성**: Gemini 3 Pro Image로 이미지 생성
- **해상도**:
  - 1K: 기본 품질
  - 2K: 고품질 (권장)
  - 4K: 프로페셔널 품질
- **비율**:
  - 16:9: 블로그 대표 이미지에 가장 적합 (권장)
  - 1:1: 정사각형
  - 4:3: 클래식 비율
  - 기타: 3:2, 9:16 등

### 4단계: 결과 확인 및 복사

- 왼쪽: 실제 렌더링된 미리보기
- 오른쪽: Tistory에 붙여넣을 Raw HTML 코드
- "HTML 복사하기" 버튼으로 한 번에 복사

### 5단계: Tistory에 적용

1. Tistory 관리자 → 글쓰기
2. 에디터 상단의 "HTML" 탭 클릭
3. 복사한 HTML 코드 붙여넣기
4. "기본모드"로 돌아가 미리보기 확인
5. 발행

## 프로젝트 구조

```
tistory-ai-agent/
├── src/
│   ├── App.jsx                    # 메인 앱 (Gemini API 호출)
│   ├── main.jsx                   # React 진입점
│   ├── index.css                  # Tailwind CSS 설정
│   └── components/
│       ├── ApiKeyInput.jsx        # API 키 입력 컴포넌트
│       ├── TopicInput.jsx         # 주제 + 이미지 옵션 입력
│       └── ResultDisplay.jsx      # 2컬럼 결과 뷰어
├── public/                        # 정적 파일
├── index.html                     # HTML 템플릿
├── package.json                   # 프로젝트 설정
├── vite.config.js                 # Vite 설정
├── tailwind.config.js             # Tailwind CSS 설정
├── postcss.config.js              # PostCSS 설정
└── netlify.toml                   # Netlify 배포 설정
```

## 주요 특징

### AI System Instruction

블로그 생성 시 다음 원칙을 따릅니다:

1. **사실 기반의 정보만 제공**
2. **신뢰할 수 있는 출처 명시**
3. **추측성 글쓰기 금지**
4. **HTML 시맨틱 태그 사용** (h2, h3, p, ul, li, b)
5. **CSS 인라인 스타일 사용하지 않음**

### Gemini 3 Pro Image (Nano Banana Pro)

- **Thinking Mode**: 복잡한 프롬프트를 추론하여 최적의 이미지 생성
- **고해상도**: 1K, 2K, 4K 지원
- **다양한 비율**: 블로그, SNS 등 다양한 용도에 맞는 비율
- **프로페셔널 품질**: 블로그 대표 이미지로 사용하기에 완벽한 품질

### 보안

- API 키는 브라우저의 localStorage에만 저장됩니다
- 서버로 전송되지 않으며, 사용자만 접근할 수 있습니다
- API 키는 Google Gemini API 호출에만 사용됩니다

### 비용

- **텍스트 생성** (Gemini 1.5 Pro): 무료 티어 제공
- **이미지 생성** (Gemini 3 Pro Image):
  - 1K/2K: $0.13/이미지
  - 4K: $0.24/이미지
- [Google AI Studio 가격 정책](https://ai.google.dev/pricing) 참고

## FAQ

### Q: API 키가 안전한가요?

A: API 키는 브라우저의 localStorage에만 저장되며, 서버로 전송되지 않습니다. 하지만 공용 컴퓨터에서 사용 후에는 "삭제" 버튼으로 API 키를 제거하는 것을 권장합니다.

### Q: Thinking Mode가 무엇인가요?

A: Gemini 3 Pro Image의 고급 기능으로, 이미지 생성 전에 프롬프트를 분석하고 추론하여 더 정확하고 고품질의 이미지를 생성합니다. 일반 이미지 생성보다 시간이 조금 더 걸리지만 훨씬 좋은 결과를 얻을 수 있습니다.

### Q: 이미지 생성 시간이 얼마나 걸리나요?

A: Thinking Mode를 사용하므로 약 40-60초 소요됩니다. 해상도가 높을수록 시간이 더 걸립니다 (2K: 40초, 4K: 60초).

### Q: 이미지 없이 텍스트만 생성할 수 있나요?

A: 네, "AI 이미지 자동 생성" 체크박스를 해제하면 텍스트만 생성됩니다 (약 20-30초 소요).

### Q: 생성된 글을 수정할 수 있나요?

A: Raw HTML 코드를 직접 수정하거나, Tistory 에디터에서 수정할 수 있습니다.

### Q: Gemini API 키는 어디서 발급받나요?

A: [Google AI Studio](https://aistudio.google.com/app/apikey)에서 무료로 발급받을 수 있습니다.

## 기술 마이그레이션

### @google/generative-ai → @google/genai

이 프로젝트는 최신 **@google/genai** SDK를 사용합니다.

- `@google/generative-ai`는 2025년 8월 31일 지원 종료 예정
- `@google/genai`는 Gemini 2.0+ 및 Gemini 3.0 모델을 완벽 지원
- Gemini 3 Pro Image는 새 SDK에서만 사용 가능

## 라이선스

MIT License

## 기여

이슈와 PR은 언제나 환영합니다!

## 데모

Live Demo: [https://tistory-ai-agent.netlify.app/](https://tistory-ai-agent.netlify.app/)

## 문의

프로젝트 관련 문의사항은 GitHub Issues를 이용해주세요.

---

**Powered by Google Gemini AI**
- Gemini 1.5 Pro (텍스트 생성)
- Gemini 3 Pro Image (이미지 생성 - Nano Banana Pro)
