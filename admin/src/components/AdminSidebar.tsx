'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { label: 'Dashboard', href: '/dashboard', icon: '📊' },
  { label: 'Products', href: '/dashboard/products', icon: '📦' },
  { label: 'Orders', href: '/dashboard/orders', icon: '🛒' },
  { label: 'Coupons', href: '/dashboard/coupons', icon: '🎟️' },
  { label: 'Analytics', href: '/dashboard/analytics', icon: '📈' },
  { label: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
      <nav className="p-6">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded font-medium transition ${
                pathname === item.href
                  ? 'bg-black text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </aside>
  );
}
