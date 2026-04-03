'use client';

import ProductIntroBridge from '@/components/product-intro/ProductIntroBridge';
import FeatureAIWriting from '@/components/product-intro/FeatureAIWriting';
import FeatureSmartSync from '@/components/product-intro/FeatureSmartSync';
import FeatureFocusMode from '@/components/product-intro/FeatureFocusMode';
import ProductIntroCTA from '@/components/product-intro/ProductIntroCTA';

export default function ProductIntroSection() {
  return (
    <section className="relative w-full">
      <ProductIntroBridge />
      <FeatureAIWriting />
      <FeatureSmartSync />
      <FeatureFocusMode />
      <ProductIntroCTA />
    </section>
  );
}
