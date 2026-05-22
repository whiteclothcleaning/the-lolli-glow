'use client'

import { useState, useEffect } from 'react'

const serif = 'font-[family-name:var(--font-cormorant)]'
const sans = 'font-[family-name:var(--font-dm-sans)]'

const FACIALS = [
  {
    name: 'The Lolli Glow Signature',
    duration: '60m',
    price: '£45',
    desc: 'The perfect introductory facial for new clients or those new to facials. A personalised consultation covers your skin concerns, current products and daily routine, followed by a detailed skin analysis to tailor the treatment to your needs.',
    steps: 'Consultation · Skin Analysis · Cleanse · Hydrate · Glow',
  },
  {
    name: 'The Lolli Smooth & Glow',
    duration: '75m',
    price: '£55',
    desc: 'A glow-boosting dermaplaning treatment with a luxe twist. Gently removes dead skin and peach fuzz, followed by a nourishing mask while you relax with a scalp or neck and shoulder massage. Finished with soothing ice globes to hydrate and refresh.',
    steps: 'Dermaplaning · Nourishing Mask · Massage · Ice Globes',
  },
  {
    name: 'Chemical Peel',
    duration: '60m',
    price: '£55',
    desc: 'Two professional-grade peels to choose from. The Glow Peel exfoliates and rejuvenates all skin types, targeting fine lines, sun damage and large pores. The Pure Peel improves skin texture for acne-prone or inflammatory skin (Fitzpatrick types 1–4). A full skin analysis determines which is right for you.',
    steps: 'Skin Analysis · Glow Peel or Pure Peel · Targeted Results',
  },
  {
    name: 'High Frequency Facial',
    duration: '75m',
    price: '£60',
    desc: 'A skin-boosting treatment designed to target breakouts, calm inflammation and promote a clearer, healthier complexion. Using gentle electrical currents, this facial kills acne-causing bacteria while boosting circulation and glow.',
    steps: 'Cleanse · High Frequency · Circulation Boost · Radiant Finish',
  },
  {
    name: 'Glass Skin Facial',
    duration: '90m',
    price: '£65',
    desc: 'A deeply hydrating facial designed to leave your skin with a fresh, dewy glow. Dermaplaning removes dead skin and peach fuzz, followed by a high frequency boost, soothing face mask and your choice of a calming head massage or neck and shoulder massage. Finished with cooling ice globes to lock in that lit-from-within Lolli glow.',
    steps: 'Dermaplaning · High Frequency · Mask · Massage · Ice Globes',
  },
]

const ADVANCED = [
  {
    name: 'Microneedling — Face',
    duration: '75m',
    price: '£65',
    desc: 'A collagen-boosting treatment that smooths texture, softens fine lines and improves overall skin tone. Tiny micro channels stimulate your skin\'s natural repair process for a firmer, more radiant glow. Stronger, smoother, visibly refreshed skin.',
  },
  {
    name: 'Microneedling — Face & Neck',
    duration: '90m',
    price: '£80',
    desc: 'The full microneedling experience extended to the neck for comprehensive skin renewal. Targets texture, tone and firmness across both the face and neck for a complete, refreshed result.',
  },
]

type GuideTab = 'Before Your Visit' | 'After Your Treatment'

const GUIDE: Record<GuideTab, { intro: string; rules: { rule: string; detail: string }[] }> = {
  'Before Your Visit': {
    intro: 'To ensure the best possible results from your treatment, please follow these simple guidelines before your appointment.',
    rules: [
      { rule: 'Avoid direct sun exposure', detail: 'Avoid sun exposure and tanning beds for at least 48 hours prior to your appointment.' },
      { rule: 'Avoid active skincare', detail: 'Stop using retinol, AHAs, BHAs and exfoliating products for at least 3–5 days before your visit.' },
      { rule: 'Avoid waxing & hair removal', detail: 'No waxing, threading or depilatory creams for at least 48 hours prior to treatment.' },
      { rule: 'Medication & supplements', detail: 'If you are taking any medication or supplements, please let Lauren know in advance.' },
      { rule: 'Stay hydrated', detail: 'Drink plenty of water in the days leading up to your appointment to keep your skin healthy and hydrated.' },
      { rule: 'Arrive with clean skin', detail: 'Please arrive with a clean, makeup-free face. If needed, Lauren will cleanse your skin as part of your treatment.' },
    ],
  },
  'After Your Treatment': {
    intro: 'Following these aftercare steps will help protect your skin, enhance your results and reduce the risk of irritation.',
    rules: [
      { rule: 'No gym or intense exercise for 24 hours', detail: 'Avoid sweating, saunas and anything that may increase your body temperature.' },
      { rule: 'Avoid makeup for 24 hours', detail: 'Give your skin time to breathe and recover. Keep it clean and product-free.' },
      { rule: 'Avoid direct sun & tanning', detail: 'Keep skin out of direct sun and avoid tanning beds for at least 48 hours. Always wear SPF 30+.' },
      { rule: 'Avoid hot showers & steam', detail: 'Hot water and steam can cause irritation. Use lukewarm water and be gentle with your skin.' },
      { rule: 'Avoid active ingredients for 3–5 days', detail: 'Stay away from retinol, AHAs, BHAs, exfoliants and any harsh actives unless advised.' },
      { rule: 'Sleep on a clean pillowcase', detail: 'Helps prevent bacteria transfer and keeps your skin clean while it heals.' },
      { rule: 'Be gentle & listen to your skin', detail: 'Some redness or sensitivity is normal. Keep skin calm, hydrated and protected.' },
    ],
  },
}

