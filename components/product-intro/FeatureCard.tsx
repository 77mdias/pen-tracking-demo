'use client';

import { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface FeatureCardProps {
  icon: ReactNode;
  label: string;
  headline: string;
  body: string;
  align?: 'left' | 'right';
}

export default function FeatureCard({ icon, label, headline, body, align = 'left' }: FeatureCardProps) {
  const desktopAlign = align === 'right' ? 'lg:items-end lg:text-right' : 'lg:items-start lg:text-left';

  return (
    <div className={`feature-card glass-panel rounded-2xl p-8 cursor-pointer group flex flex-col items-center text-center ${desktopAlign}`}>
      <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
        <ArrowUpRight className="text-white w-6 h-6" />
      </div>
      <div className="feature-icon-container w-14 h-14 bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-2xl flex items-center justify-center text-[#007bff] mb-6 shadow-inner">
        {icon}
      </div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-[#007bff] mb-2">
        {label}
      </div>
      <h3 className="font-heading text-xl md:text-2xl font-medium text-white tracking-tight mb-3">
        {headline}
      </h3>
      <p className="text-base text-gray-400 leading-relaxed">
        {body}
      </p>
    </div>
  );
}
