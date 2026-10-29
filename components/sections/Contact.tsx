'use client'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import { generarLinkWhatsApp } from '@/lib/whatsapp'
import { siteConfig } from '@/lib/site-config'

export function Contact() {
  // El mensaje se envía por WhatsApp (canal principal de pedidos de la tienda)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const nombre = String(data.get('nombre') ?? '').trim()
    const mensaje = String(data.get('mensaje') ?? '').trim()
    const texto = `¡Hola Violeta! 🌸\n\nSoy ${nombre}.\n\n${mensaje}`
    window.open(generarLinkWhatsApp(texto), '_blank', 'noopener,noreferrer')
  }

  const whatsappUrl = generarLinkWhatsApp('¡Hola! Me gustaría contactarme con ustedes.')

  return (
    <section className="w-full py-24 bg-[var(--theme-bg-section)]" id="contacto">
      <div className="container mx-auto">

        <div className="text-center mb-16">
          <span className="font-inter text-sm uppercase tracking-widest text-[var(--theme-primary)] mb-2 block">
            Contacto
          </span>
          <h2 className="font-playfair text-4xl text-[var(--theme-text)]">
            Hablemos
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">

          {/* Columna Izquierda: Formulario */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="bg-[var(--theme-bg)]/60 dark:bg-black/40 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-xl border border-[var(--theme-border)]/30 dark:border-white/10">
              <h3 className="font-playfair text-2xl text-[var(--theme-text)] mb-6">Envíanos un mensaje</h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                <div className="flex flex-col gap-2">
                  <label htmlFor="nombre" className="font-inter text-sm text-[var(--theme-text-muted)]">Nombre completo</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    className="w-full bg-transparent border-b border-[var(--theme-border)] py-2 text-[var(--theme-text)] focus:outline-none focus:border-[var(--theme-primary)] transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="mensaje" className="font-inter text-sm text-[var(--theme-text-muted)]">Mensaje</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    required
                    rows={4}
                    className="w-full bg-transparent border-b border-[var(--theme-border)] py-2 text-[var(--theme-text)] focus:outline-none focus:border-[var(--theme-primary)] transition-colors resize-none"
                    placeholder="¿En qué te podemos ayudar?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="mt-4 flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[var(--theme-primary)] text-[var(--theme-bg)] font-inter font-medium hover:bg-opacity-90 transition-all"
                >
                  <span>Enviar por WhatsApp</span>
                  <Send className="w-4 h-4" />
                </button>
                <p className="font-inter text-xs text-center text-[var(--theme-text-muted)] -mt-2">
                  Se abrirá WhatsApp con tu mensaje listo para enviar.
                </p>
              </form>
            </div>
          </motion.div>

          {/* Columna Derecha: Información y Mapa */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 flex flex-col gap-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Dirección */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[var(--theme-primary)]/10 rounded-full text-[var(--theme-primary)]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-playfair text-lg text-[var(--theme-text)] mb-1">Visítanos</h4>
                  <p className="font-inter text-[var(--theme-text-muted)] text-sm leading-relaxed">
                    {siteConfig.address.street}<br />
                    {siteConfig.address.city}
                  </p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[var(--theme-primary)]/10 rounded-full text-[var(--theme-primary)]">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-playfair text-lg text-[var(--theme-text)] mb-1">Llámanos / WhatsApp</h4>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-inter text-[var(--theme-text-muted)] text-sm hover:text-[var(--theme-primary)] transition-colors">
                    {siteConfig.phoneDisplay}
                  </a>
                </div>
              </div>

              {/* Correo */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[var(--theme-primary)]/10 rounded-full text-[var(--theme-primary)]">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-playfair text-lg text-[var(--theme-text)] mb-1">Escríbenos</h4>
                  <a href={`mailto:${siteConfig.email}`} className="font-inter text-[var(--theme-text-muted)] text-sm hover:text-[var(--theme-primary)] transition-colors">
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              {/* Horario */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[var(--theme-primary)]/10 rounded-full text-[var(--theme-primary)]">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-playfair text-lg text-[var(--theme-text)] mb-1">Horario</h4>
                  <p className="font-inter text-[var(--theme-text-muted)] text-sm leading-relaxed">
                    {siteConfig.hours.map((h) => (
                      <span key={h.days} className="block">{h.days}: {h.time}</span>
                    ))}
                  </p>
                </div>
              </div>
            </div>

            {/* Mapa de Cali Centro embebido */}
            <div className="w-full h-64 rounded-3xl overflow-hidden bg-gray-200 shadow-inner">
              <iframe
                src={siteConfig.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Floristería Violeta en Centro de Cali"
              ></iframe>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
