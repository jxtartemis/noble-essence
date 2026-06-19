'use client';

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

export default function AnalyticsPage() {
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
        <h1 className="text-4xl font-bold mb-2">Analytics</h1>
        <p className="text-gray-600">Business intelligence and performance metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="admin-card p-6">
          <div className="text-gray-600 text-sm font-semibold mb-2">Total Revenue</div>
          <div className="text-3xl font-bold">$124,500</div>
          <p className="text-green-600 text-sm mt-2">+32% from last month</p>
        </div>
        <div className="admin-card p-6">
          <div className="text-gray-600 text-sm font-semibold mb-2">Total Orders</div>
          <div className="text-3xl font-bold">1,842</div>
          <p className="text-green-600 text-sm mt-2">+28% from last month</p>
        </div>
        <div className="admin-card p-6">
          <div className="text-gray-600 text-sm font-semibold mb-2">Avg Order Value</div>
          <div className="text-3xl font-bold">$67.50</div>
          <p className="text-red-600 text-sm mt-2">-3% from last month</p>
        </div>
        <div className="admin-card p-6">
          <div className="text-gray-600 text-sm font-semibold mb-2">Conversion Rate</div>
          <div className="text-3xl font-bold">2.8%</div>
          <p className="text-green-600 text-sm mt-2">+0.4% from last month</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="admin-card p-6">
          <h2 className="text-xl font-bold mb-4">Revenue Over Time</h2>
          <div className="h-80 bg-gray-50 rounded flex items-center justify-center text-gray-400">
            Chart coming soon (Recharts)
          </div>
        </div>
        <div className="admin-card p-6">
          <h2 className="text-xl font-bold mb-4">Top 5 Products by Revenue</h2>
          <div className="space-y-4">
            {[
              { name: 'Silk Pillowcase - Ivory', revenue: '$15,400' },
              { name: 'Linen Pillowcase - Cream', revenue: '$12,300' },
              { name: 'Cotton Pillowcase - Navy', revenue: '$9,800' },
              { name: 'Bamboo Pillowcase - White', revenue: '$8,500' },
              { name: 'Silk Pillowcase - Blush', revenue: '$7,200' },
            ].map((product, i) => (
              <div key={i} className="flex justify-between items-center pb-4 border-b last:border-b-0">
                <span className="font-medium">{product.name}</span>
                <span className="font-semibold text-green-600">{product.revenue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Traffic & Conversion */}
      <div className="grid grid-cols-2 gap-6">
        <div className="admin-card p-6">
          <h2 className="text-xl font-bold mb-4">Traffic Sources</h2>
          <div className="space-y-4">
            {[
              { source: 'Direct', visits: '4,250', percentage: '35%' },
              { source: 'Organic Search', visits: '3,100', percentage: '25%' },
              { source: 'Social Media', visits: '2,850', percentage: '23%' },
              { source: 'Paid Ads', visits: '1,800', percentage: '17%' },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center">
                <span>{item.source}</span>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">{item.visits}</span>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-black h-2 rounded-full"
                      style={{ width: item.percentage }}
                    />
                  </div>
                  <span className="font-semibold w-12">{item.percentage}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="admin-card p-6">
          <h2 className="text-xl font-bold mb-4">Order Status Breakdown</h2>
          <div className="space-y-4">
            {[
              { status: 'Delivered', count: 1450, color: 'bg-green-500' },
              { status: 'Shipped', count: 234, color: 'bg-blue-500' },
              { status: 'Processing', count: 98, color: 'bg-yellow-500' },
              { status: 'Pending', count: 45, color: 'bg-gray-500' },
              { status: 'Cancelled', count: 15, color: 'bg-red-500' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <span className="flex-1">{item.status}</span>
                <span className="font-semibold">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
