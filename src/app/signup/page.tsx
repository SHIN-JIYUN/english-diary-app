"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AuthLayout from '@/components/layout/AuthLayout';
import { CheckCircle2, Mail, Lock, User } from 'lucide-react';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  
  const [errors, setErrors] = useState({ email: '', password: '', passwordConfirm: '', nickname: '' });
  
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    combination: false,
    consecutive: false,
    includesEmail: false,
  });

  useEffect(() => {
    const length = password.length >= 8 && password.length <= 20;
    const combination = /(?=.*[a-zA-Z])(?=.*\d)|(?=.*[a-zA-Z])(?=.*[!@#$%^&*])|(?=.*\d)(?=.*[!@#$%^&*])/.test(password);
    const consecutive = !/(\w)\1\1/.test(password);
    const includesEmail = email ? !password.includes(email.split('@')[0]) : true;

    setPasswordValidations({ length, combination, consecutive, includesEmail });
  }, [password, email]);


  const handleCheckEmail = () => {
    if (email === 'admin@test.com') {
      setErrors({ ...errors, email: '이미 사용 중인 이메일입니다.' });
      setIsEmailChecked(false);
    } else if (/\S+@\S+\.\S+/.test(email)) {
      setErrors({ ...errors, email: '' });
      alert('사용 가능한 이메일입니다.');
      setIsEmailChecked(true);
    } else {
      setErrors({ ...errors, email: '이메일 형식이 올바르지 않습니다.' });
      setIsEmailChecked(false);
    }
  };

  const handleSignup = () => {
    // 실제 회원가입 로직
  };

  return (
    <AuthLayout>
      <div className="flex w-full mb-8">
        <Link href="/" className="flex-1 text-center font-bold text-lg text-gray-400 py-2 hover:text-gray-600 transition-colors">
          로그인
        </Link>
        <div className="flex-1 text-center font-bold text-lg border-b-2 border-sky-500 text-sky-500 py-2">
          회원가입
        </div>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleSignup(); }}>
        <div className="flex items-center border-b-2 p-2 mb-4 focus-within:border-sky-500 transition-colors">
            <Mail className="text-gray-400 mr-3 shrink-0" size={20} />
            <input id="email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); setIsEmailChecked(false); }} placeholder="아이디(이메일)" className="flex-grow focus:outline-none bg-transparent w-full"/>
            {isEmailChecked ? (
              <CheckCircle2 className="text-green-500" />
            ) : (
              <button type="button" onClick={handleCheckEmail} className="text-sm bg-gray-200 text-gray-600 font-semibold py-1 px-2 rounded-md hover:bg-gray-300 whitespace-nowrap">중복확인</button>
            )}
        </div>
        {errors.email && <p className="text-red-500 text-xs mb-4">{errors.email}</p>}

        <div className="flex items-center border-b-2 p-2 focus-within:border-sky-500 transition-colors">
            <Lock className="text-gray-400 mr-3 shrink-0" size={20} />
            <input id="password" type="password" placeholder="비밀번호" onFocus={() => setIsPasswordFocused(true)} onBlur={() => setIsPasswordFocused(false)} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full focus:outline-none bg-transparent"/>
        </div>
        {isPasswordFocused ? (
            <div className="text-xs text-gray-500 my-4 space-y-1">
              <p className={passwordValidations.length ? 'text-green-500' : ''}>✓ 8~20자</p>
              <p className={passwordValidations.combination ? 'text-green-500' : ''}>✓ 영문/숫자/특수문자 중 2가지 이상 조합</p>
              <p className={passwordValidations.consecutive ? 'text-green-500' : ''}>✓ 3개 이상 연속되거나 동일한 문자/숫자 제외</p>
              <p className={passwordValidations.includesEmail ? 'text-green-500' : ''}>✓ 아이디(이메일) 제외</p>
            </div>
        ) : <div className="h-4 mb-4"></div>}
        
        <div className="flex items-center border-b-2 p-2 focus-within:border-sky-500 transition-colors">
            <Lock className="text-gray-400 mr-3 shrink-0" size={20} />
            <input id="passwordConfirm" type="password" placeholder="비밀번호 확인" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} className="w-full focus:outline-none bg-transparent"/>
        </div>
        {passwordConfirm ? (password === passwordConfirm ? <p className="text-green-500 text-xs my-4">비밀번호가 일치합니다.</p> : <p className="text-red-500 text-xs my-4">비밀번호가 일치하지 않습니다.</p>) : <p className="text-gray-500 text-xs my-4">확인을 위해 비밀번호를 다시 입력해주세요.</p>}
        
        <div className="flex items-center border-b-2 p-2 mb-8 focus-within:border-sky-500 transition-colors">
            <User className="text-gray-400 mr-3 shrink-0" size={20} />
            <input id="nickname" type="text" placeholder="이름(닉네임)" value={nickname} onChange={(e) => setNickname(e.target.value)} className="w-full focus:outline-none bg-transparent"/>
        </div>
        
        <button type="submit" className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors text-lg">
          회원가입
        </button>
      </form>
    </AuthLayout>
  );
}