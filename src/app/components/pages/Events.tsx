import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { ArrowRight, Users, Maximize2, Monitor, Utensils, Check } from 'lucide-react';

const IMG_HERO = 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=1920&h=900&fit=crop&auto=format';
const IMG_EVENTS = 'https://images.unsplash.com/photo-1560053608-13721e0d69e8?w=1200&h=900&fit=crop&auto=format';
const IMG_MOUNTAIN = 'https://images.unsplash.com/photo-1591296795955-92a580509b82?w=1920&h=800&fit=crop&auto=format';
const IMG_DINING = 'https://images.unsplash.com/photo-1653259038915-7cf0b7a4dd6c?w=1200&h=800&fit=crop&auto=format';

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.08 });
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

const venues = [
  {
    name: 'The Boardroom',
    capacity: 'Up to 18',
    size: '68 m²',
    desc: 'A private, panelled room on the 5th floor with integrated AV, a dedicated barista station, and a long executive table in reclaimed teak. Floor-to-ceiling windows look directly onto the Namib Dunes.',
    features: ['Integrated 85" display', 'Video conferencing suite', 'Barista on request', 'Direct Dunes view', 'Breakout terrace'],
  },
  {
    name: 'The Gallery',
    capacity: 'Up to 60',
    size: '210 m²',
    desc: 'A flexible event space on the 4th floor with polished concrete floors, rotating works from Namibian artists, and full natural light through a glazed north wall. Theatre, banquet, or cocktail configurations.',
    features: ['Three configurations available', 'Audiovisual production support', 'Natural daylight', 'Namibian art collection', 'Adjacent catering kitchen'],
  },
  {
    name: 'The Rooftop Terrace',
    capacity: 'Up to 120',
    size: '420 m²',
    desc: 'The 18th-floor terrace — ordinarily home to the Sky Bar and infinity pool — can be exclusively privatised for cocktail receptions, intimate ceremonies, and al fresco dinners. The Namib Dunes and harbour views at every angle.',
    features: ['Exclusive venue hire', '360° city & dunes views', 'Adjacent Sky Bar for cocktail service', 'Sunset ceremony packages', 'Custom lighting & décor'],
  },
  {
    name: 'The Grand Ballroom',
    capacity: 'Up to 150',
    size: '580 m²',
    desc: 'Aurora\'s signature event space on the ground floor opens through full-height doors to a private courtyard garden. Designed for weddings, gala dinners, and product launches requiring scale and grandeur.',
    features: ['Private courtyard access', 'Professional rigging points', 'Bridal preparation suite', 'Full production capabilities', 'Dedicated event planning team'],
  },
];

const services = [
  { icon: <Users size={20} />, title: 'Dedicated Event Planning', desc: 'A senior Aurora event planner is assigned to your event from first enquiry to final goodbye — one point of contact for everything.' },
  { icon: <Utensils size={20} />, title: 'Custom Menus', desc: 'Aurora Restaurant\'s culinary team creates bespoke menus for every event — from working breakfasts to seven-course wedding dinners.' },
  { icon: <Monitor size={20} />, title: 'Hybrid & AV Technology', desc: 'Broadcast-quality streaming, studio-grade sound, and full production support for hybrid events and product launches.' },
  { icon: <Maximize2 size={20} />, title: 'Florals & Décor', desc: 'Our preferred décor partners work to Aurora\'s aesthetic — considered, elegant, never generic.' },
];

function ServiceCard({ s, i }: { s: typeof services[0]; i: number }) {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      className="p-8"
      style={{
        border: '1px solid rgba(201,169,110,0.12)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
      }}
    >
      <div className="mb-4" style={{ color: 'var(--gold)' }}>{s.icon}</div>
      <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--cream)', fontSize: '1.1rem', fontWeight: 500, marginBottom: '0.5rem' }}>{s.title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>{s.desc}</p>
    </div>
  );
}

