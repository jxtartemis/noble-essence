import type { Product, Order, Customer, Coupon } from './types';

/**
 * Sample data for seeding the database
 */

export const sampleProducts: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: 'Silk Pillowcase - Ivory',
    description: 'Luxurious 100% mulberry silk pillowcase in beautiful ivory. Gentle on hair and skin, hypoallergenic, and temperature-regulating.',
    images: ['https://example.com/silk-ivory-1.jpg', 'https://example.com/silk-ivory-2.jpg'],
    fabricOptions: ['Silk'],
    colorOptions: ['Ivory', 'Blush', 'Navy'],
    sizeOptions: ['Standard (20x26)', 'Queen (20x30)', 'King (20x36)'],
    price: 129.99,
    cost: 45,
    stock: 45,
    status: 'active',
    seoMeta: {
      title: 'Premium Silk Pillowcase - Ivory | Noble Essence',
      description: 'Luxurious 100% mulberry silk pillowcase. Gentle on hair and skin.',
      keywords: ['silk pillowcase', 'luxury', 'hair care', 'skin care'],
    },
  },
  {
    name: 'Linen Pillowcase - Cream',
    description: 'Breathable European linen pillowcase in soft cream. Perfect for hot sleepers and those who prefer a textured feel.',
    images: ['https://example.com/linen-cream-1.jpg'],
    fabricOptions: ['Linen'],
    colorOptions: ['Cream', 'White', 'Gray'],
    sizeOptions: ['Standard (20x26)', 'Queen (20x30)', 'King (20x36)'],
    price: 99.99,
    cost: 35,
    stock: 32,
    status: 'active',
    seoMeta: {
      title: 'Premium Linen Pillowcase - Cream | Noble Essence',
      description: 'Breathable European linen pillowcase for cool, comfortable sleep.',
      keywords: ['linen pillowcase', 'breathable', 'luxury bedding'],
    },
  },
  {
    name: 'Cotton Pillowcase - Navy',
    description: 'Soft 100% Egyptian cotton pillowcase in sophisticated navy. A classic choice for comfort and durability.',
    images: ['https://example.com/cotton-navy-1.jpg'],
    fabricOptions: ['Cotton'],
    colorOptions: ['Navy', 'White', 'Gray', 'Cream'],
    sizeOptions: ['Standard (20x26)', 'Queen (20x30)', 'King (20x36)'],
    price: 79.99,
    cost: 25,
    stock: 0,
    status: 'active',
    seoMeta: {
      title: 'Egyptian Cotton Pillowcase - Navy | Noble Essence',
      description: 'Premium Egyptian cotton pillowcase in classic navy.',
      keywords: ['cotton pillowcase', 'egyptian cotton', 'bedding'],
    },
  },
  {
    name: 'Bamboo Pillowcase - White',
    description: 'Eco-friendly bamboo viscose pillowcase in pure white. Hypoallergenic, soft, and sustainable.',
    images: ['https://example.com/bamboo-white-1.jpg'],
    fabricOptions: ['Bamboo'],
    colorOptions: ['White', 'Sage', 'Charcoal'],
    sizeOptions: ['Standard (20x26)', 'Queen (20x30)', 'King (20x36)'],
    price: 89.99,
    cost: 30,
    stock: 28,
    status: 'active',
    seoMeta: {
      title: 'Eco-Friendly Bamboo Pillowcase - White | Noble Essence',
      description: 'Sustainable bamboo viscose pillowcase, hypoallergenic and soft.',
      keywords: ['bamboo pillowcase', 'eco-friendly', 'sustainable bedding'],
    },
  },
];

export const sampleCoupons: Omit<Coupon, 'createdAt' | 'updatedAt'>[] = [
  {
    code: 'SUMMER20',
    type: 'percentage',
    value: 20,
    active: true,
    expiry: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days
    usageLimit: 100,
    usedCount: 45,
    perCustomerLimit: 1,
  },
  {
    code: 'FIRST10',
    type: 'fixed',
    value: 10,
    minSpend: 50,
    active: true,
    expiry: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 180 days
    usedCount: 234,
  },
  {
    code: 'BOGO50',
    type: 'bogo',
    value: 50,
    active: false,
    expiry: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
    usageLimit: 50,
    usedCount: 12,
  },
];
