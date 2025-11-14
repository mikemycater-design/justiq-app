'use client';

import { HeroSection } from "@/components/hero-section";
import { PricingPlans } from "@/components/pricing-plans";
import { BlogSection } from "@/components/blog-section";
import { CookieConsent } from "@/components/cookie-consent";

export default function Home() {
  return (
    <>
      <HeroSection />
      <PricingPlans />
      <section className="py-16 sm:py-24 bg-secondary">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
            <BlogSection isPage={false} />
        </div>
      </section>
      <CookieConsent />
    </>
  );
}
