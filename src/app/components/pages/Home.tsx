import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowRight, ChevronDown, Wifi, Coffee, Utensils, Sparkles, Star, Wind } from 'lucide-react';

/* ── Unsplash image URLs ─────────────────────────────── */
const IMG_HERO = 'https://images.unsplash.com/photo-1585896162053-6ae8d00f6b25?w=1920&h=1080&fit=crop&auto=format';
const IMG_POOL = 'https://images.unsplash.com/photo-1776361964513-86fba5039617?w=1200&h=800&fit=crop&auto=format';
const IMG_ROOMS = 'https://images.unsplash.com/photo-1552858725-a19e7fcd3ac4?w=1200&h=800&fit=crop&auto=format';
const IMG_DINING = 'https://images.unsplash.com/photo-1653259038915-7cf0b7a4dd6c?w=1200&h=800&fit=crop&auto=format';
const IMG_SPA = 'https://images.unsplash.com/photo-1720118509152-2df877673bee?w=1200&h=800&fit=crop&auto=format';
const IMG_MOUNTAIN = 'https://images.unsplash.com/photo-1591296795955-92a580509b82?w=1920&h=900&fit=crop&auto=format';
const IMG_HARBOR = 'https://images.unsplash.com/photo-1721155227599-bfb5e8913fc4?w=1200&h=800&fit=crop&auto=format';
const IMG_EVENTS = 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=1200&h=800&fit=crop&auto=format';

/* ── Fade-in on scroll hook ──────────────────────────── */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ── Gold divider ────────────────────────────────────── */
function GoldDivider() {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="h-px w-8" style={{ background: 'var(--gold)' }} />
      <div className="w-1.5 h-1.5 rotate-45" style={{ background: 'var(--gold)' }} />
      <div className="h-px w-8" style={{ background: 'var(--gold)' }} />
    </div>
  );
}

