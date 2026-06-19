'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let firebaseApp: any = null;
let auth: any = null;

function initializeFirebase() {
  if (!firebaseApp) {
    firebaseApp = initializeApp(firebaseConfig);
    auth = getAuth(firebaseApp);
  }
  return { firebaseApp, auth };
}

export function useAdminFirebaseAuth() {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const { auth } = initializeFirebase();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setRole(null);
        setLoading(false);
        return;
      }

      // Get custom claims for role
      const idTokenResult = await currentUser.getIdTokenResult();
      const userRole = idTokenResult.claims.role as string;

      if (!userRole || !['admin', 'superadmin', 'staff'].includes(userRole)) {
        await signOut(auth);
        setUser(null);
        setRole(null);
        router.push('/login?error=unauthorized');
      } else {
        setUser(currentUser);
        setRole(userRole);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const login = async (email: string, password: string) => {
    const { auth } = initializeFirebase();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    const { auth } = initializeFirebase();
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error: any) {
      console.error('Logout error:', error);
    }
  };

  return { user, role, loading, login, logout };
}

export function getAdminFirebaseAuth() {
  return initializeFirebase().auth;
}
