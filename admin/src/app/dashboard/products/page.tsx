'use client';

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

export default function ProductsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    // TODO: Verify admin role
    setIsAuthenticated(true);
    // TODO: Fetch products from Firestore
  }, []);

  if (!isAuthenticated) {
    redirect('/login');
  }

  return (
    <div className="admin-container">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Products</h1>
          <p className="text-gray-600">Manage your pillow case catalog</p>
        </div>
        <button className="bg-black text-white px-6 py-2 rounded font-semibold hover:bg-gray-800">
          + Add Product
        </button>
      </div>

      {/* Search & Filters */}
      <div className="admin-card p-4 mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded"
          />
          <select className="px-4 py-2 border border-gray-300 rounded">
            <option>All Categories</option>
            <option>Silk</option>
            <option>Linen</option>
            <option>Cotton</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded">
            <option>All Status</option>
            <option>Active</option>
            <option>Draft</option>
            <option>Archived</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="admin-card overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left py-4 px-6 font-semibold">Product Name</th>
              <th className="text-left py-4 px-6 font-semibold">Fabric</th>
              <th className="text-left py-4 px-6 font-semibold">Price</th>
              <th className="text-left py-4 px-6 font-semibold">Stock</th>
              <th className="text-left py-4 px-6 font-semibold">Status</th>
              <th className="text-left py-4 px-6 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 1, name: 'Silk Pillowcase - Ivory', fabric: 'Silk', price: 129.99, stock: 45, status: 'Active' },
              { id: 2, name: 'Linen Pillowcase - Cream', fabric: 'Linen', price: 99.99, stock: 32, status: 'Active' },
              { id: 3, name: 'Cotton Pillowcase - Navy', fabric: 'Cotton', price: 79.99, stock: 0, status: 'Out of Stock' },
            ].map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-6">{product.name}</td>
                <td className="py-4 px-6">{product.fabric}</td>
                <td className="py-4 px-6">${product.price}</td>
                <td className="py-4 px-6">{product.stock}</td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.status}
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
