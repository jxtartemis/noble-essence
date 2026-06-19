import { create } from 'zustand';

interface AdminAuthStore {
  uid: string | null;
  email: string | null;
  role: 'superadmin' | 'admin' | 'staff' | null;
  isAuthenticated: boolean;
  setAuth: (uid: string, email: string, role: 'superadmin' | 'admin' | 'staff') => void;
  clearAuth: () => void;
}

export const useAdminAuth = create<AdminAuthStore>((set) => ({
  uid: null,
  email: null,
  role: null,
  isAuthenticated: false,
  setAuth: (uid, email, role) =>
    set({ uid, email, role, isAuthenticated: true }),
  clearAuth: () =>
    set({ uid: null, email: null, role: null, isAuthenticated: false }),
}));
