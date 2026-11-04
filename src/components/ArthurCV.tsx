import { FormEvent, MouseEvent, useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import hwhost from '../../hwhost.png'

const EASE = [0.22, 1, 0.36, 1] as const

const NAV = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'apropos', label: 'À propos' },
  { id: 'formation', label: 'Formation' },
  { id: 'competences', label: 'Compétences' },
  { id: 'projets', label: 'Projets' },
  { id: 'contact', label: 'Contact' },
]

const TICKER = [
  'TCP/IP',
  'VLAN',
  'Linux',
  'Windows Server',
  'Active Directory',
  'Wireshark',
  'Docker',
  'Python',
  'Cisco',
  'Git',
]

const ROLES = ['Administration réseau', 'BTS SIO · SISR', 'Paris, France']

const STUDIES = [
  {
    years: '2023 — 2025',
    title: 'BTS SIO — option SISR',
    text: "Services Informatiques aux Organisations, spécialité Solutions d'Infrastructure, Systèmes et Réseaux.",
  },
  {
    years: '2020 — 2023',
    title: 'Baccalauréat général',
    text: 'Spécialités Mathématiques et Numérique et Sciences Informatiques.',
  },
]

const SKILLS = [
  {
    title: 'Réseaux',
    line: 'Relier, segmenter, sécuriser.',
    items: ['TCP/IP', 'DNS', 'DHCP', 'VPN', 'LAN / WAN', 'Sécurité réseau'],
  },
  {
    title: 'Systèmes',
    line: 'Tenir des machines qui restent debout.',
    items: ['Windows Server', 'Linux', 'Active Directory', 'Virtualisation', 'Sauvegarde'],
  },
  {
    title: 'Développement',
    line: 'Des outils courts, lisibles, utiles.',
    items: ['HTML / CSS', 'JavaScript', 'Python', 'Bash', 'SQL'],
  },
  {
    title: 'Outils',
    line: 'Voir le trafic, versionner, virtualiser.',
    items: ['Wireshark', 'VMware', 'Packet Tracer', 'Git', 'Docker'],
  },
]

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/arthurcriere' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/arthurcriere' },
  { label: 'Twitter', href: 'https://twitter.com/arthurcriere' },
]

function Chapter({
  index,
  kicker,
  title,
}: {
  index: string
  kicker: string
  title: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: EASE }}
      className="mb-12 md:mb-16"
    >
      <p className="text-[11px] uppercase tracking-[0.38em] text-[#e7c27a]">
        {index}
        <span className="mx-3 text-white/30">/</span>
        {kicker}
      </p>
      <h2 className="mt-4 font-display text-4xl font-bold leading-[0.95] tracking-tight md:text-6xl">
        {title}
      </h2>
      <motion.div
        className="mt-6 h-px origin-left bg-gradient-to-r from-[#e7c27a] to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: EASE }}
      />
    </motion.div>
  )
}

