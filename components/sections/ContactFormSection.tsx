'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, MessageCircle, AlertCircle } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { generarLinkWhatsApp } from '@/lib/whatsapp'

export function ContactFormSection() {
  const [name, setName] = useState('')
  const [urgency, setUrgency] = useState('Lo antes posible (Hoy)')
  const [message, setMessage] = useState('')

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault()
    const text = `¡Hola Violeta! 🌸\n\nSoy *${name}*.\n*Urgencia:* ${urgency}\n\n*Detalle de lo que busco:*\n${message}\n\n¡Quedo atento/a para gestionar el pedido!`
    window.open(generarLinkWhatsApp(text), '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="w-full py-24 relative bg-[var(--theme-bg)]">
      <div className="container mx-auto">
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
            <p className="font-inter text-[var(--theme-text-muted)] mb-8 lg:mb-12 text-lg">
              Sabemos que las emociones no dan espera. Contáctanos directamente por nuestros canales rápidos.
            </p>

            {/* Móvil: accesos rápidos en cuadrícula */}
            <div className="lg:hidden grid grid-cols-2 gap-3 font-inter">
              {[
                { href: siteConfig.phoneHref, icon: Phone, title: 'Llamar', text: siteConfig.phoneDisplay, external: false },
                { href: generarLinkWhatsApp(), icon: MessageCircle, title: 'WhatsApp', text: 'Respuesta inmediata', external: true },
                { href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${siteConfig.address.street}, ${siteConfig.address.city}`)}`, icon: MapPin, title: 'Cómo llegar', text: 'Centro de Cali', external: true },
                { href: `mailto:${siteConfig.email}`, icon: Mail, title: 'Correo', text: 'Consultas no urgentes', external: false },
              ].map(({ href, icon: Icon, title, text, external }, i) => (
                <a
                  key={title}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={`relative overflow-hidden flex flex-col gap-3 p-4 rounded-[1.5rem] border transition-transform active:scale-[0.97] ${i === 0 ? 'bg-plum-gradient border-transparent text-white' : 'bg-[var(--theme-bg-card)] border-[var(--theme-border)] text-[var(--theme-text)]'}`}
                >
                  <span className={`w-10 h-10 rounded-full flex items-center justify-center ${i === 0 ? 'bg-white/20' : 'bg-[var(--theme-blush)] text-[var(--theme-primary)]'}`}>
                    <Icon className="w-5 h-5" />
                  </span>
                  <span>
                    <span className="block font-semibold">{title}</span>
                    <span className={`block text-xs leading-snug ${i === 0 ? 'text-white/80' : 'text-[var(--theme-text-muted)]'}`}>{text}</span>
                  </span>
                </a>
              ))}
              <p className="col-span-2 flex items-center gap-2 px-1 pt-1 text-sm text-[var(--theme-text-muted)]">
                <Clock className="w-4 h-4 text-[var(--theme-primary)] shrink-0" />
                {siteConfig.hours.map(h => `${h.days}: ${h.time}`).join(' · ')}
              </p>
            </div>

            {/* Escritorio: lista completa */}
            <div className="hidden lg:block space-y-8 font-inter text-[var(--theme-text)]">
              {/* Botón Llamada Directa (Especial para emergencias móviles) */}
              <a 
                href={siteConfig.phoneHref}
                className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--theme-text)] text-[var(--theme-bg)] hover:bg-[var(--theme-primary)] transition-colors group shadow-lg"
              >
                <div className="p-3 rounded-full bg-[var(--theme-bg)]/20 text-[var(--theme-bg)] group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Llamar Ahora</h4>
                  <p className="text-[var(--theme-bg)]/80 text-sm">{siteConfig.phoneDisplay}</p>
                </div>
              </a>

              <div className="flex items-start gap-4 pt-4">
                <div className="p-3 rounded-full bg-[var(--theme-primary)]/10 text-[var(--theme-primary)]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Nuestra Boutique</h4>
                  <p className="text-[var(--theme-text-muted)]">{siteConfig.address.street}<br/>{siteConfig.address.city}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-[var(--theme-primary)]/10 text-[var(--theme-primary)]">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Horario de Atención</h4>
                  <p className="text-[var(--theme-text-muted)]">
                    {siteConfig.hours.map((h) => (
                      <span key={h.days} className="block">{h.days}: {h.time}</span>
                    ))}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-[var(--theme-primary)]/10 text-[var(--theme-primary)]">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Consultas no urgentes</h4>
                  <a href={`mailto:${siteConfig.email}`} className="text-[var(--theme-text-muted)] hover:text-[var(--theme-primary)] transition-colors">{siteConfig.email}</a>
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
