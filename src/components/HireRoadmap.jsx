import { motion } from 'framer-motion'
import { useMemo } from 'react'

const VBOX_W = 900
const VBOX_H = 520

export default function HireRoadmap({ steps }) {
  const { points, path } = useMemo(() => {
    const pts = steps.map((_, i) => {
      const row = Math.floor(i / 3)
      const col = i % 3
      const reverse = row % 2 === 1
      const orderedCol = reverse ? 2 - col : col
      return {
        x: 150 + orderedCol * 300,
        y: 92 + row * 165,
      }
    })

    let d = `M ${pts[0].x} ${pts[0].y}`
    for (let i = 1; i < pts.length; i++) {
      const p0 = pts[i - 1]
      const p1 = pts[i]
      const dx = Math.abs(p1.x - p0.x)
      const curve = dx > 10 ? 90 : 55
      d += ` C ${p0.x + Math.sign(p1.x - p0.x || 1) * curve} ${p0.y}, ${p1.x - Math.sign(p1.x - p0.x || 1) * curve} ${p1.y}, ${p1.x} ${p1.y}`
    }
    return { points: pts, path: d }
  }, [steps])

  return (
    <div className="relative mx-auto hidden h-[560px] max-w-5xl md:block">
      <svg
        className="absolute inset-0 h-full w-full overflow-visible"
        viewBox={`0 0 ${VBOX_W} ${VBOX_H}`}
        fill="none"
      >
        <defs>
          <linearGradient id="roadmapGlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00BFFF" stopOpacity="0.12" />
            <stop offset="46%" stopColor="#007BFF" stopOpacity="0.58" />
            <stop offset="100%" stopColor="#00BFFF" stopOpacity="0.16" />
          </linearGradient>
        </defs>
        <path d={path} stroke="rgba(255,255,255,0.08)" strokeWidth="8" strokeLinecap="round" />
        <path d={path} stroke="url(#roadmapGlow)" strokeWidth="2" strokeLinecap="round" filter="drop-shadow(0 0 12px rgba(0,191,255,0.46))" />
        <path d={path} className="roadmap-current" stroke="#BDEEFF" strokeWidth="3" strokeLinecap="round" />
      </svg>

      {points.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.65 }}
          transition={{ duration: 0.58, delay: i * 0.045, ease: [0.16, 1, 0.3, 1] }}
          className="absolute w-[230px] rounded-2xl card-surface px-4 py-4 text-center hover:shadow-glow-sm transition-shadow duration-300"
          style={{ top: p.y, left: p.x, transform: 'translate(-50%, -50%)' }}
        >
          <span className="mx-auto mb-2 flex h-7 w-7 items-center justify-center rounded-full border border-glow/35 bg-[#050505] font-body text-xs text-glow shadow-glow-sm">
            {i + 1}
          </span>
          <p className="font-body text-sm text-ink-soft leading-snug">{steps[i]}</p>
        </motion.div>
      ))}
    </div>
  )
}

export function HireRoadmapMobile({ steps }) {
  return (
    <div className="md:hidden grid grid-cols-1 gap-4">
      {steps.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.5, delay: i * 0.04 }}
          className="relative card-surface rounded-2xl px-5 py-4"
        >
          <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full border border-glow/30 text-xs text-glow">
            {i + 1}
          </span>
          <span className="font-body text-sm text-ink-soft">{s}</span>
        </motion.div>
      ))}
    </div>
  )
}