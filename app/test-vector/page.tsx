import React from 'react';

export default function TestVectorPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-20">
      <div className="border border-gray-200 shadow-xl bg-white p-8">
        <svg
          width="400"
          height="600"
          viewBox="0 0 400 600"
          xmlns="http://www.w3.org/2000/svg"
          className="text-black"
        >
          <g stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            
            {/* 1. TALLO PRINCIPAL (Dividido para grosor decreciente exagerado 2.5 -> 1.5 -> 0.6) */}
            <path
              d="M 200,580 C 140,510 180,410 230,330"
              strokeWidth={2.5}
            />
            <path
              d="M 230,330 C 270,266 280,180 220,120"
              strokeWidth={1.5}
            />
            <path
              d="M 220,120 C 180,80 150,50 140,20"
              strokeWidth={0.6}
            />

            {/* 4. RAMIFICACIONES SECUNDARIAS (Nacen exactamente del tallo) */}
            <path
              d="M 165,440 C 100,410 50,330 70,250"
              strokeWidth={1.4}
            />
            <path
              d="M 250,225 C 300,195 340,150 330,80"
              strokeWidth={1.0}
            />
            <path
              d="M 180,70 C 140,55 100,45 90,30"
              strokeWidth={0.6}
            />

            {/* 3. HOJAS (Paths absolutos, formas únicas, nacen directo del tallo) */}
            {/* Hoja 1 (Tallo inferior) */}
            <path d="M 175,470 C 145,470 125,455 125,435 C 140,425 160,440 175,470 Z" strokeWidth={1.2} />
            {/* Hoja 2 (Rama 1) */}
            <path d="M 120,380 C 100,380 80,360 85,340 C 90,320 110,350 120,380 Z" strokeWidth={1.2} />
            {/* Hoja 3 (Tallo medio) */}
            <path d="M 260,280 C 275,295 305,280 310,260 C 315,240 285,255 260,280 Z" strokeWidth={1.0} />
            {/* Hoja 4 (Rama 2) */}
            <path d="M 290,175 C 300,160 330,175 340,190 C 350,205 320,195 290,175 Z" strokeWidth={0.8} />
            {/* Hoja 5 (Tallo superior) */}
            <path d="M 170,60 C 150,70 130,55 135,35 C 140,15 160,45 170,60 Z" strokeWidth={0.6} />

            {/* 2. FLORES (Radiales, Asimétricas con pétalos variados y centros notorios) */}
            
            {/* Flor Protagonista (Inferior) */}
            <g transform="translate(195, 490)">
              {/* Pétalos con formas únicas y 2 notablemente más grandes */}
              <path d="M 0,0 C -15,-20 -10,-40 0,-52 C 10,-45 18,-20 0,0 Z" strokeWidth={1.2} transform="rotate(0)" />
              <path d="M 0,0 C -22,-25 -20,-50 0,-62 C 15,-55 20,-25 0,0 Z" strokeWidth={1.2} transform="rotate(65)" /> {/* GRANDE */}
              <path d="M 0,0 C -12,-18 -15,-38 0,-48 C 15,-35 12,-18 0,0 Z" strokeWidth={1.2} transform="rotate(130)" />
              <path d="M 0,0 C -25,-30 -18,-55 0,-70 C 18,-50 25,-25 0,0 Z" strokeWidth={1.2} transform="rotate(210)" /> {/* MUY GRANDE */}
              <path d="M 0,0 C -15,-22 -15,-42 0,-50 C 12,-40 12,-20 0,0 Z" strokeWidth={1.2} transform="rotate(290)" />
              {/* Centro de la flor (círculos sólidos notorios) */}
              <circle cx="-3" cy="-3" r="1.5" fill="black" stroke="none" />
              <circle cx="3" cy="-2" r="1.8" fill="black" stroke="none" />
              <circle cx="0" cy="4" r="1.2" fill="black" stroke="none" />
              <circle cx="-4" cy="2" r="1" fill="black" stroke="none" />
              <circle cx="4" cy="3" r="1.1" fill="black" stroke="none" />
            </g>

            {/* Flor Mediana (Rama Izquierda) */}
            <g transform="translate(70, 250) scale(0.7)">
              <path d="M 0,0 C -15,-20 -10,-40 0,-52 C 10,-45 18,-20 0,0 Z" strokeWidth={1.4} transform="rotate(20)" />
              <path d="M 0,0 C -22,-25 -20,-50 0,-62 C 15,-55 20,-25 0,0 Z" strokeWidth={1.4} transform="rotate(85)" /> {/* GRANDE */}
              <path d="M 0,0 C -12,-18 -15,-38 0,-48 C 15,-35 12,-18 0,0 Z" strokeWidth={1.4} transform="rotate(155)" />
              <path d="M 0,0 C -25,-30 -18,-55 0,-70 C 18,-50 25,-25 0,0 Z" strokeWidth={1.4} transform="rotate(230)" /> {/* MUY GRANDE */}
              <path d="M 0,0 C -15,-22 -15,-42 0,-50 C 12,-40 12,-20 0,0 Z" strokeWidth={1.4} transform="rotate(310)" />
              {/* Centro de la flor */}
              <circle cx="-2" cy="-2" r="2.5" fill="black" stroke="none" />
              <circle cx="3" cy="-1" r="2.2" fill="black" stroke="none" />
              <circle cx="0" cy="3" r="2.8" fill="black" stroke="none" />
              <circle cx="-3" cy="2" r="1.5" fill="black" stroke="none" />
            </g>

            {/* Flor Pequeña (Rama Derecha) */}
            <g transform="translate(330, 80) scale(0.5)">
              <path d="M 0,0 C -15,-20 -10,-40 0,-52 C 10,-45 18,-20 0,0 Z" strokeWidth={1.6} transform="rotate(0)" />
              <path d="M 0,0 C -22,-25 -20,-50 0,-62 C 15,-55 20,-25 0,0 Z" strokeWidth={1.6} transform="rotate(72)" /> {/* GRANDE */}
              <path d="M 0,0 C -12,-18 -15,-38 0,-48 C 15,-35 12,-18 0,0 Z" strokeWidth={1.6} transform="rotate(140)" />
              <path d="M 0,0 C -25,-30 -18,-55 0,-70 C 18,-50 25,-25 0,0 Z" strokeWidth={1.6} transform="rotate(215)" /> {/* MUY GRANDE */}
              <path d="M 0,0 C -15,-22 -15,-42 0,-50 C 12,-40 12,-20 0,0 Z" strokeWidth={1.6} transform="rotate(285)" />
              {/* Centro sólido único y evidente */}
              <circle cx="0" cy="0" r="5" fill="black" stroke="none" />
            </g>

            {/* Capullos en extremos superiores (Flores cerradas) */}
            <g transform="translate(140, 20) rotate(-20) scale(0.4)">
              <path d="M 0,0 C -8,-15 -10,-30 0,-40 C 10,-30 8,-15 0,0 Z" strokeWidth={1.8} />
              <path d="M -2,-5 C -15,-15 -15,-25 -8,-32 C -5,-25 0,-15 -2,-5 Z" strokeWidth={1.8} />
              <path d="M 2,-5 C 15,-15 15,-25 8,-32 C 5,-25 0,-15 2,-5 Z" strokeWidth={1.8} />
            </g>
            <g transform="translate(90, 30) rotate(-45) scale(0.3)">
              <path d="M 0,0 C -8,-15 -10,-30 0,-40 C 10,-30 8,-15 0,0 Z" strokeWidth={2} />
              <path d="M -2,-5 C -15,-15 -15,-25 -8,-32 C -5,-25 0,-15 -2,-5 Z" strokeWidth={2} />
              <path d="M 2,-5 C 15,-15 15,-25 8,-32 C 5,-25 0,-15 2,-5 Z" strokeWidth={2} />
            </g>

          </g>
        </svg>
      </div>
      <div className="absolute top-10 text-center">
        <h1 className="text-2xl font-playfair mb-2">Diseño Botánico Base</h1>
        <p className="text-gray-500 font-inter text-sm max-w-lg">
          Evalúa la curva del tallo, la asimetría de los pétalos, la distribución de peso visual y los principios orgánicos.
        </p>
      </div>
    </div>
  );
}
