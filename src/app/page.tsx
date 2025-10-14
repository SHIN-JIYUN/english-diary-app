"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import AuthLayout from '@/components/layout/AuthLayout';
import { Eye, EyeOff, X, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const validate = () => {
    const newErrors = { email: '', password: '' };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      newErrors.email = '아이디(이메일)를 입력해주세요.';
    } else if (!emailRegex.test(email)) {
      newErrors.email = '아이디는 이메일 형식으로 입력해주세요.';
    }
    
    if (!password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    }
    
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleLogin = () => {
    if (!validate()) return;
    const ADMIN_EMAIL = 'admin@test.com';
    const ADMIN_PASSWORD = 'password123';

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      login();
      router.push('/calendar');
    } else {
      setErrors({ email: '아이디 또는 비밀번호가 일치하지 않습니다.', password: '' });
    }
  };

  return (
    <AuthLayout>
      <div className="flex w-full mb-8">
        <div className="flex-1 text-center font-bold text-lg border-b-2 border-sky-500 text-sky-500 py-2">
          로그인
        </div>
        <Link href="/signup" className="flex-1 text-center font-bold text-lg text-gray-400 py-2 hover:text-gray-600 transition-colors">
          회원가입
        </Link>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <div className="relative flex items-center border-b-2 p-2 mb-4 focus-within:border-sky-500 transition-colors">
          <Mail className="text-gray-400 mr-3 shrink-0" size={20} />
          <input
            id="email" type="email" placeholder="아이디(이메일)"
            className="w-full focus:outline-none bg-transparent"
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
          {email && (
            <button type="button" onClick={() => setEmail('')} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          )}
        </div>
        {errors.email && <p className="text-red-500 text-xs mb-4">{errors.email}</p>}

        <div className="relative flex items-center border-b-2 p-2 mb-6 focus-within:border-sky-500 transition-colors">
          <Lock className="text-gray-400 mr-3 shrink-0" size={20} />
          <input
            id="password" type={showPassword ? 'text' : 'password'} placeholder="비밀번호"
            className="w-full focus:outline-none bg-transparent"
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600">
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-xs mb-4">{errors.password}</p>}

        <button
          onClick={handleLogin} type="button"
          className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors text-lg"
        >
          로그인
        </button>
        
       
        <div className="text-right mt-4 text-sm text-gray-500 space-x-2">
          <Link href="/find-id" className="hover:text-sky-500">
            아이디 찾기
          </Link>
          <span>|</span>
          <Link href="/find-password" className="hover:text-sky-500">
            비밀번호 찾기
          </Link>
        </div>
        
      </form>
    </AuthLayout>
  );
}