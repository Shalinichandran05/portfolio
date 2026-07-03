import { motion } from 'framer-motion'
import { useState } from 'react'

export default function ProfileImage({ src, alt, onClick, size = 'w-64 h-64 md:w-80 md:h-80', shake = false }) {
  const [hovered, setHovered] = useState(false)

  const glow = shake
    ? '0 0 34px rgba(0,191,255,0.22), 0 0 10px rgba(0,123,255,0.16)'
    : hovered
      ? '0 0 30px rgba(0,191,255,0.18)'
      : '0 0 22px rgba(0,191,255,0.13)'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative inline-block animate-float"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        animate={shake ? { rotate: [-1, 1, 0] } : { rotate: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`relative ${size} rounded-full cursor-pointer select-none`}
        onClick={onClick}
        style={{
          boxShadow: glow,
          transition: 'box-shadow 0.3s ease',
        }}
      >
        <span className="absolute -inset-3 rounded-full border border-white/10 bg-[radial-gradient(circle,rgba(0,191,255,0.07),transparent_70%)]" />
        <img
          src={src}
          alt={alt}
          className="relative w-full h-full rounded-full object-cover border border-white/10"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            e.currentTarget.nextSibling.style.display = 'flex'
          }}
        />
        <div
          className="relative w-full h-full rounded-full items-center justify-center font-display text-5xl text-ink-soft bg-[#101114]"
          style={{ display: 'none' }}
        >
          {alt?.[0] || '?'}
        </div>
      </motion.div>
    </motion.div>
  )
}