/* ── Section label ───────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="block tracking-[0.3em] uppercase text-xs mb-4"
      style={{ color: 'var(--gold)', fontFamily: 'var(--font-body)', fontWeight: 400 }}
    >
      {children}
    </span>
  );
}

/* ── Teaser card ─────────────────────────────────────── */
function TeaserCard({ img, label, title, desc, to }: { img: string; label: string; title: string; desc: string; to: string }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const { ref, visible } = useFadeIn();

  return (
    <div
      ref={ref}
      onClick={() => navigate(to)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cursor-pointer overflow-hidden group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: hovered
              ? 'linear-gradient(to top, rgba(10,9,7,0.85) 0%, rgba(10,9,7,0.2) 60%)'
              : 'linear-gradient(to top, rgba(10,9,7,0.7) 0%, rgba(10,9,7,0.05) 60%)',
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <span
            className="block text-xs tracking-[0.25em] uppercase mb-2"
            style={{ color: 'var(--gold)', fontFamily: 'var(--font-body)' }}
          >
            {label}
          </span>
          <h3
            className="text-2xl mb-3"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--cream)', fontWeight: 500 }}
          >
            {title}
          </h3>
          <p
            className="text-sm leading-relaxed mb-4"
            style={{
              color: 'var(--cream-muted)',
              fontFamily: 'var(--font-body)',
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
          >
            {desc}
          </p>
          <div className="flex items-center gap-2" style={{ color: 'var(--gold)' }}>
            <span className="text-xs tracking-[0.2em] uppercase" style={{ fontFamily: 'var(--font-body)' }}>Discover</span>
            <ArrowRight size={14} className="transition-transform duration-300" style={{ transform: hovered ? 'translateX(4px)' : 'translateX(0)' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Stats strip ─────────────────────────────────────── */
const stats = [
  { value: '72', label: 'Rooms & Suites' },
  { value: '5★', label: 'Star Rating' },
  { value: '18F', label: 'Rooftop Sky Bar' },
  { value: '3', label: 'Dining Venues' },
  { value: '1', label: 'Infinity Pool' },
];

export function Home() {
  const navigate = useNavigate();
  const [heroLoaded, setHeroLoaded] = useState(false);
  const { ref: statsRef, visible: statsVisible } = useFadeIn();
  const { ref: ctaRef, visible: ctaVisible } = useFadeIn();

  return (
    <div style={{ background: 'var(--dark-1)' }}>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[700px] flex items-end" style={{ background: '#0a0907' }}>
        <img
          src={IMG_HERO}
          alt="Cape Town aerial view showing Table Mountain and V&A Waterfront"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: heroLoaded ? 0.65 : 0 }}
          onLoad={() => setHeroLoaded(true)}
        />
        {/* Multi-layer overlay for depth */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,9,7,1) 0%, rgba(10,9,7,0.55) 45%, rgba(10,9,7,0.15) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,9,7,0.4) 0%, transparent 60%)' }} />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pb-24 w-full">
          <div className="max-w-3xl">
            <GoldDivider />
            <SectionLabel>V&A Waterfront · Cape Town</SectionLabel>
            <h1
              className="mb-6 leading-[1.05]"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                color: 'var(--cream)',
                fontSize: 'clamp(3rem, 7vw, 6.5rem)',
              }}
            >
              Wake up above<br />
              <em>the city lights.</em>
            </h1>
            <p
              className="mb-10 leading-relaxed max-w-xl"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 300,
                color: 'var(--cream-muted)',
                fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
              }}
            >
              A design-forward five-star retreat perched above Cape Town's V&A Waterfront, with panoramic views of Table Mountain, the harbour, and the Atlantic horizon.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-4 text-sm tracking-[0.18em] uppercase transition-all duration-300 hover:opacity-90"
                style={{
                  background: 'var(--gold)',
                  color: 'var(--dark-1)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                }}
              >
                Book Your Stay
              </button>
              <button
                onClick={() => navigate('/rooms')}
                className="px-8 py-4 text-sm tracking-[0.18em] uppercase transition-all duration-300"
                style={{
                  border: '1px solid rgba(201,169,110,0.5)',
                  color: 'var(--cream)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--gold)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--gold)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(201,169,110,0.5)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--cream)'; }}
              >
                Explore Rooms
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-12 flex flex-col items-center gap-2 animate-bounce" style={{ color: 'var(--gold-dark)' }}>
          <span className="text-xs tracking-[0.2em] uppercase" style={{ fontFamily: 'var(--font-body)', writingMode: 'vertical-rl' }}>Scroll</span>
          <ChevronDown size={16} />
        </div>
      </section>

      {/* ── STATS STRIP ───────────────────────────────────── */}
      <div
        ref={statsRef}
        className="py-10"
        style={{ background: 'var(--dark-2)', borderTop: '1px solid rgba(201,169,110,0.12)', borderBottom: '1px solid rgba(201,169,110,0.12)' }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-3 md:grid-cols-5 gap-8">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="text-center"
                style={{
                  opacity: statsVisible ? 1 : 0,
                  transform: statsVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
                }}
              >
                <div
                  className="mb-1"
                  style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--gold)', fontWeight: 400 }}
                >
                  {s.value}
                </div>
                <div className="text-xs tracking-[0.15em] uppercase" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── KEY FEATURES ──────────────────────────────────── */}
      <section className="py-28 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <FeatureSection />
      </section>

      {/* ── ROOMS TEASER ──────────────────────────────────── */}
      <section className="pb-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            <SplitTextBlock
              label="Rooms & Suites"
              title={<>Spaces designed for<br /><em>restful elevation.</em></>}
              body="Seventy-two rooms and suites crafted around natural materials — Ethiopian stone, reclaimed timber, woven South African textiles — and calibrated to frame the light of the Cape at every hour."
              cta="View All Rooms"
              onCta={() => navigate('/rooms')}
            />
            <div className="relative" style={{ aspectRatio: '4/5' }}>
              <img src={IMG_ROOMS} alt="Aurora Skyline luxury suite bedroom" className="w-full h-full object-cover" />
              <div className="absolute -bottom-6 -left-6 hidden lg:block p-6" style={{ background: 'var(--dark-2)', border: '1px solid rgba(201,169,110,0.2)' }}>
                <div className="flex items-center gap-2 mb-1" style={{ color: 'var(--gold)' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                </div>
                <p className="text-xs" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>Forbes Five-Star Rated</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TEASER GRID (Dining / Rooftop / Spa / Experiences) */}
      <section className="py-20" style={{ background: 'var(--dark-2)' }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <SectionLabel>The Aurora Life</SectionLabel>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                color: 'var(--cream)',
                fontWeight: 500,
              }}
            >
              Every detail, considered.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <TeaserCard
              img={IMG_DINING}
              label="Dining"
              title="Aurora Restaurant"
              desc="Seasonal coastal menus inspired by South Africa's extraordinary larder."
              to="/dining"
            />
            <TeaserCard
              img={IMG_POOL}
              label="Sky Bar"
              title="Rooftop & Infinity Pool"
              desc="Sunset cocktails above the harbour with Table Mountain on the horizon."
              to="/dining"
            />
            <TeaserCard
              img={IMG_SPA}
              label="Wellness"
              title="Spa & Sanctuary"
              desc="Harbour-view treatment rooms, steam, and rooftop sunrise yoga."
              to="/spa"
            />
            <TeaserCard
              img={IMG_HARBOR}
              label="Experiences"
              title="Beyond the Hotel"
              desc="Aurora Concierge builds bespoke Cape Town itineraries around your curiosities."
              to="/experiences"
            />
          </div>
        </div>
      </section>

      {/* ── ROOFTOP FULL-BLEED ────────────────────────────── */}
      <section className="relative py-40 flex items-center overflow-hidden" style={{ minHeight: '600px' }}>
        <img
          src={IMG_POOL}
          alt="Aurora Skyline rooftop infinity pool overlooking Cape Town at sunset"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.55 }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,9,7,0.9) 0%, rgba(10,9,7,0.3) 100%)' }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-lg">
            <GoldDivider />
            <SectionLabel>Sky Bar & Infinity Pool</SectionLabel>
            <h2
              className="mb-6"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                color: 'var(--cream)',
                fontWeight: 500,
                lineHeight: 1.15,
              }}
            >
              The city at your feet, the sky overhead.
            </h2>
            <p className="mb-8 leading-relaxed" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)', fontWeight: 300 }}>
              On the 18th floor, our rooftop infinity pool stretches toward the horizon as day dissolves into the Cape evening. Weekend DJs, signature cocktails, and the Atlantic breeze.
            </p>
            <button
              onClick={() => navigate('/dining')}
              className="inline-flex items-center gap-3 text-sm tracking-[0.18em] uppercase transition-all duration-300 hover:gap-5"
              style={{ color: 'var(--gold)', fontFamily: 'var(--font-body)', fontWeight: 500 }}
            >
              Explore Dining & Rooftop <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── MEETINGS & EVENTS ─────────────────────────────── */}
      <section className="py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative" style={{ aspectRatio: '4/3' }}>
              <img src={IMG_EVENTS} alt="Aurora event space with Table Mountain views" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,9,7,0.2), transparent)' }} />
            </div>
            <SplitTextBlock
              label="Meetings & Events"
              title={<>Gather in a setting that<br /><em>inspires.</em></>}
              body="From intimate board dinners for ten to milestone celebrations for one hundred and fifty — Aurora's flexible venues offer natural light, Table Mountain views, and seamless event support."
              cta="Enquire About Availability"
              onCta={() => navigate('/events')}
            />
          </div>
        </div>
      </section>

      {/* ── MOUNTAIN FULL-BLEED CTA ───────────────────────── */}
      <section className="relative flex items-center justify-center text-center overflow-hidden" style={{ minHeight: '520px' }}>
        <img
          src={IMG_MOUNTAIN}
          alt="Table Mountain aerial view Cape Town"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.5 }}
        />
        <div className="absolute inset-0" style={{ background: 'rgba(10,9,7,0.6)' }} />
        <div
          ref={ctaRef}
          className="relative z-10 px-6 py-28"
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <GoldDivider />
          <SectionLabel>Reserve Your Room</SectionLabel>
          <h2
            className="mb-6 max-w-2xl mx-auto"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              color: 'var(--cream)',
              fontWeight: 500,
              lineHeight: 1.1,
            }}
          >
            Your Cape Town story starts here.
          </h2>
          <p className="mb-10 max-w-md mx-auto leading-relaxed" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)', fontWeight: 300 }}>
            Direct bookings receive complimentary room upgrade subject to availability, plus access to exclusive Aurora member rates.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="px-10 py-4 text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:opacity-90"
            style={{
              background: 'var(--gold)',
              color: 'var(--dark-1)',
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
            }}
          >
            Book Your Stay
          </button>
        </div>
      </section>
    </div>
  );
}

