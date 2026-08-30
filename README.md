# Course Manager

Next.js와 Prisma를 학습하기 위해 개발하는 간단한 교육 과정 관리 서비스입니다.

교육 과정을 등록하고 조회·수정·삭제하는 CRUD 기능을 구현하며, 프론트엔드부터 API와 데이터베이스까지 연결되는 전체 개발 흐름을 학습하는 것을 목표로 합니다.

## 기술 스택

- Next.js
- React
- TypeScript
- App Router
- Prisma ORM
- SQLite
- Tailwind CSS
- pnpm

## 주요 기능

현재 개발 중입니다.

- [ ] 교육 과정 목록 조회
- [ ] 교육 과정 상세 조회
- [ ] 교육 과정 등록
- [ ] 교육 과정 수정
- [ ] 교육 과정 삭제
- [ ] 입력값 검증 및 오류 처리

## 프로젝트 실행

### 1. 패키지 설치

```bash
pnpm install
```

### 2. 환경변수 설정

프로젝트 루트에 `.env` 파일을 생성합니다.

```env
DATABASE_URL="file:./dev.db"
```

### 3. 데이터베이스 마이그레이션

```bash
pnpm exec prisma migrate dev
```

### 4. 개발 서버 실행

```bash
pnpm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속합니다.

## 프로젝트 구조

```text
course-manager/
├── prisma/              # Prisma 스키마와 마이그레이션
├── public/              # 이미지 등 정적 파일
├── src/
│   └── app/             # Next.js App Router 페이지 및 레이아웃
├── .env                 # 환경변수(Git 제외)
├── package.json
└── README.md
```

## 학습 목표

- Next.js App Router의 파일 기반 라우팅 이해
- Server Component와 Client Component의 역할 구분
- Prisma를 활용한 데이터 모델 정의
- 데이터베이스 마이그레이션 경험
- 교육 과정 CRUD 구현
- 화면, 서버 로직과 데이터베이스의 연결 흐름 이해
