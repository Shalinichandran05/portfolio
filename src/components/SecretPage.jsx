import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import MemoryWall from './MemoryWall.jsx'
import { memories } from '../data/content.js'

export default function SecretPage({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] overflow-y-auto bg-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-blue-radial pointer-events-none" />

          <button
            onClick={onClose}
            className="fixed top-6 right-6 z-10 w-11 h-11 rounded-full card-surface flex items-center justify-center text-ink-soft hover:text-glow hover:shadow-glow-sm transition-all duration-300"
            aria-label="Close secret page"
          >
            <X size={20} />
          </button>

          <div className="relative px-6 md:px-12 lg:px-20 pt-24 pb-14 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-16"
            >
              <p className="font-body text-xs tracking-[0.35em] uppercase text-glow mb-5">
                Secret Page
              </p>
              <h1 className="font-display font-semibold text-3xl md:text-5xl text-ink mb-6 text-glow">
                Congratulations.
              </h1>
              <p className="font-body text-lg text-ink-soft max-w-xl mx-auto leading-relaxed">
                You weren't supposed to find this...
                <br />
                But since you're here, welcome.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}>
              <h2 className="font-display font-semibold text-2xl text-ink text-center mb-10">
                The Memory Wall
              </h2>
              <MemoryWall memories={memories} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center font-body text-ink-faint mt-14"
            >
              Thanks for being curious enough to explore this far.
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}