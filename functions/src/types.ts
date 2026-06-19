import * as admin from 'firebase-admin';

/**
 * Firestore data model types
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[]; // Firebase Storage URLs
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
  createdAt: admin.firestore.Timestamp;
  updatedAt: admin.firestore.Timestamp;
}

export interface Order {
  id: string;
  uid: string | null; // null for guest
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
  createdAt: admin.firestore.Timestamp;
  updatedAt: admin.firestore.Timestamp;
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
  wishlist: string[]; // product IDs
  orderIds: string[];
  createdAt: admin.firestore.Timestamp;
  updatedAt: admin.firestore.Timestamp;
}

export interface Cart {
  sessionId: string; // uid or anonymous session ID
  items: CartItem[];
  updatedAt: admin.firestore.Timestamp;
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
  createdAt: admin.firestore.Timestamp;
  updatedAt: admin.firestore.Timestamp;
}

export interface Review {
  productId: string;
  uid: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  customerName: string;
  verified: boolean; // set true if customer has purchased
  createdAt: admin.firestore.Timestamp;
  updatedAt: admin.firestore.Timestamp;
}

export interface AdminUser {
  uid: string;
  email: string;
  role: 'superadmin' | 'admin' | 'staff';
  permissions: string[];
  invitedBy: string;
  lastLogin?: admin.firestore.Timestamp;
  createdAt: admin.firestore.Timestamp;
  updatedAt: admin.firestore.Timestamp;
}
