-- ============================================
-- Righteous Threads — Supabase Schema + RLS
-- Run this in your Supabase SQL Editor
-- ============================================

-- 1. TABLES

create table if not exists public.products (
  id text primary key,
  slug text unique not null,
  name text not null,
  price numeric not null,
  description text default '',
  verse text default '',
  verse_ref text default '',
  category text not null,
  collection text default '',
  images jsonb default '[]'::jsonb,
  colors jsonb default '[]'::jsonb,
  sizes jsonb default '[]'::jsonb,
  badge text default '',
  badge_color text default '',
  material text default '',
  stock integer default 10,
  created_at timestamp default now()
);

create table if not exists public.orders (
  id text primary key,
  user_id uuid references auth.users(id),
  items jsonb not null,
  total numeric not null,
  subtotal numeric not null,
  discount numeric default 0,
  coupon_code text default '',
  status text default 'pending',
  payment_method text default 'cod',
  shipping_address jsonb not null,
  notes text default '',
  created_at timestamp default now(),
  updated_at timestamp default now()
);

create table if not exists public.wishlists (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  product_id text references public.products(id) not null,
  created_at timestamp default now(),
  unique(user_id, product_id)
);

create table if not exists public.blog_posts (
  id text primary key,
  slug text unique not null,
  title text not null,
  excerpt text default '',
  content text default '',
  image text default '',
  author text default '',
  tags jsonb default '[]'::jsonb,
  published boolean default false,
  created_at timestamp default now()
);

create table if not exists public.reviews (
  id text primary key,
  product_id text references public.products(id),
  user_id uuid references auth.users(id),
  user_name text default '',
  rating integer not null,
  title text default '',
  comment text default '',
  approved boolean default false,
  created_at timestamp default now()
);

create table if not exists public.coupons (
  id text primary key,
  code text unique not null,
  type text not null,
  value numeric not null,
  min_order numeric default 0,
  usage_limit integer default 0,
  used_count integer default 0,
  expires_at text default '',
  active boolean default true
);

create table if not exists public.profiles (
  id uuid references auth.users(id) primary key,
  name text default '',
  phone text default '',
  created_at timestamp default now()
);

create table if not exists public.admins (
  user_id uuid references auth.users(id) primary key,
  created_at timestamp default now()
);

-- 2. AUTO-CREATE PROFILE ON SIGNUP

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name, phone)
  values (new.id, new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'phone');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 3. ENABLE RLS

alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.wishlists enable row level security;
alter table public.blog_posts enable row level security;
alter table public.reviews enable row level security;
alter table public.coupons enable row level security;
alter table public.profiles enable row level security;

-- 4. RLS POLICIES

-- Products
drop policy if exists "Products are publicly readable" on public.products;
create policy "Products are publicly readable" on public.products
  for select using (true);

drop policy if exists "Admins can insert products" on public.products;
create policy "Admins can insert products" on public.products
  for insert with check (auth.uid() in (select user_id from public.admins));

drop policy if exists "Admins can update products" on public.products;
create policy "Admins can update products" on public.products
  for update using (auth.uid() in (select user_id from public.admins));

drop policy if exists "Admins can delete products" on public.products;
create policy "Admins can delete products" on public.products
  for delete using (auth.uid() in (select user_id from public.admins));

-- Orders
drop policy if exists "Users can view own orders" on public.orders;
create policy "Users can view own orders" on public.orders
  for select using (auth.uid() = user_id or auth.uid() in (select user_id from public.admins));

drop policy if exists "Users can insert own orders" on public.orders;
create policy "Users can insert own orders" on public.orders
  for insert with check (auth.uid() = user_id);

drop policy if exists "Admins can update orders" on public.orders;
create policy "Admins can update orders" on public.orders
  for update using (auth.uid() in (select user_id from public.admins));

-- Wishlists
drop policy if exists "Users can view own wishlist" on public.wishlists;
create policy "Users can view own wishlist" on public.wishlists
  for select using (auth.uid() = user_id);

drop policy if exists "Users can add to wishlist" on public.wishlists;
create policy "Users can add to wishlist" on public.wishlists
  for insert with check (auth.uid() = user_id);

drop policy if exists "Users can remove from wishlist" on public.wishlists;
create policy "Users can remove from wishlist" on public.wishlists
  for delete using (auth.uid() = user_id);

-- Blog
drop policy if exists "Published posts are public" on public.blog_posts;
create policy "Published posts are public" on public.blog_posts
  for select using (published = true or auth.uid() in (select user_id from public.admins));

