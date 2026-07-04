import { motion } from 'framer-motion'
import { useState } from 'react'
import { Award, ExternalLink } from 'lucide-react'
import DocumentModal from './DocumentModal.jsx'

export default function Achievements({ items }) {
  const [active, setActive] = useState(null)

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => {
          const isPublication = Boolean(item.publicationUrl)
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.38 }}
              transition={{ duration: 0.54, delay: (i % 6) * 0.045, ease: [0.16, 1, 0.3, 1] }}
              className="card-surface rounded-2xl p-6 flex flex-col gap-4 hover:shadow-glow-sm hover:-translate-y-1 transition-all duration-300"
            >
              {isPublication ? <ExternalLink className="text-glow" size={22} /> : <Award className="text-glow" size={22} />}
              <p className="font-body text-sm text-ink leading-snug flex-1">{item.title}</p>
              {isPublication ? (
                <a
                  href={item.publicationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="self-start text-xs font-body tracking-wide text-glow hover:text-glow underline underline-offset-4 decoration-glow/30"
                >
                  View Publication
                </a>
              ) : (
                <button
                  onClick={() => setActive(item)}
                  className="self-start text-xs font-body tracking-wide text-glow hover:text-glow underline underline-offset-4 decoration-glow/30"
                >
                  View Certificate
                </button>
              )}
            </motion.div>
          )
        })}
      </div>

      <DocumentModal
        open={Boolean(active)}
        title={active?.title}
        src={active?.certUrl}
        onClose={() => setActive(null)}
        downloadLabel="Download certificate"
      />
    </>
  )
}
