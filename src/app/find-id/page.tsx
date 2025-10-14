"use client";

import { useState } from 'react';
import Link from 'next/link';
import AuthLayout from '@/components/layout/AuthLayout';
import { User, Mail } from 'lucide-react';

export default function FindIdPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [foundId, setFoundId] = useState('');

  const handleFindId = () => {
    setError('');
    setFoundId('');

    // --- 실제로는 백엔드 서버와 통신해야 하는 부분 ---
    const ADMIN_NAME = '홍길동';
    const ADMIN_EMAIL = 'admin@test.com';

    if (name === ADMIN_NAME && email === ADMIN_EMAIL) {
      setFoundId(`회원님의 아이디는 [ ${ADMIN_EMAIL} ] 입니다.`);
    } else {
      setError('입력하신 정보와 일치하는 회원이 없습니다.');
    }
    // --- 여기까지 ---
  };

  return (
    <AuthLayout>
      <h2 className="text-xl font-bold text-center mb-8">아이디 찾기</h2>
      
      {!foundId ? (
        // 아이디를 찾기 전 화면
        <form onSubmit={(e) => { e.preventDefault(); handleFindId(); }}>
          <p className="text-center text-gray-600 mb-6">가입 시 등록한 이름과 이메일 주소를 입력해주세요.</p>
          <div className="flex items-center border-b-2 p-2 mb-4 focus-within:border-sky-500">
            <User className="text-gray-400 mr-3" size={20} />
            <input type="text" placeholder="이름(닉네임)" value={name} onChange={(e) => setName(e.target.value)} className="w-full focus:outline-none bg-transparent"/>
          </div>
          <div className="flex items-center border-b-2 p-2 mb-6 focus-within:border-sky-500">
            <Mail className="text-gray-400 mr-3" size={20} />
            <input type="email" placeholder="이메일 주소" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full focus:outline-none bg-transparent"/>
          </div>
          
          {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}
          
          <button type="submit" className="w-full bg-sky-500 text-white font-bold py-3 rounded-lg text-lg">
            아이디 찾기
          </button>
        </form>
      ) : (
        // 아이디를 찾은 후 화면
        <div className="text-center">
          <p className="text-gray-800 mb-6">{foundId}</p>
          <Link href="/" className="w-full inline-block bg-sky-500 text-white font-bold py-3 rounded-lg text-lg">
            로그인하기
          </Link>
        </div>
      )}
    </AuthLayout>
  );
}