const FAQS = [
  { q: 'Which facial is right for me?', a: 'If you\'re new to facials, The Lolli Glow Signature is the perfect starting point — it includes a full consultation and skin analysis to guide your future treatments. Not sure? Send Lauren a message before booking and she\'ll point you in the right direction.' },
  { q: 'What is included in every treatment?', a: 'Every facial begins with a personalised consultation to discuss your skin concerns, current products and goals. A skin analysis is carried out so the treatment is fully tailored to you on the day.' },
  { q: 'Is there any downtime after a facial?', a: 'Most facials have little to no downtime — you\'ll likely leave glowing. Some treatments like chemical peels or microneedling may cause mild redness for a few hours. Full aftercare guidance is provided after every appointment.' },
  { q: 'How often should I book?', a: 'Every 4–6 weeks is ideal for maintaining results. Skin renews on a roughly 28-day cycle, so regular treatments keep you consistently glowing rather than just having the occasional boost.' },
  { q: 'What is microneedling?', a: 'Microneedling uses tiny needles to create micro channels in the skin, stimulating your skin\'s natural repair process. This boosts collagen production, smooths texture, softens fine lines and improves skin tone over a course of treatments.' },
  { q: 'What is the difference between the two chemical peels?', a: 'The Glow Peel is suitable for all skin types and targets fine lines, sun damage, wrinkles and large pores. The Pure Peel is designed for acne-prone or inflammatory skin (Fitzpatrick types 1–4). A skin analysis before treatment determines which is right for you.' },
  { q: 'Can I add dermaplaning to my facial?', a: 'Yes — dermaplaning is available as a £20 add-on to any facial. It removes peach fuzz and dead skin cells for an immediately smoother, brighter complexion. It\'s already included in The Lolli Smooth & Glow and Glass Skin Facial.' },
  { q: 'Where is the studio?', a: 'The Lolli Glow is based in Sowerby Bridge. The exact address is shared once your appointment is confirmed.' },
]

