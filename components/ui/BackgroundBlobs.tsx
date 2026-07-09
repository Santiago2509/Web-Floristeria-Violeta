export function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">

      {/* Mancha superior derecha */}
      <div
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-70 dark:opacity-40"
        style={{
          background: 'var(--theme-blob-1)',
          filter: 'blur(120px)',
        }}
      />

      {/* Mancha izquierda medio */}
      <div
        className="absolute top-1/3 -left-40 w-[450px] h-[450px] rounded-full opacity-60 dark:opacity-30"
        style={{
          background: 'var(--theme-blob-2)',
          filter: 'blur(100px)',
        }}
      />

      {/* Mancha inferior derecha */}
      <div
        className="absolute -bottom-20 right-1/4 w-[400px] h-[400px] rounded-full opacity-50 dark:opacity-25"
        style={{
          background: 'var(--theme-blob-3)',
          filter: 'blur(90px)',
        }}
      />

      {/* Mancha central */}
      <div
        className="absolute top-2/3 left-1/2 w-[350px] h-[350px] rounded-full opacity-40 dark:opacity-20"
        style={{
          background: 'var(--theme-blob-4)',
          filter: 'blur(110px)',
        }}
      />

      {/* Textura sutil modo claro */}
      <div
        className="dark:hidden absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Ccircle cx='1' cy='1' r='1' fill='%239C27B0'/%3E%3C/svg%3E")`,
          backgroundSize: '4px 4px',
        }}
      />
    </div>
  )
}
