import { Hero } from "@/components/features/Hero";
import { Bestsellers } from "@/components/features/Bestsellers";
import { BrandStory } from "@/components/features/BrandStory";
import { InstagramGallery } from "@/components/features/InstagramGallery";
import { NewsletterSignup } from "@/components/features/NewsletterSignup";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Bestsellers />
      <BrandStory />
      <InstagramGallery />
      <NewsletterSignup />
    </>
  );
}
