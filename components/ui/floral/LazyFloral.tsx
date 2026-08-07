'use client';

import React, { useRef } from 'react';
import { useInView } from 'framer-motion';
import { 
  FloralOriginal, 
  FloralMirrored, 
  FloralCompact, 
  FloralCompactMirrored, 
  FloralElongated 
} from './FloralVariants';

export type FloralVariantType = 
  | 'original' 
  | 'mirrored' 
  | 'compact' 
  | 'compact-mirrored' 
  | 'elongated';

export interface LazyFloralProps {
  variant: FloralVariantType;
  tone: "light" | "dark";
  className?: string;
  style?: React.CSSProperties;
}

export function LazyFloral({ variant, tone, className = "", style }: LazyFloralProps) {
  const renderVariant = () => {
    switch (variant) {
      case 'original':
        return <FloralOriginal tone={tone} />;
      case 'mirrored':
        return <FloralMirrored tone={tone} />;
      case 'compact':
        return <FloralCompact tone={tone} />;
      case 'compact-mirrored':
        return <FloralCompactMirrored tone={tone} />;
      case 'elongated':
        return <FloralElongated tone={tone} />;
      default:
        return null;
    }
  };

  return (
    <div className={`absolute ${className}`} style={style}>
      {renderVariant()}
    </div>
  );
}
