'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAdminFirebaseAuth } from '@/lib/firebase';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'superadmin' | 'admin' | 'staff';
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, role, loading } = useAdminFirebaseAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    // Redirect to login if not authenticated
    if (!user || !role) {
      router.push(`/login?redirect=${pathname}`);
      return;
    }

    // Check role requirement
    if (requiredRole) {
      const roleHierarchy = { superadmin: 3, admin: 2, staff: 1 };
      const userRoleLevel = roleHierarchy[role as keyof typeof roleHierarchy] || 0;
      const requiredLevel = roleHierarchy[requiredRole];

      if (userRoleLevel < requiredLevel) {
        router.push('/dashboard?error=insufficient_permissions');
      }
    }
  }, [user, role, loading, router, pathname, requiredRole]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="mb-4 text-2xl font-bold">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user || !role) {
    return null;
  }

  return <>{children}</>;
}
