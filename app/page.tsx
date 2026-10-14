'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, ArrowUp, ArrowUpRight, CalendarDays, Car, ChevronDown, Clock3, ExternalLink, Gift, Heart, Hotel, MapPin, Send, Sparkles, Utensils, Users, Wine } from 'lucide-react'


const photos = [
  { src: '/venue.jpg', alt: 'Wedding rings and flowers' },
  { src: '/hands.jpg', alt: 'Couple walking through a sunlit field' },
  { src: '/rings.avif', alt: 'Couple embracing outdoors' },
]
const story = [
  ['2018', 'How we met', 'A rainy Tuesday, one shared umbrella, and a conversation that lasted until the café closed.'],
  ['2020', 'First adventure', 'We packed two bags and drove north with no itinerary — just a playlist and a full tank of gas.'],
  ['2024', 'The proposal', 'Under the old oak tree where we had our first picnic, Marvin asked the easiest question.'],
]
const schedule = [
  [<Users key="users" />, '4:00 PM', 'Guest arrival', 'Welcome drinks & garden stroll'],
  [<Heart key="heart" />, '4:30 PM', 'The ceremony', 'By the rose garden gazebo'],
  [<Wine key="wine" />, '5:15 PM', 'Cocktail hour', 'Signature cocktails & canapés'],
  [<Utensils key="utensils" />, '6:30 PM', 'Dinner & speeches', 'An evening under the stars'],
  [<Sparkles key="sparkles" />, '8:30 PM', 'First dance', 'Music, dancing & celebration'],
]
const faqs = [
  ['What is the dress code?', 'Black tie / garden elegance. Think timeless silhouettes, soft tailoring, and shoes you can wander in.'],
  ['Are children invited?', 'We love your little ones, but this will be an adults-only celebration.'],
  ['Can I bring a plus-one?', 'Your invitation will include the name of your guest if we have reserved a plus-one for you.'],
  ['Where should I park?', 'Complimentary valet parking is available at the east entrance. A shuttle loops from the hotels from 3:30 PM.'],
]

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: .7, ease: 'easeOut' }}>{children}</motion.div>
}
function SectionKicker({ children }: { children: React.ReactNode }) { return <p className="kicker">{children}</p> }

