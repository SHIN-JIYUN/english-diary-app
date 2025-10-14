"use client"; // 👈 'useState'를 사용하려면 꼭 필요해요!

import { useState } from "react"; // 👈 (1) useState 도구를 불러옵니다.
import AuthGuard from "@/components/auth/AuthGuard";

export default function WriteDiaryPage() {
  // 👇 (2) 'diaryContent'라는 이름의 단기 기억 저장소를 만듭니다.
  const [diaryContent, setDiaryContent] = useState("");

  const handleSave = () => {
    // 👇 (4) 버튼 클릭 시, 기억하고 있던 일기 내용을 콘솔에 출력합니다.
    console.log("저장할 일기 내용:", diaryContent);
    alert("일기가 저장되었습니다! (콘솔 확인)");
  };

  return (
    <AuthGuard>
      <div>
        <h1 className="text-3xl font-bold mb-6">오늘의 일기</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <textarea
            className="w-full h-60 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="오늘 하루는 어땠나요? 최소 20자 이상 적어주세요..."
            value={diaryContent} // 👈 (3) 이 textarea의 내용은 항상 diaryContent가 기억하는 값이야.
            onChange={(e) => setDiaryContent(e.target.value)} // 👈 (3) 글자가 바뀔 때마다 diaryContent에 즉시 기억시켜!
          ></textarea>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSave} // 👈 (4) 버튼을 클릭하면 handleSave 함수를 실행해.
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
            >
              일기 저장하고 카툰 만들기 🎨
            </button>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}