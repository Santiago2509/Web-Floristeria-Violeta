'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { FLORAL_THEME } from './floralTheme';

export interface BaseFloralProps {
  paths: {
    stem: string[];
    branches: string[];
    leaves: { path: string; strokeWidth: number; transform?: string }[];
    flowers: { 
      petals: { path: string; transform?: string; strokeWidth: number }[];
      centers: { cx: number; cy: number; r: number }[];
      transform?: string;
    }[];
    buds: {
      petals: { path: string; transform?: string; strokeWidth: number }[];
      transform?: string;
    }[];
  };
  width?: number;
  height?: number;
  className?: string;
  isMirrored?: boolean;
  tone?: "light" | "dark";
}

export function BaseFloral({ paths, width = 400, height = 600, className = "", isMirrored = false, tone = "light" }: BaseFloralProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Comienza apenas asoma (95% desde arriba) y termina de dibujarse cuando 
    // la parte superior llega al centro de la pantalla (50%), 
    // para que no haya que scrollear tanto hacia abajo.
    offset: ["start 95%", "start 50%"] 
  });

  // Staggered animations relative to this specific container's scroll progress
  const stemProgress = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const branchesProgress = useTransform(scrollYProgress, [0.2, 0.55], [0, 1]);
  const leavesProgress = useTransform(scrollYProgress, [0.4, 0.75], [0, 1]);
  const flowersProgress = useTransform(scrollYProgress, [0.6, 1], [0, 1]);
  const centersOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);

  const theme = FLORAL_THEME[tone];

  return (
    <div ref={containerRef} className={`pointer-events-none ${className}`} style={{ willChange: 'transform' }}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: isMirrored ? 'scaleX(-1)' : 'none',
          opacity: theme.opacity
        }}
      >
        <g stroke={theme.stroke} fill="none" strokeLinecap="round" strokeLinejoin="round">
          
          {/* STEMS */}
          {paths.stem.map((d, i) => {
            // Decreasing stroke width logic for the main stem
            const sw = i === 0 ? 5.5 : i === 1 ? 4.0 : 2.5;
            return (
              <motion.path 
                key={`stem-${i}`} 
                d={d} 
                strokeWidth={sw}
                style={{ pathLength: stemProgress }}
              />
            );
          })}

          {/* BRANCHES */}
          {paths.branches.map((d, i) => {
            const sw = i === 0 ? 3.5 : i === 1 ? 2.5 : 2.0;
            return (
              <motion.path 
                key={`branch-${i}`} 
                d={d} 
                strokeWidth={sw}
                style={{ pathLength: branchesProgress }}
              />
            );
          })}

          {/* LEAVES */}
          {paths.leaves.map((leaf, i) => (
            <motion.path 
              key={`leaf-${i}`} 
              d={leaf.path} 
              strokeWidth={leaf.strokeWidth * 3.5}
              transform={leaf.transform}
              style={{ pathLength: leavesProgress }}
            />
          ))}

          {/* FLOWERS */}
          {paths.flowers.map((flower, i) => (
            <g key={`flower-${i}`} transform={flower.transform}>
              {flower.petals.map((petal, j) => (
                <motion.path
                  key={`petal-${j}`}
                  d={petal.path}
                  strokeWidth={petal.strokeWidth}
                  transform={petal.transform}
                  style={{ pathLength: flowersProgress }}
                />
              ))}
              <motion.g style={{ opacity: centersOpacity }}>
                {flower.centers.map((center, k) => (
                  <circle
                    key={`center-${k}`}
                    cx={center.cx}
                    cy={center.cy}
                    r={center.r}
                    fill={theme.stroke}
                    stroke="none"
                  />
                ))}
              </motion.g>
            </g>
          ))}

          {/* BUDS (Closed flowers) */}
          {paths.buds.map((bud, i) => (
            <g key={`bud-${i}`} transform={bud.transform}>
              {bud.petals.map((petal, j) => (
                <motion.path
                  key={`bud-petal-${j}`}
                  d={petal.path}
                  strokeWidth={petal.strokeWidth}
                  transform={petal.transform}
                  style={{ pathLength: flowersProgress }}
                />
              ))}
            </g>
          ))}
          
        </g>
      </svg>
    </div>
  );
}
