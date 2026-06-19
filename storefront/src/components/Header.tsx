'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-gray-900">
          Noble Essence
        </Link>

        <nav className="hidden md:flex gap-8">
          <Link href="/products" className="hover:text-gray-600">
            Shop
          </Link>
          <Link href="/about" className="hover:text-gray-600">
            About
          </Link>
          <Link href="/faq" className="hover:text-gray-600">
            FAQ
          </Link>
          <Link href="/contact" className="hover:text-gray-600">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-6">
          <Link href="/cart" className="relative">
            <span className="text-xl">🛒</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <Link href="/account" className="hover:text-gray-600">
            Account
          </Link>
        </div>
      </div>
    </header>
  );
}
