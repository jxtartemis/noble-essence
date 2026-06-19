'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutForm() {
  const router = useRouter();
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirm'>('shipping');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US',
  });
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    setLoading(true);
    try {
      // TODO: Call validateCoupon Cloud Function
      setAppliedCoupon({ code: couponCode, discount: 10 });
    } catch (error) {
      console.error('Coupon error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitShipping = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: Call createOrder and createPaymentIntent Cloud Functions
      setStep('confirm');
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {step === 'shipping' && (
        <form onSubmit={handleSubmitShipping} className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="col-span-1 px-4 py-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className="col-span-1 px-4 py-2 border border-gray-300 rounded"
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="street"
            placeholder="Street Address"
            value={formData.street}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
              required
              className="px-4 py-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleInputChange}
              required
              className="px-4 py-2 border border-gray-300 rounded"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={handleInputChange}
              required
              className="px-4 py-2 border border-gray-300 rounded"
            />
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded"
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="GB">United Kingdom</option>
              <option value="AU">Australia</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-800"
          >
            Continue to Payment
          </button>
        </form>
      )}

      {step === 'payment' && (
        <form onSubmit={handleSubmitPayment} className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Payment</h2>
          <div className="bg-gray-50 p-6 rounded">
            <h3 className="font-semibold mb-4">Apply Coupon (Optional)</h3>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded"
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                disabled={loading}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded font-semibold disabled:opacity-50"
              >
                Apply
              </button>
            </div>
            {appliedCoupon && (
              <p className="text-green-600 text-sm">
                ✓ Coupon {appliedCoupon.code} applied (${appliedCoupon.discount} off)
              </p>
            )}
          </div>

          <div className="bg-gray-50 p-6 rounded">
            <h3 className="font-semibold mb-4">Card Details</h3>
            <p className="text-gray-600 text-sm mb-4">
              Stripe card integration coming soon
            </p>
            <input
              type="text"
              placeholder="Card number"
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Complete Purchase'}
          </button>
          <button
            type="button"
            onClick={() => setStep('shipping')}
            className="w-full text-gray-600 hover:text-gray-800"
          >
            Back
          </button>
        </form>
      )}

      {step === 'confirm' && (
        <div className="text-center py-12">
          <h2 className="text-3xl font-bold mb-4">✓ Order Confirmed!</h2>
          <p className="text-gray-600 mb-8">
            Check your email for order details and tracking information.
          </p>
          <button
            onClick={() => router.push('/')}
            className="bg-black text-white px-8 py-3 rounded font-semibold hover:bg-gray-800"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
}
