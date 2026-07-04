import { useCallback, useRef, useState } from 'react'
import Hero from '../components/Hero.jsx'
import Section from '../components/Section.jsx'
import StoryFlow from '../components/StoryFlow.jsx'
import About from '../components/About.jsx'
import { SkillsSphere, SoftSkillsCloud } from '../components/Skills.jsx'
import ProjectsStack from '../components/ProjectsStack.jsx'
import Experience from '../components/Experience.jsx'
import { TeammateCards } from '../components/TeamNote.jsx'
import Achievements from '../components/Achievements.jsx'
import Contact from '../components/Contact.jsx'
import PaperAirplane from '../components/PaperAirplane.jsx'
import SecretMessageBubble from '../components/SecretMessageBubble.jsx'
import SecretPage from '../components/SecretPage.jsx'
import ExploreNotification from '../components/ExploreNotification.jsx'
import DocumentModal from '../components/DocumentModal.jsx'
import useSecretUnlock from '../components/useSecretUnlock.js'
import {
  profile,
  storyNodes,
  technicalSkills,
  visitorAbout,
  softSkills,
  projects,
  experience,
  teammateNotes,
  achievements,
  certifications,
  socials,
} from '../data/content.js'

export default function VisitorView() {
  const [arrivalPulse, setArrivalPulse] = useState(false)
  const [clickPulse, setClickPulse] = useState(false)
  const [resumeOpen, setResumeOpen] = useState(false)
  const arrivalTimeoutRef = useRef(null)
  const clickTimeoutRef = useRef(null)
  const secret = useSecretUnlock()

  const triggerArrivalPulse = useCallback(() => {
    if (arrivalTimeoutRef.current) clearTimeout(arrivalTimeoutRef.current)
    setArrivalPulse(true)
    arrivalTimeoutRef.current = setTimeout(() => setArrivalPulse(false), 350)
  }, [])

  const handleProfileClick = useCallback(() => {
    secret.handleClick()
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current)
    setClickPulse(true)
    clickTimeoutRef.current = setTimeout(() => setClickPulse(false), 300)
  }, [secret])

  return (
    <div className="relative">
      <div className="relative">
        <PaperAirplane onArrive={triggerArrivalPulse} />
        <Hero
          title="Hey, I'm Shalu"
          name="Shalu"
          subtitle="A developer who's still endlessly curious"
          description="This is the more human side of my portfolio - how I got here, what I've built, and how I show up on a team. Feel free to explore in any order."
          image={profile.casualImage}
          imageAlt="Shalini, casual photo"
          buttons={[
            { label: 'Resume', href: profile.resumeUrl },
            { label: 'Projects', href: '#projects' },
            { label: 'Contact', href: '#connect' },
          ]}
          onResumeClick={() => setResumeOpen(true)}
          onImageClick={handleProfileClick}
          shake={arrivalPulse || clickPulse}
          imageAdornment={<SecretMessageBubble message={secret.message} />}
        />
      </div>

      <Section id="story" eyebrow="Portfolio As A Story" title="Pick a starting point">
        <StoryFlow nodes={storyNodes} />
      </Section>

      <Section id="hero-about" eyebrow="Meet Shalu" title="A little about me">
        <About content={visitorAbout} />
      </Section>

      <Section id="skills" eyebrow="Skills I'm Building" title="What I'm working with, and on">
        <SkillsSphere skills={technicalSkills} label="Technical Stack" />
        <SoftSkillsCloud skills={softSkills} label="Skills Beyond Code" />
      </Section>

      <Section id="projects" eyebrow="Things I've Built" title="A few things worth showing">
        <ProjectsStack projects={projects} />
      </Section>

      <Section id="experience" eyebrow="Real World Experience" title="Where I've put this into practice">
        <Experience items={experience} variant="visitor" />
      </Section>

      <Section id="teammate" eyebrow="How I Am As A Teammate" title="What it's like working with me">
        <TeammateCards items={teammateNotes} />
      </Section>

      <Section id="achievements" eyebrow="Achievements Unlocked" title="Moments I'm proud of">
        <Achievements items={achievements} />
        <div className="mt-10 border-t border-white/10 pt-7">
          <p className="mb-5 font-body text-xs tracking-[0.24em] uppercase text-ink-faint">Certifications</p>
          <Achievements items={certifications} />
        </div>
      </Section>

      <Section id="connect" eyebrow="Let's Connect" title="Say hello">
        <Contact socials={socials} intro="Whether you want to talk about projects, startups, ideas, technology, or simply say hello, I'd love to hear from you." />
      </Section>

      <DocumentModal open={resumeOpen} title="Resume" src={profile.resumeUrl} onClose={() => setResumeOpen(false)} downloadLabel="Download resume" />
      <SecretPage open={secret.unlocked} onClose={secret.close} />
      <ExploreNotification />
    </div>
  )
}
