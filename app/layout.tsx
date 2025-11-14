import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans_KR({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KH정보교육원 - IT 전문가 양성 교육기관",
  description: "20년 이상의 노하우로 IT 전문가를 양성하는 KH정보교육원. 전액 국비지원으로 부담 없이 시작하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${notoSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
