import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProviderWrapper from "@/components/ThemeProviderWrapper"; // 새로 추가할 컴포넌트

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
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
      </body>
    </html>
  );
}
