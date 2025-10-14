"use client";

import Link from 'next/link'; 
import { usePathname } from 'next/navigation';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        
        
        <div className="text-center mb-10">
          {/* (2) h1 태그를 Link 태그로 감싸줍니다. */}
          <Link href="/">
            <h1 className="text-4xl font-bold text-gray-800 transition-colors hover:text-sky-500">
              네컷일기
            </h1>
          </Link>
        </div>
        
        <div className="min-h-[450px]">
          {children}
        </div>
      </div>
    </div>
  );
}