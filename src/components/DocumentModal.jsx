import { AnimatePresence, motion } from 'framer-motion'
import { Download, X } from 'lucide-react'

const imagePattern = /\.(png|jpe?g|webp|gif|svg)$/i

export default function DocumentModal({ open, title, src, onClose, downloadLabel = 'Download' }) {
  if (!open || !src) return null

  const isImage = imagePattern.test(src)

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-bg/82 backdrop-blur-xl" />
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(event) => event.stopPropagation()}
          className="relative z-10 flex h-[82vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#08090c]/95 shadow-glow-lg"
        >
          <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 md:px-5">
            <h3 className="min-w-0 truncate font-display text-base font-semibold text-ink md:text-lg">{title}</h3>
            <div className="flex shrink-0 items-center gap-2">
              <a
                href={src}
                download
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ink-soft transition-all duration-300 hover:border-glow hover:text-glow hover:shadow-glow-sm"
                aria-label={downloadLabel}
                title={downloadLabel}
              >
                <Download size={17} />
              </a>
              <button
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ink-soft transition-all duration-300 hover:border-glow hover:text-glow hover:shadow-glow-sm"
                aria-label="Close viewer"
              >
                <X size={18} />
              </button>
            </div>
          </div>
          <div className="flex min-h-0 flex-1 items-center justify-center bg-[#050505] p-3 md:p-5">
            {isImage ? (
              <img src={src} alt={title} className="max-h-full max-w-full rounded-xl object-contain" />
            ) : (
              <embed src={src} type="application/pdf" className="h-full w-full rounded-xl bg-white" />
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}