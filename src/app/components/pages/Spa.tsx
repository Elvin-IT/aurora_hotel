import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { ArrowRight, Clock } from 'lucide-react';

const IMG_HERO = 'https://images.unsplash.com/photo-1720118509152-2df877673bee?w=1920&h=900&fit=crop&auto=format';
const IMG_SPA1 = 'https://images.unsplash.com/photo-1768413292047-116be08f120c?w=900&h=1100&fit=crop&auto=format';
const IMG_SPA2 = 'https://images.unsplash.com/photo-1759303690206-1dc66e9ef8ed?w=900&h=700&fit=crop&auto=format';
const IMG_MOUNTAIN = 'https://images.unsplash.com/photo-1591296795955-92a580509b82?w=1920&h=800&fit=crop&auto=format';
const IMG_VINEYARD = 'https://images.unsplash.com/photo-1779709285916-aca6929baef1?w=1200&h=800&fit=crop&auto=format';

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

function GoldDivider() {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="h-px w-8" style={{ background: 'var(--gold)' }} />
      <div className="w-1.5 h-1.5 rotate-45" style={{ background: 'var(--gold)' }} />
      <div className="h-px w-8" style={{ background: 'var(--gold)' }} />
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="block tracking-[0.3em] uppercase text-xs mb-4" style={{ color: 'var(--gold)', fontFamily: 'var(--font-body)', fontWeight: 400 }}>
      {children}
    </span>
  );
}

const treatments = [
  { name: 'Namib Myrrh Awakening', duration: '60 min', desc: 'Full-body exfoliation with Nara seed scrub, followed by an invigorating desert myrrh oil massage.' },
  { name: 'Desert Stone Ritual', duration: '90 min', desc: 'Warm basalt stones combined with indigenous Kalahari essential oils. Deep tissue release with a grounding finish.' },
  { name: 'Atlantic Detox Wrap', duration: '75 min', desc: 'Marine algae body wrap drawing on the Atlantic\'s rich seaweed heritage. Remineralising, rehydrating, renewing.' },
  { name: 'Spitzkoppe Floral Facial', duration: '75 min', desc: 'A results-driven treatment using botanical extracts sourced from the Namib Desert Flora. Customised to your skin.' },
  { name: 'Couples\' Sanctuary Ritual', duration: '120 min', desc: 'A private two-room experience with side-by-side treatments, a shared champagne bath, and harbour sunset views.' },
  { name: 'Executive Recharge', duration: '45 min', desc: 'Designed for business travellers: neck and shoulder massage, express facial, and scalp treatment. In and out, transformed.' },
];