drop policy if exists "Admins can insert posts" on public.blog_posts;
create policy "Admins can insert posts" on public.blog_posts
  for insert with check (auth.uid() in (select user_id from public.admins));

drop policy if exists "Admins can update posts" on public.blog_posts;
create policy "Admins can update posts" on public.blog_posts
  for update using (auth.uid() in (select user_id from public.admins));

-- Reviews
drop policy if exists "Approved reviews are public" on public.reviews;
create policy "Approved reviews are public" on public.reviews
  for select using (approved = true or auth.uid() = user_id or auth.uid() in (select user_id from public.admins));

drop policy if exists "Users can insert reviews" on public.reviews;
create policy "Users can insert reviews" on public.reviews
  for insert with check (auth.uid() = user_id);

drop policy if exists "Admins can update reviews" on public.reviews;
create policy "Admins can update reviews" on public.reviews
  for update using (auth.uid() in (select user_id from public.admins));

-- Coupons
drop policy if exists "Admins can view coupons" on public.coupons;
create policy "Admins can view coupons" on public.coupons
  for select using (auth.uid() in (select user_id from public.admins));

drop policy if exists "Admins can manage coupons" on public.coupons;
create policy "Admins can manage coupons" on public.coupons
  for all using (auth.uid() in (select user_id from public.admins));

-- Profiles
drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id or auth.uid() in (select user_id from public.admins));

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- 5. SEED DATA

insert into public.products (id, slug, name, price, description, verse, verse_ref, category, collection, images, colors, sizes, badge, badge_color, material, stock) values
('armor-hoodie', 'armor-of-god-hoodie', 'The Armor of God Hoodie', 49.99, 'Unisex Heavy Blend Hoodie. Super soft, pre-shrunk, and designed to remind you of the spiritual armor you carry daily.', 'Put on the full armor of God, so that you can take your stand against the devil''s schemes.', 'Ephesians 6:11', 'hoodies', 'armor', '["https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1974&auto=format&fit=crop","https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1972&auto=format&fit=crop","https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop"]', '[{"color":"Charcoal","colorHex":"#2D2D3A","inStock":true},{"color":"Navy","colorHex":"#1A1A2E","inStock":true},{"color":"Beige","colorHex":"#E5E0D8","inStock":true}]', '[{"label":"S","inStock":true},{"label":"M","inStock":true},{"label":"L","inStock":true},{"label":"XL","inStock":true},{"label":"XXL","inStock":false}]', 'NEW', 'navy', 'Heavy Blend', 10),
('grace-alone-tee', 'grace-alone-oversized-tee', 'Grace Alone Oversized Tee', 35.00, 'Vintage wash oversized tee with a timeless message. Soft, lived-in feel from day one.', 'For it is by grace you have been saved, through faith.', 'Ephesians 2:8', 'tees', 'essentials', '["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop","https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1974&auto=format&fit=crop","https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?q=80&w=2070&auto=format&fit=crop"]', '[{"color":"Vintage White","colorHex":"#F5F0EB","inStock":true},{"color":"Stone Wash","colorHex":"#D5D0C8","inStock":true},{"color":"Black","colorHex":"#222222","inStock":true}]', '[{"label":"S","inStock":true},{"label":"M","inStock":true},{"label":"L","inStock":true},{"label":"XL","inStock":true},{"label":"XXL","inStock":true}]', '', '', 'Vintage Wash', 10),
('mustard-seed-cap', 'mustard-seed-cap', 'Mustard Seed Cap', 28.00, 'Premium structured cap with embroidered design.', 'If you have faith as small as a mustard seed... nothing will be impossible for you.', 'Matthew 17:20', 'accessories', 'essentials', '["https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=2030&auto=format&fit=crop","https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=2036&auto=format&fit=crop"]', '[{"color":"Navy","colorHex":"#1A1A2E","inStock":true},{"color":"Black","colorHex":"#222222","inStock":true},{"color":"Beige","colorHex":"#E5E0D8","inStock":true}]', '[{"label":"OSFA","inStock":true}]', 'BESTSELLER', 'terracotta', '', 10),
('proverbs-crewneck', 'proverbs-crewneck', 'Proverbs Crewneck', 48.00, 'Warm beige crewneck sweater with subtle design details.', 'Trust in the Lord with all your heart and lean not on your own understanding.', 'Proverbs 3:5', 'sweatshirts', 'essentials', '["https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=1974&auto=format&fit=crop","https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2070&auto=format&fit=crop","https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop"]', '[{"color":"Warm Beige","colorHex":"#E5E0D8","inStock":true},{"color":"Charcoal","colorHex":"#2D2D3A","inStock":true}]', '[{"label":"S","inStock":true},{"label":"M","inStock":true},{"label":"L","inStock":true},{"label":"XL","inStock":true},{"label":"XXL","inStock":false}]', '', '', 'Heavy Blend', 10),
('shield-of-faith-tee', 'shield-of-faith-tee', 'Shield of Faith Tee', 32.00, 'Premium comfort tee with a bold graphic print.', 'Take up the shield of faith, with which you can extinguish all the flaming arrows of the evil one.', 'Ephesians 6:16', 'tees', 'armor', '["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1974&auto=format&fit=crop","https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?q=80&w=2070&auto=format&fit=crop"]', '[{"color":"White","colorHex":"#FFFFFF","inStock":true},{"color":"Navy","colorHex":"#1A1A2E","inStock":true}]', '[{"label":"S","inStock":true},{"label":"M","inStock":true},{"label":"L","inStock":true},{"label":"XL","inStock":true},{"label":"XXL","inStock":true}]', '', '', '', 10),
('peace-be-still-hoodie', 'peace-be-still-hoodie', 'Peace Be Still Hoodie', 54.00, 'Heavy weight hoodie featuring a calming design inspired by Christ calming the storm.', 'He said to the waves, ''Peace, be still.'' And the wind ceased and there was a great calm.', 'Mark 4:39', 'hoodies', 'peace', '["https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1972&auto=format&fit=crop","https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1974&auto=format&fit=crop"]', '[{"color":"Heather Grey","colorHex":"#B8B8B8","inStock":true},{"color":"Navy","colorHex":"#1A1A2E","inStock":true}]', '[{"label":"S","inStock":true},{"label":"M","inStock":true},{"label":"L","inStock":true},{"label":"XL","inStock":true},{"label":"XXL","inStock":false}]', 'NEW', 'navy', 'Heavy Blend', 10)
on conflict (id) do nothing;

