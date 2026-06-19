import type { Timestamp } from 'firebase/firestore';

/**
 * Firestore Type Definitions
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  fabricOptions: string[];
  colorOptions: string[];
  sizeOptions: string[];
  price: number;
  cost?: number;
  stock: number;
  status: 'active' | 'draft' | 'archived';
  seoMeta?: {
    title: string;
    description: string;
    keywords: string[];
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Order {
  id: string;
  uid: string | null;
  guestEmail: string | null;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress?: Address;
  shippingMethod: ShippingMethod;
  couponCode?: string | null;
  totals: OrderTotals;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
  labelUrl?: string;
  stripePaymentIntentId?: string;
  refundStatus?: 'pending' | 'processing' | 'processed';
  refundAmount?: number;
  stripeRefundId?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  total: number;
}

export interface Address {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  carrier: string;
  price: number;
  estimatedDays: string;
}

export interface OrderTotals {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface Customer {
  uid: string;
  email: string;
  displayName?: string;
  avatar?: string;
  addresses: Address[];
  wishlist: string[];
  orderIds: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedFabric?: string;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Coupon {
  code: string;
  type: 'percentage' | 'fixed' | 'bogo';
  value: number;
  minSpend?: number;
  active: boolean;
  expiry: Date;
  usageLimit?: number;
  usedCount: number;
  perCustomerLimit?: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Review {
  productId: string;
  uid: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  customerName: string;
  verified: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
