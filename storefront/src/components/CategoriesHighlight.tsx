export default function CategoriesHighlight() {
  const categories = [
    { name: 'Silk', count: 12 },
    { name: 'Linen', count: 8 },
    { name: 'Cotton', count: 15 },
    { name: 'Bamboo', count: 6 },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 font-serif">Shop by Fabric</h2>
        <div className="grid grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div key={cat.name} className="bg-white p-6 rounded-lg text-center cursor-pointer hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">{cat.name}</h3>
              <p className="text-gray-600">{cat.count} products</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
