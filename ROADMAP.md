# Righteous Threads — Getting Started Roadmap

## 1. Run Locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:3000`

## 2. Explore the Site

| Page | URL |
|------|-----|
| Home | `/` |
| Shop | `/shop` |
| Product Detail | `/product/armor-of-god-hoodie` |
| Cart | `/cart` |
| Checkout (COD) | `/checkout` |
| Account | `/auth/login` → `/account` |
| Blog | `/blog` |
| Collections | `/collections` |
| Size Guide | `/size-guide` |
| About | `/about` |
| **Admin Panel** | `/admin` |

## 3. Test the Admin Panel

Go to `/admin` — it works with mock data (localStorage). You can:

- View dashboard (revenue, orders, products)
- **Products** — Add new, edit, delete
- **Orders** — Filter by status
- **Coupons** — Create discount codes (percentage or fixed)
- **Blog** — Write and publish posts
- **Reviews** — Approve or reject customer reviews

## 4. Test Full Purchase Flow

1. Browse `/shop` → click a product
2. Choose color/size → "Add to Cart"
3. Go to `/cart` → "Checkout"
4. Fill in shipping details → apply coupon code `FAITH10` → Place Order (COD)
5. Check `/account` → view order history

## 5. Register an Account

- Go to `/auth/register` — create account (stored in localStorage)
- Go to `/auth/login` — sign in
- Go to `/account` — view orders, wishlist
- Forgot password at `/auth/recover`

## 6. Customize for Production

### Switch from localStorage to a real database

The app currently uses `localStorage` for all data. For production, replace the data layer:

**Option A: Firebase (free tier)**
- Firebase Auth for authentication
- Firestore for products, orders, users, reviews
- Firebase Storage for images

**Option B: Supabase (free tier)**
- Supabase Auth + PostgreSQL database
- Row-level security for admin access

**Option C: Custom backend**
- Node.js/Express API with MongoDB or MySQL
- Replace the context providers with API calls

### Key files to update when adding a backend:

| Current File | Purpose | Replace With |
|---|---|---|
| `src/context/AuthContext.tsx` | Login/register | Firebase Auth or API calls |
| `src/context/CartContext.tsx` | Cart state | Keep client-side, sync on checkout |
| `src/context/WishlistContext.tsx` | Wishlist | Sync to user profile |
| `src/data/products.ts` | Product catalog | Fetch from database |
| `src/data/store.ts` | Mock orders/reviews/coupons | Fetch from database |
| `src/app/checkout/page.tsx` | COD checkout | Add payment gateway |

### Add payment gateway (replace COD):

For Pakistan, integrate:
- **Stripe** — International cards
- **Mobilink JazzCash API** — Local mobile payments
- **Bank transfer** — Manual confirmation

### Set up real email:

- **SendGrid** (free: 100 emails/day) for order confirmations + password recovery
- Update `/auth/recover` to send real emails

### WhatsApp Business:

- Replace the floating button `wa.me` link with WhatsApp Business API for order notifications

## 7. Deploy

**Free options:**

| Platform | Notes |
|----------|-------|
| **Vercel** | Best for Next.js. Connect GitHub repo → auto-deploys |
| **Netlify** | Good alternative with form handling |
| **HosterPK** | Local Pakistan hosting if Vercel is slow |

Steps:
1. Push code to GitHub
2. Connect repo to Vercel
3. Set environment variables (if using a database)
4. Deploy

## 8. Add Real Products

Update `src/data/products.ts` with your actual inventory:
- Product names, prices in PKR
- Images (upload to Cloudinary or Supabase Storage)
- Categories, sizes, colors
- Stock quantities

## 9. Go Live Checklist

- [ ] Replace `YOUR_VERIFICATION_CODE` in `src/app/layout.tsx` with your Google Search Console code
- [ ] Update social media links in `Footer.tsx` (Instagram, TikTok, Facebook)
- [ ] Update WhatsApp number in `WhatsAppButton.tsx`
- [ ] Add real products with correct pricing
- [ ] Test COD checkout flow end-to-end
- [ ] Set up analytics (Google Analytics 4)
- [ ] Submit sitemap to Google Search Console
- [ ] Create social media pages (Instagram, TikTok, Facebook)

## File Structure Reference

```
src/
  app/                     # All pages (App Router)
    admin/                 # Admin panel (dashboard, products, orders, coupons, blog, reviews)
    account/               # User account (orders, wishlist)
    auth/                  # Login, register, password recovery
    blog/                  # Blog listing + posts
    cart/                  # Shopping cart
    checkout/              # COD checkout with coupons
    shop/                  # Product listing with filters
    product/[slug]/        # Product detail with reviews
    collections/           # Collection grid
  components/
    layout/                # ScriptureBar, Navigation, Footer
    ui/                    # Button, ProductCard, Container, SectionHeader
    features/              # Hero, Bestsellers, BrandStory, ProductDetail, InstagramGallery,
                           # Newsletter, WhatsAppButton, AddToWishlist
    admin/                 # Sidebar, StatsCard
  context/                 # AuthContext, CartContext, WishlistContext
  data/                    # products.ts, store.ts (mock data), verses.ts
  lib/                     # utils.ts
  types/                   # TypeScript interfaces
```
