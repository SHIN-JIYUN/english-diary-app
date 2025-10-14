"use client";

import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { useEffect, useState } from 'react'; // 👈 (1) useEffect와 useState를 불러옵니다.

export default function Header() {
  const { isLoggedIn, logout } = useAuthStore();
  
  // 👈 (2) 컴포넌트가 클라이언트에서 완전히 로드(마운트)되었는지 확인하는 상태
  const [isMounted, setIsMounted] = useState(false);

  // 👈 (3) 컴포넌트가 처음 로드될 때 딱 한 번만 실행됩니다.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 👈 (4) 아직 마운트되지 않았다면 (서버에서 그리거나, 클라이언트 첫 렌더링 시) 아무것도 보여주지 않습니다.
  if (!isMounted) {
    return null;
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          🎨 일기 네컷
        </Link>

        {/* 이제 이 부분은 isMounted가 true일 때만 렌더링되므로, 서버-클라이언트 불일치가 발생하지 않습니다. */}
        <nav className="flex items-center space-x-4">
          {isLoggedIn ? (
            // "로그인 되었을 때" 보여줄 메뉴
            <>
              <Link href="/calendar" className="text-gray-600 hover:text-blue-600">
                내 캘린더
              </Link>
              <Link href="/diary/write" className="text-gray-600 hover:text-blue-600">
                일기 쓰기
              </Link>
              <button
                onClick={logout}
                className="px-4 py-1 bg-gray-200 text-gray-800 rounded-md font-semibold hover:bg-gray-300 text-sm"
              >
                로그아웃
              </button>
            </>
          ) : (
            // "로그아웃 상태일 때" 보여줄 메뉴
            <>
              <Link href="/login" className="text-gray-600 hover:text-blue-600">
                로그인
              </Link>
              <Link href="/signup" className="text-gray-600 hover:text-blue-600">
                회원가입
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}