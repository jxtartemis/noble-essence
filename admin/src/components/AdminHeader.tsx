'use client';

import Link from 'next/link';

export default function AdminHeader() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-8 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="text-2xl font-bold text-gray-900">
          Noble Essence
        </Link>

        <div className="flex items-center gap-6">
          <div className="text-sm text-gray-600">
            <span className="font-semibold">Admin User</span>
            <p className="text-gray-500">superadmin</p>
          </div>
          <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
