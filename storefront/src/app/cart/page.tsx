'use client';

export default function CartPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
        <div className="text-center text-gray-500 py-12">
          <p>Your cart is empty</p>
        </div>
      </div>
    </div>
  );
}
