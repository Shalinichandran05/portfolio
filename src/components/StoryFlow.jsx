import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

export default function StoryFlow({ nodes }) {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative mx-auto max-w-5xl px-2 py-8">
      <svg className="pointer-events-none absolute inset-0 hidden h-full w-full md:block" viewBox="0 0 1000 420" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M150 100 C270 40, 360 180, 500 120 S730 80, 850 160 C740 250, 610 195, 500 290 S280 360, 150 270"
          fill="none"
          stroke="rgba(0,191,255,0.16)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="8 18"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="-104" dur="18s" repeatCount="indefinite" />
        </path>
      </svg>

      <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {nodes.map((node, i) => (
          <motion.button
            key={node.id}
            initial={{ opacity: 0, y: 28, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -7, borderColor: 'rgba(0,191,255,0.34)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollTo(node.id)}
            className="group relative min-h-[148px] overflow-hidden rounded-2xl card-surface p-5 text-left transition-all duration-300 hover:shadow-glow-sm"
          >
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(0,191,255,0.16),transparent_44%)] opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative flex h-full flex-col justify-between gap-8">
              <span className="flex items-center justify-between">
                <span className="font-body text-xs tracking-[0.24em] uppercase text-ink-faint">Level {String(i + 1).padStart(2, '0')}</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-glow group-hover:border-glow group-hover:shadow-glow-sm transition-all duration-300">
                  <MapPin size={16} />
                </span>
              </span>
              <span className="font-display text-xl font-semibold text-ink tracking-[-0.01em]">{node.label}</span>
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}