export default function TheLolliGlowPage() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeGuide, setActiveGuide] = useState<GuideTab>('Before Your Visit')
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      setFormStatus(res.ok ? 'sent' : 'error')
    } catch {
      setFormStatus('error')
    }
  }

  const navLinks: [string, string][] = [['Treatments', '#treatments'], ['About', '#about'], ['FAQ', '#faq'], ['Book', '#contact']]

  return (
    <>
      {/* NAV */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#FAF3EE]/95 backdrop-blur-md border-b border-[#E4D0C0]' : ''}`}>
        <nav className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between py-5 md:py-6">
          <a href="#" className={`${serif} text-lg font-light tracking-[0.18em] italic transition-colors duration-500 ${scrolled ? 'text-[#1C0F0A]' : 'text-[#FAF3EE]'}`}>
            The Lolli Glow
          </a>
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map(([l, h]) => (
              <li key={l}>
                <a href={h} className={`${sans} text-sm tracking-[0.06em] hover:text-[#1C0F0A] transition-colors duration-200 ${scrolled ? 'text-[#7A5A4A]' : 'text-[#FAF3EE]/70'}`}>{l}</a>
              </li>
            ))}
          </ul>
          <div className="hidden md:block">
            <a href="#contact" className={`${sans} text-sm font-semibold tracking-[0.08em] px-6 py-3 transition-colors duration-200 ${scrolled ? 'bg-[#B8845A] text-[#FAF3EE] hover:bg-[#A07248]' : 'bg-[#FAF3EE]/10 border border-[#FAF3EE]/20 text-[#FAF3EE] hover:bg-[#FAF3EE]/20'}`}>
              Book Now
            </a>
          </div>
          <button className={`md:hidden p-2 flex flex-col gap-1.5 transition-colors duration-500 ${scrolled ? 'text-[#1C0F0A]' : 'text-[#FAF3EE]'}`} aria-label="Open menu" onClick={() => setMobileOpen(true)}>
            <span className="block w-6 h-px bg-current" />
            <span className="block w-4 h-px bg-current" />
            <span className="block w-6 h-px bg-current" />
          </button>
        </nav>
      </header>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] bg-[#FAF3EE] flex flex-col items-center justify-center gap-8">
          <button className="absolute top-6 right-6 text-[#1C0F0A] text-2xl" onClick={() => setMobileOpen(false)}>✕</button>
          {navLinks.map(([l, h]) => (
            <a key={l} href={h} onClick={() => setMobileOpen(false)} className={`${serif} text-3xl italic text-[#1C0F0A] hover:text-[#B8845A] transition-colors`}>{l}</a>
          ))}
          <a href="#contact" onClick={() => setMobileOpen(false)} className={`${sans} mt-4 bg-[#B8845A] text-[#FAF3EE] text-sm font-semibold tracking-[0.08em] px-8 py-4`}>Book Now</a>
        </div>
      )}

      <main>

        {/* HERO */}
        <section className="relative min-h-screen flex items-center pt-24 pb-16 md:pt-36 md:pb-24 px-6 lg:px-12 overflow-hidden" style={{ background: '#1C0F0A' }}>
          <div className="absolute hidden lg:block pointer-events-none" style={{ right: '4%', top: '10%', bottom: '10%', width: '36%' }}>
            <img src="/hero.jpg" alt="The Lolli Glow" className="w-full h-full object-cover object-center" style={{ display: 'block' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #1C0F0A 0%, rgba(28,15,10,0.6) 25%, transparent 55%)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(28,15,10,0.4) 0%, transparent 15%, transparent 85%, rgba(28,15,10,0.4) 100%)' }} />
          </div>
          <div className="absolute inset-0 lg:hidden pointer-events-none" style={{ background: '#1C0F0A' }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 60% at 75% 50%, rgba(184,132,90,0.08) 0%, transparent 70%)' }} />

          <div className="max-w-7xl mx-auto w-full relative z-10">
            <p className={`${sans} text-[#D4A882] text-xs font-medium tracking-[0.3em] uppercase mb-8 md:mb-10 flex items-center gap-4`}>
              <span className="w-10 h-px bg-[#D4A882] flex-shrink-0" />
              Luxury Skin Treatments &middot; Sowerby Bridge
            </p>
            <h1 className={`${serif} text-[clamp(2.4rem,5.5vw,6.25rem)] font-light text-[#FAF3EE] leading-[1.08] tracking-[0.025em] mb-7 md:mb-10`}>
              Step into your own<br />
              <em className="not-italic text-[#D4A882]">relaxation zone.</em>
            </h1>
            <div className="max-w-2xl">
              <p className={`${sans} text-[#FAF3EE]/55 text-base md:text-xl leading-relaxed mb-8 md:mb-14`}>
                Luxury, results-driven facials and advanced skin treatments in a beautifully calm private studio in Sowerby Bridge. Every treatment is tailored to your skin — because you deserve more than a generic facial.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
                <a href="#contact" className={`${sans} bg-[#B8845A] text-[#FAF3EE] text-sm font-semibold tracking-[0.08em] px-8 py-4 md:px-10 md:py-5 hover:bg-[#A07248] transition-colors duration-200 text-center`}>
                  Book a Treatment
                </a>
                <a href="#treatments" className={`${sans} border border-[#FAF3EE]/20 text-[#FAF3EE]/60 text-sm font-medium tracking-[0.08em] px-8 py-4 md:px-10 md:py-5 hover:border-[#B8845A] hover:text-[#D4A882] transition-all duration-200 text-center`}>
                  View Treatments
                </a>
              </div>
            </div>
            <div className="mt-12 md:mt-24 pt-8 md:pt-10 border-t border-[#FAF3EE]/10 grid grid-cols-3 gap-6 md:gap-10 max-w-xs md:max-w-sm">
              {[['5', 'Facials'], ['Skin', 'Analysis'], ['Private', 'Studio']].map(([a, b]) => (
                <div key={a + b}>
                  <div className={`${serif} text-2xl md:text-3xl text-[#FAF3EE] font-light`}>{a}</div>
                  <div className={`${sans} text-[#D4A882]/60 text-[9px] md:text-xs tracking-[0.06em] uppercase mt-1 md:mt-1.5`}>{b}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TICKER */}
        <section className="bg-[#B8845A]">
          <div className="py-4 md:py-5 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="flex items-center gap-x-8 md:gap-x-12 px-6 lg:px-12 min-w-max md:min-w-0 md:justify-center">
              {['Luxury Facials', '·', 'Microneedling', '·', 'Chemical Peels', '·', 'Glass Skin', '·', 'High Frequency', '·', 'Sowerby Bridge'].map((t, i) => (
                <span key={i} className={`${sans} text-[10px] font-medium tracking-[0.4em] uppercase whitespace-nowrap ${t === '·' ? 'text-[#FAF3EE]/40' : 'text-[#FAF3EE]'}`}>{t}</span>
              ))}
            </div>
          </div>
        </section>

        {/* FACIALS */}
        <section id="treatments" className="py-16 md:py-28 lg:py-32 px-6 lg:px-12 bg-[#F0E4D8]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 md:mb-16 lg:mb-20">
              <p className={`${sans} text-[#B8845A] text-xs font-medium tracking-[0.3em] uppercase mb-5`}>Facial Treatments</p>
              <h2 className={`${serif} text-4xl md:text-5xl lg:text-6xl font-light text-[#1C0F0A]`}>
                Every facial, tailored<br />
                <em className="not-italic text-[#B8845A]">to your skin.</em>
              </h2>
              <p className={`${sans} text-[#7A5A4A] text-base leading-relaxed mt-5 max-w-xl`}>
                A personalised consultation and skin analysis is included with every treatment. No guesswork — just results.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E4D0C0]">
              {FACIALS.map((item, i) => (
                <div key={item.name} className={`p-6 md:p-10 flex flex-col justify-between ${i % 3 === 1 ? 'bg-[#F0E4D8]' : 'bg-[#FAF3EE]'}`}>
                  <div>
                    <div className="mb-5">
                      <p className={`${sans} text-[#7A5A4A] text-[10px] tracking-[0.2em] uppercase opacity-50`}>{item.duration}</p>
                    </div>
                    <h3 className={`${serif} text-xl md:text-2xl font-medium text-[#1C0F0A] mb-3`}>{item.name}</h3>
                    <p className={`${sans} text-[#7A5A4A] text-sm leading-relaxed mb-4`}>{item.desc}</p>
                    <p className={`${sans} text-[#B8845A] text-[10px] tracking-[0.12em] uppercase opacity-70 mb-6 md:mb-10`}>{item.steps}</p>
                  </div>
                  <div className={`${serif} text-4xl md:text-5xl font-light text-[#1C0F0A]`}>{item.price}</div>
                </div>
              ))}
            </div>

            {/* ADVANCED TREATMENTS */}
            <div className="mt-16 md:mt-24">
              <div className="flex items-center gap-5 mb-8">
                <div className="w-10 h-px bg-[#E4D0C0]" />
                <p className={`${sans} text-[#B8845A] text-xs font-medium tracking-[0.3em] uppercase`}>Advanced Treatments</p>
              </div>
              <div className="grid md:grid-cols-2 gap-px bg-[#E4D0C0]">
                {ADVANCED.map((item, i) => (
                  <div key={item.name} className={`p-6 md:p-10 lg:p-12 flex flex-col justify-between ${i % 2 === 0 ? 'bg-[#FAF3EE]' : 'bg-[#F0E4D8]'}`}>
                    <div>
                      <p className={`${sans} text-[#7A5A4A] text-[10px] tracking-[0.2em] uppercase opacity-50 mb-5`}>{item.duration}</p>
                      <h3 className={`${serif} text-2xl md:text-3xl font-medium text-[#1C0F0A] mb-3`}>{item.name}</h3>
                      <p className={`${sans} text-[#7A5A4A] text-sm leading-relaxed mb-8 md:mb-12`}>{item.desc}</p>
                    </div>
                    <div className={`${serif} text-5xl font-light text-[#1C0F0A]`}>{item.price}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ADD-ON */}
            <div className="mt-8 md:mt-10">
              <div className="grid gap-px bg-[#E4D0C0]">
                <div className="bg-[#FAF3EE] p-6 md:p-10 flex items-center justify-between gap-8">
                  <div>
                    <p className={`${sans} text-[#B8845A] text-xs font-medium tracking-[0.3em] uppercase mb-3`}>Add-On</p>
                    <h3 className={`${serif} text-2xl md:text-3xl font-medium text-[#1C0F0A] mb-2`}>Dermaplaning</h3>
                    <p className={`${sans} text-[#7A5A4A] text-sm leading-relaxed max-w-xl`}>
                      Remove peach fuzz and dead skin cells for a smooth, glowing finish. Can be added to any facial. Already included in The Lolli Smooth &amp; Glow and Glass Skin Facial.
                    </p>
                  </div>
                  <div className={`${serif} text-5xl font-light text-[#B8845A] flex-shrink-0`}>£20</div>
                </div>
              </div>
            </div>

            <p className={`${sans} text-center text-[#7A5A4A] text-sm mt-8 md:mt-10 opacity-60`}>
              All treatments include a personalised consultation and skin analysis. Cash and bank transfer accepted.
            </p>
          </div>
        </section>

        {/* BEFORE & AFTER GUIDE */}
        <section className="py-16 md:py-24 lg:py-32 px-6 lg:px-12" style={{ background: '#1C0F0A' }}>
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 md:mb-14">
              <p className={`${sans} text-[#D4A882] text-xs font-medium tracking-[0.3em] uppercase mb-5`}>Treatment Guide</p>
              <h2 className={`${serif} text-4xl md:text-5xl lg:text-6xl font-light text-[#FAF3EE]`}>
                Get the most from<br />
                <em className="not-italic text-[#D4A882]">every visit.</em>
              </h2>
            </div>

            {/* Tabs */}
            <div className="flex gap-px bg-[#3C2818] mb-px w-full md:inline-flex">
              {(['Before Your Visit', 'After Your Treatment'] as GuideTab[]).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveGuide(tab)}
                  className={`${sans} flex-1 md:flex-none px-5 md:px-10 py-3 md:py-4 text-xs font-medium tracking-[0.08em] uppercase transition-colors duration-200 ${activeGuide === tab ? 'bg-[#B8845A] text-[#FAF3EE]' : 'bg-[#2A1808] text-[#D4A882]/60 hover:text-[#D4A882]'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="border border-[#3C2818]">
              <div className="p-6 md:p-10 border-b border-[#3C2818]">
                <p className={`${sans} text-[#D4A882]/80 text-sm leading-relaxed`}>{GUIDE[activeGuide].intro}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-px bg-[#3C2818]">
                {GUIDE[activeGuide].rules.map((item, i) => (
                  <div key={i} className="p-5 md:p-7 flex items-start gap-5 bg-[#2A1808]">
                    <div className={`${serif} text-xl font-light text-[#D4A882] opacity-30 flex-shrink-0 leading-none mt-0.5 select-none`}>{String(i + 1).padStart(2, '0')}</div>
                    <div>
                      <div className={`${sans} text-[#FAF3EE] text-sm font-medium mb-1`}>{item.rule}</div>
                      <div className={`${sans} text-[#D4A882]/60 text-sm leading-relaxed`}>{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT + REVIEW */}
        <section id="about" className="py-16 md:py-28 lg:py-32 px-6 lg:px-12 bg-[#FAF3EE]">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-28 items-start">
            <div>
              <img src="/logo.png" alt="The Lolli Glow" className="w-40 md:w-48 mb-8" />
              <p className={`${sans} text-[#B8845A] text-xs font-medium tracking-[0.3em] uppercase mb-5`}>About Lauren</p>
              <h2 className={`${serif} text-4xl md:text-5xl lg:text-6xl font-light text-[#1C0F0A] leading-tight mb-6 md:mb-8`}>
                Where your skin gets<br />
                <em className="not-italic text-[#B8845A]">the care it deserves.</em>
              </h2>
              <p className={`${sans} text-[#7A5A4A] leading-relaxed mb-5 md:mb-6`}>
                The Lolli Glow was created for people who want more than a basic facial. Every appointment starts with a full consultation and skin analysis — because understanding your skin is the only way to genuinely improve it.
              </p>
              <p className={`${sans} text-[#7A5A4A] leading-relaxed mb-5 md:mb-6`}>
                Treatments are one-to-one in a beautifully calm private studio in Sowerby Bridge. There&apos;s no rushing, no generic routines — just focused, professional skin care in a space designed to make you feel completely at ease from the moment you arrive.
              </p>
              <p className={`${sans} text-[#7A5A4A] leading-relaxed mb-8 md:mb-12`}>
                Whether it&apos;s your first facial or you&apos;re coming back for results, the goal is always the same — skin you love, and a treatment you genuinely look forward to.
              </p>
              <a href="#contact" className={`${sans} bg-[#B8845A] text-[#FAF3EE] text-sm font-semibold tracking-[0.08em] px-8 py-4 md:px-10 md:py-5 hover:bg-[#A07248] transition-colors duration-200 inline-block`}>
                Book Your Treatment
              </a>
            </div>
            <div className="space-y-8 md:space-y-10">
              {/* Review */}
              <div className="bg-[#F0E4D8] border border-[#E4D0C0] p-6 md:p-10">
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} viewBox="0 0 16 16" className="w-4 h-4 fill-[#B8845A]"><path d="M8 1l1.8 3.6L14 5.4l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.8z" /></svg>
                  ))}
                </div>
                <p className={`${serif} text-xl md:text-2xl font-light text-[#1C0F0A] leading-relaxed italic mb-5`}>
                  &ldquo;Lauren was warm, welcoming and professional. The facial was lovely, came away feeling relaxed and chilled. Will definitely be booking again and highly recommend.&rdquo;
                </p>
                <p className={`${sans} text-[#7A5A4A] text-xs tracking-[0.1em] uppercase opacity-60`}>Verified Client Review</p>
              </div>
              {/* About points */}
              <div className="space-y-5 md:space-y-6">
                {[
                  ['Consultation & skin analysis included', 'Every treatment is built around your skin on the day. No guesswork, no generic routine — just what your skin actually needs.'],
                  ['Relaxing private studio', 'A calm, beautifully designed space in Sowerby Bridge. One-to-one appointments — unhurried and completely focused on you.'],
                  ['Results you can see', 'From your first Lolli Glow Signature to a course of microneedling — every treatment is designed to deliver visible, lasting results.'],
                ].map(([title, body]) => (
                  <div key={title} className="flex items-start gap-5 border-b border-[#E4D0C0] pb-5 md:pb-6 last:border-0 last:pb-0">
                    <div className="w-5 h-5 border border-[#B8845A] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" stroke="#B8845A" fill="none" strokeWidth={2.5}><polyline points="2,6 5,9 10,3" /></svg>
                    </div>
                    <div>
                      <div className={`${sans} text-[#1C0F0A] text-sm font-medium`}>{title}</div>
                      <div className={`${sans} text-[#7A5A4A] text-sm leading-relaxed mt-1`}>{body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="py-16 md:py-28 lg:py-32 px-6 lg:px-12 bg-[#F0E4D8]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-10 md:mb-16 lg:mb-20">
              <div>
                <p className={`${sans} text-[#B8845A] text-xs font-medium tracking-[0.3em] uppercase mb-5`}>The Studio & Results</p>
                <h2 className={`${serif} text-4xl md:text-5xl lg:text-6xl font-light text-[#1C0F0A]`}>
                  Real skin.<br />
                  <em className="not-italic text-[#B8845A]">Real results.</em>
                </h2>
              </div>
              <a href="#contact" className={`${sans} text-sm font-medium tracking-[0.06em] text-[#7A5A4A] hover:text-[#B8845A] transition-colors self-start md:self-end flex-shrink-0`}>Book yours →</a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[#E4D0C0]">
              {[
                { label: 'Lolli Glow Signature', gradient: 'linear-gradient(135deg, #F0E4D8 0%, #E0C8B0 100%)', light: true },
                { label: 'Smooth & Glow',        gradient: 'linear-gradient(135deg, #2A1808 0%, #5C3A20 100%)', light: false },
                { label: 'Chemical Peel',         gradient: 'linear-gradient(135deg, #E4D0C0 0%, #D4A882 100%)', light: true },
                { label: 'High Frequency',        gradient: 'linear-gradient(135deg, #1C0F0A 0%, #3C2010 100%)', light: false },
                { label: 'Glass Skin',            gradient: 'linear-gradient(135deg, #3C2010 0%, #B8845A 100%)', light: false },
                { label: 'Microneedling',         gradient: 'linear-gradient(135deg, #D4A882 0%, #F0E4D8 100%)', light: true },
              ].map((item, i) => (
                <div key={i} className="relative aspect-[3/4] overflow-hidden group cursor-pointer flex flex-col justify-end p-4 md:p-6" style={{ background: item.gradient }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ background: item.light ? '#1C0F0A' : '#FAF3EE' }} />
                  <span className={`${sans} text-[9px] md:text-[10px] tracking-[0.2em] uppercase relative z-10 ${item.light ? 'text-[#7A5A4A]/70' : 'text-[#FAF3EE]/70'}`}>{item.label}</span>
                </div>
              ))}
            </div>
            <p className={`${sans} text-center text-[#7A5A4A] text-sm mt-8 md:mt-10 opacity-50`}>
              Follow on Instagram for the latest work →&nbsp;
              <a href="https://instagram.com/thelolliglow" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" style={{ color: '#B8845A' }}>@thelolliglow</a>
            </p>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-16 md:py-28 lg:py-32 px-6 lg:px-12 bg-[#FAF3EE]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 md:mb-16 lg:mb-20">
              <p className={`${sans} text-[#B8845A] text-xs font-medium tracking-[0.3em] uppercase mb-5`}>How It Works</p>
              <h2 className={`${serif} text-4xl md:text-5xl lg:text-6xl font-light text-[#1C0F0A]`}>
                Simple. Personal.<br />
                <em className="not-italic text-[#B8845A]">From start to finish.</em>
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#E4D0C0]">
              {[
                ['01', 'Book', 'Send a message via the form or Instagram. Lauren will get back to you quickly to confirm your appointment and share the studio address.'],
                ['02', 'Consult', 'Every treatment begins with a personalised consultation and skin analysis — so everything is tailored to your skin before Lauren starts.'],
                ['03', 'Relax', 'Lie back and enjoy your treatment in a calm, beautifully designed private studio. No rushing — just you and your glow.'],
                ['04', 'Glow', 'Leave with visibly better skin and full aftercare guidance. Rebook every 4–6 weeks to keep your results consistent.'],
              ].map(([step, title, body]) => (
                <div key={step} className="bg-[#FAF3EE] p-6 md:p-10">
                  <div className={`${serif} text-4xl md:text-5xl font-light text-[#B8845A] opacity-25 mb-5 md:mb-8 select-none`}>{step}</div>
                  <h3 className={`${serif} text-lg md:text-xl font-medium text-[#1C0F0A] mb-2 md:mb-3`}>{title}</h3>
                  <p className={`${sans} text-[#7A5A4A] text-xs md:text-sm leading-relaxed`}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA STRIP */}
        <section className="py-12 md:py-20 lg:py-24 px-6 lg:px-12 bg-[#B8845A]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8">
            <div>
              <h2 className={`${serif} text-3xl md:text-4xl lg:text-5xl font-light text-[#FAF3EE]`}>Ready to glow?</h2>
              <p className={`${sans} text-[#FAF3EE] mt-2 md:mt-3 text-sm opacity-70`}>Book your treatment at The Lolli Glow, Sowerby Bridge.</p>
            </div>
            <a href="#contact" className={`${sans} bg-[#FAF3EE] text-[#1C0F0A] text-sm font-semibold tracking-[0.08em] px-8 py-4 md:px-10 md:py-5 hover:bg-[#F0E4D8] transition-colors duration-200 whitespace-nowrap flex-shrink-0`}>
              Book Now
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-16 md:py-28 lg:py-32 px-6 lg:px-12 bg-[#F0E4D8]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 md:mb-14 lg:mb-16">
              <p className={`${sans} text-[#B8845A] text-xs font-medium tracking-[0.3em] uppercase mb-5`}>FAQ</p>
              <h2 className={`${serif} text-4xl md:text-5xl lg:text-6xl font-light text-[#1C0F0A]`}>
                Questions we<br />
                <em className="not-italic text-[#B8845A]">get asked a lot</em>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-px bg-[#E4D0C0]">
              {FAQS.map(({ q, a }) => (
                <div key={q} className="bg-[#F0E4D8] p-6 md:p-10 lg:p-12 hover:bg-[#EAD8C8] transition-colors duration-300">
                  <h3 className={`${serif} text-lg md:text-xl font-medium text-[#1C0F0A] mb-3 md:mb-4`}>{q}</h3>
                  <p className={`${sans} text-[#7A5A4A] text-sm leading-relaxed`}>{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-16 md:py-28 lg:py-32 px-6 lg:px-12 bg-[#F0E4D8]">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-28 items-start">
            <div>
              <p className={`${sans} text-[#B8845A] text-xs font-medium tracking-[0.3em] uppercase mb-5`}>Book a Treatment</p>
              <h2 className={`${serif} text-4xl md:text-5xl lg:text-6xl font-light text-[#1C0F0A] mb-6 md:mb-8`}>
                Let&apos;s get your<br />
                <em className="not-italic text-[#B8845A]">skin glowing.</em>
              </h2>
              <p className={`${sans} text-[#7A5A4A] leading-relaxed mb-8 md:mb-12`}>
                Send a message with your preferred date and the treatment you&apos;re interested in. Lauren will get back to you quickly to confirm your appointment and share the studio address.
              </p>
              <div className="space-y-5 md:space-y-6">
                {[
                  ['Sowerby Bridge Studio', 'Exact address shared after booking is confirmed'],
                  ['Consultation included', 'Every treatment starts with a skin consultation & analysis'],
                  ['Quick response', 'You\'ll hear back within 24 hours'],
                  ['Cash or bank transfer', 'Payment on the day'],
                ].map(([title, sub]) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="w-5 h-5 border border-[#B8845A] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" stroke="#B8845A" fill="none" strokeWidth={2.5}><polyline points="2,6 5,9 10,3" /></svg>
                    </div>
                    <div>
                      <div className={`${sans} text-[#1C0F0A] text-sm font-medium`}>{title}</div>
                      <div className={`${sans} text-[#7A5A4A] text-xs mt-1 opacity-70`}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 md:mt-12 pt-8 md:pt-10 border-t border-[#E4D0C0]">
                <p className={`${sans} text-[#7A5A4A] text-xs tracking-[0.2em] uppercase opacity-60 mb-5`}>Follow on Instagram</p>
                <a href="https://instagram.com/thelolliglow" target="_blank" rel="noopener noreferrer" className={`${sans} text-[#B8845A] text-sm font-medium hover:opacity-70 transition-opacity`}>
                  @thelolliglow →
                </a>
              </div>
            </div>

            <div className="bg-[#FAF3EE] border border-[#E4D0C0] p-6 md:p-8 lg:p-12">
              {formStatus === 'sent' ? (
                <div className="text-center py-16 md:py-20">
                  <div className={`${serif} text-4xl text-[#B8845A] mb-4`}>Thank you.</div>
                  <p className={`${sans} text-[#7A5A4A] text-sm`}>Lauren will be in touch within 24 hours to confirm your appointment.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`${sans} block text-xs font-medium tracking-[0.1em] uppercase text-[#7A5A4A] mb-2`}>Name</label>
                      <input type="text" required placeholder="Jane Smith" value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className={`${sans} w-full bg-[#F0E4D8] border border-[#E4D0C0] text-[#1C0F0A] text-sm px-4 py-3.5 placeholder:text-[#7A5A4A]/30 focus:border-[#B8845A] focus:outline-none transition-colors`}
                      />
                    </div>
                    <div>
                      <label className={`${sans} block text-xs font-medium tracking-[0.1em] uppercase text-[#7A5A4A] mb-2`}>Email</label>
                      <input type="email" required placeholder="jane@email.com" value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        className={`${sans} w-full bg-[#F0E4D8] border border-[#E4D0C0] text-[#1C0F0A] text-sm px-4 py-3.5 placeholder:text-[#7A5A4A]/30 focus:border-[#B8845A] focus:outline-none transition-colors`}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`${sans} block text-xs font-medium tracking-[0.1em] uppercase text-[#7A5A4A] mb-2`}>Phone</label>
                      <input type="tel" placeholder="+44 7700 000000" value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        className={`${sans} w-full bg-[#F0E4D8] border border-[#E4D0C0] text-[#1C0F0A] text-sm px-4 py-3.5 placeholder:text-[#7A5A4A]/30 focus:border-[#B8845A] focus:outline-none transition-colors`}
                      />
                    </div>
                    <div>
                      <label className={`${sans} block text-xs font-medium tracking-[0.1em] uppercase text-[#7A5A4A] mb-2`}>Treatment</label>
                      <select required value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                        className={`${sans} w-full bg-[#F0E4D8] border border-[#E4D0C0] text-[#1C0F0A] text-sm px-4 py-3.5 focus:border-[#B8845A] focus:outline-none transition-colors appearance-none`}
                      >
                        <option value="" disabled>Select...</option>
                        <optgroup label="Facials">
                          <option>The Lolli Glow Signature — £45</option>
                          <option>The Lolli Smooth &amp; Glow — £55</option>
                          <option>Chemical Peel — £55</option>
                          <option>High Frequency Facial — £60</option>
                          <option>Glass Skin Facial — £65</option>
                        </optgroup>
                        <optgroup label="Advanced Treatments">
                          <option>Microneedling (Face) — £65</option>
                          <option>Microneedling (Face &amp; Neck) — £80</option>
                        </optgroup>
                        <optgroup label="Add-On">
                          <option>Dermaplaning Add-On — £20</option>
                        </optgroup>
                        <option>Not sure — happy to chat</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={`${sans} block text-xs font-medium tracking-[0.1em] uppercase text-[#7A5A4A] mb-2`}>Message</label>
                    <textarea rows={5} required placeholder="Preferred date, skin concerns or anything you'd like Lauren to know..." value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className={`${sans} w-full bg-[#F0E4D8] border border-[#E4D0C0] text-[#1C0F0A] text-sm px-4 py-3.5 placeholder:text-[#7A5A4A]/30 focus:border-[#B8845A] focus:outline-none transition-colors resize-y`}
                    />
                  </div>
                  {formStatus === 'error' && (
                    <p className={`${sans} text-sm text-red-500`}>Something went wrong — please try again or message on Instagram.</p>
                  )}
                  <button type="submit" disabled={formStatus === 'sending'}
                    className={`${sans} w-full bg-[#B8845A] text-[#FAF3EE] text-sm font-semibold tracking-[0.08em] py-4 hover:bg-[#A07248] transition-colors duration-200 disabled:opacity-60`}
                  >
                    {formStatus === 'sending' ? 'Sending...' : 'Send Booking Request →'}
                  </button>
                  <p className={`${sans} text-center text-[#7A5A4A] text-xs opacity-50`}>
                    You&apos;ll hear back within 24 hours · Address shared on booking
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#FAF3EE]/10 px-6 lg:px-12 py-8 md:py-10 bg-[#1C0F0A]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-5 text-center md:text-left">
          <div className={`${serif} text-[#FAF3EE] text-base italic font-light tracking-[0.1em]`}>The Lolli Glow</div>
          <p className={`${sans} text-[#FAF3EE]/30 text-xs`}>© 2026 The Lolli Glow · Sowerby Bridge · All rights reserved.</p>
          <p className={`${sans} text-[#FAF3EE]/30 text-xs`}>Website by <a href="https://thewebproject.uk" className="text-[#D4A882] hover:opacity-70 transition-opacity">The Web Project</a></p>
        </div>
      </footer>
    </>
  )
}
