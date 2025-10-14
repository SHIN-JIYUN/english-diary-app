"use client";

import { useState } from 'react';
import Link from 'next/link';
import AuthLayout from '@/components/layout/AuthLayout';
import { Mail, KeyRound, Lock } from 'lucide-react';

export default function FindPasswordPage() {
  const [step, setStep] = useState(1); // 1: 이메일 입력, 2: 인증번호, 3: 비번 재설정
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSendCode = () => {
    // --- 실제로는 백엔드에서 이메일을 보내야 함 ---
    if (email === 'admin@test.com') {
      alert('인증번호 [123456]가 발송되었습니다. (임시)');
      setStep(2);
      setError('');
    } else {
      setError('가입되지 않은 이메일입니다.');
    }
    // --- 여기까지 ---
  };

  const handleVerifyCode = () => {
    // --- 실제로는 백엔드에서 코드를 검증해야 함 ---
    if (code === '123456') {
      setStep(3);
      setError('');
    } else {
      setError('인증번호가 일치하지 않습니다.');
    }
    // --- 여기까지 ---
  };
  
  const handleResetPassword = () => {
    if (newPassword.length < 8) {
        setError('비밀번호는 8자 이상으로 설정해주세요.');
        return;
    }
    if (newPassword !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    alert('비밀번호가 성공적으로 변경되었습니다.');
    // 실제로는 여기서 서버에 변경 요청을 보냅니다.
    // 성공 후 로그인 페이지로 이동하도록 구현할 수 있습니다.
    window.location.href = '/'; // 간단하게 페이지 이동
  };

  return (
    <AuthLayout>
      <h2 className="text-xl font-bold text-center mb-8">비밀번호 찾기</h2>
      
      {/* 1단계: 이메일 입력 */}
      {step === 1 && (
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex items-center border-b-2 p-2 mb-6 focus-within:border-sky-500">
            <Mail className="text-gray-400 mr-3" size={20} />
            <input type="email" placeholder="가입한 이메일 주소" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full focus:outline-none bg-transparent"/>
          </div>
          {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}
          <button onClick={handleSendCode} className="w-full bg-sky-500 text-white font-bold py-3 rounded-lg text-lg">
            인증번호 받기
          </button>
        </form>
      )}

      {/* 2단계: 인증번호 입력 */}
      {step === 2 && (
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex items-center border-b-2 p-2 mb-6 focus-within:border-sky-500">
            <KeyRound className="text-gray-400 mr-3" size={20} />
            <input type="text" placeholder="인증번호 6자리" value={code} onChange={(e) => setCode(e.target.value)} className="w-full focus:outline-none bg-transparent"/>
          </div>
          {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}
          <button onClick={handleVerifyCode} className="w-full bg-sky-500 text-white font-bold py-3 rounded-lg text-lg">
            인증번호 확인
          </button>
        </form>
      )}
      
      {/* 3단계: 새 비밀번호 입력 */}
      {step === 3 && (
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex items-center border-b-2 p-2 mb-4 focus-within:border-sky-500">
            <Lock className="text-gray-400 mr-3" size={20} />
            <input type="password" placeholder="새 비밀번호" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full focus:outline-none bg-transparent"/>
          </div>
          <div className="flex items-center border-b-2 p-2 mb-6 focus-within:border-sky-500">
            <Lock className="text-gray-400 mr-3" size={20} />
            <input type="password" placeholder="새 비밀번호 확인" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full focus:outline-none bg-transparent"/>
          </div>
          {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}
          <button onClick={handleResetPassword} className="w-full bg-sky-500 text-white font-bold py-3 rounded-lg text-lg">
            비밀번호 재설정
          </button>
        </form>
      )}

    </AuthLayout>
  );
}