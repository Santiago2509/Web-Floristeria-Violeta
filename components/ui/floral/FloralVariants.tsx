import { BaseFloral } from './BaseFloral';

const originalPaths = {
  stem: [
    "M 200,580 C 140,510 180,410 230,330",
    "M 230,330 C 270,266 280,180 220,120",
    "M 220,120 C 180,80 150,50 140,20"
  ],
  branches: [
    "M 165,440 C 100,410 50,330 70,250",
    "M 250,225 C 300,195 340,150 330,80",
    "M 180,70 C 140,55 100,45 90,30"
  ],
  leaves: [
    { path: "M 175,470 C 145,470 125,455 125,435 C 140,425 160,440 175,470 Z", strokeWidth: 1.2 },
    { path: "M 120,380 C 100,380 80,360 85,340 C 90,320 110,350 120,380 Z", strokeWidth: 1.2 },
    { path: "M 260,280 C 275,295 305,280 310,260 C 315,240 285,255 260,280 Z", strokeWidth: 1.0 },
    { path: "M 290,175 C 300,160 330,175 340,190 C 350,205 320,195 290,175 Z", strokeWidth: 0.8 },
    { path: "M 170,60 C 150,70 130,55 135,35 C 140,15 160,45 170,60 Z", strokeWidth: 0.6 }
  ],
  flowers: [
    { // Protagonista
      transform: "translate(195, 490)",
      petals: [
        { path: "M 0,0 C -15,-20 -10,-40 0,-52 C 10,-45 18,-20 0,0 Z", transform: "rotate(0)", strokeWidth: 1.2 },
        { path: "M 0,0 C -22,-25 -20,-50 0,-62 C 15,-55 20,-25 0,0 Z", transform: "rotate(65)", strokeWidth: 1.2 },
        { path: "M 0,0 C -12,-18 -15,-38 0,-48 C 15,-35 12,-18 0,0 Z", transform: "rotate(130)", strokeWidth: 1.2 },
        { path: "M 0,0 C -25,-30 -18,-55 0,-70 C 18,-50 25,-25 0,0 Z", transform: "rotate(210)", strokeWidth: 1.2 },
        { path: "M 0,0 C -15,-22 -15,-42 0,-50 C 12,-40 12,-20 0,0 Z", transform: "rotate(290)", strokeWidth: 1.2 }
      ],
      centers: [
        { cx: -3, cy: -3, r: 1.5 },
        { cx: 3, cy: -2, r: 1.8 },
        { cx: 0, cy: 4, r: 1.2 },
        { cx: -4, cy: 2, r: 1 },
        { cx: 4, cy: 3, r: 1.1 }
      ]
    },
    { // Mediana
      transform: "translate(70, 250) scale(0.7)",
      petals: [
        { path: "M 0,0 C -15,-20 -10,-40 0,-52 C 10,-45 18,-20 0,0 Z", transform: "rotate(20)", strokeWidth: 1.4 },
        { path: "M 0,0 C -22,-25 -20,-50 0,-62 C 15,-55 20,-25 0,0 Z", transform: "rotate(85)", strokeWidth: 1.4 },
        { path: "M 0,0 C -12,-18 -15,-38 0,-48 C 15,-35 12,-18 0,0 Z", transform: "rotate(155)", strokeWidth: 1.4 },
        { path: "M 0,0 C -25,-30 -18,-55 0,-70 C 18,-50 25,-25 0,0 Z", transform: "rotate(230)", strokeWidth: 1.4 },
        { path: "M 0,0 C -15,-22 -15,-42 0,-50 C 12,-40 12,-20 0,0 Z", transform: "rotate(310)", strokeWidth: 1.4 }
      ],
      centers: [
        { cx: -2, cy: -2, r: 2.5 },
        { cx: 3, cy: -1, r: 2.2 },
        { cx: 0, cy: 3, r: 2.8 },
        { cx: -3, cy: 2, r: 1.5 }
      ]
    },
    { // Pequeña
      transform: "translate(330, 80) scale(0.5)",
      petals: [
        { path: "M 0,0 C -15,-20 -10,-40 0,-52 C 10,-45 18,-20 0,0 Z", transform: "rotate(0)", strokeWidth: 1.6 },
        { path: "M 0,0 C -22,-25 -20,-50 0,-62 C 15,-55 20,-25 0,0 Z", transform: "rotate(72)", strokeWidth: 1.6 },
        { path: "M 0,0 C -12,-18 -15,-38 0,-48 C 15,-35 12,-18 0,0 Z", transform: "rotate(140)", strokeWidth: 1.6 },
        { path: "M 0,0 C -25,-30 -18,-55 0,-70 C 18,-50 25,-25 0,0 Z", transform: "rotate(215)", strokeWidth: 1.6 },
        { path: "M 0,0 C -15,-22 -15,-42 0,-50 C 12,-40 12,-20 0,0 Z", transform: "rotate(285)", strokeWidth: 1.6 }
      ],
      centers: [
        { cx: 0, cy: 0, r: 5 }
      ]
    }
  ],
  buds: [
    {
      transform: "translate(140, 20) rotate(-20) scale(0.4)",
      petals: [
        { path: "M 0,0 C -8,-15 -10,-30 0,-40 C 10,-30 8,-15 0,0 Z", strokeWidth: 1.8 },
        { path: "M -2,-5 C -15,-15 -15,-25 -8,-32 C -5,-25 0,-15 -2,-5 Z", strokeWidth: 1.8 },
        { path: "M 2,-5 C 15,-15 15,-25 8,-32 C 5,-25 0,-15 2,-5 Z", strokeWidth: 1.8 }
      ]
    },
    {
      transform: "translate(90, 30) rotate(-45) scale(0.3)",
      petals: [
        { path: "M 0,0 C -8,-15 -10,-30 0,-40 C 10,-30 8,-15 0,0 Z", strokeWidth: 2 },
        { path: "M -2,-5 C -15,-15 -15,-25 -8,-32 C -5,-25 0,-15 -2,-5 Z", strokeWidth: 2 },
        { path: "M 2,-5 C 15,-15 15,-25 8,-32 C 5,-25 0,-15 2,-5 Z", strokeWidth: 2 }
      ]
    }
  ]
};

