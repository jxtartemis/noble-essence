import type { Timestamp } from 'firebase/firestore';

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

export interface AdminUser {
  uid: string;
  email: string;
  role: 'superadmin' | 'admin' | 'staff';
  permissions: string[];
  invitedBy: string;
  lastLogin?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
