'use client';

interface ProductGridProps {
  filters: any;
  sortBy: 'price' | 'newest' | 'popularity';
  setSortBy: (sort: 'price' | 'newest' | 'popularity') => void;
}

export default function ProductGrid({ filters, sortBy, setSortBy }: ProductGridProps) {
  const products = [
    { id: 1, name: 'Silk Pillowcase - Ivory', price: 129.99 },
    { id: 2, name: 'Linen Pillowcase - Cream', price: 99.99 },
    { id: 3, name: 'Cotton Pillowcase - Navy', price: 79.99 },
    { id: 4, name: 'Bamboo Pillowcase - White', price: 89.99 },
  ];

  return (
    <div className="flex-1">
      <div className="flex justify-between items-center mb-8">
        <p className="text-gray-600">{products.length} products</p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'price' | 'newest' | 'popularity')}
          className="border border-gray-300 rounded px-4 py-2"
        >
          <option value="popularity">Sort: Popularity</option>
          <option value="price">Sort: Price</option>
          <option value="newest">Sort: Newest</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition">
            <div className="bg-gray-200 aspect-square flex items-center justify-center">
              <span className="text-gray-400">Product Image</span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-gray-600 font-semibold">${product.price}</p>
              <button className="w-full mt-4 bg-black text-white py-2 rounded hover:bg-gray-800">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
