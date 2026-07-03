import { motion } from 'framer-motion'

const sectionMotion = {
  hero: { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } },
  'hero-about': { hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0 } },
  about: { hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0 } },
  skills: { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } },
  experience: { hidden: { opacity: 0, scaleY: 0.92, y: 24 }, show: { opacity: 1, scaleY: 1, y: 0 } },
  projects: { hidden: { opacity: 0, y: 34 }, show: { opacity: 1, y: 0 } },
  achievements: { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0 } },
  certifications: { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0 } },
  contact: { hidden: { opacity: 0, filter: 'blur(8px)' }, show: { opacity: 1, filter: 'blur(0px)' } },
  connect: { hidden: { opacity: 0, filter: 'blur(8px)' }, show: { opacity: 1, filter: 'blur(0px)' } },
}

export default function Section({ id, eyebrow, title, subtitle, children, className = '', innerClassName = '' }) {
  const motionVariant = sectionMotion[id] || { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }

  return (
    <section id={id} className={`relative py-24 md:py-32 px-6 md:px-12 lg:px-20 ${className}`}>
      <div className={`max-w-6xl mx-auto ${innerClassName}`}>
        {(eyebrow || title) && (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={motionVariant}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="mb-14"
          >
            {eyebrow && (
              <p className="font-body text-sm tracking-[0.28em] uppercase text-glow mb-4">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-display font-semibold text-3xl md:text-5xl text-ink mb-4 tracking-[-0.015em]">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="font-body text-base md:text-lg text-ink-soft max-w-2xl">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  )
}