'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, MessageCircle, AlertCircle } from 'lucide-react'

export function ContactFormSection() {
  const [name, setName] = useState('')
  const [urgency, setUrgency] = useState('Lo antes posible (Hoy)')
  const [message, setMessage] = useState('')

  // Número de la floristería (formato internacional sin el +)
  const phoneNumber = '573001234567'

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Construimos el mensaje predeterminado
    const text = `¡Hola Violeta! 🌸%0A%0ASoy *${name}*.%0A*Urgencia:* ${urgency}%0A%0A*Detalle de lo que busco:*%0A${message}%0A%0A¡Quedo atento/a para gestionar el pedido!`
    
    // Redirigimos a WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <section className="w-full py-24 relative bg-[var(--theme-bg)]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Información de Contacto */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-5/12 flex flex-col"
          >
            <span className="font-inter text-sm uppercase tracking-widest text-[var(--theme-primary)] mb-4 font-semibold">
              Atención Personalizada
            </span>
            <h2 className="font-playfair text-4xl text-[var(--theme-text)] mb-8">
              Estamos para ti
            </h2>
            <p className="font-inter text-[var(--theme-text-muted)] mb-12 text-lg">
              Sabemos que las emociones no dan espera. Contáctanos directamente por nuestros canales rápidos.
            </p>

            <div className="space-y-8 font-inter text-[var(--theme-text)]">
              {/* Botón Llamada Directa (Especial para emergencias móviles) */}
              <a 
                href="tel:+573001234567"
                className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--theme-text)] text-[var(--theme-bg)] hover:bg-[var(--theme-primary)] transition-colors group shadow-lg"
              >
                <div className="p-3 rounded-full bg-[var(--theme-bg)]/20 text-[var(--theme-bg)] group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Llamar Ahora</h4>
                  <p className="text-[var(--theme-bg)]/80 text-sm">Respuesta inmediata</p>
                </div>
              </a>

              <div className="flex items-start gap-4 pt-4">
                <div className="p-3 rounded-full bg-[var(--theme-primary)]/10 text-[var(--theme-primary)]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Nuestra Boutique</h4>
                  <p className="text-[var(--theme-text-muted)]">Zona T, Calle 85 #12-34<br/>Bogotá, Colombia</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-[var(--theme-primary)]/10 text-[var(--theme-primary)]">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Horario de Atención</h4>
                  <p className="text-[var(--theme-text-muted)]">Lunes - Sábado: 8:00 AM - 7:00 PM<br/>Domingos: 9:00 AM - 2:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-[var(--theme-primary)]/10 text-[var(--theme-primary)]">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Consultas no urgentes</h4>
                  <p className="text-[var(--theme-text-muted)]">hola@floristeriavioleta.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Creador de mensaje rápido por WhatsApp */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full lg:w-7/12"
          >
            <div className="bg-[var(--theme-bg-card)] p-8 md:p-12 rounded-[2rem] border border-[var(--theme-primary)]/30 shadow-2xl relative overflow-hidden">
              {/* Adorno superior sutil */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#25D366]/5 rounded-bl-full pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-2">
                <MessageCircle className="w-8 h-8 text-[#25D366]" />
                <h3 className="font-playfair text-3xl text-[var(--theme-text)]">Chat Rápido</h3>
              </div>
              <p className="font-inter text-[var(--theme-text-muted)] mb-8 text-sm md:text-base">
                Llena estos 3 datos y te abriremos WhatsApp con el mensaje listo para que un asesor te responda de inmediato. Sin esperas.
              </p>
              
              <form onSubmit={handleWhatsAppSend} className="space-y-6 font-inter">
                
                <div className="space-y-2">
                  <label className="text-sm text-[var(--theme-text-muted)] font-medium">¿Cómo te llamas?</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)] focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] transition-colors text-[var(--theme-text)]"
                    placeholder="Ej. María Pérez"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-[var(--theme-text-muted)] font-medium">¿Para cuándo lo necesitas?</label>
                  <select 
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)] focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] transition-colors text-[var(--theme-text)]"
                  >
                    <option>Lo antes posible (Urgencia Hoy)</option>
                    <option>Para mañana</option>
                    <option>Para esta semana</option>
                    <option>Estoy planificando (Sin apuro)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-[var(--theme-text-muted)] font-medium">¿Qué estás buscando?</label>
                  <textarea 
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)] focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] transition-colors text-[var(--theme-text)] resize-none"
                    placeholder="Ej. Busco un ramo de rosas rojas para un aniversario..."
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#25D366] text-white font-semibold text-lg flex items-center justify-center gap-3 hover:bg-[#20b858] transition-transform hover:scale-[1.02] shadow-xl hover:shadow-[#25D366]/40"
                >
                  <MessageCircle className="w-6 h-6" />
                  <span>Enviar por WhatsApp</span>
                </button>
                
                <div className="flex items-center justify-center gap-2 text-xs text-[var(--theme-text-muted)] mt-4">
                  <AlertCircle className="w-4 h-4" />
                  <span>Al hacer clic, se abrirá tu aplicación de WhatsApp.</span>
                </div>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
