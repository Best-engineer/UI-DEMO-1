This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### 방법 1: Vercel CLI 사용 (권장)

1. **Vercel CLI 설치**
   ```bash
   npm i -g vercel
   ```

2. **프로젝트 디렉토리에서 배포**
   ```bash
   vercel
   ```
   
   - 처음 실행 시 Vercel 계정으로 로그인하라는 메시지가 표시됩니다
   - 프로젝트 설정 질문에 기본값으로 답변하면 됩니다
   - 배포가 완료되면 URL이 제공됩니다

3. **프로덕션 배포**
   ```bash
   vercel --prod
   ```

### 방법 2: GitHub 연동

1. **GitHub에 코드 푸시**
   - GitHub 저장소를 생성하고 코드를 푸시합니다
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Vercel 웹사이트에서 배포**
   - [vercel.com](https://vercel.com)에 로그인
   - "Add New Project" 클릭
   - GitHub 저장소 선택
   - 프로젝트 설정 확인 (자동으로 감지됨)
   - "Deploy" 클릭

### 빌드 설정

프로젝트는 자동으로 Next.js로 감지되며, 다음 설정이 자동으로 적용됩니다:
- **Build Command**: `next build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 환경 변수

환경 변수가 필요한 경우:
1. Vercel 대시보드 → 프로젝트 → Settings → Environment Variables
2. 변수 추가 후 재배포

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
