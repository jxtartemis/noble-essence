'use client';

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

export default function CouponsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // TODO: Verify admin role
    setIsAuthenticated(true);
  }, []);

  if (!isAuthenticated) {
    redirect('/login');
  }

  return (
    <div className="admin-container">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Coupons & Promotions</h1>
          <p className="text-gray-600">Create and manage discount codes</p>
        </div>
        <button className="bg-black text-white px-6 py-2 rounded font-semibold hover:bg-gray-800">
          + New Coupon
        </button>
      </div>

      {/* Coupons Table */}
      <div className="admin-card overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left py-4 px-6 font-semibold">Code</th>
              <th className="text-left py-4 px-6 font-semibold">Type</th>
              <th className="text-left py-4 px-6 font-semibold">Value</th>
              <th className="text-left py-4 px-6 font-semibold">Usage</th>
              <th className="text-left py-4 px-6 font-semibold">Expiry</th>
              <th className="text-left py-4 px-6 font-semibold">Status</th>
              <th className="text-left py-4 px-6 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              { code: 'SUMMER20', type: '% Off', value: '20%', usage: '45/100', expiry: '2024-08-31', active: true },
              { code: 'FIRST10', type: 'Fixed', value: '$10', usage: '234/Unlimited', expiry: '2024-12-31', active: true },
              { code: 'BOGO50', type: 'BOGO', value: '50%', usage: '12/50', expiry: '2024-07-15', active: false },
            ].map((coupon) => (
              <tr key={coupon.code} className="border-b hover:bg-gray-50">
                <td className="py-4 px-6 font-semibold">{coupon.code}</td>
                <td className="py-4 px-6">{coupon.type}</td>
                <td className="py-4 px-6">{coupon.value}</td>
                <td className="py-4 px-6">{coupon.usage}</td>
                <td className="py-4 px-6">{coupon.expiry}</td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    coupon.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {coupon.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <button className="text-blue-600 hover:underline mr-4">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