export function FloralOriginal({ className = "", tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return <BaseFloral paths={originalPaths} className={className} tone={tone} />;
}

export function FloralMirrored({ className = "", tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return <BaseFloral paths={originalPaths} className={className} isMirrored={true} tone={tone} />;
}

const compactPaths = {
  stem: [
    "M 200,380 C 140,310 180,210 230,130",
    "M 230,130 C 260,80 200,50 160,20"
  ],
  branches: [
    "M 165,240 C 100,210 50,130 70,50",
    "M 180,70 C 140,55 100,45 90,30"
  ],
  leaves: [
    { path: "M 175,270 C 145,270 125,255 125,235 C 140,225 160,240 175,270 Z", strokeWidth: 1.2 },
    { path: "M 120,180 C 100,180 80,160 85,140 C 90,120 110,150 120,180 Z", strokeWidth: 1.2 },
    { path: "M 170,60 C 150,70 130,55 135,35 C 140,15 160,45 170,60 Z", strokeWidth: 0.6 }
  ],
  flowers: [
    { 
      transform: "translate(195, 290)",
      petals: originalPaths.flowers[0].petals,
      centers: originalPaths.flowers[0].centers
    },
    { 
      transform: "translate(70, 50) scale(0.7)",
      petals: originalPaths.flowers[1].petals,
      centers: originalPaths.flowers[1].centers
    }
  ],
  buds: originalPaths.buds
};

const elongatedPaths = {
  stem: [
    "M 200,780 C 140,710 180,610 230,530",
    "M 230,530 C 270,466 280,380 220,320",
    "M 220,320 C 180,250 150,150 200,80",
    "M 200,80 C 230,40 180,20 160,10"
  ],
  branches: [
    "M 165,640 C 100,610 50,530 70,450",
    "M 250,425 C 300,395 340,350 330,280",
    "M 180,270 C 140,255 100,245 90,230",
    "M 185,120 C 240,110 280,80 260,30"
  ],
  leaves: [
    { path: "M 175,670 C 145,670 125,655 125,635 C 140,625 160,640 175,670 Z", strokeWidth: 1.2 },
    { path: "M 120,580 C 100,580 80,560 85,540 C 90,520 110,550 120,580 Z", strokeWidth: 1.2 },
    { path: "M 260,480 C 275,495 305,480 310,460 C 315,440 285,455 260,480 Z", strokeWidth: 1.0 },
    { path: "M 290,375 C 300,360 330,375 340,390 C 350,405 320,395 290,375 Z", strokeWidth: 0.8 },
    { path: "M 170,260 C 150,270 130,255 135,235 C 140,215 160,245 170,260 Z", strokeWidth: 0.6 },
    { path: "M 240,100 C 260,110 280,95 275,75 C 270,55 250,85 240,100 Z", strokeWidth: 0.6 }
  ],
  flowers: [
    { 
      transform: "translate(195, 690)",
      petals: originalPaths.flowers[0].petals,
      centers: originalPaths.flowers[0].centers
    },
    { 
      transform: "translate(70, 450) scale(0.9)",
      petals: originalPaths.flowers[1].petals,
      centers: originalPaths.flowers[1].centers
    },
    { 
      transform: "translate(330, 280) scale(0.7)",
      petals: originalPaths.flowers[0].petals,
      centers: originalPaths.flowers[0].centers
    },
    { 
      transform: "translate(90, 230) scale(0.6)",
      petals: originalPaths.flowers[1].petals,
      centers: originalPaths.flowers[1].centers
    },
    { 
      transform: "translate(260, 30) scale(0.5)",
      petals: originalPaths.flowers[2].petals,
      centers: originalPaths.flowers[2].centers
    }
  ],
  buds: [
    {
      transform: "translate(160, 10) rotate(-20) scale(0.4)",
      petals: originalPaths.buds[0].petals
    }
  ]
};

export function FloralCompact({ className = "", tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return <BaseFloral paths={compactPaths} height={400} className={className} tone={tone} />;
}

export function FloralCompactMirrored({ className = "", tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return <BaseFloral paths={compactPaths} height={400} className={className} isMirrored={true} tone={tone} />;
}

export function FloralElongated({ className = "", tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return <BaseFloral paths={elongatedPaths} height={800} className={className} tone={tone} />;
}
