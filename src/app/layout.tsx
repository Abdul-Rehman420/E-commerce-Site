import type { Metadata } from "next";
import "./globals.css";
import { ScriptureBar } from "@/components/layout/ScriptureBar";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { WhatsAppButton } from "@/components/features/WhatsAppButton";
import { CartDrawer } from "@/components/features/CartDrawer";

export const metadata: Metadata = {
  title: "Righteous Threads | Wear Your Faith",
  description:
    "Premium faith-based apparel for women in Pakistan. Faith-inspired fashion with COD delivery across Lahore and all Pakistan.",
  keywords: ["faith-based apparel", "Islamic fashion", "Pakistan", "Lahore", "modest fashion", "faith clothing"],
  openGraph: {
    title: "Righteous Threads | Wear Your Faith",
    description: "Premium faith-based apparel for women in Pakistan. Faith-inspired fashion with COD delivery.",
    type: "website",
    locale: "en_PK",
    siteName: "Righteous Threads",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
      </head>
      <body className="bg-beige text-navy font-sans antialiased selection:bg-gold selection:text-navy">
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <ScriptureBar />
              <Navigation />
              <CartDrawer />
              <main>{children}</main>
              <Footer />
              <WhatsAppButton />
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
