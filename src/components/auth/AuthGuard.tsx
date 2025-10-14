"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Spinner from '@/components/ui/Spinner'; 

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const router = useRouter();

  useEffect(() => {
    // 로그인 상태가 아니라고 확인되면, 로그인 페이지로 쫓아냅니다.
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  // 로그인 상태가 확인될 때까지는 로딩 스피너를 보여줍니다.
  if (!isLoggedIn) {
    return <Spinner />;
  }

  // 로그인이 확인되면, 자식 페이지(원래 보여주려던 페이지)를 보여줍니다.
  return <>{children}</>;
}