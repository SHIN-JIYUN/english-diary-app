"use client";

import Link from 'next/link'; 
import AuthGuard from "@/components/auth/AuthGuard";
import { UserCircle } from "lucide-react";

//  '내 정보' 페이지 전용 헤더
const ProfileHeader = () => (
  <header className="bg-white shadow-sm sticky top-0 z-50">
    <div className="container mx-auto px-6 py-3 flex justify-between items-center">
      <Link href="/diary/write" className="text-2xl font-bold text-sky-500">
        🎨 네컷일기
      </Link>
      {/* 이 헤더에는 닉네임이나 다른 메뉴가 없습니다. 오직 로고만 있습니다. */}
    </div>
  </header>
);


export default function ProfilePage() {
  // --- 실제로는 백엔드에서 받아올 임시 데이터 ---
  const userInfo = {
    email: 'admin@test.com',
    name: '관리자',
    joinDate: '2025년 10월 15일',
  };
  const calendarCompletion = {
    diariesWritten: 15,
    totalDays: 31,
  };
  const completionRate = Math.round((calendarCompletion.diariesWritten / calendarCompletion.totalDays) * 100);
  // --- 여기까지 ---

  const handleWithdraw = () => {
    if (window.confirm("정말로 탈퇴하시겠습니까? 모든 데이터가 삭제되며 복구할 수 없습니다.")) {
      alert("탈퇴 처리되었습니다. (실제 기능은 백엔드 연동 필요)");
    }
  };

  return (
    <AuthGuard>
      <div className="bg-gray-50 min-h-screen">
        {/*  '내 정보' 페이지 전용 헤더 사용 */}
        <ProfileHeader />
        
        <main className="container mx-auto p-8">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">내 정보</h1>

            {/* 프로필 사진 섹션 */}
            <section className="flex flex-col items-center mb-10">
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                <UserCircle size={80} className="text-gray-400" />
              </div>
              <button className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
                프로필 사진 변경
              </button>
            </section>

            {/* 로그인 정보 섹션 */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold border-b pb-2 mb-4">로그인 정보</h2>
              <div className="space-y-3 text-gray-800">
                <div className="flex"><p className="w-28 font-bold shrink-0">이메일</p><p>{userInfo.email}</p></div>
                <div className="flex"><p className="w-28 font-bold shrink-0">이름</p><p>{userInfo.name}</p></div>
                <div className="flex"><p className="w-28 font-bold shrink-0">가입일</p><p>{userInfo.joinDate}</p></div>
              </div>
            </section>
            
            {/* 캘린더 완주율 섹션 */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold border-b pb-2 mb-4">캘린더 완주율</h2>
              <div className="flex items-center space-x-4">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-sky-500 h-4 rounded-full" style={{ width: `${completionRate}%` }}></div>
                </div>
                <p className="font-bold text-lg whitespace-nowrap">{completionRate}%</p>
              </div>
              <p className="text-right mt-2 text-gray-600">{`(${calendarCompletion.diariesWritten} / ${calendarCompletion.totalDays}일 작성)`}</p>
            </section>

            {/* 회원 탈퇴 섹션 */}
            <section>
              <h2 className="text-xl font-semibold border-b pb-2 mb-4 text-red-600">계정 관리</h2>
              <button
                onClick={handleWithdraw}
                className="text-red-600 hover:underline"
              >
                회원 탈퇴하기
              </button>
            </section>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}