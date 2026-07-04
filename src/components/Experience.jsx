import { motion } from 'framer-motion'

const card = {
  hidden: (i) => ({ opacity: 0, y: 34, x: i % 2 === 0 ? -18 : 18, filter: 'blur(8px)' }),
  show: {
    opacity: 1,
    y: 0,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Experience({ items, variant = 'recruiter' }) {
  const isVisitor = variant === 'visitor'

  return (
    <div className={`relative flex flex-col gap-7 pl-0 ${isVisitor ? '' : 'md:pl-8'}`}>
      {!isVisitor && (
        <motion.div
          className="absolute left-3 top-2 hidden h-full w-px origin-top bg-gradient-to-b from-glow/80 via-white/12 to-transparent shadow-[0_0_18px_rgba(0,191,255,0.45)] md:block"
          initial={{ scaleY: 0, opacity: 0.4 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
        />
      )}

      {items.map((exp, i) => (
        <motion.div
          key={exp.company}
          custom={i}
          variants={card}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.28 }}
          className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-7 backdrop-blur-xl transition-all duration-500 hover:border-glow/35 hover:shadow-glow-sm md:p-9 ${
            isVisitor ? (i % 2 === 0 ? 'md:mr-12' : 'md:ml-12') : ''
          }`}
        >
          <motion.span
            className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-glow/60 to-transparent"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: false, amount: 0.45 }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          />
          <span className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-glow/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
          {!isVisitor && <span className="absolute -left-[34px] top-10 hidden h-4 w-4 rounded-full border border-glow bg-[#050505] shadow-glow-sm md:block" />}

          <div className="relative flex flex-wrap items-baseline justify-between gap-3 mb-6">
            <div>
              <h3 className="font-display font-semibold text-2xl text-ink">{exp.company}</h3>
              <p className="font-body text-glow text-sm mt-1">{exp.role}</p>
            </div>
            <span className="font-body text-xs tracking-widest uppercase text-ink-faint">
              {exp.period}
            </span>
          </div>

          <div className="relative grid grid-cols-1 gap-7 sm:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.58, delay: 0.12 }}
            >
              <p className="font-body text-xs tracking-[0.2em] uppercase text-ink-faint mb-3">
                Contributions
              </p>
              <ul className="flex flex-col gap-2">
                {exp.contributions.map((c, index) => (
                  <motion.li
                    key={c}
                    initial={{ opacity: 0, x: isVisitor && index % 2 ? 18 : -18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.45 }}
                    transition={{ duration: 0.46, delay: index * 0.045 }}
                    className="font-body text-sm text-ink-soft leading-relaxed flex gap-2"
                  >
                    <span className="text-glow mt-1">-</span>
                    <span>{c}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.58, delay: 0.2 }}
            >
              <p className="font-body text-xs tracking-[0.2em] uppercase text-ink-faint mb-3">
                What it taught me
              </p>
              <div className="flex flex-wrap gap-2">
                {exp.learning.map((l, index) => (
                  <motion.span
                    key={l}
                    initial={{ opacity: 0, scale: 0.94 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false, amount: 0.45 }}
                    transition={{ duration: 0.38, delay: index * 0.055 }}
                    className="px-3.5 py-1.5 rounded-full text-xs font-body text-ink-soft border border-white/10 bg-white/[0.035]"
                  >
                    {l}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