/* ── Feature section ─────────────────────────────────── */
const features = [
  { icon: <Star size={22} />, title: '72 Rooms & Suites', desc: 'Each room oriented toward the harbour or mountain, finished in natural materials and smart lighting.' },
  { icon: <Wind size={22} />, title: 'Rooftop Infinity Pool', desc: 'The 18th-floor sky bar and infinity pool with 360° views of Table Mountain and the Atlantic.' },
  { icon: <Utensils size={22} />, title: 'Fine Dining', desc: 'Aurora Restaurant serves seasonal, coastal-inspired menus paired with exceptional South African wines.' },
  { icon: <Sparkles size={22} />, title: 'Boutique Spa', desc: 'Harbour-view treatment rooms, a steam sanctuary, couples\' suites, and rooftop sunrise yoga.' },
  { icon: <Coffee size={22} />, title: 'Aurora Concierge', desc: 'A dedicated team crafting bespoke Cape Town experiences — from private winelands tours to sunrise hikes.' },
  { icon: <Wifi size={22} />, title: 'Business Ready', desc: 'Hybrid-capable meeting rooms for 10–150, with seamless AV, custom menus, and dedicated event planners.' },
];

function FeatureSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
      <div>
        <SectionLabel>Why Aurora</SectionLabel>
        <h2
          className="mb-6"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: 'var(--cream)',
            fontWeight: 500,
            lineHeight: 1.15,
          }}
        >
          Designed for those who<br /><em>notice the difference.</em>
        </h2>
        <p className="leading-relaxed" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)', fontWeight: 300, maxWidth: '480px' }}>
          Aurora Skyline Hotel was conceived as a love letter to Cape Town — its light, its landscapes, its living culture. Every space reflects this: art by South African artists, cuisine rooted in the Cape's seasons, and service that anticipates without intruding.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {features.map((f, i) => (
          <FeatureCard key={f.title} {...f} delay={i * 0.08} />
        ))}
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc, delay }: { icon: React.ReactNode; title: string; desc: string; delay: number }) {
  const { ref, visible } = useFadeIn();
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="p-6 transition-all duration-400"
      style={{
        background: hovered ? 'var(--dark-3)' : 'var(--dark-2)',
        border: `1px solid ${hovered ? 'rgba(201,169,110,0.4)' : 'rgba(201,169,110,0.12)'}`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s, background 0.3s ease, border-color 0.3s ease`,
      }}
    >
      <div className="mb-3" style={{ color: 'var(--gold)' }}>{icon}</div>
      <h3
        className="mb-2"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--cream)', fontSize: '1.05rem', fontWeight: 500 }}
      >
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>
        {desc}
      </p>
    </div>
  );
}

/* ── Split text block ────────────────────────────────── */
function SplitTextBlock({ label, title, body, cta, onCta }: { label: string; title: React.ReactNode; body: string; cta: string; onCta: () => void }) {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
    >
      <GoldDivider />
      <SectionLabel>{label}</SectionLabel>
      <h2
        className="mb-6"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
          color: 'var(--cream)',
          fontWeight: 500,
          lineHeight: 1.15,
        }}
      >
        {title}
      </h2>
      <p className="mb-8 leading-relaxed" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)', fontWeight: 300, maxWidth: '440px' }}>
        {body}
      </p>
      <button
        onClick={onCta}
        className="inline-flex items-center gap-3 text-sm tracking-[0.18em] uppercase transition-all duration-300 group"
        style={{ color: 'var(--gold)', fontFamily: 'var(--font-body)', fontWeight: 500 }}
        onMouseEnter={(e) => { const btn = e.currentTarget; btn.style.gap = '20px'; }}
        onMouseLeave={(e) => { const btn = e.currentTarget; btn.style.gap = '12px'; }}
      >
        {cta} <ArrowRight size={16} />
      </button>
    </div>
  );
}
