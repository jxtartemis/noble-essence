'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cartStore';
import Link from 'next/link';

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  // TODO: Fetch product details from Firestore to show prices
  const subtotal = items.length > 0 ? items.length * 50 : 0;

  return (
    <>
      {/* Cart Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative text-xl hover:opacity-80"
      >
        🛒
        {items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {items.length}
          </span>
        )}
      </button>

      {/* Cart Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-bold">Shopping Cart</h2>
              <button onClick={() => setIsOpen(false)} className="text-xl">
                ✕
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.productId} className="flex items-center gap-4 border-b pb-4">
                      <div className="flex-1">
                        <p className="font-semibold text-sm">Product {item.productId}</p>
                        <p className="text-gray-600 text-xs">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between font-bold">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <Link
                href="/checkout"
                className="w-full bg-black text-white py-2 rounded font-semibold hover:bg-gray-800 text-center block"
                onClick={() => setIsOpen(false)}
              >
                Proceed to Checkout
              </Link>
              <button
                onClick={() => clearCart()}
                className="w-full text-gray-600 hover:text-gray-800 text-sm"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
