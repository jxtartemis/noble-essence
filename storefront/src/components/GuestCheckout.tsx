'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFirebaseAuth } from '@/lib/firebase';

interface GuestCheckoutProps {
  children: React.ReactNode;
}

export default function GuestCheckout({ children }: GuestCheckoutProps) {
  const { user, loading } = useFirebaseAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // If anonymous auth fails, redirect to home
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="mb-4 text-2xl font-bold">Initializing checkout...</div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
