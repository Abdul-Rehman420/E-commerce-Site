export interface ProductVariant {
  color: string;
  colorHex: string;
  inStock: boolean;
}

export interface ProductSize {
  label: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  description: string;
  verse: string;
  verseRef: string;
  category: string;
  collection: string;
  images: string[];
  colors: ProductVariant[];
  sizes: ProductSize[];
  badge?: string;
  badgeColor?: "navy" | "terracotta";
  material?: string;
  createdAt?: string;
  stock?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: ProductVariant;
  selectedSize: ProductSize;
}

export interface Scripture {
  text: string;
  ref: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  password: string;
  createdAt: string;
}

export interface Address {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  province: string;
  zipCode: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId?: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  discount: number;
  couponCode?: string;
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentMethod?: string;
  shippingAddress?: Address;
  createdAt?: string;
  updatedAt?: string;
  notes?: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minOrder: number;
  usageLimit: number;
  usedCount: number;
  expiresAt: string;
  active: boolean;
}

export interface Review {
  id: string;
  productId?: string;
  product_id?: string;
  userId?: string;
  user_id?: string;
  userName?: string;
  user_name?: string;
  rating: number;
  title?: string;
  comment?: string;
  createdAt?: string;
  created_at?: string;
  approved: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  tags: string[];
  createdAt?: string;
  created_at?: string;
  published: boolean;
}
