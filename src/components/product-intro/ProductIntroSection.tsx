'use client';

import ProductIntroBridge from '@/components/product-intro/ProductIntroBridge';
import FeatureAIWriting from '@/components/product-intro/FeatureAIWriting';
import FeatureSmartSync from '@/components/product-intro/FeatureSmartSync';
import FeatureFocusMode from '@/components/product-intro/FeatureFocusMode';
import ProductIntroCTA from '@/components/product-intro/ProductIntroCTA';
import SectionDivider from '@/components/product-intro/SectionDivider';

export default function ProductIntroSection() {
  return (
    <section id="product" className="relative w-full scroll-mt-28">
      <ProductIntroBridge />
      <SectionDivider />
      <FeatureAIWriting />
      <SectionDivider />
      <FeatureSmartSync />
      <SectionDivider />
      <FeatureFocusMode />
      <SectionDivider />
      <ProductIntroCTA />
    </section>
  );
}
