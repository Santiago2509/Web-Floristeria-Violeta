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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.5802111535496!2d-76.533221!3d3.451632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a6639b70b4a9%3A0xc3b832b84cf21d2!2sCentro%2C%20Cali%2C%20Valle%20del%20Cauca!5e0!3m2!1ses!2sco!4v1700000000000!5m2!1ses!2sco"
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
