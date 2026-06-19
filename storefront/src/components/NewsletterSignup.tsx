'use client';

import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Subscribe to newsletter
    setEmail('');
  };

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4 font-serif">Stay Updated</h2>
        <p className="text-gray-300 mb-8">Get exclusive offers and the latest pillow case collections</p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-2">
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 rounded text-black"
            required
          />
          <button type="submit" className="bg-white text-black px-6 py-3 rounded font-semibold hover:bg-gray-100">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
