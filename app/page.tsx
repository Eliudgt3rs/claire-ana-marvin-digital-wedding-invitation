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
  ['2018', 'How we met', 'It was a torrential rainy Tuesday afternoon in downtown Nairobi when our paths unexpectedly crossed under the awning of a bustling bookstore. With only one shared umbrella between us and a sudden downpour blocking our way, an impromptu coffee invitation turned into an extraordinary four-hour conversation spanning childhood dreams, favorite books, and silent understandings until the café doors finally locked for the evening.'],
  ['2020', 'First adventure', 'Craving freedom from the city bustle, we packed two small canvas bags, loaded up the car at dawn, and drove southeast toward the breathtaking Kenyan coast with zero itinerary. Guided entirely by an eclectic road-trip soundtrack, sweeping savannah landscapes turning into coastal palm trees, and a shared passion for spontaneous discovery, we realized every mile felt like home when we were together.'],
  ['2024', 'The proposal', 'During a weekend getaway beneath the sprawling canopy of an ancient baobab tree overlooking the Indian Ocean at sunset—the exact spot where we shared our very first seaside picnic years prior—Marvin waited for the golden hour glow, reached into his jacket, and asked the easiest, most life-defining question we could ever imagine answering.'],
]
const schedule = [
  [<Users key="users" />, '4:00 PM', 'Guest arrival', 'Welcome drinks infused with local botanicals, acoustic melodies, and a leisurely stroll through the lush tropical gardens.'],
  [<Heart key="heart" />, '4:30 PM', 'The ceremony', 'Exchange of vows by the rose garden gazebo overlooking the serene Indian Ocean horizon as the sun begins to set.'],
  [<Wine key="wine" />, '5:15 PM', 'Cocktail hour', 'Indulge in artisanal signature cocktails, freshly curated canapés, and joyful reunions with family and lifelong friends.'],
  [<Utensils key="utensils" />, '6:30 PM', 'Dinner & speeches', 'A magnificent multi-course culinary experience served under a canopy of twinkling fairy lights and starlight, accompanied by heartfelt toasts.'],
  [<Sparkles key="sparkles" />, '8:30 PM', 'First dance', 'Opening the dance floor with our favorite song, followed by live band performances, dancing, and celebratory toasts well into the night.'],
]
const faqs = [
  ['What is the dress code?', 'Black tie / garden elegance. Think timeless silhouettes, soft flowing tailoring, and comfortable footwear suitable for wandering across lush lawns and sandy pathways.'],
  ['Are children invited?', 'While we adore your little ones, we have chosen to make our wedding an intimate, adults-only celebration so that all our guests can fully relax and enjoy the evening.'],
  ['Can I bring a plus-one?', 'Your formal invitation envelope will specify the name of your guest if a plus-one has been reserved specifically for you in our seating arrangements.'],
  ['Where should I park?', 'Complimentary valet parking is available at the estate entrance. Additionally, a dedicated shuttle service will loop continuously from partner hotels starting at 3:30 PM.'],
]

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: .7, ease: 'easeOut' }}>{children}</motion.div>
}
function SectionKicker({ children }: { children: React.ReactNode }) { return <p className="kicker">{children}</p> }

