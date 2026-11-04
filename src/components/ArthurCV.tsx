import { FormEvent, ReactNode, useEffect, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
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
    items: ['TCP/IP', 'DNS', 'DHCP', 'VPN', 'LAN / WAN', 'Sécurité réseau'],
  },
  {
    title: 'Systèmes',
    items: ['Windows Server', 'Linux', 'Active Directory', 'Virtualisation', 'Sauvegarde'],
  },
  {
    title: 'Développement',
    items: ['HTML / CSS', 'JavaScript', 'Python', 'Bash', 'SQL'],
  },
  {
    title: 'Outils',
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
  const [intro, setIntro] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('accueil')
  const [sent, setSent] = useState(false)
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  })

  useEffect(() => {
    if (reduce) {
      setIntro(false)
      return
    }
    const timer = window.setTimeout(() => setIntro(false), 1500)
    return () => window.clearTimeout(timer)
  }, [reduce])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const sections = document.querySelectorAll('section[id]')
      sections.forEach((section) => {
        if (window.scrollY >= (section as HTMLElement).offsetTop - 120) {
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
    document.getElementById(sectionId)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
    setMenuOpen(false)
  }

  const submitMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
  }

  const heroDelay = reduce ? 0 : 1.15

  return (
    <div className="min-h-screen bg-[#070708] text-[#f6f3ec]">
      <motion.div
        className="fixed left-0 right-0 top-0 z-[90] h-[2px] origin-left bg-[#e7c27a]"
        style={{ scaleX }}
      />

      <div className="grain" aria-hidden="true" />

      <AnimatePresence>
        {intro && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-[80] flex items-center justify-center"
            initial="show"
            animate="show"
            exit="hide"
            variants={{
              show: {},
              hide: { transition: { duration: 1.05, ease: EASE } },
            }}
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
            <motion.p
              variants={{
                show: { opacity: 1, letterSpacing: '0.55em' },
                hide: { opacity: 0, y: -12 },
              }}
              initial={{ opacity: 0, letterSpacing: '0.2em' }}
              animate={{ opacity: 1, letterSpacing: '0.55em' }}
              className="relative z-10 font-display text-sm font-bold text-[#e7c27a]"
            >
              AC
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled || menuOpen
            ? 'border-b border-white/10 bg-[#070708]/80 backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20 md:px-8">
          <button
            type="button"
            onClick={() => scrollToSection('accueil')}
            className="font-display text-sm font-bold tracking-[0.28em]"
          >
            AC
          </button>

          <nav className="hidden items-center gap-7 md:flex">
            {NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`text-[13px] tracking-wide transition-colors ${
                  activeSection === item.id
                    ? 'text-[#e7c27a]'
                    : 'text-[#f6f3ec]/70 hover:text-[#f6f3ec]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

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
            <motion.nav
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
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section
          id="accueil"
          className="relative flex min-h-screen items-end overflow-hidden px-5 pb-16 pt-28 md:px-8"
          onMouseMove={(event) => {
            const bounds = event.currentTarget.getBoundingClientRect()
            event.currentTarget.style.setProperty('--mx', `${event.clientX - bounds.left}px`)
            event.currentTarget.style.setProperty('--my', `${event.clientY - bounds.top}px`)
          }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(520px circle at var(--mx, 70%) var(--my, 30%), rgba(231,194,122,0.16), transparent 42%)',
            }}
          />
          {!reduce && (
            <>
              <motion.div
                className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#e7c27a]/10 blur-3xl"
                animate={{ y: [0, -24, 0], x: [0, 16, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="pointer-events-none absolute bottom-10 right-0 h-80 w-80 rounded-full bg-[#7ee0d6]/10 blur-3xl"
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
              />
            </>
          )}
          <div className="pointer-events-none absolute inset-8 hidden border border-white/10 md:block" />

          <div className="relative z-10 mx-auto w-full max-w-6xl">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: heroDelay, duration: 0.7, ease: EASE }}
              className="text-[11px] uppercase tracking-[0.42em] text-[#e7c27a]"
            >
              01 — BTS SIO · SISR
            </motion.p>

            <h1 className="mt-6 max-w-full font-display text-[clamp(2.35rem,11vw,7.5rem)] font-extrabold leading-[0.86] tracking-[-0.045em]">
              {['ARTHUR', 'CRIERE'].map((line, index) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    className={`block ${index === 1 ? 'text-[#e7c27a]' : ''}`}
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ delay: heroDelay + index * 0.12, duration: 1.05, ease: EASE }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <div className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between">
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: heroDelay + 0.28, duration: 0.8, ease: EASE }}
                className="max-w-md text-lg font-light leading-relaxed text-[#f6f3ec]/75 md:text-xl"
              >
                Étudiant en administration réseau. Infrastructures sobres, solides, et tenues dans le temps.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: heroDelay + 0.4, duration: 0.8, ease: EASE }}
                className="flex flex-wrap gap-3"
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
                  className="border border-white/20 px-6 py-3 text-sm text-[#f6f3ec] transition-colors hover:border-[#e7c27a] hover:text-[#e7c27a]"
                >
                  Voir les projets
                </button>
              </motion.div>
            </div>
          </div>
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
              <div className="relative flex min-h-[320px] flex-col justify-between border border-white/10 bg-[#101014] p-8">
                <p className="text-[11px] uppercase tracking-[0.32em] text-[#f6f3ec]/40">Paris</p>
                <p className="font-display text-7xl font-extrabold leading-none text-[#e7c27a] md:text-8xl">AC</p>
                <p className="max-w-[14rem] text-sm leading-relaxed text-[#f6f3ec]/60">
                  Administration réseau, systèmes et infrastructures.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              className="space-y-6 md:col-span-7 md:pt-4"
            >
              <p className="font-display text-3xl font-semibold leading-tight md:text-4xl">
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
              <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                {[
                  ['BTS SIO', 'En cours'],
                  ['SISR', 'Spécialité'],
                  ['Paris', 'France'],
                ].map(([label, detail]) => (
                  <div key={label}>
                    <p className="font-display text-lg font-bold md:text-2xl">{label}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#f6f3ec]/45">{detail}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="formation" className="border-y border-white/10 bg-[#0c0c10]">
          <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
            <Chapter index="03" kicker="Parcours" title="Formation" />
            <div className="relative space-y-6 md:pl-8">
              <div className="absolute bottom-0 left-0 top-0 hidden w-px bg-white/10 md:block" />
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
                  <h3 className="mt-3 font-display text-2xl font-bold">{study.title}</h3>
                  <p className="mt-3 max-w-2xl leading-relaxed text-[#f6f3ec]/70">{study.text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="competences" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
          <Chapter index="04" kicker="Savoir-faire" title="Compétences" />
          <div className="grid gap-4 md:grid-cols-2">
            {SKILLS.map((group, groupIndex) => (
              <motion.article
                key={group.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: groupIndex * 0.06, ease: EASE }}
                className="border border-white/10 p-6 md:p-8"
              >
                <h3 className="font-display text-2xl font-bold">{group.title}</h3>
                <ul className="mt-6 space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center justify-between border-b border-white/5 pb-3 text-sm">
                      <span>{item}</span>
                      <span className="h-px w-8 bg-[#e7c27a]/70" />
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="projets" className="border-t border-white/10 bg-[#0c0c10]">
          <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
            <Chapter index="05" kicker="Sélection" title="Projets" />
            <div className="grid gap-5 lg:grid-cols-3">
              <ProjectCard
                num="01"
                title="Réseau d’entreprise"
                text="Infrastructure complète : VLAN, sécurité et monitoring."
                tags={['Cisco', 'VLAN', 'Sécurité']}
              >
                <div className="relative h-44 overflow-hidden bg-[#10141c]">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(231,194,122,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(231,194,122,0.15)_1px,transparent_1px)] bg-[size:28px_28px]" />
                  <span className="absolute left-6 top-8 h-2 w-2 rounded-full bg-[#e7c27a]" />
                  <span className="absolute left-20 top-16 h-2 w-2 rounded-full bg-[#7ee0d6]" />
                  <span className="absolute left-36 top-10 h-2 w-2 rounded-full bg-[#f6f3ec]" />
                  <span className="absolute left-6 top-9 h-px w-32 origin-left rotate-[18deg] bg-[#e7c27a]/50" />
                </div>
              </ProjectCard>
              <ProjectCard
                num="02"
                title="Serveur Linux"
                text="Ubuntu en production locale : services web et base de données."
                tags={['Ubuntu', 'Apache', 'MySQL']}
              >
                <div className="h-44 bg-[#0b0d10] p-5 font-mono text-[12px] leading-6 text-[#b7f0c2]">
                  <p className="text-[#f6f3ec]/40">ubuntu — bash</p>
                  <p>$ systemctl status apache2</p>
                  <p className="text-[#e7c27a]">active (running)</p>
                  <p>$ mysqladmin ping</p>
                  <p>mysqld is alive</p>
                </div>
              </ProjectCard>
              <ProjectCard
                num="03"
                title="HwHost"
                text="Présidence de l’association : bénévoles, présence en ligne et produits digitaux."
                tags={['Association', 'Produit', 'Réseau']}
              >
                <div className="flex h-44 items-center justify-center bg-[#140a22] p-6">
                  <img src={hwhost} alt="" className="max-h-full w-full object-contain" />
                </div>
              </ProjectCard>
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
          <Chapter index="06" kicker="Écrire" title="Contact" />
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <p className="max-w-md text-lg leading-relaxed text-[#f6f3ec]/70">
                Pour un stage, une alternance ou un échange sur l’administration réseau.
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
                  <motion.form
                    key="form"
                    className="space-y-5"
                    onSubmit={submitMessage}
                    exit={{ opacity: 0, y: -8 }}
                  >
                    <Field id="nom" label="Nom" value={nom} onChange={setNom} placeholder="Votre nom" />
                    <Field
                      id="email"
                      label="Email"
                      type="email"
                      value={email}
                      onChange={setEmail}
                      placeholder="vous@email.com"
                    />
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
                    <button
                      type="submit"
                      className="w-full bg-[#e7c27a] py-3 text-sm font-medium text-[#14110c] transition-transform hover:-translate-y-0.5"
                    >
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

function ProjectCard({
  num,
  title,
  text,
  tags,
  children,
}: {
  num: string
  title: string
  text: string
  tags: string[]
  children: ReactNode
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, ease: EASE }}
      whileHover={{ y: -6 }}
      className="group overflow-hidden border border-white/10 bg-[#070708]"
    >
      <div className="overflow-hidden">{children}</div>
      <div className="p-6">
        <p className="text-[11px] tracking-[0.32em] text-[#e7c27a]">{num}</p>
        <h3 className="mt-2 font-display text-2xl font-bold">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-[#f6f3ec]/70">{text}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="border border-white/10 px-2 py-1 text-[11px] uppercase tracking-[0.16em] text-[#f6f3ec]/70">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}

export default ArthurCV
