export const metadata = {
  title: 'Política de Privacidad | Floristería Violeta',
  description: 'Política de privacidad de Floristería Violeta. Conoce cómo gestionamos y protegemos tus datos personales.',
}

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-[var(--theme-bg)] pt-28 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-playfair text-4xl md:text-5xl text-[var(--theme-primary)] italic mb-2 tracking-wide">
          Política de Privacidad
        </h1>
        <p className="font-inter text-xs uppercase tracking-widest text-[var(--theme-text-muted)] mb-8 border-b border-[var(--theme-border)]/40 pb-4">
          Última actualización: Agosto 2026
        </p>

        <div className="font-inter text-sm md:text-base text-[var(--theme-text-muted)] space-y-6 leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-playfair text-xl md:text-2xl text-[var(--theme-text)] font-semibold italic">
              1. Recopilación de Información
            </h2>
            <p>
              Recopilamos información personal que usted nos proporciona directamente al realizar un pedido, como nombre, número de teléfono, dirección de entrega y detalles de pago. Esta información es esencial para garantizar un servicio de entrega óptimo.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-playfair text-xl md:text-2xl text-[var(--theme-text)] font-semibold italic">
              2. Uso de los Datos
            </h2>
            <p>
              Sus datos se utilizarán para procesar sus pedidos de flores, coordinar las entregas en Cali y comunicarle actualizaciones sobre su envío. Ocasionalmente, con su consentimiento, podremos enviarle ofertas especiales o boletines.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-playfair text-xl md:text-2xl text-[var(--theme-text)] font-semibold italic">
              3. Protección y Confidencialidad
            </h2>
            <p>
              Implementamos medidas de seguridad técnicas e institucionales para proteger sus datos personales contra el acceso no autorizado, alteración o divulgación. No compartimos sus datos con terceros, excepto con los procesadores de pago autorizados estrictamente para completar la compra.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-playfair text-xl md:text-2xl text-[var(--theme-text)] font-semibold italic">
              4. Sus Derechos
            </h2>
            <p>
              Usted tiene derecho a acceder, rectificar, actualizar o solicitar la eliminación de sus datos personales de nuestras bases de datos en cualquier momento. Para ejercer estos derechos, puede ponerse en contacto con nosotros a través de nuestros canales de atención oficiales.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
