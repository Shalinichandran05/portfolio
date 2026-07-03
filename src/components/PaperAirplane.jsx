import { useEffect, useRef } from 'react'
import { useAnimationControls, motion } from 'framer-motion'
import { Send } from 'lucide-react'

const flightPath = 'M 0 120 C 210 10, 420 238, 640 62 C 760 -18, 860 10, 940 72'

export default function PaperAirplane({ onArrive }) {
  const controls = useAnimationControls()
  const cancelled = useRef(false)

  useEffect(() => {
    cancelled.current = false

    const rest = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

    async function loop() {
      while (!cancelled.current) {
        await controls.set({ offsetDistance: '0%', opacity: 0, rotate: -10 })
        await controls.start({ opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } })

        await controls.start({
          offsetDistance: ['0%', '48%', '52%', '95%'],
          rotate: [-10, 5, 185, 342],
          transition: { duration: 4.05, ease: 'easeInOut', times: [0, 0.48, 0.54, 1] },
        })
        if (cancelled.current) return

        await controls.start({
          offsetDistance: '100%',
          rotate: 350,
          transition: { duration: 0.32, ease: 'easeOut' },
        })
        if (cancelled.current) return

        onArrive?.()
        await rest(420)
        if (cancelled.current) return

        await controls.start({ opacity: 0, transition: { duration: 0.28, ease: 'easeOut' } })
        await controls.set({ offsetDistance: '0%', rotate: -10, opacity: 0 })
        await rest(5200)
      }
    }

    loop()

    return () => {
      cancelled.current = true
      controls.stop()
    }
  }, [controls, onArrive])

  return (
    <motion.div
      animate={controls}
      className="hidden md:flex absolute left-[4vw] top-[22vh] pointer-events-none z-20 text-glow"
      style={{
        opacity: 0,
        offsetPath: `path('${flightPath}')`,
        offsetRotate: '0deg',
      }}
    >
      <Send size={25} className="drop-shadow-[0_0_7px_rgba(0,191,255,0.52)]" />
    </motion.div>
  )
}