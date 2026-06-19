'use client';

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

export default function OrdersPage() {
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
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Orders</h1>
        <p className="text-gray-600">View and manage all customer orders</p>
      </div>

      {/* Filters */}
      <div className="admin-card p-4 mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search by order ID or email..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded"
          />
          <select className="px-4 py-2 border border-gray-300 rounded">
            <option>All Status</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="admin-card overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left py-4 px-6 font-semibold">Order ID</th>
              <th className="text-left py-4 px-6 font-semibold">Customer</th>
              <th className="text-left py-4 px-6 font-semibold">Amount</th>
              <th className="text-left py-4 px-6 font-semibold">Status</th>
              <th className="text-left py-4 px-6 font-semibold">Date</th>
              <th className="text-left py-4 px-6 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="py-4 px-6 font-semibold">#ORD-{1000 + i}</td>
                <td className="py-4 px-6">customer{i}@email.com</td>
                <td className="py-4 px-6">$89.99</td>
                <td className="py-4 px-6">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {['Pending', 'Processing', 'Shipped', 'Delivered'][i % 4]}
                  </span>
                </td>
                <td className="py-4 px-6">2024-06-{19 - (i % 7)}</td>
                <td className="py-4 px-6">
                  <button className="text-blue-600 hover:underline mr-4">View</button>
                  <button className="text-green-600 hover:underline">Update Status</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