function VenueCard({ venue, index }: { venue: typeof venues[0]; index: number }) {
  const { ref, visible } = useFadeIn();
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="p-8 lg:p-10 transition-all duration-300"
      style={{
        background: hovered ? 'var(--dark-3)' : 'var(--dark-2)',
        border: `1px solid ${hovered ? 'rgba(201,169,110,0.4)' : 'rgba(201,169,110,0.12)'}`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s, background 0.3s, border-color 0.3s`,
      }}
    >
      <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--cream)', fontSize: '1.4rem', fontWeight: 500 }}>{venue.name}</h3>
          <div className="mt-1 text-xs" style={{ color: 'var(--gold)', fontFamily: 'var(--font-body)', letterSpacing: '0.15em' }}>{venue.size}</div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>
            <Users size={13} style={{ color: 'var(--gold)' }} /> {venue.capacity}
          </div>
        </div>
      </div>
      <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>{venue.desc}</p>
      <ul className="space-y-2">
        {venue.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>
            <Check size={12} style={{ color: 'var(--gold)', flexShrink: 0 }} /> {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Events() {
  const navigate = useNavigate();
  const { ref: introRef, visible: introVisible } = useFadeIn();
  const { ref: weddingRef, visible: weddingVisible } = useFadeIn();

  return (
    <div style={{ background: 'var(--dark-1)' }}>
      {/* Hero */}
      <div className="relative flex items-end" style={{ height: '70vh', minHeight: '500px', background: '#0a0907' }}>
        <img src={IMG_HERO} alt="Aurora hotel event space elegant interior" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.55 }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,9,7,1) 0%, rgba(10,9,7,0.3) 65%)' }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pb-16 w-full">
          <SectionLabel>Meetings & Events</SectionLabel>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'var(--cream)', fontWeight: 500, lineHeight: 1.05 }}>
            Occasions that<br /><em>leave a mark.</em>
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
              <SectionLabel>Why Aurora for Events</SectionLabel>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', color: 'var(--cream)', fontWeight: 500, lineHeight: 1.15, marginBottom: '1.5rem' }}>
                Every gathering,<br /><em>shaped to your vision.</em>
              </h2>
              <p className="leading-relaxed mb-5" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)', fontWeight: 300 }}>
                Aurora offers four distinct event spaces — from intimate boardrooms to a 580 m² grand ballroom — each designed with the same commitment to craft that defines our guest rooms. Natural light, views of the Namib Dunes, and Namibia's most sophisticated catering team make Aurora Swakopmund's premier event destination.
              </p>
              <p className="leading-relaxed mb-8" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)', fontWeight: 300 }}>
                From product launches and board retreats to milestone birthdays and intimate weddings, our event team handles every detail — so you can be present for the moments that matter.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/contact')}
                  className="px-8 py-3.5 text-xs tracking-[0.18em] uppercase transition-all duration-300 hover:bg-[var(--gold)] hover:text-[var(--dark-1)]"
                  style={{ border: '1px solid var(--gold)', color: 'var(--gold)', fontFamily: 'var(--font-body)', fontWeight: 500 }}
                >
                  Enquire About Availability
                </button>
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '#';
                    link.download = 'Aurora-Event-Pack.pdf';
                    link.click();
                  }}
                  className="inline-flex items-center gap-2 px-8 py-3.5 text-xs tracking-[0.18em] uppercase transition-all duration-300"
                  style={{ border: '1px solid rgba(201,169,110,0.3)', color: 'var(--cream)', fontFamily: 'var(--font-body)' }}
                >
                  Download Event Pack <ArrowRight size={14} />
                </button>
              </div>
            </div>
            <div>
              <img src={IMG_EVENTS} alt="Aurora event space" className="w-full object-cover" style={{ aspectRatio: '4/3' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Venues grid */}
      <section className="py-20" style={{ background: 'var(--dark-2)' }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <SectionLabel>Our Venues</SectionLabel>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--cream)', fontWeight: 500 }}>
              Spaces for every scale<br /><em>of ambition.</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {venues.map((v, i) => (
              <VenueCard key={v.name} venue={v} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <SectionLabel>What We Provide</SectionLabel>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--cream)', fontWeight: 500 }}>
              A complete event ecosystem.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => <ServiceCard key={s.title} s={s} i={i} />)}
          </div>
        </div>
      </section>

      {/* Wedding CTA */}
      <section className="relative py-32 overflow-hidden" style={{ minHeight: '500px' }}>
        <img src={IMG_MOUNTAIN} alt="Namib Dunes romantic backdrop for weddings" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.4 }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,9,7,0.95) 0%, rgba(10,9,7,0.5) 100%)' }} />
        <div
          ref={weddingRef}
          className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 text-center"
          style={{ opacity: weddingVisible ? 1 : 0, transform: weddingVisible ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}
        >
          <GoldDivider />
          <SectionLabel>Weddings at Aurora</SectionLabel>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--cream)', fontWeight: 500, lineHeight: 1.1, marginBottom: '1.5rem', maxWidth: '700px', margin: '0 auto 1.5rem' }}>
            The Namib Dunes at your ceremony.<br /><em>The harbour at your dinner.</em>
          </h2>
          <p className="max-w-xl mx-auto mb-10 leading-relaxed" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)', fontWeight: 300 }}>
            From intimate elopements for two to garden celebrations for one hundred and fifty, Aurora's wedding team crafts each occasion around you — with access to the rooftop terrace, grand ballroom, and the full Swakopmund backdrop.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/contact')}
              className="px-10 py-4 text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:opacity-90"
              style={{ background: 'var(--gold)', color: 'var(--dark-1)', fontFamily: 'var(--font-body)', fontWeight: 500 }}
            >
              Enquire About Weddings
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="px-10 py-4 text-sm tracking-[0.2em] uppercase transition-all duration-300"
              style={{ border: '1px solid rgba(201,169,110,0.4)', color: 'var(--cream)', fontFamily: 'var(--font-body)' }}
            >
              Schedule a Site Visit
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