export default function Page() {
  const [intro, setIntro] = useState(true)
  const [isOpening, setIsOpening] = useState(false)
  const [rsvp, setRsvp] = useState('attending')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [rsvpError, setRsvpError] = useState('')
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
    }, 700)
  }

  return <main className="invitation">
    <AnimatePresence>{intro && <motion.section className="intro" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.1, filter: 'blur(8px)' }} transition={{ duration: .5, ease: 'easeInOut' }}>
      <motion.div 
        className="intro-copy"
        animate={isOpening ? { opacity: 0, y: -20, filter: 'blur(4px)' } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.3 }}
      >
        <span className="eyebrow">A little note for you</span>
        <h1>Sandra <i>&</i> Marvin</h1>
        <p>November 14, 2026 · Mombasa, Kenya</p>
      </motion.div>

      <motion.button 
        className="envelope-wrap" 
        onClick={handleOpen}
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={isOpening ? { scale: 1.2, opacity: 0, filter: 'blur(4px)' } : { scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="envelope" style={{ transformStyle: 'preserve-3d', perspective: 1000 }}>
          <div className="paper-lines" />

          {/* Top Flap Opens Up */}
          <motion.div 
            className="flap"
            animate={isOpening ? { rotateX: -180, zIndex: 0 } : { rotateX: 0, zIndex: 5 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top', backfaceVisibility: 'hidden' }}
          />

          {/* Bottom Front Fold Opens Down */}
          <motion.div 
            animate={isOpening ? { rotateX: 180, opacity: 0 } : { rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1, ease: 'easeInOut' }}
            style={{ 
              position: 'absolute', 
              inset: 0, 
              background: '#3a0b13', 
              clipPath: 'polygon(0 100%, 50% 45%, 100% 100%)', 
              transformOrigin: 'bottom',
              zIndex: 3,
              backfaceVisibility: 'hidden'
            }}
          />

          {/* Wax Seal */}
          <motion.div 
            className="seal"
            animate={isOpening ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.15 }}
          >
            S & M
          </motion.div>
        </div>

        <motion.p 
          style={{ marginTop: '1.4rem', color: '#f3d6a1', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600 }}
          animate={isOpening ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {isOpening ? 'Opening invitation...' : 'Tap to open envelope'}
        </motion.p>
      </motion.button>

      <motion.button 
        className="skip" 
        onClick={() => setIntro(false)}
        animate={isOpening ? { opacity: 0 } : { opacity: 0.8 }}
      >
        Skip intro <ArrowDown />
      </motion.button>
    </motion.section>}</AnimatePresence>

   

    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
      <section className="hero" id="top">
        <div className="hero-image" />
        <div className="hero-overlay" />
        <nav className="topbar"><span className="monogram">S <i>&</i> M</span><a href="#rsvp">RSVP <ArrowUpRight /></a></nav>
        <div className="hero-content"><SectionKicker >We are getting married</SectionKicker><h2>Sandra <em>&</em><br />Marvin</h2><p>Join us to celebrate our special day</p><div className="date-pill"><CalendarDays /> Saturday, November 14, 2026</div></div>
        <a className="scroll-cue" href="#countdown">Scroll to explore <ArrowDown /></a>
      </section>

      <section className="section welcome-prose-section">
        <Reveal>
          <SectionKicker>Welcome dear friends</SectionKicker>
          <h3>An invitation to <em>joy</em></h3>
          <p className="lead">
            There are moments in life that transcend the ordinary—moments when time pauses and everything aligns just as it was meant to be. As we prepare to exchange our vows surrounded by the people who have shaped our lives with love, laughter, and wisdom, we are overwhelmed with heartfelt gratitude. This celebration is not merely a wedding; it is a gathering of kindred spirits, a toast to cherished memories past, and the joyous beginning of all our tomorrows together.
          </p>
        </Reveal>
      </section>

      <section className="section countdown-section" id="countdown"><Reveal><SectionKicker>The countdown</SectionKicker><h3>Until we say <em>“I do”</em></h3><div className="countdown"><div><strong>{String(time.days).padStart(3, '0')}</strong><span>Days</span></div><b>:</b><div><strong>{String(time.hours).padStart(2, '0')}</strong><span>Hours</span></div><b>:</b><div><strong>{String(time.minutes).padStart(2, '0')}</strong><span>Minutes</span></div><b>:</b><div><strong>{String(time.seconds).padStart(2, '0')}</strong><span>Seconds</span></div></div></Reveal></section>

      <section className="section story-section"><Reveal><SectionKicker>Our story</SectionKicker><h3>From one little <em>hello</em></h3><p className="lead">Somehow, the best things in life start in the most ordinary places.</p><div className="story-list">{story.map(([year, title, copy]) => <article className="story-item" key={year}><span className="story-year">{year}</span><div><h4>{title}</h4><p>{copy}</p></div></article>)}</div></Reveal></section>

      <section className="gallery-section"><div className="gallery-heading"><div><SectionKicker>Little moments</SectionKicker><h3>A Celebration <em>of Love</em></h3></div><span className="gallery-count">01 / 03</span></div><div className="gallery">{photos.map((photo, i) => <motion.img key={photo.src} src={photo.src} alt={photo.alt} whileHover={{ scale: 1.03 }} className={i === 0 ? 'featured' : ''} />)}</div><div className="dots"><span className="active" /><span /><span /></div></section>

      <section className="section schedule-section"><Reveal><SectionKicker>The day</SectionKicker><h3>A day to <em>remember</em></h3><div className="schedule">{schedule.map(([icon, time, title, copy], index) => <div className="schedule-row" key={index}><div className="schedule-icon">{icon}</div><div><span>{time}</span><h4>{title}</h4><p>{copy}</p></div></div>)}</div></Reveal></section>

      <section className="split-section">
        <Reveal>
          <div className="info-card burgundy">
            <Hotel />
            <SectionKicker>Stay awhile</SectionKicker>
            <h3>Make a weekend<br /><em>of it</em></h3>
            <p>We have partnered with premier coastal sanctuaries including Swahili Beach Resort and Sarova Whitesands to ensure your weekend stay along the Kenyan coast is extraordinarily comfortable and relaxing.</p>
            <a href="#accommodations">Explore stays <ArrowUpRight /></a>
          </div>
        </Reveal>
        <Reveal>
          <div className="info-card champagne" id="accommodations">
            <MapPin />
            <SectionKicker>Find us</SectionKicker>
            <h3>Serena Beach <em>Resort & Spa</em></h3>
            <p>Shanzu Beach, North Coast<br />Mombasa, Kenya</p>
            <a href="https://maps.google.com" target="_blank" rel="noreferrer">View on map <ExternalLink /></a>
          </div>
        </Reveal>
      </section>

      <section className="section details-section">
        <Reveal>
          <SectionKicker>Good to know</SectionKicker>
          <h3>The little <em>details</em></h3>
          <div className="details-grid">
            <div>
              <span className="detail-icon">✦</span>
              <h4>Garden elegance</h4>
              <p>We kindly request black tie attire with a touch of tropical garden elegance—think timeless floor-length silhouettes, sophisticated tailoring, and comfortable footwear suitable for wandering across lush seaside lawns and starlit open-air terraces as the evening breeze rolls in from the Indian Ocean.</p>
              <div className="swatches"><span /><span /><span /><span /></div>
            </div>
            <div>
              <span className="detail-icon"><Gift /></span>
              <h4>Your presence is enough</h4>
              <p>Your love, laughter, and presence on our wedding day is truly the greatest present of all. For those wishing to contribute to our future together, a curated registry and honeymoon adventure fund are available upon request to help us embark on our next great journey.</p>
              <a href="#rsvp" className="text-link">View registry <ArrowUpRight /></a>
            </div>
            <div>
              <span className="detail-icon"><Car /></span>
              <h4>Getting there</h4>
              <p>Complimentary valet parking and secure drop-off zones are available at the main estate entrance. Dedicated luxury shuttle services will also operate continuously from our partner coastal resorts starting at 3:30 PM to ensure seamless travel.</p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section faq-section"><Reveal><SectionKicker>Questions</SectionKicker><h3>Before you <em>arrive</em></h3><div className="faq-list">{faqs.map(([q, a], i) => <div className="faq" key={q}><button onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}><span>{q}</span><ChevronDown className={openFaq === i ? 'rotated' : ''} /></button><AnimatePresence>{openFaq === i && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>{a}</motion.p>}</AnimatePresence></div>)}</div></Reveal></section>

      <section className="rsvp-section" id="rsvp"><Reveal>{submitted ? <div className="success"><Sparkles /><SectionKicker>It’s official</SectionKicker><h3>Thank you!<br /><em>We’ll see you there.</em></h3><p>We’re so happy you’ll be part of our day.</p></div> : <><SectionKicker>Kindly reply</SectionKicker><h3>Will you join <em>us?</em></h3><form onSubmit={async (e) => {
        e.preventDefault()
        setLoading(true)
        setRsvpError('')
        try {
          const res = await fetch('/api/rsvp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, status: rsvp, message })
          })
          const data = await res.json().catch(() => ({}))
          if (res.ok && data.success) {
            setSubmitted(true)
          } else {
            setRsvpError(data.error || 'Failed to submit RSVP. Please try again.')
          }
        } catch (err) {
          console.error(err)
          setRsvpError('Network error. Please check your connection and try again.')
        } finally {
          setLoading(false)
        }
      }}><div className="choice-group">{[['attending', 'Joyfully accepts'], ['maybe', 'Will let you know'], ['decline', 'Regretfully declines']].map(([value, label]) => <button type="button" key={value} className={rsvp === value ? 'selected' : ''} onClick={() => setRsvp(value)}><span>{rsvp === value ? '●' : '○'}</span>{label}</button>)}</div><input required aria-label="Full name" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} /><input required type="email" aria-label="Email address" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} /><textarea aria-label="Message" placeholder="Leave a note for the hosts (optional)" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} />{rsvpError && <p style={{ color: '#ffb4b4', fontSize: '0.75rem', margin: '0.2rem 0', textAlign: 'left' }}>{rsvpError}</p>}<button className="submit" type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send RSVP'} <Send /></button></form></>}</Reveal></section>
      <footer><span className="monogram">S <i>&</i> M</span><p>With love, Sandra & Marvin</p><div className="footer-links"><a href="/admin" className="host-dashboard-link">Host Dashboard</a><a href="#top" className="top-link" aria-label="Scroll to top"><ArrowUp /></a></div></footer>      
    </motion.div>
  </main>
}
