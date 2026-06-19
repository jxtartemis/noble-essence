import { create } from 'zustand';
import type { Customer } from '@/types/firebase';

interface SessionStore {
  uid: string | null;
  email: string | null;
  isGuest: boolean;
  customer: Customer | null;
  setSession: (uid: string, email: string, isGuest: boolean) => void;
  setCustomer: (customer: Customer) => void;
  clearSession: () => void;
}

export const useSession = create<SessionStore>((set) => ({
  uid: null,
  email: null,
  isGuest: true,
  customer: null,
  setSession: (uid, email, isGuest) =>
    set({ uid, email, isGuest }),
  setCustomer: (customer) =>
    set({ customer }),
  clearSession: () =>
    set({ uid: null, email: null, isGuest: true, customer: null }),
}));
