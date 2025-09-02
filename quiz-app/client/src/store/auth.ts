import { create } from 'zustand'

type User = {
  id: string
  email: string
  name: string
}

type AuthState = {
  user: User | null
  login: (email: string, name?: string) => void
  register: (email: string, name: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (email, name = 'Kullanıcı') => set({ user: { id: 'dev', email, name } }),
  register: (email, name) => set({ user: { id: 'dev', email, name } }),
  logout: () => set({ user: null }),
}))

