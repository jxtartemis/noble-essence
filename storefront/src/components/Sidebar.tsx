'use client';

interface SidebarProps {
  filters: {
    fabric: string[];
    color: string[];
    size: string[];
    priceRange: [number, number];
    inStock: boolean;
  };
  setFilters: (filters: any) => void;
}

export default function Sidebar({ filters, setFilters }: SidebarProps) {
  return (
    <aside className="w-64 pr-8 border-r border-gray-200">
      <h3 className="text-xl font-bold mb-6">Filters</h3>

      <div className="mb-8">
        <h4 className="font-semibold mb-3">Fabric</h4>
        <div className="space-y-2">
          {['Cotton', 'Linen', 'Silk', 'Bamboo'].map((fabric) => (
            <label key={fabric} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded" />
              <span>{fabric}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h4 className="font-semibold mb-3">Color</h4>
        <div className="space-y-2">
          {['White', 'Cream', 'Navy', 'Gray'].map((color) => (
            <label key={color} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded" />
              <span>{color}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h4 className="font-semibold mb-3">Price Range</h4>
        <input type="range" min="0" max="500" className="w-full" />
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>$0</span>
          <span>$500</span>
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="rounded" />
          <span>In Stock Only</span>
        </label>
      </div>
    </aside>
  );
}
