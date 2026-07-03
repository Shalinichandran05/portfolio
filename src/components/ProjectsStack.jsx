import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'

export default function ProjectsStack({ projects }) {
  return (
    <div className="relative">
      {projects.map((p, i) => (
        <div key={p.name} className="sticky top-20 md:top-24" style={{ zIndex: i + 1 }}>
          <div className="min-h-[64vh] md:min-h-[72vh] flex items-center pb-8">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="w-full card-surface rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-glow-lg hover:shadow-glow transition-shadow duration-300"
            >
              <div className="h-56 md:h-full bg-[#101114] flex items-center justify-center">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.nextSibling.style.display = 'flex'
                  }}
                />
                <span className="hidden px-5 text-center font-body text-sm text-ink-faint">Project image coming soon</span>
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <p className="font-body text-xs tracking-[0.25em] uppercase text-ink-faint mb-2">
                  {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </p>
                <h3 className="font-display font-semibold text-2xl md:text-3xl text-ink mb-3">{p.name}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tech.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full text-xs font-body text-glow border border-white/10 bg-white/[0.035]">
                      {t}
                    </span>
                  ))}
                </div>
                <p className="font-body text-sm md:text-base text-ink-soft leading-relaxed mb-7">{p.description}</p>
                <div className="flex gap-4">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-sm text-ink hover:border-glow hover:text-glow hover:shadow-glow-sm transition-all duration-300"
                  >
                    <Github size={16} /> GitHub
                  </a>
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white text-sm hover:bg-[#0091FF] hover:shadow-glow transition-all duration-300"
                  >
                    <ExternalLink size={16} /> Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      ))}
    </div>
  )
}