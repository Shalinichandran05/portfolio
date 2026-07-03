import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

const DELAY_MS = 2.5 * 60 * 1000
const SESSION_KEY = 'shalini-explore-toast-dismissed'

export default function ExploreNotification() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(() => sessionStorage.getItem(SESSION_KEY) === 'true')

  useEffect(() => {
    if (dismissed) return undefined
    const timer = setTimeout(() => setVisible(true), DELAY_MS)
    return () => clearTimeout(timer)
  }, [dismissed])

  const dismiss = () => {
    sessionStorage.setItem(SESSION_KEY, 'true')
    setDismissed(true)
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-5 left-1/2 z-[70] w-[min(22rem,calc(100vw-2rem))] -translate-x-1/2 card-surface rounded-2xl px-5 py-4 shadow-[0_0_28px_rgba(0,191,255,0.16)] md:bottom-6 md:left-auto md:right-6 md:translate-x-0"
        >
          <p className="pr-8 font-body text-sm leading-relaxed text-ink-soft">
            Looks like you're really exploring.<br />
            Thanks for sticking around!
          </p>
          <button
            onClick={dismiss}
            className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-ink-faint transition-colors duration-300 hover:text-glow"
            aria-label="Dismiss exploration note"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}