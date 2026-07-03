import { motion } from 'framer-motion'

export default function Experience({ items }) {
  return (
    <div className="relative flex flex-col gap-8 pl-0 md:pl-8">
      <motion.div
        className="absolute left-3 top-2 hidden h-full w-px origin-top bg-gradient-to-b from-glow/70 via-white/10 to-transparent md:block"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
      {items.map((exp, i) => (
        <motion.div
          key={exp.company}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative card-surface rounded-3xl p-8 md:p-10 hover:shadow-glow-sm transition-shadow duration-300"
        >
          <span className="absolute -left-[34px] top-10 hidden h-4 w-4 rounded-full border border-glow bg-[#050505] shadow-glow-sm md:block" />
          <div className="flex flex-wrap items-baseline justify-between gap-3 mb-6">
            <div>
              <h3 className="font-display font-semibold text-2xl text-ink">{exp.company}</h3>
              <p className="font-body text-glow text-sm mt-1">{exp.role}</p>
            </div>
            <span className="font-body text-xs tracking-widest uppercase text-ink-faint">
              {exp.period}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <p className="font-body text-xs tracking-[0.2em] uppercase text-ink-faint mb-3">
                Contributions
              </p>
              <ul className="flex flex-col gap-2">
                {exp.contributions.map((c) => (
                  <li key={c} className="font-body text-sm text-ink-soft leading-relaxed flex gap-2">
                    <span className="text-glow mt-1">-</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-body text-xs tracking-[0.2em] uppercase text-ink-faint mb-3">
                What it taught me
              </p>
              <div className="flex flex-wrap gap-2">
                {exp.learning.map((l) => (
                  <span
                    key={l}
                    className="px-3.5 py-1.5 rounded-full text-xs font-body text-ink-soft border border-white/10 bg-white/[0.035]"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}