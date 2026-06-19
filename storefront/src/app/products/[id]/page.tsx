'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedFabric, setSelectedFabric] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="bg-gray-100 aspect-square rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-400">Product Image Gallery</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-100 aspect-square rounded cursor-pointer hover:opacity-80" />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-bold mb-4">Product Name</h1>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-lg font-semibold">$89.99</span>
              <span className="text-sm text-green-600">In Stock</span>
            </div>

            {/* Selectors */}
            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-sm font-semibold mb-2">Fabric</label>
                <select
                  value={selectedFabric}
                  onChange={(e) => setSelectedFabric(e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                >
                  <option value="">Select fabric</option>
                  <option value="cotton">100% Cotton</option>
                  <option value="linen">Linen Blend</option>
                  <option value="silk">Silk</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Color</label>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                >
                  <option value="">Select color</option>
                  <option value="white">White</option>
                  <option value="cream">Cream</option>
                  <option value="navy">Navy</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Size</label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                >
                  <option value="">Select size</option>
                  <option value="standard">Standard (20x26)</option>
                  <option value="queen">Queen (20x30)</option>
                  <option value="king">King (20x36)</option>
                </select>
              </div>
            </div>

            {/* Quantity & CTA */}
            <div className="flex gap-4 mb-8">
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2"
                >
                  −
                </button>
                <span className="px-6 py-2 border-l border-r border-gray-300">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2">
                  +
                </button>
              </div>
              <button className="flex-1 bg-black text-white py-3 rounded font-semibold hover:bg-gray-800">
                Add to Cart
              </button>
            </div>

            {/* Description */}
            <div className="border-t pt-8">
              <h3 className="text-xl font-semibold mb-4">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                Premium pillow case crafted from the finest materials. Perfect for a restful night\'s sleep and elegant home décor.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
