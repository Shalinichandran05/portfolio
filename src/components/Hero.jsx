import { motion } from 'framer-motion'
import ProfileImage from './ProfileImage.jsx'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

export default function Hero({ title, subtitle, description, buttons = [], image, imageAlt, onImageClick, shake, imageAdornment, onResumeClick }) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-20 pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[70vh] bg-[radial-gradient(circle_at_50%_18%,rgba(0,123,255,0.16),transparent_38%)] pointer-events-none" />
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-[1.18fr_0.82fr] gap-14 items-center"
      >
        <div className="order-2 md:order-1">
          <motion.h1
            variants={item}
            className="font-display font-bold text-5xl sm:text-6xl lg:text-8xl leading-[0.95] text-ink text-glow tracking-[-0.02em]"
          >
            {title}
          </motion.h1>
          <motion.p variants={item} className="font-display font-medium text-xl md:text-2xl text-glow mt-6">
            {subtitle}
          </motion.p>
          <motion.p variants={item} className="font-body text-base md:text-lg text-ink-soft mt-6 max-w-xl leading-relaxed">
            {description}
          </motion.p>
          <motion.div variants={item} className="flex flex-wrap gap-4 mt-10">
            {buttons.map((b, i) => {
              const isResume = b.label.toLowerCase() === 'resume'
              const className = i === 0
                ? 'px-7 py-3.5 rounded-full bg-white text-[#050505] font-body font-semibold text-sm tracking-wide hover:bg-glow hover:text-white hover:shadow-glow transition-all duration-300'
                : 'px-7 py-3.5 rounded-full border border-white/12 text-ink font-body font-medium text-sm tracking-wide hover:border-glow hover:text-glow hover:shadow-glow-sm transition-all duration-300'

              if (isResume) {
                return (
                  <button key={b.label} type="button" onClick={onResumeClick} className={className}>
                    {b.label}
                  </button>
                )
              }

              return (
                <a key={b.label} href={b.href} target={b.external ? '_blank' : undefined} rel={b.external ? 'noreferrer' : undefined} className={className}>
                  {b.label}
                </a>
              )
            })}
          </motion.div>
        </div>

        <motion.div variants={item} className="order-1 md:order-2 flex justify-center md:justify-end">
          <div className="relative flex flex-col md:flex-row items-center gap-5 md:gap-6">
            <ProfileImage src={image} alt={imageAlt} onClick={onImageClick} shake={shake} />
            {imageAdornment}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}