import React from 'react';
import { LazyFloral, FloralVariantType } from './LazyFloral';

interface FloralConfig {
  top: string;
  variant: FloralVariantType;
  side: 'left' | 'right';
  scale: number;
  rotate: number;
  tone: 'light' | 'dark';
  mobileHidden: boolean;
}

// Configuración de las instancias a lo largo de TODO el scroll de la página.
// Distancia aproximada de ~400px entre cada una.
// En mobile se ocultan la mitad para mantener la fluidez (distancia de ~800px).
const FLORAL_CONFIG: FloralConfig[] = [
  // 1. Empezamos DESPUÉS del Hero (Hero ya tiene su propia imagen de fondo de flores)
  // 2. Entre Hero y Favoritos
  { top: "18%", variant: 'compact-mirrored', side: 'left', scale: 0.8, rotate: 5, tone: 'light', mobileHidden: false },
  { top: "23%", variant: 'elongated', side: 'right', scale: 0.9, rotate: -10, tone: 'light', mobileHidden: true },
  
  // 3. Featured Products
  { top: "29%", variant: 'mirrored', side: 'left', scale: 1.0, rotate: 12, tone: 'light', mobileHidden: false },
  { top: "35%", variant: 'compact', side: 'right', scale: 0.5, rotate: 20, tone: 'light', mobileHidden: true },
  
  // 4. Motivational Banner (Fondo oscuro saturado)
  { top: "42%", variant: 'compact-mirrored', side: 'left', scale: 0.6, rotate: -20, tone: 'dark', mobileHidden: false },
  { top: "48%", variant: 'compact', side: 'right', scale: 0.7, rotate: 10, tone: 'dark', mobileHidden: true },

  // 5. About Preview
  { top: "54%", variant: 'original', side: 'left', scale: 0.8, rotate: -10, tone: 'light', mobileHidden: false },
  { top: "60%", variant: 'compact', side: 'right', scale: 0.5, rotate: 15, tone: 'light', mobileHidden: true },
  
  // 6. Services Preview
  { top: "67%", variant: 'elongated', side: 'right', scale: 1.1, rotate: 5, tone: 'light', mobileHidden: false },
  { top: "74%", variant: 'compact-mirrored', side: 'left', scale: 0.5, rotate: 15, tone: 'light', mobileHidden: true },

  // 7. Gallery
  { top: "81%", variant: 'mirrored', side: 'left', scale: 0.9, rotate: -5, tone: 'light', mobileHidden: false },
  { top: "88%", variant: 'compact', side: 'right', scale: 0.6, rotate: 20, tone: 'light', mobileHidden: true },

  // 8. Contact / Footer
  { top: "95%", variant: 'original', side: 'right', scale: 1.0, rotate: -8, tone: 'light', mobileHidden: false },
  { top: "99%", variant: 'compact-mirrored', side: 'left', scale: 0.5, rotate: -15, tone: 'light', mobileHidden: true },
];

export function FloralBackground() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-[50] overflow-hidden">
      {FLORAL_CONFIG.map((config, index) => {
        
        // Clases para ocultar en mobile si es necesario
        const displayClass = config.mobileHidden ? "hidden md:block" : "block";
        
        // Ajustamos la posición horizontal. Los SVG originales tienen width 400.
        const xOffset = "-30px";
        const sideStyle = config.side === 'left' 
          ? { left: xOffset, transformOrigin: 'top left' }
          : { right: xOffset, transformOrigin: 'top right' };

        return (
          <LazyFloral
            key={index}
            variant={config.variant}
            tone={config.tone}
            className={`${displayClass}`}
            style={{
              top: config.top,
              ...sideStyle,
              transform: `scale(var(--floral-scale, ${config.scale})) rotate(${config.rotate}deg)`
            }}
          />
        );
      })}

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .absolute > div {
            --floral-scale: 0.5;
          }
        }
      `}} />
    </div>
  );
}
