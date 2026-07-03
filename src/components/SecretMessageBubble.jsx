import { AnimatePresence, motion } from 'framer-motion'

export default function SecretMessageBubble({ message }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.97 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-[min(18rem,calc(100vw-2rem))] card-surface rounded-2xl px-4 py-3 text-center text-xs font-body text-ink-soft shadow-[0_0_18px_rgba(0,191,255,0.12)] md:absolute md:right-full md:top-1/2 md:mr-5 md:w-64 md:-translate-y-1/2 md:text-left"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}