import { motion } from 'framer-motion'

export function TeamNote({ text }) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.36 }}
      transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] px-7 py-10 text-center backdrop-blur-xl md:px-12 md:py-14"
      style={{
        boxShadow:
          '0 0 0 1px rgba(0,191,255,0.08), 0 0 60px rgba(0,191,255,0.12), 0 0 120px rgba(0,123,255,0.07), inset 0 1px 0 rgba(255,255,255,0.08)',
      }}
    >
      {/* Animated top border line */}
      <motion.span
        className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-glow/80 to-transparent"
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 1.2, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Corner glow accents */}
      <span className="pointer-events-none absolute -left-24 -top-24 h-56 w-56 rounded-full bg-glow/12 blur-3xl" />
      <span className="pointer-events-none absolute -right-24 -bottom-24 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />

      {/* Animated bottom border line */}
      <motion.span
        className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-glow/40 to-transparent"
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 1.2, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.72, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="relative font-display font-medium text-xl md:text-2xl text-ink-soft leading-relaxed"
      >
        {text}
      </motion.p>
    </motion.blockquote>
  )
}

export function TeammateCards({ items }) {
  return (
    <div className="flex flex-col gap-6">
      {items.map((n, i) => (
        <motion.div
          key={n.title}
          initial={{ opacity: 0, x: i % 2 === 0 ? -54 : 54 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.28 }}
          transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
          className={`card-surface rounded-2xl p-7 max-w-xl hover:shadow-glow-sm transition-shadow duration-300 ${
            i % 2 === 0 ? 'self-start' : 'self-end text-right'
          }`}
        >
          <h4 className="font-display font-semibold text-lg text-ink mb-2">{n.title}</h4>
          <p className="font-body text-sm text-ink-soft leading-relaxed">{n.body}</p>
        </motion.div>
      ))}
    </div>
  )
}