function TreatmentCard({ t, index }: { t: typeof treatments[0]; index: number }) {
  const { ref, visible } = useFadeIn();
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="p-8 transition-all duration-300"
      style={{
        background: hovered ? 'var(--dark-3)' : 'var(--dark-2)',
        border: `1px solid ${hovered ? 'rgba(201,169,110,0.4)' : 'rgba(201,169,110,0.12)'}`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s, background 0.3s, border-color 0.3s`,
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--cream)', fontSize: '1.1rem', fontWeight: 500 }}>{t.name}</h3>
        <span className="text-xs ml-4 shrink-0 flex items-center gap-1" style={{ color: 'var(--gold)', fontFamily: 'var(--font-body)' }}>
          <Clock size={11} /> {t.duration}
        </span>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>{t.desc}</p>
    </div>
  );
}

export function Spa() {
  const navigate = useNavigate();
  const { ref: introRef, visible: introVisible } = useFadeIn();
  const { ref: yogaRef, visible: yogaVisible } = useFadeIn();

  return (
    <div style={{ background: 'var(--dark-1)' }}>
      {/* Hero */}
      <div className="relative flex items-end" style={{ height: '70vh', minHeight: '500px', background: '#0a0907' }}>
        <img src={IMG_HERO} alt="Aurora Spa serene treatment room with candles" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.55 }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,9,7,1) 0%, rgba(10,9,7,0.3) 65%)' }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pb-16 w-full">
          <SectionLabel>Spa & Wellness</SectionLabel>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'var(--cream)', fontWeight: 500, lineHeight: 1.05 }}>
            Stillness above<br /><em>the harbour.</em>
          </h1>
        </div>
      </div>

      {/* Intro */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div
            ref={introRef}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            style={{ opacity: introVisible ? 1 : 0, transform: introVisible ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}
          >
            <div>
              <GoldDivider />
              <SectionLabel>Aurora Spa</SectionLabel>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', color: 'var(--cream)', fontWeight: 500, lineHeight: 1.15, marginBottom: '1.5rem' }}>
                Botanicals of the<br /><em>Namib Desert Flora.</em>
              </h2>
              <p className="leading-relaxed mb-5" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)', fontWeight: 300 }}>
                Aurora Spa occupies an entire floor suspended above the harbour. Treatment rooms face the water, so each session unfolds against the movement of light on the Atlantic. Indigenous plant extracts — Kalahari melon, devil's claw, desert myrrh — form the basis of our bespoke treatment philosophy.
              </p>
              <p className="leading-relaxed mb-8" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)', fontWeight: 300 }}>
                The facility includes eight treatment rooms, two couples' suites, a steam sanctuary, a cold plunge pool, a movement studio, and a quiet rest lounge with complementary herbal tea service.
              </p>
              <div className="flex items-center gap-2 text-sm mb-8" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>
                <Clock size={14} style={{ color: 'var(--gold)' }} />
                Daily 07:00–21:00 · Last treatment booking 19:00
              </div>
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-3.5 text-xs tracking-[0.18em] uppercase transition-all duration-300 hover:bg-[var(--gold)] hover:text-[var(--dark-1)]"
                style={{ border: '1px solid var(--gold)', color: 'var(--gold)', fontFamily: 'var(--font-body)', fontWeight: 500 }}
              >
                Book a Treatment
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <img src={IMG_SPA1} alt="Aurora Spa treatment room" className="w-full object-cover" style={{ aspectRatio: '3/4' }} />
              <div className="flex flex-col gap-3">
                <img src={IMG_SPA2} alt="Spa relaxation" className="w-full object-cover" style={{ aspectRatio: '1/1', flex: 1 }} />
                <div className="p-4" style={{ background: 'var(--dark-3)', border: '1px solid rgba(201,169,110,0.2)', flex: 1 }}>
                  <div className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--gold)', fontFamily: 'var(--font-body)' }}>Spa Hours</div>
                  <div className="text-sm" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>Daily 07:00 – 21:00</div>
                  <div className="text-sm mt-1" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>8 treatment rooms</div>
                  <div className="text-sm mt-1" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>2 couples' suites</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatments grid */}
      <section className="py-20" style={{ background: 'var(--dark-2)' }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <SectionLabel>Our Treatments</SectionLabel>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--cream)', fontWeight: 500 }}>
              Rituals inspired by<br /><em>the Atlantic's natural heritage.</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {treatments.map((t, i) => (
              <TreatmentCard key={t.name} t={t} index={i} />
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/contact')}
              className="px-10 py-4 text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:opacity-90"
              style={{ background: 'var(--gold)', color: 'var(--dark-1)', fontFamily: 'var(--font-body)', fontWeight: 500 }}
            >
              Book Your Treatment
            </button>
          </div>
        </div>
      </section>

      {/* Yoga / rooftop movement */}
      <section className="relative py-32 overflow-hidden" style={{ minHeight: '500px' }}>
        <img src={IMG_MOUNTAIN} alt="Spitzkoppe sunrise from rooftop yoga studio" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.45 }} />
        <div className="absolute inset-0" style={{ background: 'rgba(10,9,7,0.6)' }} />
        <div
          ref={yogaRef}
          className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 text-center"
          style={{ opacity: yogaVisible ? 1 : 0, transform: yogaVisible ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}
        >
          <GoldDivider />
          <SectionLabel>Rooftop Movement Studio</SectionLabel>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--cream)', fontWeight: 500, lineHeight: 1.1, marginBottom: '1.5rem', maxWidth: '700px', margin: '0 auto 1.5rem' }}>
            Sunrise yoga above<br /><em>the Namib Dunes.</em>
          </h2>
          <p className="max-w-lg mx-auto leading-relaxed mb-8" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)', fontWeight: 300 }}>
            Our 18th-floor movement studio opens onto the rooftop terrace. Daily sunrise yoga, meditation sessions, and private Pilates instruction are available — with the Namib Dunes as your backdrop.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>
            {['Sunrise Yoga — 06:30 daily', 'Guided Meditation — 07:30 Tue & Thu', 'Private Pilates — by arrangement', 'Sound Bath — Sat 08:00'].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rotate-45" style={{ background: 'var(--gold)', flexShrink: 0 }} />
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vineyard CTA */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0" style={{ border: '1px solid rgba(201,169,110,0.15)' }}>
            <img src={IMG_VINEYARD} alt="Sossusvlei desert dunes" className="w-full object-cover" style={{ aspectRatio: '16/9', maxHeight: '400px' }} />
            <div className="flex flex-col justify-center p-12 lg:p-16" style={{ background: 'var(--dark-2)' }}>
              <GoldDivider />
              <SectionLabel>Wellness Packages</SectionLabel>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--cream)', fontWeight: 500, lineHeight: 1.2, marginBottom: '1rem' }}>
                Extended spa stays<br /><em>&amp; retreat packages.</em>
              </h3>
              <p className="mb-6 leading-relaxed text-sm" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>
                Combine accommodation with a bespoke wellness programme — or extend your stay with a desert dunes spa excursion to Sossusvlei. Our concierge team will build the itinerary around you.
              </p>
              <button
                onClick={() => navigate('/contact')}
                className="self-start inline-flex items-center gap-3 text-sm tracking-[0.18em] uppercase transition-all duration-300"
                style={{ color: 'var(--gold)', fontFamily: 'var(--font-body)', fontWeight: 500 }}
              >
                Enquire About Packages <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
