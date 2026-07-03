import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { X } from 'lucide-react'

const rotations = [-5, 4, -3, 5, -4, 3, 4, -3, 5, -2, 4, -4, 3, -5]

export default function MemoryWall({ memories }) {
  const [active, setActive] = useState(null)

  return (
    <>
      <div className="grid grid-cols-1 gap-x-10 gap-y-14 py-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:px-4">
        {memories.map((m, i) => {
          const rot = rotations[i % rotations.length]
          return (
            <motion.button
              type="button"
              key={m.title}
              initial={{ opacity: 0, rotate: rot * 2, y: 32, scale: 0.92 }}
              whileInView={{ opacity: 1, rotate: rot, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.32 }}
              transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ rotate: 0, y: -7, scale: 1.025 }}
              onClick={() => setActive(m)}
              className="bg-[#0d1016] p-3 pb-6 rounded-sm shadow-[0_12px_34px_rgba(0,0,0,0.52)] hover:shadow-glow-sm transition-shadow duration-300 text-left"
            >
              <div className="w-full aspect-square bg-[#101114] rounded-sm mb-4 flex items-center justify-center overflow-hidden">
                <img
                  src={m.image}
                  alt={m.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.nextSibling.style.display = 'flex'
                  }}
                />
                <span className="hidden h-full w-full items-center justify-center px-3 text-center font-body text-xs text-ink-faint">
                  Image coming soon
                </span>
              </div>
              <p className="font-display text-sm text-ink text-center leading-snug mb-2">
                {m.title}
              </p>
              <p className="font-body text-[11px] text-ink-faint text-center leading-snug px-1">
                {m.note}
              </p>
            </motion.button>
          )
        })}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center px-4 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <div className="absolute inset-0 bg-bg/84 backdrop-blur-xl" />
            <motion.div
              initial={{ opacity: 0, y: 24, rotate: -1, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, rotate: 2.5, scale: 1 }}
              exit={{ opacity: 0, y: 16, rotate: 0, scale: 0.96 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="relative z-10 max-h-[80vh] w-[min(78vw,58rem)] rounded-sm bg-[#f4f1ea] p-3 pb-14 shadow-[0_30px_90px_rgba(0,0,0,0.62)]"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full card-surface text-ink-soft transition-all duration-300 hover:text-glow hover:shadow-glow-sm"
                aria-label="Close memory"
              >
                <X size={18} />
              </button>
              <img src={active.image} alt={active.title} className="max-h-[68vh] w-full rounded-sm object-contain" />
              <div className="absolute inset-x-5 bottom-4 text-center">
                <p className="font-display text-base font-semibold text-[#161616]">{active.title}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}