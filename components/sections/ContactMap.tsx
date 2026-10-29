'use client'
import { motion } from 'framer-motion'
import { siteConfig } from '@/lib/site-config'

export function ContactMap() {
  return (
    <section className="w-full h-[400px] md:h-[500px] relative bg-[var(--theme-bg)]">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full h-full"
      >
        <iframe
          src={siteConfig.mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(0.4) contrast(1.2)' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación de Floristería Violeta - Centro de Cali"
        />
      </motion.div>
    </section>
  )
}
