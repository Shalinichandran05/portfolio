import { motion } from 'framer-motion'

export function TeamNote({ text }) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, y: 24, scale: 0.98, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: false, amount: 0.36 }}
      transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] px-7 py-8 text-center shadow-[0_0_45px_rgba(0,191,255,0.08)] backdrop-blur-xl md:px-12 md:py-11"
    >
      <motion.span
        className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-glow/70 to-transparent"
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 1.1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
      />
      <span className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-glow/10 blur-3xl" />
      <p className="relative font-display font-medium text-xl md:text-2xl text-ink-soft leading-relaxed">
        {text}
      </p>
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
