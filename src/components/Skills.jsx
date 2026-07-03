import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const logoPaths = {
  React: '/images/skills/react.svg',
  'Node.js': '/images/skills/nodejs.svg',
  Node: '/images/skills/nodejs.svg',
  Express: '/images/skills/express.svg',
  Flask: '/images/skills/flask.svg',
  PHP: '/images/skills/php.svg',
  Java: '/images/skills/java.svg',
  Python: '/images/skills/python.svg',
  JavaScript: '/images/skills/javascript.svg',
  MySQL: '/images/skills/mysql.svg',
  PostgreSQL: '/images/skills/postgresql.svg',
  Git: '/images/skills/git.svg',
  GitHub: '/images/skills/github.svg',
  Vercel: '/images/skills/vercel.svg',
  Render: '/images/skills/render.svg',
}

const splitRows = (skills) => [
  skills.filter((_, i) => i % 3 === 0),
  skills.filter((_, i) => i % 3 === 1),
  skills.filter((_, i) => i % 3 === 2),
]

export function SkillsSphere({ skills }) {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const rowOneX = useTransform(scrollYProgress, [0, 1], ['82vw', '-92vw'])
  const rowTwoX = useTransform(scrollYProgress, [0, 1], ['-58vw', '62vw'])
  const rowThreeX = useTransform(scrollYProgress, [0, 1], ['68vw', '-78vw'])
  const glowOpacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0.35, 0.9, 0.9, 0.35])
  const rows = splitRows(skills)

  return (
    <div ref={sectionRef} className="relative -mx-6 md:-mx-12 lg:-mx-20 h-[330vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-6 md:px-12 lg:px-20">
        <motion.div
          style={{ opacity: glowOpacity }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(0,191,255,0.18),transparent_34%),radial-gradient(circle_at_12%_55%,rgba(0,123,255,0.12),transparent_26%),radial-gradient(circle_at_88%_38%,rgba(0,191,255,0.10),transparent_28%)]"
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-gradient-to-r from-bg to-transparent md:w-44" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-gradient-to-l from-bg to-transparent md:w-44" />

        <div className="relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mb-14 max-w-3xl text-center"
          >
            <p className="font-body text-xs tracking-[0.28em] uppercase text-glow mb-4">Technical Stack</p>
            <h3 className="font-display text-3xl md:text-5xl font-semibold text-ink tracking-[-0.02em]">
              Tools moving through the work.
            </h3>
          </motion.div>

          <div className="flex flex-col gap-5 md:gap-7">
            <SkillRail skills={[...rows[0], ...rows[0]]} x={rowOneX} align="left" />
            <SkillRail skills={[...rows[1], ...rows[1]]} x={rowTwoX} align="right" muted />
            <SkillRail skills={[...rows[2], ...rows[2]]} x={rowThreeX} align="left" />
          </div>
        </div>
      </div>
    </div>
  )
}

function SkillRail({ skills, x, muted = false }) {
  return (
    <motion.div style={{ x }} className="flex w-max gap-4 md:gap-5 will-change-transform">
      {skills.map((skill, i) => (
        <SkillCapsule key={`${skill}-${i}`} skill={skill} muted={muted} />
      ))}
    </motion.div>
  )
}

function SkillCapsule({ skill, muted }) {
  const initials = skill
    .replace('.js', '')
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 3)

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.025 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className={`group flex h-20 min-w-[210px] items-center gap-4 rounded-full border px-5 backdrop-blur-xl transition-all duration-300 md:h-24 md:min-w-[250px] md:px-6 ${
        muted
          ? 'border-white/8 bg-white/[0.026] shadow-[0_0_26px_rgba(0,123,255,0.08)]'
          : 'border-white/12 bg-white/[0.04] shadow-[0_0_34px_rgba(0,191,255,0.12)]'
      } hover:border-glow/45 hover:bg-white/[0.065] hover:shadow-glow-sm`}
    >
      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#090a0d] md:h-12 md:w-12">
        <img
          src={logoPaths[skill] || `/images/skills/${skill.toLowerCase().replace(/\W+/g, '-')}.svg`}
          alt=""
          className="h-7 w-7 object-contain"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            e.currentTarget.nextSibling.style.display = 'flex'
          }}
        />
        <span className="hidden h-full w-full items-center justify-center font-body text-xs font-semibold text-glow">
          {initials}
        </span>
      </span>
      <span className="font-body text-lg font-medium text-ink md:text-xl">{skill}</span>
    </motion.div>
  )
}

export function SoftSkillsCloud({ skills }) {
  return (
    <div className="relative mx-auto mt-20 max-w-5xl py-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-9 text-center"
      >
        <p className="font-body text-xs tracking-[0.28em] uppercase text-ink-faint mb-3">Soft Skills</p>
        <h3 className="font-display text-2xl md:text-4xl font-semibold text-ink tracking-[-0.015em]">
          The human side of how I work.
        </h3>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((skill, i) => {
          const fromLeft = i % 2 === 0
          return (
            <motion.div
              key={skill}
              initial={{ opacity: 0, x: fromLeft ? -36 : 36, y: 12 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.58, delay: i * 0.055, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5 }}
              className="rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-5 text-center font-body text-sm font-medium text-ink-soft backdrop-blur-md transition-all duration-300 hover:border-glow/35 hover:text-ink hover:shadow-glow-sm"
            >
              {skill}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}