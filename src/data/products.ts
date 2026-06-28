import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "armor-hoodie",
    slug: "armor-of-god-hoodie",
    name: "The Armor of God Hoodie",
    price: 49.99,
    description:
      "Unisex Heavy Blend Hoodie. Super soft, pre-shrunk, and designed to remind you of the spiritual armor you carry daily. Declare it loud.",
    verse: "Put on the full armor of God, so that you can take your stand against the devil's schemes.",
    verseRef: "Ephesians 6:11",
    category: "hoodies",
    collection: "armor",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1972&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop",
      "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg",
    ],
    colors: [
      { color: "Charcoal", colorHex: "#2D2D3A", inStock: true },
      { color: "Navy", colorHex: "#1A1A2E", inStock: true },
      { color: "Beige", colorHex: "#E5E0D8", inStock: true },
    ],
    sizes: [
      { label: "S", inStock: true },
      { label: "M", inStock: true },
      { label: "L", inStock: true },
      { label: "XL", inStock: true },
      { label: "XXL", inStock: false },
    ],
    badge: "NEW",
    badgeColor: "navy",
    material: "Heavy Blend",
  },
  {
    id: "grace-alone-tee",
    slug: "grace-alone-oversized-tee",
    name: "Grace Alone Oversized Tee",
    price: 35.0,
    description:
      "Vintage wash oversized tee with a timeless message. Soft, lived-in feel from day one. Perfect for everyday wear.",
    verse: "For it is by grace you have been saved, through faith.",
    verseRef: "Ephesians 2:8",
    category: "tees",
    collection: "essentials",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?q=80&w=2070&auto=format&fit=crop",
    ],
    colors: [
      { color: "Vintage White", colorHex: "#F5F0EB", inStock: true },
      { color: "Stone Wash", colorHex: "#D5D0C8", inStock: true },
      { color: "Black", colorHex: "#222222", inStock: true },
    ],
    sizes: [
      { label: "S", inStock: true },
      { label: "M", inStock: true },
      { label: "L", inStock: true },
      { label: "XL", inStock: true },
      { label: "XXL", inStock: true },
    ],
    material: "Vintage Wash",
  },
  {
    id: "mustard-seed-cap",
    slug: "mustard-seed-cap",
    name: "Mustard Seed Cap",
    price: 28.0,
    description:
      "Premium structured cap with embroidered design. A daily reminder that faith as small as a mustard seed can move mountains.",
    verse: "If you have faith as small as a mustard seed... nothing will be impossible for you.",
    verseRef: "Matthew 17:20",
    category: "accessories",
    collection: "essentials",
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=2030&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=2036&auto=format&fit=crop",
    ],
    colors: [
      { color: "Navy", colorHex: "#1A1A2E", inStock: true },
      { color: "Black", colorHex: "#222222", inStock: true },
      { color: "Beige", colorHex: "#E5E0D8", inStock: true },
    ],
    sizes: [
      { label: "OSFA", inStock: true },
    ],
    badge: "BESTSELLER",
    badgeColor: "terracotta",
  },
  {
    id: "proverbs-crewneck",
    slug: "proverbs-crewneck",
    name: "Proverbs Crewneck",
    price: 48.0,
    description:
      "Warm beige crewneck sweater with subtle design details. Made for cozy moments and meaningful conversations about faith.",
    verse: "Trust in the Lord with all your heart and lean not on your own understanding.",
    verseRef: "Proverbs 3:5",
    category: "sweatshirts",
    collection: "essentials",
    images: [
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop",
    ],
    colors: [
      { color: "Warm Beige", colorHex: "#E5E0D8", inStock: true },
      { color: "Charcoal", colorHex: "#2D2D3A", inStock: true },
    ],
    sizes: [
      { label: "S", inStock: true },
      { label: "M", inStock: true },
      { label: "L", inStock: true },
      { label: "XL", inStock: true },
      { label: "XXL", inStock: false },
    ],
    material: "Heavy Blend",
  },
  {
    id: "shield-of-faith-tee",
    slug: "shield-of-faith-tee",
    name: "Shield of Faith Tee",
    price: 32.0,
    description:
      "Premium comfort tee with a bold graphic print. Take up the shield of faith with every wear.",
    verse: "In addition to all this, take up the shield of faith, with which you can extinguish all the flaming arrows of the evil one.",
    verseRef: "Ephesians 6:16",
    category: "tees",
    collection: "armor",
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?q=80&w=2070&auto=format&fit=crop",
    ],
    colors: [
      { color: "White", colorHex: "#FFFFFF", inStock: true },
      { color: "Navy", colorHex: "#1A1A2E", inStock: true },
    ],
    sizes: [
      { label: "S", inStock: true },
      { label: "M", inStock: true },
      { label: "L", inStock: true },
      { label: "XL", inStock: true },
      { label: "XXL", inStock: true },
    ],
  },
  {
    id: "peace-be-still-hoodie",
    slug: "peace-be-still-hoodie",
    name: "Peace Be Still Hoodie",
    price: 54.0,
    description:
      "Heavy weight hoodie featuring a calming design inspired by Christ calming the storm. Find your peace.",
    verse: "He said to the waves, 'Peace, be still.' And the wind ceased and there was a great calm.",
    verseRef: "Mark 4:39",
    category: "hoodies",
    collection: "peace",
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1972&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1974&auto=format&fit=crop",
    ],
    colors: [
      { color: "Heather Grey", colorHex: "#B8B8B8", inStock: true },
      { color: "Navy", colorHex: "#1A1A2E", inStock: true },
    ],
    sizes: [
      { label: "S", inStock: true },
      { label: "M", inStock: true },
      { label: "L", inStock: true },
      { label: "XL", inStock: true },
      { label: "XXL", inStock: false },
    ],
    badge: "NEW",
    badgeColor: "navy",
    material: "Heavy Blend",
  },
];

export const collections = [
  {
    id: "armor",
    name: "Armor of God",
    description: "Stand firm with our flagship collection inspired by Ephesians 6.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1974&auto=format&fit=crop",
    slug: "armor",
  },
  {
    id: "essentials",
    name: "Daily Essentials",
    description: "Everyday pieces for the daily walk of faith.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop",
    slug: "essentials",
  },
  {
    id: "peace",
    name: "Peace Collection",
    description: "Find calm in the storm with our peace-inspired designs.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2689&auto=format&fit=crop",
    slug: "peace",
  },
];

export const categories = ["all", "hoodies", "tees", "sweatshirts", "accessories"];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCollection(collectionId: string): Product[] {
  return products.filter((p) => p.collection === collectionId);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
}
