export default function FeaturedProducts() {
  const products = [
    { id: 1, name: 'Silk Pillowcase - Ivory', price: '$129.99' },
    { id: 2, name: 'Linen Pillowcase - Cream', price: '$99.99' },
    { id: 3, name: 'Cotton Pillowcase - Navy', price: '$79.99' },
    { id: 4, name: 'Bamboo Pillowcase - White', price: '$89.99' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 font-serif">Featured Products</h2>
        <div className="grid grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition">
              <div className="bg-gray-200 aspect-square flex items-center justify-center">
                <span className="text-gray-400">Product Image</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 font-semibold">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
