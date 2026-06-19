'use client';

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>
        <div className="grid grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div>
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">Shipping Method</h2>
                <p className="text-gray-500">Calculate rates...</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">Payment</h2>
                <p className="text-gray-500">Stripe integration coming soon</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-gray-50 p-6 rounded">
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">Subtotal: $0.00</div>
                <div className="flex justify-between">Shipping: TBD</div>
                <div className="flex justify-between">Tax: TBD</div>
                <div className="flex justify-between font-bold text-lg border-t pt-4">
                  Total: $0.00
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
