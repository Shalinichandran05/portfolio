# Shalini — Portfolio

A premium, interactive portfolio built with React + Vite, Tailwind CSS, and Framer Motion.
Landing on a "Choose Your Path" gate, it splits into a **Recruiter View** and a **Visitor View**,
with a couple of hidden features tucked into the visitor side.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## What to customize before publishing

1. **Images** — drop files into `public/images/` (see `public/images/README.txt` for the exact
   filenames the code expects: hero photos, project images, memory-wall polaroids). The layout
   degrades gracefully if an image is missing, but real photos make a big difference here.
2. **Resume** — replace `public/resume.pdf` (or update `profile.resumeUrl` in
   `src/data/content.js` if you host it elsewhere).
3. **Certificates** — drop PDFs into `public/certs/` matching the filenames in
   `src/data/content.js` (`achievements` and `certifications` arrays).
4. **Contact form (EmailJS)** — create a free account at [emailjs.com](https://www.emailjs.com/),
   set up a service + template, then fill in `emailjsConfig` in `src/data/content.js` with your
   `serviceId`, `templateId`, and `publicKey`.
5. **Social links** — update the `socials` array in `src/data/content.js`.
6. **Copy** — all text content (bios, project descriptions, achievements, memories, etc.) lives in
   `src/data/content.js` so you can edit it without touching component code.

## Structure

```
src/
  App.jsx              // gate + view switching
  components/          // all reusable UI pieces
  views/
    RecruiterView.jsx
    VisitorView.jsx
  data/content.js       // all copy + config in one place
```

## Notes on the hidden features (visitor view only)

- A small paper-airplane icon periodically flies toward the profile photo; on arrival the photo
  gives a subtle shake and its glow intensifies.
- Clicking the profile photo five times in a row unlocks a hidden **Secret Page** with a
  polaroid-style memory wall.
- After a few minutes on the page, a small toast thanks the visitor for exploring.

## Browser support note

The traveling particle on the "What Happens When You Hire Me" roadmap uses the CSS `offset-path`
property (Motion Path). It's supported in all Chromium-based browsers and Safari; on older Firefox
versions the particle simply won't animate along the curve, but the rest of the section still
works.
