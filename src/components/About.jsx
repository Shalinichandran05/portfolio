import { motion } from 'framer-motion'

export default function About({ paragraphs }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-12 items-start">
      <motion.div
        initial={{ opacity: 0, x: -34, clipPath: 'inset(0 24% 0 0)' }}
        whileInView={{ opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0)' }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-64 md:h-80 rounded-3xl card-surface flex items-center justify-center overflow-hidden"
      >
        <span className="font-display text-7xl font-semibold text-white/8 text-glow">S</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 34 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-5"
      >
        {paragraphs.map((p, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
            className="font-body text-base md:text-lg text-ink-soft leading-relaxed"
          >
            {p}
          </motion.p>
        ))}
      </motion.div>
    </div>
  )
}