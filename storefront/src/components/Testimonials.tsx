export default function Testimonials() {
  const testimonials = [
    { text: 'Best pillowcases I\'ve ever owned!', author: 'Sarah M.' },
    { text: 'Luxurious quality at a fair price', author: 'James K.' },
    { text: 'My skin has never felt better', author: 'Emma R.' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 font-serif">Customer Love</h2>
        <div className="grid grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="bg-gray-50 p-6 rounded-lg">
              <p className="text-lg mb-4">\"{testimonial.text}\"</p>
              <p className="font-semibold text-gray-600">— {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
