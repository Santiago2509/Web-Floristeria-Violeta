// Pétalos que caen girando y se desvanecen (CSS puro; con "reducir movimiento" no se animan).
// Posiciones fijas para que el servidor y el navegador coincidan.
const PETALS = Array.from({ length: 16 }, (_, i) => ({
  left: (i * 41 + 7) % 100,
  size: 10 + ((i * 7) % 12),
  delay: (i * 0.85) % 11,
  duration: 7 + ((i * 3) % 6),
  drift: ((i % 2 ? 1 : -1) * (20 + ((i * 13) % 50))),
  color: ['#C4B5FD', '#F0ABFC', '#DDD6FE', '#E9D5FF', '#A78BFA'][i % 5],
}))

export function FallingPetals({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="falling-petal absolute -top-8"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.25,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            ['--drift' as string]: `${p.drift}px`,
          }}
        >
          <svg viewBox="0 0 24 30" className="w-full h-full">
            <path d="M12 0C12 0 24 10 24 20C24 26 18 30 12 30C6 30 0 26 0 20C0 10 12 0 12 0Z" fill={p.color} />
            <path d="M12 4 C11 12 11 20 12 28" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1" fill="none" />
          </svg>
        </span>
      ))}
    </div>
  )
}
