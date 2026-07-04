import { AnimatePresence, motion } from 'framer-motion'
import { Download, X } from 'lucide-react'

const imagePattern = /\.(png|jpe?g|webp|gif|svg)$/i

export default function DocumentModal({ open, title, src, onClose, downloadLabel = 'Download' }) {
  const isImage = src && imagePattern.test(src)

  return (
    <AnimatePresence>
      {open && src && (
        <>
          {/* Blurred, dark overlay — clicking closes */}
          <motion.div
            className="fixed inset-0 z-[80] bg-black/75 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Fixed action buttons — always visible */}
          <div className="fixed right-4 top-4 z-[90] flex items-center gap-2 md:right-6 md:top-6">
            <a
              href={src}
              download
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-black/60 text-ink-soft backdrop-blur-xl transition-all duration-300 hover:border-glow hover:text-glow hover:shadow-glow-sm"
              aria-label={downloadLabel}
              title={downloadLabel}
              onClick={(event) => event.stopPropagation()}
            >
              <Download size={18} />
            </a>
            <button
              onClick={onClose}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-black/60 text-ink-soft backdrop-blur-xl transition-all duration-300 hover:border-glow hover:text-glow hover:shadow-glow-sm"
              aria-label="Close viewer"
              title="Close viewer"
            >
              <X size={19} />
            </button>
          </div>

          {/* Scrollable centering container */}
          <div
            className="fixed inset-0 z-[85] overflow-y-auto flex items-start justify-center py-10 px-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.97 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="relative mt-auto mb-auto"
            >
              {isImage ? (
                <img
                  src={src}
                  alt={title}
                  className="block w-[90vw] max-w-none object-contain md:w-[75vw]"
                  style={{
                    filter: 'drop-shadow(0 30px 80px rgba(0,0,0,0.85))',
                  }}
                />
              ) : (
                <embed
                  src={src}
                  type="application/pdf"
                  className="h-[90vh] w-[90vw] bg-white md:w-[76vw]"
                  style={{ filter: 'drop-shadow(0 30px 80px rgba(0,0,0,0.85))' }}
                />
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
