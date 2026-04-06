import dynamic from "next/dynamic";
import HeroSection from "@/components/hero/HeroSection";

const ProductIntroSection = dynamic(
  () => import("@/components/product-intro/ProductIntroSection"),
  { ssr: true }
);

export default function Home() {
  return (
    <main>
      <HeroSection>
        <ProductIntroSection />
      </HeroSection>
    </main>
  );
}
