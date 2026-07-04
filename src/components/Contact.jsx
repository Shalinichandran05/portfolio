import { motion } from 'framer-motion'
import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { Send, Github, Linkedin, Mail } from 'lucide-react'
import { emailjsConfig } from '../data/content.js'

const iconFor = (label) => {
  if (label === 'GitHub') return Github
  if (label === 'LinkedIn') return Linkedin
  return Mail
}

export default function Contact({ socials, intro = 'Prefer a direct line? Find me here.' }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const directEmail = socials.find((social) => social.url?.startsWith('mailto:'))?.url.replace('mailto:', '')
  const isEmailjsConfigured = Object.values(emailjsConfig).every((value) => value && !value.startsWith('YOUR_'))

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    if (!isEmailjsConfigured && directEmail) {
      const subject = encodeURIComponent(`Portfolio message from ${form.name}`)
      const body = encodeURIComponent(`From: ${form.name} <${form.email}>\n\n${form.message}`)
      window.location.href = `mailto:${directEmail}?subject=${subject}&body=${body}`
      setStatus('idle')
      return
    }

    try {
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        { from_name: form.name, from_email: form.email, message: form.message },
        emailjsConfig.publicKey
      )
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-5"
      >
        <p className="font-body text-ink-soft leading-relaxed max-w-sm">
          {intro}
        </p>
        {socials.map((s) => {
          const Icon = iconFor(s.label)
          const isMailLink = s.url?.startsWith('mailto:')
          return (
            <a
              key={s.label}
              href={s.url}
              target={isMailLink ? undefined : '_blank'}
              rel={isMailLink ? undefined : 'noreferrer'}
              className="group flex items-center gap-3 font-body text-ink-soft hover:text-glow transition-colors duration-300 w-fit"
            >
              <span className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-glow group-hover:shadow-glow-sm transition-all duration-300">
                <Icon size={16} />
              </span>
              {s.label}
            </a>
          )
        })}
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col gap-4"
      >
        <input
          required
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="bg-white/[0.035] border border-white/10 rounded-xl px-5 py-3.5 font-body text-sm text-ink placeholder:text-ink-faint focus:border-glow outline-none transition-colors duration-300"
        />
        <input
          required
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="bg-white/[0.035] border border-white/10 rounded-xl px-5 py-3.5 font-body text-sm text-ink placeholder:text-ink-faint focus:border-glow outline-none transition-colors duration-300"
        />
        <textarea
          required
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Message"
          rows={5}
          className="bg-white/[0.035] border border-white/10 rounded-xl px-5 py-3.5 font-body text-sm text-ink placeholder:text-ink-faint focus:border-glow outline-none transition-colors duration-300 resize-none"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-accent text-white font-body text-sm hover:bg-[#0091FF] hover:shadow-glow transition-all duration-300 disabled:opacity-60"
        >
          <Send size={16} />
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>

        {status === 'sent' && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-body text-sm text-glow text-center"
          >
            Your message is on its way.
          </motion.p>
        )}
        {status === 'error' && (
          <p className="font-body text-sm text-red-400 text-center">
            Something went wrong - please try again, or reach out directly.
          </p>
        )}
      </motion.form>
    </div>
  )
}
