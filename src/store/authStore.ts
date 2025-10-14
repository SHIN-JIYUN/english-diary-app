import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'; // 👈 (1) persist 기능 불러오기

interface AuthState {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

// 👇 (2) create 함수를 persist 함수로 한번 감싸줍니다.
export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      isLoggedIn: false,
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false }),
    }),
    {
      name: 'auth-storage', // 👈 (3) 저장소에 사용할 이름 (아무거나 상관없음)
      storage: createJSONStorage(() => localStorage), // (4) localStorage에 저장하도록 설정
    }
  )
);