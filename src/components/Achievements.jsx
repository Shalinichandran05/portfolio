import { motion } from 'framer-motion'
import { useState } from 'react'
import { Award } from 'lucide-react'
import DocumentModal from './DocumentModal.jsx'

export default function Achievements({ items }) {
  const [active, setActive] = useState(null)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
            whileHover={{ y: -4 }}
            className="card-surface rounded-2xl p-6 flex flex-col gap-4 hover:shadow-glow-sm transition-shadow duration-300"
          >
            <Award className="text-glow" size={22} />
            <p className="font-body text-sm text-ink leading-snug flex-1">{item.title}</p>
            <button
              onClick={() => setActive(item)}
              className="self-start text-xs font-body tracking-wide text-glow hover:text-glow underline underline-offset-4 decoration-glow/30"
            >
              View certificate
            </button>
          </motion.div>
        ))}
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