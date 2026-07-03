import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Gate from './components/Gate.jsx'
import RecruiterView from './views/RecruiterView.jsx'
import VisitorView from './views/VisitorView.jsx'
import { ArrowLeft } from 'lucide-react'

function resetWindowScroll() {
  if (typeof window === 'undefined') return
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' }))
}

export default function App() {
  const [path, setPath] = useState(null)
  const [pendingPath, setPendingPath] = useState(null)
  const [experienceKey, setExperienceKey] = useState(0)

  const handleSelect = (chosen) => {
    resetWindowScroll()
    setPendingPath(chosen)
  }

  const revealPath = () => {
    if (!pendingPath) return
    resetWindowScroll()
    setExperienceKey((key) => key + 1)
    setPath(pendingPath)
    setPendingPath(null)
  }

  const backToGate = () => {
    resetWindowScroll()
    setPendingPath(null)
    setPath(null)
    setExperienceKey((key) => key + 1)
  }

  const activeView = path === 'visitor'
    ? <VisitorView key={`visitor-${experienceKey}`} />
    : <RecruiterView key={`${path || 'preview'}-${experienceKey}`} />

  return (
    <div className="min-h-screen bg-bg bg-blue-radial relative">
      <div
        className={`transition-[filter,opacity] duration-[900ms] ease-out ${
          path ? 'blur-none opacity-100' : 'blur-sm opacity-70 pointer-events-none select-none'
        }`}
        aria-hidden={!path}
      >
        {activeView}
      </div>

      {path && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.35 }}
          onClick={backToGate}
          className="fixed top-6 left-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full card-surface text-xs font-body text-ink-soft hover:text-glow hover:shadow-glow-sm transition-all duration-300"
        >
          <ArrowLeft size={14} /> Choose again
        </motion.button>
      )}

      <AnimatePresence>
        {!path && <Gate key="gate" pending={pendingPath} onSelect={handleSelect} onExitComplete={revealPath} />}
      </AnimatePresence>
    </div>
  )
}