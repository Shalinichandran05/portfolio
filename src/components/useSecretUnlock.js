import { useCallback, useRef, useState } from 'react'

const MESSAGES = [
  '...',
  "Some doors don't open the first time.",
  'But curious minds find them.',
  "You're almost there.",
  'Welcome, explorer.',
]

export default function useSecretUnlock() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const timeoutRef = useRef(null)

  const handleClick = useCallback(() => {
    setCount((prev) => {
      const next = prev + 1
      const msg = MESSAGES[Math.min(next - 1, MESSAGES.length - 1)]
      setMessage(msg)

      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setMessage(''), 2200)

      if (next >= 5) {
        setTimeout(() => setUnlocked(true), 700)
      }
      return next
    })
  }, [])

  const close = useCallback(() => {
    setUnlocked(false)
    setCount(0)
  }, [])

  return { count, message, unlocked, handleClick, close }
}