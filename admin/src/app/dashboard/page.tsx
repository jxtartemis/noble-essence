'use client';

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Check Firebase auth and custom claims
    // For now, assume authenticated
    setIsAuthenticated(true);
    setRole('superadmin');
  }, []);

  if (!isAuthenticated) {
    redirect('/login');
  }

  return (
    <div className="admin-container">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back to Noble Essence Admin</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="admin-card p-6">
          <div className="text-gray-600 text-sm font-semibold mb-2">Total Revenue</div>
          <div className="text-3xl font-bold">$24,500</div>
          <p className="text-green-600 text-sm mt-2">+12% from last month</p>
        </div>
        <div className="admin-card p-6">
          <div className="text-gray-600 text-sm font-semibold mb-2">Total Orders</div>
          <div className="text-3xl font-bold">342</div>
          <p className="text-green-600 text-sm mt-2">+8% from last month</p>
        </div>
        <div className="admin-card p-6">
          <div className="text-gray-600 text-sm font-semibold mb-2">Conversion Rate</div>
          <div className="text-3xl font-bold">3.2%</div>
          <p className="text-gray-600 text-sm mt-2">Unchanged</p>
        </div>
        <div className="admin-card p-6">
          <div className="text-gray-600 text-sm font-semibold mb-2">Avg Order Value</div>
          <div className="text-3xl font-bold">$71.60</div>
          <p className="text-green-600 text-sm mt-2">+5% from last month</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="admin-card p-6">
          <h2 className="text-xl font-bold mb-4">Revenue Trend</h2>
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center text-gray-400">
            Chart coming soon (Recharts)
          </div>
        </div>
        <div className="admin-card p-6">
          <h2 className="text-xl font-bold mb-4">Top Products</h2>
          <div className="space-y-4">
            {['Silk Pillowcase - Ivory', 'Linen Pillowcase - Cream', 'Cotton Pillowcase - Navy'].map((product, i) => (
              <div key={i} className="flex justify-between items-center pb-4 border-b last:border-b-0">
                <span>{product}</span>
                <span className="font-semibold">{Math.floor(Math.random() * 100)} sold</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="admin-card p-6">
        <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="text-left py-3 px-4 font-semibold">Order ID</th>
                <th className="text-left py-3 px-4 font-semibold">Customer</th>
                <th className="text-left py-3 px-4 font-semibold">Amount</th>
                <th className="text-left py-3 px-4 font-semibold">Status</th>
                <th className="text-left py-3 px-4 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">#ORD-{1000 + i}</td>
                  <td className="py-3 px-4">Customer {i}</td>
                  <td className="py-3 px-4">$89.99</td>
                  <td className="py-3 px-4">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Shipped</span>
                  </td>
                  <td className="py-3 px-4">2024-06-{19 - i}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