export default function Page() {
  const [intro, setIntro] = useState(true)
  const [isOpening, setIsOpening] = useState(false)
  const [rsvp, setRsvp] = useState('attending')
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const target = new Date('2026-11-14T16:00:00').getTime()
    const tick = () => { const diff = Math.max(0, target - Date.now()); setTime({ days: Math.floor(diff / 86400000), hours: Math.floor(diff / 3600000) % 24, minutes: Math.floor(diff / 60000) % 60, seconds: Math.floor(diff / 1000) % 60 }) }
    tick(); const id = window.setInterval(tick, 1000); return () => window.clearInterval(id)
  }, [])

  const handleOpen = () => {
    if (isOpening) return
    setIsOpening(true)
    setTimeout(() => {
      setIntro(false)
    }, 2000)
  }

  return <main className="invitation">
    <AnimatePresence>{intro && <motion.section className="intro" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .8 }}>
      <div className="intro-copy">
        <span className="eyebrow">A little note for you</span>
        <h1>Sandra <i>&</i> Marvin</h1>
        <p>November 14, 2026 · Mombasa, Kenya</p>
      </div>

      <motion.button 
        className="envelope-wrap" 
        onClick={handleOpen}
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={isOpening ? { scale: 1.05, opacity: 0.98 } : { scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: isOpening ? 2 : 0.8, ease: 'easeInOut' }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="envelope">
          <motion.div 
            className="card-inside"
            initial={{ y: 0, scale: 0.95 }}
            animate={isOpening ? { y: -200, scale: 1.05, opacity: [1, 1, 0.9] } : { y: 0, scale: 0.95 }}
            transition={{ duration: 1.6, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
          >
            <span className="eyebrow">Wedding Invitation</span>
            <h3>Sandra <i>&</i> Marvin</h3>
            <p>November 14, 2026 · Mombasa, Kenya</p>
          </motion.div>

          <div className="paper-lines" />
          <motion.div 
            className="flap"
            animate={isOpening ? { rotateX: -180, zIndex: 0 } : { rotateX: 0, zIndex: 5 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top' }}
          />
          <motion.div 
            className="seal"
            animate={isOpening ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            S & M
          </motion.div>
        </div>
        <p style={{ marginTop: '1.4rem', color: '#f3d6a1', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600 }}>
          {isOpening ? 'Opening invitation...' : 'Tap to open envelope'}
        </p>
      </motion.button>

      <button className="skip" onClick={() => setIntro(false)}>
        Skip intro <ArrowDown />
      </button>
    </motion.section>}</AnimatePresence>

   

    {!intro && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <section className="hero" id="top">
        <div className="hero-image" />
        <div className="hero-overlay" />
        <nav className="topbar"><span className="monogram">S <i>&</i> M</span><a href="#rsvp">RSVP <ArrowUpRight /></a></nav>
        <div className="hero-content"><SectionKicker >We are getting married</SectionKicker><h2>Sandra <em>&</em><br />Marvin</h2><p>Join us to celebrate our special day</p><div className="date-pill"><CalendarDays /> Saturday, November 14, 2026</div></div>
        <a className="scroll-cue" href="#countdown">Scroll to explore <ArrowDown /></a>
      </section>

      <section className="section countdown-section" id="countdown"><Reveal><SectionKicker>The countdown</SectionKicker><h3>Until we say <em>“I do”</em></h3><div className="countdown"><div><strong>{String(time.days).padStart(3, '0')}</strong><span>Days</span></div><b>:</b><div><strong>{String(time.hours).padStart(2, '0')}</strong><span>Hours</span></div><b>:</b><div><strong>{String(time.minutes).padStart(2, '0')}</strong><span>Minutes</span></div><b>:</b><div><strong>{String(time.seconds).padStart(2, '0')}</strong><span>Seconds</span></div></div></Reveal></section>

      <section className="section story-section"><Reveal><SectionKicker>Our story</SectionKicker><h3>From one little <em>hello</em></h3><p className="lead">Somehow, the best things in life start in the most ordinary places.</p><div className="story-list">{story.map(([year, title, copy]) => <article className="story-item" key={year}><span className="story-year">{year}</span><div><h4>{title}</h4><p>{copy}</p></div></article>)}</div></Reveal></section>

      <section className="gallery-section"><div className="gallery-heading"><div><SectionKicker>Little moments</SectionKicker><h3>Our favorite <em>memories</em></h3></div><span className="gallery-count">01 / 03</span></div><div className="gallery">{photos.map((photo, i) => <motion.img key={photo.src} src={photo.src} alt={photo.alt} whileHover={{ scale: 1.03 }} className={i === 0 ? 'featured' : ''} />)}</div><div className="dots"><span className="active" /><span /><span /></div></section>

      <section className="section schedule-section"><Reveal><SectionKicker>The day</SectionKicker><h3>A day to <em>remember</em></h3><div className="schedule">{schedule.map(([icon, time, title, copy], index) => <div className="schedule-row" key={index}><div className="schedule-icon">{icon}</div><div><span>{time}</span><h4>{title}</h4><p>{copy}</p></div></div>)}</div></Reveal></section>

      <section className="split-section"><Reveal><div className="info-card burgundy"><Hotel /><SectionKicker>Stay awhile</SectionKicker><h3>Make a weekend<br /><em>of it</em></h3><p>We have gathered a few of our favorite nearby stays for you.</p><a href="#accommodations">Explore stays <ArrowUpRight /></a></div></Reveal><Reveal><div className="info-card champagne" id="accommodations"><MapPin /><SectionKicker>Find us</SectionKicker><h3>Oak & <em>Vine Estate</em></h3><p>4025 Solano Avenue<br />Napa, California 94558</p><a href="https://maps.google.com" target="_blank" rel="noreferrer">View on map <ExternalLink /></a></div></Reveal></section>

      <section className="section details-section"><Reveal><SectionKicker>Good to know</SectionKicker><h3>The little <em>details</em></h3><div className="details-grid"><div><span className="detail-icon">✦</span><h4>Garden elegance</h4><p>Black tie encouraged. Comfortable shoes welcome — the celebration moves from lawn to dance floor.</p><div className="swatches"><span /><span /><span /><span /></div></div><div><span className="detail-icon"><Gift /></span><h4>Your presence is enough</h4><p>If you would like to honor us with a gift, we have a small registry and honeymoon fund below.</p><a href="#rsvp" className="text-link">View registry <ArrowUpRight /></a></div><div><span className="detail-icon"><Car /></span><h4>Getting there</h4><p>Valet parking is complimentary. Shuttle service begins at 3:30 PM from the partner hotels.</p></div></div></Reveal></section>

      <section className="section faq-section"><Reveal><SectionKicker>Questions</SectionKicker><h3>Before you <em>arrive</em></h3><div className="faq-list">{faqs.map(([q, a], i) => <div className="faq" key={q}><button onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}><span>{q}</span><ChevronDown className={openFaq === i ? 'rotated' : ''} /></button><AnimatePresence>{openFaq === i && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>{a}</motion.p>}</AnimatePresence></div>)}</div></Reveal></section>

      <section className="rsvp-section" id="rsvp"><Reveal>{submitted ? <div className="success"><Sparkles /><SectionKicker>It’s official</SectionKicker><h3>Thank you!<br /><em>We’ll see you there.</em></h3><p>We’re so happy you’ll be part of our day.</p></div> : <><SectionKicker>Kindly reply</SectionKicker><h3>Will you join <em>us?</em></h3><form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}><div className="choice-group">{[['attending', 'Joyfully accepts'], ['maybe', 'Will let you know'], ['decline', 'Regretfully declines']].map(([value, label]) => <button type="button" key={value} className={rsvp === value ? 'selected' : ''} onClick={() => setRsvp(value)}><span>{rsvp === value ? '●' : '○'}</span>{label}</button>)}</div><input required aria-label="Full name" placeholder="Full name" /><input required type="email" aria-label="Email address" placeholder="Email address" /><textarea aria-label="Message" placeholder="Leave a note for the hosts (optional)" rows={3} /><button className="submit" type="submit">Send RSVP <Send /></button></form></>}</Reveal></section>
      <footer><span className="monogram">S <i>&</i> M</span><p>With love, Sandra & Marvin</p><a href="#top"><ArrowUp /></a></footer>      
    </motion.div>}
  </main>
}
