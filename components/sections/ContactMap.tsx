'use client'
import { motion } from 'framer-motion'

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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15907.397193630138!2d-74.05834376510368!3d4.665171790479712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9a5e8c14a4cd%3A0xc66f6cf5755106bc!2sZona%20T%20Bogot%C3%A1!5e0!3m2!1ses!2sco!4v1700000000000!5m2!1ses!2sco"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(0.4) contrast(1.2)' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación de Floristería Violeta"
        />
      </motion.div>
    </section>
  )
}
