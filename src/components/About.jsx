import { motion } from 'framer-motion'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
}

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] },
  },
}

const highlightWords = [
  'Information Technology',
  'software development',
  'real-world applications',
  'meaningful problems',
  'functional products',
  'new technologies',
  'building things',
  'intuitive',
  'enjoyable',
]

function HighlightedText({ text }) {
  const pattern = new RegExp(`(${highlightWords.map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi')
  return text.split(pattern).map((part, index) => {
    const highlighted = highlightWords.some((word) => word.toLowerCase() === part.toLowerCase())
    return highlighted ? (
      <span key={`${part}-${index}`} className="text-ink text-glow">
        {part}
      </span>
    ) : (
      part
    )
  })
}

function InterestList({ label, items }) {
  if (!items?.length) return null

  return (
    <motion.div variants={rise} className="pt-2">
      <p className="mb-5 font-body text-xs uppercase tracking-[0.28em] text-glow/90">{label}</p>
      <div className="flex flex-wrap gap-3">
        {items.map((item, index) => (
          <motion.span
            key={item}
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: 0.48, delay: index * 0.045, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 font-body text-sm text-ink-soft shadow-[0_0_22px_rgba(0,191,255,0.06)] transition-all duration-300 hover:border-glow/35 hover:text-ink hover:shadow-glow-sm"
          >
            {item}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

export default function About({ content }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.28 }}
      className="relative mx-auto max-w-5xl"
    >
      <div className="pointer-events-none absolute inset-x-0 top-8 h-px bg-gradient-to-r from-transparent via-glow/35 to-transparent" />

      <div className="space-y-7 md:space-y-9">
        <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] md:p-8">
          <div className="absolute left-0 top-6 h-16 w-px bg-glow/70 shadow-[0_0_18px_rgba(0,191,255,0.55)] md:top-8" />
          <div className="space-y-4 md:space-y-5">
            {content.intro.map((paragraph, index) => (
              <motion.p
                key={paragraph}
                variants={rise}
                className={`font-body leading-relaxed ${
                  index === 0
                    ? 'max-w-4xl text-base text-ink-soft md:text-lg'
                    : 'max-w-4xl text-sm text-ink-soft/72 md:text-base'
                }`}
              >
                <HighlightedText text={paragraph} />
              </motion.p>
            ))}
          </div>
        </div>

        {content.focus?.length > 0 && <InterestList label={content.focusLabel} items={content.focus} />}

        <motion.div variants={rise} className="grid gap-4 border-y border-white/10 py-5 md:grid-cols-2 md:gap-6 md:py-7">
          {content.education.map((item, index) => (
            <motion.div
              key={`${item.title}-${item.period}`}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.58, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <p className="font-display text-base font-semibold text-ink transition-colors duration-300 group-hover:text-glow md:text-lg">
                {item.title}
              </p>
              <p className="mt-1 font-body text-xs text-ink-soft md:text-sm">{item.place}</p>
              <div className="mt-2 flex flex-wrap gap-3 font-body text-xs uppercase tracking-[0.18em] text-ink-faint">
                <span>{item.period}</span>
                {item.detail && <span>{item.detail}</span>}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <InterestList label={content.interestsLabel} items={content.interests} />
      </div>
    </motion.div>
  )
}