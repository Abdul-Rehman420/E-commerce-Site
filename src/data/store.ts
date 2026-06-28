import { Coupon, BlogPost, Order, Review } from "@/types";

export const coupons: Coupon[] = [
  { id: "c1", code: "FAITH10", type: "percentage", value: 10, minOrder: 1000, usageLimit: 100, usedCount: 5, expiresAt: "2027-12-31", active: true },
  { id: "c2", code: "FIRSTORDER", type: "fixed", value: 200, minOrder: 1500, usageLimit: 50, usedCount: 10, expiresAt: "2027-12-31", active: true },
  { id: "c3", code: "SALE500", type: "fixed", value: 500, minOrder: 3000, usageLimit: 30, usedCount: 2, expiresAt: "2026-12-31", active: true },
  { id: "c4", code: "GRACE20", type: "percentage", value: 20, minOrder: 2000, usageLimit: 200, usedCount: 0, expiresAt: "2026-12-31", active: true },
];

export const blogPosts: BlogPost[] = [
  {
    id: "b1", slug: "walk-by-faith-style", title: "Walk by Faith, Dress with Style",
    excerpt: "How to express your faith through fashion without saying a word.",
    content: "Fashion is more than fabric — it's a statement. In a world that's constantly watching, what you wear can speak volumes before you ever open your mouth. At Righteous Threads, we believe every outfit is an opportunity to declare your faith...",
    image: "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=2070&auto=format&fit=crop",
    author: "Righteous Threads", tags: ["fashion", "faith", "style"], createdAt: "2026-06-01", published: true,
  },
  {
    id: "b2", slug: "armor-of-god-meaning", title: "The Armor of God: What It Really Means",
    excerpt: "Breaking down Ephesians 6 and why we wear it on our sleeves.",
    content: "Ephesians 6:10-18 describes the full armor of God — a spiritual protection for every believer. But what does it mean to 'put on' this armor in your daily life? Let's explore each piece...",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=2070&auto=format&fit=crop",
    author: "Righteous Threads", tags: ["bible", "ephesians", "armor"], createdAt: "2026-05-15", published: true,
  },
  {
    id: "b3", slug: "faith-community-fashion", title: "Faith, Community & Fashion: A Movement",
    excerpt: "How a group of believers turned apparel into ministry.",
    content: "What started with a small group of friends printing scripture designs in a garage has grown into a movement of believers who express their identity in Christ through fashion...",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2689&auto=format&fit=crop",
    author: "Righteous Threads", tags: ["community", "faith", "movement"], createdAt: "2026-04-20", published: true,
  },
];

export const reviews: Review[] = [
  { id: "r1", productId: "armor-hoodie", userId: "u1", userName: "Ayesha K.", rating: 5, title: "Beautiful quality!", comment: "The fabric is so soft and the design is beautiful. Definitely buying more!", createdAt: "2026-06-10", approved: true },
  { id: "r2", productId: "armor-hoodie", userId: "u2", userName: "Fatima R.", rating: 4, title: "Great hoodie", comment: "Love the message and the fit. Slightly large but that's the style.", createdAt: "2026-06-05", approved: true },
  { id: "r3", productId: "grace-alone-tee", userId: "u3", userName: "Zainab A.", rating: 5, title: "Perfect everyday tee", comment: "I wear this everywhere. Gets so many compliments!", createdAt: "2026-05-28", approved: true },
];

export const orders: Order[] = [
  {
    id: "ORD-001", userId: "u1", total: 1550, subtotal: 1750, discount: 200, couponCode: "FIRSTORDER",
    status: "delivered", paymentMethod: "cod",
    shippingAddress: { id: "a1", userId: "u1", fullName: "Ayesha Khan", phone: "0300-1234567", street: "123 Main Blvd, Gulberg", city: "Lahore", province: "Punjab", zipCode: "54000", isDefault: true },
    items: [
      { product: { id: "armor-hoodie", slug: "armor-of-god-hoodie", name: "The Armor of God Hoodie", price: 49.99, description: "", verse: "", verseRef: "", category: "hoodies", collection: "armor", images: [""], colors: [{ color: "Charcoal", colorHex: "#2D2D3A", inStock: true }], sizes: [{ label: "M", inStock: true }], createdAt: "", stock: 10 }, quantity: 1, selectedColor: { color: "Charcoal", colorHex: "#2D2D3A", inStock: true }, selectedSize: { label: "M", inStock: true }
      }
    ], createdAt: "2026-06-01", updatedAt: "2026-06-08", notes: "",
  },
  {
    id: "ORD-002", userId: "u2", total: 2800, subtotal: 2800, discount: 0, couponCode: "",
    status: "shipped", paymentMethod: "cod",
    shippingAddress: { id: "a2", userId: "u2", fullName: "Fatima Riaz", phone: "0321-7654321", street: "456 Defense Rd", city: "Lahore", province: "Punjab", zipCode: "54792", isDefault: true },
    items: [
      { product: { id: "grace-alone-tee", slug: "grace-alone-oversized-tee", name: "Grace Alone Oversized Tee", price: 35, description: "", verse: "", verseRef: "", category: "tees", collection: "essentials", images: [""], colors: [{ color: "Vintage White", colorHex: "#F5F0EB", inStock: true }], sizes: [{ label: "L", inStock: true }], createdAt: "", stock: 10 }, quantity: 2, selectedColor: { color: "Vintage White", colorHex: "#F5F0EB", inStock: true }, selectedSize: { label: "L", inStock: true }
      }
    ], createdAt: "2026-06-10", updatedAt: "2026-06-12", notes: "Leave at gate",
  },
];
