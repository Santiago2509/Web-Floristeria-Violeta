'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import { generarLinkWhatsApp } from '@/lib/whatsapp'

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulación de envío a Supabase
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
        // Reset form (simulado)
        ; (e.target as HTMLFormElement).reset()

      // Ocultar mensaje de éxito después de unos segundos
      setTimeout(() => setIsSuccess(false), 5000)
    }, 1500)
  }

  const whatsappUrl = generarLinkWhatsApp('¡Hola! Me gustaría contactarme con ustedes.')

  return (
    <section className="w-full py-24 bg-[var(--theme-bg-section)]" id="contacto">
      <div className="container mx-auto px-6 lg:px-12">

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
            <div className="bg-white/40 dark:bg-black/40 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-xl border border-white/60 dark:border-white/10">
              <h3 className="font-playfair text-2xl text-[var(--theme-text)] mb-6">Envíanos un mensaje</h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                <div className="flex flex-col gap-2">
                  <label htmlFor="nombre" className="font-inter text-sm text-[var(--theme-text-muted)]">Nombre completo</label>
                  <input
                    type="text"
                    id="nombre"
                    required
                    className="w-full bg-transparent border-b border-[var(--theme-border)] py-2 text-[var(--theme-text)] focus:outline-none focus:border-[var(--theme-primary)] transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="correo" className="font-inter text-sm text-[var(--theme-text-muted)]">Correo electrónico</label>
                  <input
                    type="email"
                    id="correo"
                    required
                    className="w-full bg-transparent border-b border-[var(--theme-border)] py-2 text-[var(--theme-text)] focus:outline-none focus:border-[var(--theme-primary)] transition-colors"
                    placeholder="tu@correo.com"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="mensaje" className="font-inter text-sm text-[var(--theme-text-muted)]">Mensaje</label>
                  <textarea
                    id="mensaje"
                    required
                    rows={4}
                    className="w-full bg-transparent border-b border-[var(--theme-border)] py-2 text-[var(--theme-text)] focus:outline-none focus:border-[var(--theme-primary)] transition-colors resize-none"
                    placeholder="¿En qué te podemos ayudar?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-4 flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[var(--theme-primary)] text-[var(--theme-bg)] font-inter font-medium hover:bg-opacity-90 transition-all disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Enviando...</span>
                  ) : (
                    <>
                      <span>Enviar Mensaje</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-600 text-sm text-center font-inter bg-green-50 p-3 rounded-lg"
                  >
                    ¡Mensaje enviado con éxito! Te contactaremos pronto.
                  </motion.div>
                )}
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
                    Calle de las Flores #123<br />
                    Ciudad, País
                  </p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[var(--theme-primary)]/10 rounded-full text-[var(--theme-primary)]">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-playfair text-lg text-[var(--theme-text)] mb-1">Llámanos</h4>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-inter text-[var(--theme-text-muted)] text-sm hover:text-[var(--theme-primary)] transition-colors">
                    +57 300 123 4567
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
                  <a href="mailto:hola@violeta.com" className="font-inter text-[var(--theme-text-muted)] text-sm hover:text-[var(--theme-primary)] transition-colors">
                    hola@violeta.com
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
                    Lunes a Sábado<br />
                    9:00 AM - 7:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Mapa (Placeholder embebido) */}
            <div className="w-full h-64 rounded-3xl overflow-hidden bg-gray-200 shadow-inner">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.9241103291244!2d-74.0628216!3d4.6432007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9a3f282470bb%3A0xc316a504ef5f6b3e!2sChapinero%2C%20Bogot%C3%A1!5e0!3m2!1ses-419!2sco!4v1700000000000!5m2!1ses-419!2sco"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
