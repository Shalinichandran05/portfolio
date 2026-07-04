import { AnimatePresence, motion } from 'framer-motion'
import { Download, X } from 'lucide-react'

const imagePattern = /\.(png|jpe?g|webp|gif|svg)$/i

export default function DocumentModal({ open, title, src, onClose, downloadLabel = 'Download' }) {
  const isImage = src && imagePattern.test(src)

  return (
    <AnimatePresence>
      {open && src && (
        <motion.div
          className="fixed inset-0 z-[80] overflow-y-auto px-4 py-16 md:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          onClick={onClose}
        >
          <div className="fixed inset-0 bg-black/72 backdrop-blur-xl" />

          <div className="fixed right-4 top-4 z-20 flex items-center gap-2 md:right-6 md:top-6">
            <a
              href={src}
              download
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-black/45 text-ink-soft backdrop-blur-xl transition-all duration-300 hover:border-glow hover:text-glow hover:shadow-glow-sm"
              aria-label={downloadLabel}
              title={downloadLabel}
              onClick={(event) => event.stopPropagation()}
            >
              <Download size={18} />
            </a>
            <button
              onClick={onClose}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-black/45 text-ink-soft backdrop-blur-xl transition-all duration-300 hover:border-glow hover:text-glow hover:shadow-glow-sm"
              aria-label="Close viewer"
              title="Close viewer"
            >
              <X size={19} />
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] w-full items-center justify-center"
          >
            {isImage ? (
              <img
                src={src}
                alt={title}
                className="block w-[90vw] max-w-none object-contain shadow-[0_28px_100px_rgba(0,0,0,0.72)] md:w-[76vw] md:max-h-[90vh]"
              />
            ) : (
              <embed src={src} type="application/pdf" className="h-[90vh] w-[90vw] bg-white shadow-[0_28px_100px_rgba(0,0,0,0.72)] md:w-[76vw]" />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
