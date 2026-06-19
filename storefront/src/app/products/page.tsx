'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ProductGrid from '@/components/ProductGrid';

export default function ProductsPage() {
  const [filters, setFilters] = useState({
    fabric: [] as string[],
    color: [] as string[],
    size: [] as string[],
    priceRange: [0, 500] as [number, number],
    inStock: false,
  });

  const [sortBy, setSortBy] = useState<'price' | 'newest' | 'popularity'>('popularity');

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Shop Pillow Cases</h1>
        <div className="flex gap-8">
          <Sidebar filters={filters} setFilters={setFilters} />
          <ProductGrid filters={filters} sortBy={sortBy} setSortBy={setSortBy} />
        </div>
      </div>
    </div>
  );
}
