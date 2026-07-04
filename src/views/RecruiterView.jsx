import { useState } from 'react'
import Hero from '../components/Hero.jsx'
import Section from '../components/Section.jsx'
import HireRoadmap, { HireRoadmapMobile } from '../components/HireRoadmap.jsx'
import About from '../components/About.jsx'
import { SkillsSphere, SoftSkillsCloud } from '../components/Skills.jsx'
import Experience from '../components/Experience.jsx'
import ProjectsStack from '../components/ProjectsStack.jsx'
import Achievements from '../components/Achievements.jsx'
import { TeamNote } from '../components/TeamNote.jsx'
import Contact from '../components/Contact.jsx'
import DocumentModal from '../components/DocumentModal.jsx'
import {
  profile,
  hireRoadmap,
  technicalSkills,
  softSkills,
  experience,
  projects,
  achievements,
  certifications,
  socials,
} from '../data/content.js'

export default function RecruiterView() {
  const [resumeOpen, setResumeOpen] = useState(false)

  return (
    <div>
      <Hero
        title="Shalini"
        subtitle="Software Developer | Information Technology Undergraduate | Developer at CRACOE"
        description="I write code that ships, ask questions before I assume, and care as much about how a feature feels as whether it works. Currently looking for a team to grow with."
        image={profile.professionalImage}
        imageAlt="Shalini, professional photo"
        onResumeClick={() => setResumeOpen(true)}
        buttons={[
          { label: 'Resume', href: profile.resumeUrl },
          { label: 'Projects', href: '#projects' },
          { label: 'Contact', href: '#contact' },
        ]}
      />

      <Section id="hire" eyebrow="What Happens When You Hire Me" title="A short roadmap of how I work" subtitle="From day one to becoming someone your team can rely on.">
        <HireRoadmap steps={hireRoadmap} />
        <HireRoadmapMobile steps={hireRoadmap} />
      </Section>

      <Section id="about" eyebrow="About Me" title="A bit more about how I think">
        <About
          paragraphs={[
            "I'm a developer who likes untangling problems as much as building new things. I care about clean, maintainable code - but I care more about whether the people using what I build actually have a good experience.",
            'Outside of pure development, I have presented research at IEEE conferences, taught workshops, and spent time on the community and communication side of a startup - which taught me that good engineering is rarely just about the code.',
            "I'm looking for a team where I can keep learning quickly and contribute meaningfully from early on.",
          ]}
        />
      </Section>

      <Section id="skills" eyebrow="Skills" title="What I work with">
        <p className="font-body text-xs tracking-[0.25em] uppercase text-ink-faint text-center mb-2">Technical</p>
        <SkillsSphere skills={technicalSkills} />
        <p className="font-body text-xs tracking-[0.25em] uppercase text-ink-faint text-center mt-10 mb-2">Soft Skills</p>
        <SoftSkillsCloud skills={softSkills} />
      </Section>

      <Section id="experience" eyebrow="Professional Experience" title="Where I've worked">
        <Experience items={experience} />
      </Section>

      <Section id="projects" eyebrow="Projects" title="Things I've built" innerClassName="">
        <ProjectsStack projects={projects} />
      </Section>

      <Section id="achievements" eyebrow="Achievements" title="Recognition along the way">
        <Achievements items={achievements} />
      </Section>

      <Section id="certifications" eyebrow="Certifications" title="Continued learning">
        <Achievements items={certifications} />
      </Section>

      <Section id="team-note" eyebrow="A Note To The Team I'll Work With">
        <TeamNote text="As a final-year Information Technology student, I bring curiosity, consistency, and a willingness to learn quickly. I enjoy asking questions, collaborating with others, and improving through feedback. My goal is not just to write code, but to become someone a team can rely on when solving problems and building meaningful products." />
      </Section>

      <Section id="contact" eyebrow="Contact" title="Let's talk">
        <Contact socials={socials} />
      </Section>

      <DocumentModal open={resumeOpen} title="Resume" src={profile.resumeUrl} onClose={() => setResumeOpen(false)} downloadLabel="Download resume" />
    </div>
  )
}