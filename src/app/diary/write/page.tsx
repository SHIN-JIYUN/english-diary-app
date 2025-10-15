"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/auth/AuthGuard";
import Link from "next/link";
import { LogOut } from 'lucide-react';

export default function WriteDiaryPage() {
  const [diaryContent, setDiaryContent] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState("Theme 1");

  const logout = useAuthStore((state) => state.logout);
  const router = useRouter(); 

  const handleLogout = () => {
    logout();
  };

  // 오늘 기준 달력 생성
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0~11
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleSaveDiary = () => {
    if (diaryContent.trim().length < 20) {
      alert("일기 내용은 최소 20자 이상 작성해주세요.");
      return;
    }
    console.log("저장할 일기 내용:", diaryContent);
    console.log("선택한 날짜:", selectedDate);
    alert("일기가 저장되었습니다! (콘솔 확인)");
    setDiaryContent("");
  };

  const handleSaveImage = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      // 테마별 배경색
      let bgColor = "lightgray";
      if (theme === "Theme 1") bgColor = "lightgray";
      if (theme === "Theme 2") bgColor = "#ffe4b5"; // moccasin
      if (theme === "Theme 3") bgColor = "#d3f8e2"; // mint

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, 400, 400);

      ctx.fillStyle = "black";
      ctx.font = "20px sans-serif";
      ctx.fillText("컷 1", 70, 110);
      ctx.fillText("컷 2", 270, 110);
      ctx.fillText("컷 3", 70, 310);
      ctx.fillText("컷 4", 270, 310);

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "my_diary_cartoon.png";
          a.click();
          URL.revokeObjectURL(url);
        }
      });
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen flex relative bg-gray-50">
        {/* 메뉴 버튼 */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed top-4 right-4 z-50 flex flex-col justify-between w-8 h-6"
        >
          <span
            className={`block h-1 bg-gray-800 rounded transform transition duration-300 ${
              sidebarOpen ? "rotate-45 translate-y-2.5" : ""
            }`}
          />
          <span
            className={`block h-1 bg-gray-800 rounded transition duration-300 ${
              sidebarOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-1 bg-gray-800 rounded transform transition duration-300 ${
              sidebarOpen ? "-rotate-45 -translate-y-2.5" : ""
            }`}
          />
        </button>

        {/* 사이드바 */}
        <aside
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg p-6 flex flex-col transform transition-transform duration-300 z-40 ${
            sidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* 프로필 */}
          <div className="flex flex-col items-center mb-4">
            <div className="w-20 h-20 bg-gray-300 rounded-full mb-2" />
            <span className="font-semibold text-lg">관리자님</span>
          </div>

          {/* 내 정보 / 환경설정 */}
          <nav className="flex flex-col gap-2 mb-4">
            <Link href="/profile" className="text-left px-4 py-2 rounded-lg hover:bg-sky-100 transition-colors">
              내 정보
            </Link>
            <Link href="/settings" className="text-left px-4 py-2 rounded-lg hover:bg-sky-100 transition-colors">
              환경설정
            </Link>
          </nav>

          {/* 달력 */}
          <div className="flex-1 overflow-y-auto mb-4">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">
              {year}년 {month + 1}월
            </h2>
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day) => (
                <div
                  key={day}
                  className={`text-center py-1 rounded hover:bg-sky-100 cursor-pointer transition-colors ${
                    selectedDate ===
                    `${year}-${String(month + 1).padStart(2, "0")}-${String(
                      day
                    ).padStart(2, "0")}`
                      ? "bg-sky-300 text-white font-bold"
                      : "text-gray-700"
                  }`}
                  onClick={() =>
                    setSelectedDate(
                      `${year}-${String(month + 1).padStart(2, "0")}-${String(
                        day
                      ).padStart(2, "0")}`
                    )
                  }
                >
                  {day}
                </div>
              ))}
            </div>
          </div>

          {/* 로그아웃 버튼 */}
          <button
            onClick={handleLogout}
            className="mt-auto px-4 py-2 rounded-lg hover:bg-red-100 transition-colors text-red-500 font-semibold w-full flex items-center justify-center gap-2"
          >
            <LogOut size={18} />
            <span>로그아웃</span>
          </button>
        </aside>

        {/* 메인 컨텐츠 */}
        <main className="flex-1 flex justify-center py-10 px-6 lg:px-10 w-full">
          <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-8">
            {/* 일기 작성 영역 */}
            <div className="flex-1 bg-white p-6 rounded-2xl shadow-md">
              <h1 className="text-3xl font-bold mb-6 text-gray-800">
                오늘의 네컷 일기 ✍️
              </h1>

              <div className="mb-4">
                <label className="block mb-2 font-semibold text-gray-700">
                  날짜 선택
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                />
              </div>

              <textarea
                className="w-full h-60 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 resize-none mb-4"
                placeholder="오늘 하루는 어땠나요? 최소 20자 이상..."
                value={diaryContent}
                onChange={(e) => setDiaryContent(e.target.value)}
              ></textarea>

              {/* 테마 선택 버튼 */}
              <div className="flex gap-2 mb-4">
                {["Theme 1", "Theme 2", "Theme 3"].map((t) => (
                  <button
                    key={t}
                    className={`px-4 py-2 rounded-lg font-semibold ${
                      theme === t
                        ? "bg-sky-500 text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                    onClick={() => setTheme(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveDiary}
                  className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl shadow-md transition-colors duration-200"
                >
                  일기 저장하고 카툰 만들기 🎨
                </button>
              </div>
            </div>

            {/* 오늘의 4컷 미리보기 */}
            <div className="w-full lg:w-96 bg-white p-6 rounded-2xl shadow-md flex flex-col">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                오늘의 4컷 미리보기
              </h2>
              <div className="grid grid-cols-2 gap-4 flex-1">
                <div className="h-32 bg-gray-100 rounded-xl shadow flex items-center justify-center text-gray-400 font-semibold">
                  컷 1
                </div>
                <div className="h-32 bg-gray-100 rounded-xl shadow flex items-center justify-center text-gray-400 font-semibold">
                  컷 2
                </div>
                <div className="h-32 bg-gray-100 rounded-xl shadow flex items-center justify-center text-gray-400 font-semibold">
                  컷 3
                </div>
                <div className="h-32 bg-gray-100 rounded-xl shadow flex items-center justify-center text-gray-400 font-semibold">
                  컷 4
                </div>
              </div>

              {/* 하단 버튼 */}
              <div className="flex gap-2 mt-4">
                <button className="flex-1 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg font-semibold">
                  재생성
                </button>
                <button className="flex-1 px-4 py-2 bg-green-400 hover:bg-green-500 text-white rounded-lg font-semibold">
                  편집
                </button>
                <button
                  className="flex-1 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-semibold"
                  onClick={handleSaveImage}
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}