function ArthurCV() {
  const reduce = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const formationRef = useRef<HTMLDivElement>(null)
  const [intro, setIntro] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('accueil')
  const [role, setRole] = useState(0)
  const [skill, setSkill] = useState(0)
  const [sent, setSent] = useState(false)
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 })
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(heroProgress, [0, 1], [0, -80])
  const heroOpacity = useTransform(heroProgress, [0, 1], [1, 0.25])
  const { scrollYProgress: formationProgress } = useScroll({
    target: formationRef,
    offset: ['start 75%', 'end 55%'],
  })
  const formationScale = useSpring(formationProgress, { stiffness: 80, damping: 24 })

  useEffect(() => {
    if (reduce) {
      setIntro(false)
      return
    }
    const timer = window.setTimeout(() => setIntro(false), 1700)
    return () => window.clearTimeout(timer)
  }, [reduce])

  useEffect(() => {
    if (reduce) return
    const timer = window.setInterval(() => setRole((current) => (current + 1) % ROLES.length), 2600)
    return () => window.clearInterval(timer)
  }, [reduce])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const sections = document.querySelectorAll('section[id]')
      sections.forEach((section) => {
        if (window.scrollY >= (section as HTMLElement).offsetTop - 140) {
          setActiveSection(section.id)
        }
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const scrollToSection = (sectionId: string) => {
    setMenuOpen(false)
    window.setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
    }, 60)
  }

  const submitMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
  }

  const trackPointer = (event: MouseEvent<HTMLDivElement>) => {
    rootRef.current?.style.setProperty('--cx', `${event.clientX}px`)
    rootRef.current?.style.setProperty('--cy', `${event.clientY}px`)
  }

  const heroDelay = reduce ? 0 : 1.25
  const activeSkill = SKILLS[skill]

  return (
    <div
      ref={rootRef}
      className="min-h-screen bg-[#070708] text-[#f6f3ec]"
      onMouseMove={trackPointer}
    >
      <motion.div
        className="fixed left-0 right-0 top-0 z-[90] h-[2px] origin-left bg-[#e7c27a]"
        style={{ scaleX }}
      />
      <div className="cursor-glow" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <nav className="fixed right-5 top-1/2 z-[45] hidden -translate-y-1/2 flex-col gap-3 xl:flex" aria-label="Sections">
        {NAV.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-label={item.label}
            onClick={() => scrollToSection(item.id)}
            className={`w-px transition-all ${
              activeSection === item.id ? 'h-8 bg-[#e7c27a]' : 'h-2 bg-white/30 hover:bg-white/70'
            }`}
          />
        ))}
      </nav>

      <AnimatePresence>
        {intro && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-[80] flex items-center justify-center"
            initial="show"
            animate="show"
            exit="hide"
            variants={{ show: {}, hide: { transition: { duration: 1.05, ease: EASE } } }}
          >
            <motion.div
              className="absolute inset-x-0 top-0 h-1/2 bg-[#070708]"
              variants={{ show: { y: 0 }, hide: { y: '-100%' } }}
              transition={{ duration: 1.05, ease: EASE }}
            />
            <motion.div
              className="absolute inset-x-0 bottom-0 h-1/2 bg-[#070708]"
              variants={{ show: { y: 0 }, hide: { y: '100%' } }}
              transition={{ duration: 1.05, ease: EASE }}
            />
            <div className="relative z-10 text-center">
              <div className="flex justify-center gap-1 overflow-hidden">
                {'ARTHUR'.split('').map((letter, index) => (
                  <motion.span
                    key={letter}
                    initial={{ y: index % 2 ? 28 : -28, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    variants={{ hide: { opacity: 0, y: -12 } }}
                    transition={{ delay: index * 0.06, duration: 0.55, ease: EASE }}
                    className="font-display text-5xl font-extrabold md:text-7xl"
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
              <motion.p
                initial={{ opacity: 0, letterSpacing: '0.2em' }}
                animate={{ opacity: 1, letterSpacing: '0.45em' }}
                variants={{ hide: { opacity: 0 } }}
                transition={{ delay: 0.45, duration: 0.7, ease: EASE }}
                className="mt-3 font-display text-sm font-bold text-[#e7c27a]"
              >
                CRIERE
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled || menuOpen ? 'border-b border-white/10 bg-[#070708]/80 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20 md:px-8">
          <button type="button" onClick={() => scrollToSection('accueil')} className="font-display text-sm font-bold tracking-[0.28em]">
            AC
          </button>
          <div className="hidden items-center gap-7 md:flex">
            {NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`text-[13px] tracking-wide transition-colors ${
                  activeSection === item.id ? 'text-[#e7c27a]' : 'text-[#f6f3ec]/70 hover:text-[#f6f3ec]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-[#f6f3ec]/60 sm:flex">
              <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-[#e7c27a]" />
              Disponible
            </span>
            <button
              type="button"
              className="md:hidden"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="block h-px w-6 bg-[#f6f3ec]" />
              <span className={`mt-1.5 block h-px bg-[#f6f3ec] transition-all ${menuOpen ? 'w-4' : 'w-6'}`} />
            </button>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="overflow-hidden border-t border-white/10 bg-[#070708] md:hidden"
            >
              <div className="flex flex-col px-5 py-4">
                {NAV.map((item, index) => (
                  <motion.button
                    key={item.id}
                    type="button"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                    onClick={() => scrollToSection(item.id)}
                    className="border-b border-white/5 py-4 text-left font-display text-3xl"
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section id="accueil" ref={heroRef} className="relative min-h-[100svh] overflow-hidden">
          <div className="sweep" aria-hidden="true" />
          {!reduce && (
            <motion.div
              className="pointer-events-none absolute -left-20 top-24 h-72 w-72 rounded-full bg-[#e7c27a]/10 blur-3xl"
              animate={{ y: [0, -22, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          <motion.div
            style={reduce ? undefined : { y: heroY, opacity: heroOpacity }}
            className="relative flex min-h-[100svh] flex-col justify-end px-5 pb-10 pt-28 md:px-8"
          >
            <div className="mx-auto grid w-full max-w-6xl items-end gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: heroDelay, duration: 0.7, ease: EASE }}
                  className="text-[11px] uppercase tracking-[0.42em] text-[#e7c27a]"
                >
                  01 — BTS SIO · SISR
                </motion.p>
                <h1 className="mt-5 max-w-full font-display text-[clamp(2.6rem,8.2vw,6.6rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
                  {['ARTHUR', 'CRIERE'].map((line, index) => (
                    <span key={line} className="block overflow-hidden pb-1">
                      <motion.span
                        className={`block py-1 pr-2 ${index === 1 ? 'text-[#e7c27a]' : ''}`}
                        initial={{ y: '110%' }}
                        animate={{ y: '0%' }}
                        transition={{ delay: heroDelay + index * 0.12, duration: 1, ease: EASE }}
                      >
                        {line}
                      </motion.span>
                    </span>
                  ))}
                </h1>
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: heroDelay + 0.28, duration: 0.8, ease: EASE }}
                  className="mt-6 max-w-md text-lg font-light leading-relaxed text-[#f6f3ec]/75"
                >
                  Infrastructures sobres, solides, et tenues dans le temps.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: heroDelay + 0.4, duration: 0.8, ease: EASE }}
                  className="mt-8 flex flex-wrap gap-3"
                >
                  <button
                    type="button"
                    onClick={() => scrollToSection('contact')}
                    className="bg-[#e7c27a] px-6 py-3 text-sm font-medium text-[#14110c] transition-transform hover:-translate-y-0.5"
                  >
                    Me contacter
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection('projets')}
                    className="border border-white/20 px-6 py-3 text-sm transition-colors hover:border-[#e7c27a] hover:text-[#e7c27a]"
                  >
                    Voir les projets
                  </button>
                </motion.div>
              </div>

              <motion.aside
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: heroDelay + 0.35, duration: 0.8, ease: EASE }}
                className="border border-white/10 bg-[#0c0c10]/80 p-6 backdrop-blur-sm lg:col-span-4"
              >
                <div className="flex items-center gap-5">
                  <div className="relative h-24 w-24 shrink-0">
                    <div className="orbit absolute inset-0 rounded-full border border-dashed border-[#e7c27a]/60" />
                    <div className="absolute inset-3 flex items-center justify-center rounded-full border border-white/10 font-display text-xl font-bold text-[#e7c27a]">
                      AC
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.32em] text-[#f6f3ec]/45">En ce moment</p>
                    <div className="mt-2 h-8 overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={ROLES[role]}
                          initial={{ y: 16, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -16, opacity: 0 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          className="font-display text-xl font-bold"
                        >
                          {ROLES[role]}
                        </motion.p>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-5 text-center">
                  {[
                    ['BTS', 'SIO'],
                    ['SISR', 'Option'],
                    ['Paris', 'Ville'],
                  ].map(([value, label]) => (
                    <div key={label}>
                      <p className="font-display text-lg font-bold">{value}</p>
                      <p className="text-[10px] uppercase tracking-[0.16em] text-[#f6f3ec]/40">{label}</p>
                    </div>
                  ))}
                </div>
              </motion.aside>
            </div>

            <div className="mx-auto mt-12 grid w-full max-w-6xl grid-cols-3 gap-2 sm:grid-cols-6">
              {NAV.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`border px-3 py-3 text-left transition-colors ${
                    activeSection === item.id
                      ? 'border-[#e7c27a] text-[#e7c27a]'
                      : 'border-white/10 text-[#f6f3ec]/60 hover:border-white/30'
                  }`}
                >
                  <span className="block text-[10px] tracking-[0.22em]">0{index + 1}</span>
                  <span className="mt-1 block text-sm">{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </section>

        <div className="overflow-hidden border-y border-white/10 bg-[#0c0c10]">
          <div className="ticker-track gap-10 py-4">
            {[...TICKER, ...TICKER].map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="flex items-center gap-10 text-[11px] uppercase tracking-[0.35em] text-[#f6f3ec]/55"
              >
                {item}
                <span className="text-[#e7c27a]">✦</span>
              </span>
            ))}
          </div>
        </div>

        <section id="apropos" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
          <Chapter index="02" kicker="Profil" title="À propos" />
          <div className="grid items-start gap-12 md:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: EASE }}
              className="md:col-span-5"
            >
              <div className="relative flex min-h-[340px] flex-col justify-between overflow-hidden border border-white/10 bg-[#101014] p-8">
                <div className="sweep" aria-hidden="true" />
                <p className="relative text-[11px] uppercase tracking-[0.32em] text-[#f6f3ec]/40">Paris</p>
                <p className="relative font-display text-7xl font-extrabold leading-none text-[#e7c27a] md:text-8xl">AC</p>
                <p className="relative max-w-[16rem] text-sm leading-relaxed text-[#f6f3ec]/60">
                  Administration réseau, systèmes et infrastructures.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
              className="space-y-6 md:col-span-7"
            >
              <p className="font-display text-3xl font-semibold leading-tight md:text-5xl">
                Construire des réseaux que l’on peut expliquer, surveiller et faire durer.
              </p>
              <p className="text-lg leading-relaxed text-[#f6f3ec]/70">
                Passionné par l’informatique et les technologies réseau, je suis étudiant en BTS Services
                Informatiques aux Organisations, option Solutions d’Infrastructure, Systèmes et Réseaux.
              </p>
              <p className="text-lg leading-relaxed text-[#f6f3ec]/70">
                Mon objectif est de devenir administrateur réseau et de contribuer à des infrastructures
                robustes et sécurisées.
              </p>
            </motion.div>
          </div>
        </section>

        <section id="formation" className="border-y border-white/10 bg-[#0c0c10]">
          <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
            <Chapter index="03" kicker="Parcours" title="Formation" />
            <div ref={formationRef} className="relative space-y-6 md:pl-8">
              <div className="absolute bottom-0 left-0 top-0 hidden w-px bg-white/10 md:block" />
              <motion.div
                style={{ scaleY: reduce ? 1 : formationScale }}
                className="absolute bottom-0 left-0 top-0 hidden w-px origin-top bg-[#e7c27a] md:block"
              />
              {STUDIES.map((study, index) => (
                <motion.article
                  key={study.title}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
                  className="relative border border-white/10 bg-[#070708] p-6 md:ml-8 md:p-8"
                >
                  <span className="absolute -left-[2.4rem] top-8 hidden h-2.5 w-2.5 rounded-full bg-[#e7c27a] md:block" />
                  <p className="text-[11px] uppercase tracking-[0.32em] text-[#e7c27a]">{study.years}</p>
                  <h3 className="mt-3 font-display text-2xl font-bold md:text-3xl">{study.title}</h3>
                  <p className="mt-3 max-w-2xl leading-relaxed text-[#f6f3ec]/70">{study.text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="competences" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
          <Chapter index="04" kicker="Savoir-faire" title="Compétences" />
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="flex flex-col gap-2 lg:col-span-4">
              {SKILLS.map((group, index) => (
                <button
                  key={group.title}
                  type="button"
                  onMouseEnter={() => setSkill(index)}
                  onFocus={() => setSkill(index)}
                  onClick={() => setSkill(index)}
                  className={`border px-4 py-4 text-left transition-colors ${
                    skill === index
                      ? 'border-[#e7c27a] bg-[#e7c27a]/10 text-[#e7c27a]'
                      : 'border-white/10 text-[#f6f3ec]/55 hover:border-white/30'
                  }`}
                >
                  <span className="text-[10px] tracking-[0.28em]">0{index + 1}</span>
                  <span className="mt-1 block font-display text-2xl font-bold">{group.title}</span>
                </button>
              ))}
            </div>
            <div className="border border-white/10 p-6 md:p-10 lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSkill.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <p className="font-display text-5xl font-extrabold tracking-tight md:text-7xl">{activeSkill.title}</p>
                  <p className="mt-4 text-lg text-[#f6f3ec]/70">{activeSkill.line}</p>
                  <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                    {activeSkill.items.map((item) => (
                      <li key={item} className="border border-white/10 px-4 py-3 text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section id="projets" className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-5 pb-8 pt-24 md:px-8 md:pt-32">
            <Chapter index="05" kicker="Sélection" title="Projets" />
          </div>
          {PROJECTS.map((project, index) => (
            <article
              key={project.num}
              style={{ zIndex: index + 1 }}
              className="sticky top-0 flex min-h-[100svh] items-center border-t border-white/10 bg-[#070708] px-5 py-24 md:px-8"
            >
              <div className="mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-2">
                <div>
                  <p className="text-[11px] tracking-[0.35em] text-[#e7c27a]">{project.num} / 03</p>
                  <h3 className="mt-3 font-display text-4xl font-extrabold leading-[0.95] md:text-6xl">{project.title}</h3>
                  <p className="mt-5 max-w-md text-lg leading-relaxed text-[#f6f3ec]/70">{project.text}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="border border-white/15 px-2 py-1 text-[11px] uppercase tracking-[0.16em] text-[#f6f3ec]/70">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <ProjectVisual kind={project.kind} />
              </div>
            </article>
          ))}
        </section>

        <section id="contact" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
          <Chapter index="06" kicker="Écrire" title="Contact" />
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <p className="max-w-md font-display text-3xl font-semibold leading-tight md:text-4xl">
                Un stage, une alternance, ou juste le réseau.
              </p>
              <dl className="mt-8 space-y-5">
                {[
                  ['Email', 'arthur.criere@email.com'],
                  ['Téléphone', '+33 6 12 34 56 78'],
                  ['Ville', 'Paris, France'],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-[11px] uppercase tracking-[0.28em] text-[#e7c27a]">{label}</dt>
                    <dd className="mt-1 text-lg">{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex gap-5">
                {SOCIALS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#f6f3ec]/70 underline-offset-4 hover:text-[#e7c27a] hover:underline"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="border border-white/10 bg-[#0c0c10] p-6 md:p-8">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="sent"
                    role="status"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="flex min-h-[320px] flex-col justify-between"
                  >
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.32em] text-[#e7c27a]">Message noté</p>
                      <p className="mt-4 font-display text-4xl font-bold leading-tight">
                        Merci{nom.trim() ? `, ${nom.trim()}` : ''}.
                      </p>
                      <p className="mt-4 leading-relaxed text-[#f6f3ec]/70">
                        En production, ce message partirait par email. Ici, il reste sur la page.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setNom('')
                        setEmail('')
                        setMessage('')
                        setSent(false)
                      }}
                      className="mt-8 self-start border border-white/20 px-5 py-2 text-sm hover:border-[#e7c27a]"
                    >
                      Écrire un autre message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" className="space-y-5" onSubmit={submitMessage} exit={{ opacity: 0, y: -8 }}>
                    <Field id="nom" label="Nom" value={nom} onChange={setNom} placeholder="Votre nom" />
                    <Field id="email" label="Email" type="email" value={email} onChange={setEmail} placeholder="vous@email.com" />
                    <label className="block text-sm" htmlFor="message">
                      Message
                      <textarea
                        id="message"
                        required
                        rows={4}
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        placeholder="Votre message"
                        className="mt-2 w-full resize-none border border-white/10 bg-[#121216] px-4 py-3 text-[#f6f3ec] outline-none placeholder:text-[#8d877c] focus:border-[#e7c27a]"
                      />
                    </label>
                    <button type="submit" className="w-full bg-[#e7c27a] py-3 text-sm font-medium text-[#14110c] transition-transform hover:-translate-y-0.5">
                      Envoyer le message
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-5 py-8 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm text-[#f6f3ec]/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2024 Arthur CRIERE</p>
          <p>React, TypeScript, Tailwind</p>
        </div>
      </footer>
    </div>
  )
}

const PROJECTS = [
  {
    num: '01',
    title: 'Réseau d’entreprise',
    text: 'Infrastructure complète : VLAN, sécurité et monitoring.',
    tags: ['Cisco', 'VLAN', 'Sécurité'],
    kind: 'net',
  },
  {
    num: '02',
    title: 'Serveur Linux',
    text: 'Ubuntu en production locale : services web et base de données.',
    tags: ['Ubuntu', 'Apache', 'MySQL'],
    kind: 'term',
  },
  {
    num: '03',
    title: 'HwHost',
    text: 'Présidence de l’association : bénévoles, présence en ligne et produits digitaux.',
    tags: ['Association', 'Produit', 'Réseau'],
    kind: 'logo',
  },
] as const

function ProjectVisual({ kind }: { kind: (typeof PROJECTS)[number]['kind'] }) {
  const reduce = useReducedMotion()
  if (kind === 'term') {
    return (
      <div className="h-56 overflow-hidden border border-white/10 bg-[#0b0d10] p-6 font-mono text-sm leading-7 text-[#b7f0c2] md:h-80">
        <p className="text-[#f6f3ec]/40">ubuntu — bash</p>
        <p>$ systemctl status apache2</p>
        <p className="text-[#e7c27a]">active (running)</p>
        <p>$ mysqladmin ping</p>
        <p>mysqld is alive</p>
      </div>
    )
  }
  if (kind === 'logo') {
    return (
      <div className="flex h-56 items-center justify-center border border-white/10 bg-[#140a22] p-8 md:h-80">
        <img src={hwhost} alt="Logo HwHost" className="max-h-full w-full object-contain" />
      </div>
    )
  }
  return (
    <div className="relative h-56 overflow-hidden border border-white/10 bg-[#10141c] md:h-80">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(231,194,122,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(231,194,122,0.16)_1px,transparent_1px)] bg-[size:32px_32px]" />
      {!reduce && <PulseDot className="left-[18%] top-[30%]" delay={0} />}
      <span className="absolute left-[18%] top-[30%] h-2.5 w-2.5 rounded-full bg-[#e7c27a]" />
      <span className="absolute left-[46%] top-[58%] h-2.5 w-2.5 rounded-full bg-[#7ee0d6]" />
      <span className="absolute left-[70%] top-[28%] h-2.5 w-2.5 rounded-full bg-[#f6f3ec]" />
      <span className="absolute left-[20%] top-[34%] h-px w-[28%] origin-left rotate-[22deg] bg-[#e7c27a]/60" />
      <span className="absolute left-[48%] top-[56%] h-px w-[22%] origin-left -rotate-[28deg] bg-[#7ee0d6]/60" />
    </div>
  )
}

function PulseDot({ className, delay }: { className: string; delay: number }) {
  return (
    <motion.span
      className={`absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#e7c27a]/50 ${className}`}
      animate={{ scale: [0.6, 1.6], opacity: [0.7, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, delay, ease: 'easeOut' }}
    />
  )
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
  type?: string
}) {
  return (
    <label className="block text-sm" htmlFor={id}>
      {label}
      <input
        id={id}
        type={type}
        required
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full border border-white/10 bg-[#121216] px-4 py-3 text-[#f6f3ec] outline-none placeholder:text-[#8d877c] focus:border-[#e7c27a]"
      />
    </label>
  )
}

export default ArthurCV
