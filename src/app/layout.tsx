import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // CSS 전원 스위치

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "영어 일기 네컷",
  description: "AI로 만드는 나만의 네컷 일기",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      {/* <body> 안에 {children} 만 남깁니다! */}
      <body className={inter.className}>{children}</body>
    </html>
  );
}
