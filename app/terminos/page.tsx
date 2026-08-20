export const metadata = {
  title: 'Términos y Condiciones | Floristería Violeta',
  description: 'Términos y condiciones de uso de Floristería Violeta. Conoce las reglas y lineamientos para realizar pedidos.',
}

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-[var(--theme-bg)] pt-28 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-playfair text-4xl md:text-5xl text-[var(--theme-primary)] italic mb-2 tracking-wide">
          Términos y Condiciones
        </h1>
        <p className="font-inter text-xs uppercase tracking-widest text-[var(--theme-text-muted)] mb-8 border-b border-[var(--theme-border)]/40 pb-4">
          Última actualización: Agosto 2026
        </p>

        <div className="font-inter text-sm md:text-base text-[var(--theme-text-muted)] space-y-6 leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-playfair text-xl md:text-2xl text-[var(--theme-text)] font-semibold italic">
              1. Aceptación de los Términos
            </h2>
            <p>
              Al acceder y utilizar este sitio web, usted acepta cumplir y estar sujeto a los siguientes términos y condiciones de uso. Si no está de acuerdo con alguna parte de estos términos, le sugerimos no utilizar nuestro sitio.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-playfair text-xl md:text-2xl text-[var(--theme-text)] font-semibold italic">
              2. Pedidos y Envíos
            </h2>
            <p>
              Todos los pedidos están sujetos a la disponibilidad de flores de temporada y a la confirmación del pago. Nos esforzamos por realizar las entregas en Cali el mismo día del pedido, siempre y cuando se completen antes de la hora límite indicada en la tienda.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-playfair text-xl md:text-2xl text-[var(--theme-text)] font-semibold italic">
              3. Propiedad Intelectual
            </h2>
            <p>
              Todo el contenido gráfico, fotográfico, de diseño y desarrollo en este sitio web es propiedad exclusiva de Floristería Violeta o se utiliza bajo autorización de terceros. Queda prohibida la reproducción parcial o total del material gráfico sin previo consentimiento escrito.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-playfair text-xl md:text-2xl text-[var(--theme-text)] font-semibold italic">
              4. Modificaciones del Servicio
            </h2>
            <p>
              Nos reservamos el derecho de modificar o discontinuar el servicio (o cualquier parte del contenido) en cualquier momento sin previo aviso. Los precios de nuestros productos también están sujetos a cambios.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
