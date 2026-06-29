import { supabase } from "./supabase";
import { Product, Order, Review, Coupon, BlogPost } from "@/types";
import { products as staticProducts } from "@/data/products";
import { blogPosts as staticBlogPosts, reviews as staticReviews, coupons as staticCoupons } from "@/data/store";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapProduct(p: Record<string, any>): Product {
  return {
    ...p,
    verseRef: p.verse_ref,
    badgeColor: p.badge_color,
    createdAt: p.created_at,
  } as Product;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toSnakeProduct(p: Record<string, any>): Record<string, any> {
  const { verseRef, badgeColor, createdAt, ...rest } = p;
  return { ...rest, verse_ref: verseRef, badge_color: badgeColor, created_at: createdAt };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toSnakeOrder(o: Record<string, any>): Record<string, any> {
  const { userId, couponCode, paymentMethod, shippingAddress, createdAt, updatedAt, ...rest } = o;
  return { ...rest, user_id: userId, coupon_code: couponCode, payment_method: paymentMethod, shipping_address: shippingAddress, created_at: createdAt, updated_at: updatedAt };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapOrder(o: Record<string, any>): Order {
  return {
    ...o,
    userId: o.user_id,
    couponCode: o.coupon_code,
    paymentMethod: o.payment_method,
    shippingAddress: o.shipping_address,
    createdAt: o.created_at,
    updatedAt: o.updated_at,
  } as Order;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapBlogPost(p: Record<string, any>): BlogPost {
  return { ...p, createdAt: p.created_at } as BlogPost;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toSnakeBlogPost(p: Record<string, any>): Record<string, any> {
  const { createdAt, ...rest } = p;
  return { ...rest, created_at: createdAt };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapReview(r: Record<string, any>): Review {
  return {
    ...r,
    productId: r.product_id,
    userId: r.user_id,
    userName: r.user_name,
    createdAt: r.created_at,
  } as Review;
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    const { data } = await supabase.from("products").select("*");
    return (data ?? []).length ? (data ?? []).map(mapProduct) : fallbackProducts();
  } catch {
    return fallbackProducts();
  }
}

function fallbackProducts(): Product[] {
  return staticProducts;
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const { data } = await supabase.from("products").select("*").eq("slug", slug).single();
    if (data) return mapProduct(data);
    return staticProducts.find((p) => p.slug === slug) ?? null;
  } catch {
    return staticProducts.find((p) => p.slug === slug) ?? null;
  }
}

export async function fetchOrders(): Promise<Order[]> {
  try {
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    return (data ?? []).map(mapOrder);
  } catch {
    return [];
  }
}

export async function fetchUserOrders(userId: string): Promise<Order[]> {
  try {
    const { data } = await supabase.from("orders").select("*").eq("user_id", userId).order("created_at", { ascending: false });
    return (data ?? []).map(mapOrder);
  } catch {
    return [];
  }
}

export async function insertOrder(order: Record<string, unknown>): Promise<boolean> {
  const snakeOrder = toSnakeOrder(order);
  try {
    const { error } = await supabase.from("orders").insert(snakeOrder);
    return !error;
  } catch {
    return false;
  }
}

export async function updateOrderStatus(id: string, status: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("orders").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
    return !error;
  } catch {
    return false;
  }
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    return (data ?? []).map(mapBlogPost).length ? (data ?? []).map(mapBlogPost) : staticBlogPosts;
  } catch {
    return staticBlogPosts;
  }
}

export async function fetchPublishedPosts(): Promise<BlogPost[]> {
  try {
    const { data } = await supabase.from("blog_posts").select("*").eq("published", true).order("created_at", { ascending: false });
    return (data ?? []).map(mapBlogPost).length ? (data ?? []).map(mapBlogPost) : staticBlogPosts.filter((p) => p.published);
  } catch {
    return staticBlogPosts.filter((p) => p.published);
  }
}

export async function insertBlogPost(post: BlogPost): Promise<boolean> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const snake = toSnakeBlogPost(post as any);
    const { error } = await supabase.from("blog_posts").insert(snake);
    return !error;
  } catch {
    return false;
  }
}

export async function toggleBlogPost(id: string, published: boolean): Promise<boolean> {
  try {
    const { error } = await supabase.from("blog_posts").update({ published }).eq("id", id);
    return !error;
  } catch {
    return false;
  }
}

export async function insertProduct(product: Product): Promise<boolean> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const snake = toSnakeProduct(product as any);
    const { error } = await supabase.from("products").insert(snake);
    if (error) console.error("insertProduct error:", error);
    return !error;
  } catch (e) {
    console.error("insertProduct catch:", e);
    return false;
  }
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<boolean> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const snake = toSnakeProduct(updates as any);
    const { error } = await supabase.from("products").update(snake).eq("id", id);
    return !error;
  } catch {
    return false;
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("products").delete().eq("id", id);
    return !error;
  } catch {
    return false;
  }
}

export async function fetchReviews(): Promise<Review[]> {
  try {
    const { data } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
    return (data ?? []).map(mapReview).length ? (data ?? []).map(mapReview) : staticReviews;
  } catch {
    return staticReviews;
  }
}

export async function fetchProductReviews(productId: string): Promise<Review[]> {
  try {
    const { data } = await supabase.from("reviews").select("*").eq("product_id", productId).eq("approved", true);
    return (data ?? []).map(mapReview).length ? (data ?? []).map(mapReview) : staticReviews.filter((r) => r.productId === productId && r.approved);
  } catch {
    return staticReviews.filter((r) => r.productId === productId && r.approved);
  }
}

export async function toggleReviewApproval(id: string, approved: boolean): Promise<boolean> {
  try {
    const { error } = await supabase.from("reviews").update({ approved }).eq("id", id);
    return !error;
  } catch {
    return false;
  }
}

export async function fetchCoupons(): Promise<Coupon[]> {
  try {
    const { data } = await supabase.from("coupons").select("*");
    return (data as Coupon[]) ?? staticCoupons;
  } catch {
    return staticCoupons;
  }
}

export async function insertCoupon(coupon: Coupon): Promise<boolean> {
  try {
    const { error } = await supabase.from("coupons").insert(coupon);
    return !error;
  } catch {
    return false;
  }
}

export async function toggleCouponStatus(id: string, active: boolean): Promise<boolean> {
  try {
    const { error } = await supabase.from("coupons").update({ active }).eq("id", id);
    return !error;
  } catch {
    return false;
  }
}