insert into public.blog_posts (id, slug, title, excerpt, content, image, author, tags, published, created_at) values
('b1', 'walk-by-faith-style', 'Walk by Faith, Dress with Style', 'How to express your faith through fashion without saying a word.', 'Fashion is more than fabric — it''s a statement. In a world that''s constantly watching, what you wear can speak volumes before you ever open your mouth. At Righteous Threads, we believe every outfit is an opportunity to declare your faith...', 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=2070&auto=format&fit=crop', 'Righteous Threads', '["fashion","faith","style"]', true, '2026-06-01'),
('b2', 'armor-of-god-meaning', 'The Armor of God: What It Really Means', 'Breaking down Ephesians 6 and why we wear it on our sleeves.', 'Ephesians 6:10-18 describes the full armor of God — a spiritual protection for every believer. But what does it mean to ''put on'' this armor in your daily life? Let''s explore each piece...', 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=2070&auto=format&fit=crop', 'Righteous Threads', '["bible","ephesians","armor"]', true, '2026-05-15'),
('b3', 'faith-community-fashion', 'Faith, Community & Fashion: A Movement', 'How a group of believers turned apparel into ministry.', 'What started with a small group of friends printing scripture designs in a garage has grown into a movement of believers who express their identity in Christ through fashion...', 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2689&auto=format&fit=crop', 'Righteous Threads', '["community","faith","movement"]', true, '2026-04-20')
on conflict (id) do nothing;

insert into public.coupons (id, code, type, value, min_order, usage_limit, used_count, expires_at, active) values
('c1', 'FAITH10', 'percentage', 10, 1000, 100, 5, '2027-12-31', true),
('c2', 'FIRSTORDER', 'fixed', 200, 1500, 50, 10, '2027-12-31', true),
('c3', 'SALE500', 'fixed', 500, 3000, 30, 2, '2026-12-31', true),
('c4', 'GRACE20', 'percentage', 20, 2000, 200, 0, '2026-12-31', true)
on conflict (id) do nothing;

insert into public.reviews (id, product_id, user_id, user_name, rating, title, comment, approved, created_at) values
('r1', 'armor-hoodie', null, 'Ayesha K.', 5, 'Beautiful quality!', 'The fabric is so soft and the design is beautiful. Definitely buying more!', true, '2026-06-10'),
('r2', 'armor-hoodie', null, 'Fatima R.', 4, 'Great hoodie', 'Love the message and the fit. Slightly large but that''s the style.', true, '2026-06-05'),
('r3', 'grace-alone-tee', null, 'Zainab A.', 5, 'Perfect everyday tee', 'I wear this everywhere. Gets so many compliments!', true, '2026-05-28')
on conflict (id) do nothing;
