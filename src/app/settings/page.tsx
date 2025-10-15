"use client";

import { useEffect, useState } from "react";
import Link from 'next/link'; 
import AuthGuard from "@/components/auth/AuthGuard"; 

// 3. '환경설정' 페이지 전용 헤더
const SettingsHeader = () => (
  <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 transition-colors duration-300">
    <div className="container mx-auto px-6 py-3 flex justify-between items-center">
      <Link href="/diary/write" className="text-2xl font-bold text-sky-500">
        🎨 네컷일기
      </Link>
    </div>
  </header>
);

export default function SettingsPage() {
 
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("ko");
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedLang = localStorage.getItem("language");
    const savedNotif = localStorage.getItem("notifications");

    if (savedTheme) setTheme(savedTheme);
    if (savedLang) setLanguage(savedLang);
    if (savedNotif) setNotifications(savedNotif === "true");
    
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleSave = () => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("language", language);
    localStorage.setItem("notifications", notifications.toString());
    alert(language === "ko" ? "설정이 저장되었습니다 ✅" : "Settings saved ✅");
    console.log("✅ 저장된 테마:", theme);
  };

  const t = {
    title: language === "ko" ? "⚙️ 환경설정" : "⚙️ Settings",
    theme: language === "ko" ? "테마 선택" : "Theme",
    light: language === "ko" ? "라이트 모드" : "Light mode",
    dark: language === "ko" ? "다크 모드" : "Dark mode",
    lang: language === "ko" ? "언어 선택" : "Language",
    notif: language === "ko" ? "알림 받기" : "Notifications",
    save: language === "ko" ? "변경사항 저장" : "Save changes",
  };

  return (
    // 4. 페이지 전체 구조를 감싸줍니다.
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <SettingsHeader />
        <main className="container mx-auto p-8">
          <div className="max-w-2xl mx-auto">
            <div className="w-full bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md transition-colors duration-300">
              <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                {t.title}
              </h1>
              {/* 테마 설정 */}
              <div className="mb-6">
                <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {t.theme}
                </label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="light">{t.light}</option>
                  <option value="dark">{t.dark}</option>
                </select>
              </div>
              {/* 언어 설정 */}
              <div className="mb-6">
                <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  {t.lang}
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="ko">한국어</option>
                  <option value="en">English</option>
                </select>
              </div>
              {/* 알림 설정 */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  {t.notif}
                </span>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                  className="w-5 h-5 accent-sky-500"
                />
              </div>
              {/* 저장 버튼 */}
              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl shadow-md transition-colors duration-200"
                >
                  {t.save}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}