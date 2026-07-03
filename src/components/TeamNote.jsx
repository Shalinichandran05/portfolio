import { motion } from 'framer-motion'

export function TeamNote({ text }) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7 }}
      className="max-w-3xl mx-auto text-center"
    >
      <p className="font-display font-medium text-xl md:text-2xl text-ink-soft leading-relaxed">
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