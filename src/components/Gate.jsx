import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const paths = [
  {
    id: 'recruiter',
    question: 'Are you a recruiter?',
    description: 'Projects, experience, and the work I love building.',
  },
  {
    id: 'visitor',
    question: 'Are you a curious visitor or a potential teammate?',
    description: 'Stories, memories, and the person behind the code.',
  },
]

export default function Gate({ pending, onSelect, onExitComplete }) {
  const exitHandledRef = useRef(false)

  useEffect(() => {
    if (!pending) exitHandledRef.current = false
  }, [pending])

  const handleExitComplete = () => {
    if (!pending || exitHandledRef.current) return
    exitHandledRef.current = true
    onExitComplete?.()
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-5 py-10"
      initial={false}
      animate={pending ? 'leaving' : 'show'}
      variants={{ show: { opacity: 1 }, leaving: { opacity: 1 } }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute inset-0 bg-[#050505]/34 backdrop-blur-[2px]"
        animate={pending ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.div
        initial={{ opacity: 0, y: 34, scale: 0.96 }}
        animate={pending ? { opacity: 0, y: -120, scale: 0.96 } : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: pending ? 0.78 : 0.8, ease: [0.16, 1, 0.3, 1] }}
        onAnimationComplete={handleExitComplete}
        className="relative z-10 w-full max-w-4xl glass-float rounded-[1.75rem] px-6 py-9 md:px-10 md:py-11 text-center"
      >
        <p className="font-body text-xs tracking-[0.34em] uppercase text-ink-faint mb-4">Shalini</p>
        <h1 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-ink tracking-[-0.02em]">
          Choose how you'd like to know me.
        </h1>
        <div className="mx-auto mt-7 mb-9 h-px w-56 premium-line" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 text-left">
          {paths.map((path, i) => (
            <PathCard key={path.id} {...path} disabled={Boolean(pending)} onClick={() => onSelect(path.id)} delay={i * 0.07} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

function PathCard({ question, description, onClick, disabled, delay }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.62, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={disabled ? undefined : { y: -6, borderColor: 'rgba(0,191,255,0.36)' }}
      whileTap={disabled ? undefined : { scale: 0.985 }}
      disabled={disabled}
      onClick={onClick}
      className="group relative min-h-[210px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] px-6 py-6 md:px-7 md:py-7 transition-all duration-500 hover:shadow-glow-sm disabled:cursor-default"
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_24%_0%,rgba(0,191,255,0.16),transparent_42%)] opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="relative flex h-full flex-col justify-between gap-8">
        <span>
          <span className="block font-invite italic font-semibold text-[2rem] leading-[1.02] md:text-[2.45rem] text-ink tracking-normal">
            {question}
          </span>
          <span className="mt-5 block font-body text-sm md:text-base leading-relaxed text-ink-soft">
            {description}
          </span>
        </span>
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-glow transition-all duration-300 group-hover:border-glow group-hover:shadow-glow-sm">
          <ArrowRight size={17} />
        </span>
      </span>
    </motion.button>
  )
}