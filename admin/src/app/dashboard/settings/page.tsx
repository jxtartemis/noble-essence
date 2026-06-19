'use client';

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

export default function SettingsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Verify superadmin role
    setIsAuthenticated(true);
    setRole('superadmin');
  }, []);

  if (!isAuthenticated) {
    redirect('/login');
  }

  return (
    <div className="admin-container">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        <p className="text-gray-600">Manage store configuration and staff</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 mb-8 border-b">
        <button className="pb-4 border-b-2 border-black font-semibold">General</button>
        <button className="pb-4 text-gray-600 hover:text-black">Staff Management</button>
        <button className="pb-4 text-gray-600 hover:text-black">Notifications</button>
      </div>

      {/* General Settings */}
      <div className="max-w-2xl space-y-8">
        <div className="admin-card p-6">
          <h2 className="text-xl font-bold mb-4">Store Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Store Name</label>
              <input
                type="text"
                defaultValue="Noble Essence"
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Store Email</label>
              <input
                type="email"
                defaultValue="support@nobleessence.com"
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Currency</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded">
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Staff Management */}
        {role === 'superadmin' && (
          <div className="admin-card p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Team Members</h2>
              <button className="bg-black text-white px-4 py-2 rounded text-sm hover:bg-gray-800">
                + Invite Staff
              </button>
            </div>
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold">Name</th>
                  <th className="text-left py-3 px-4 font-semibold">Email</th>
                  <th className="text-left py-3 px-4 font-semibold">Role</th>
                  <th className="text-left py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'You', email: 'admin@nobleessence.com', role: 'Superadmin' },
                  { name: 'John Smith', email: 'john@nobleessence.com', role: 'Admin' },
                  { name: 'Sarah Jones', email: 'sarah@nobleessence.com', role: 'Staff' },
                ].map((member, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-3 px-4">{member.name}</td>
                    <td className="py-3 px-4">{member.email}</td>
                    <td className="py-3 px-4">{member.role}</td>
                    <td className="py-3 px-4">
                      {i > 0 && <button className="text-red-600 hover:underline">Remove</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex gap-4">
          <button className="bg-black text-white px-8 py-2 rounded font-semibold hover:bg-gray-800">
            Save Changes
          </button>
          <button className="bg-gray-200 text-black px-8 py-2 rounded font-semibold hover:bg-gray-300">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
