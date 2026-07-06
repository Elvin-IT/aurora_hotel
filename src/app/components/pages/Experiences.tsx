import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { ArrowRight, Clock, Users } from 'lucide-react';

const IMG_HERO = 'https://images.unsplash.com/photo-1557077590-f7cc67c1a101?w=1920&h=900&fit=crop&auto=format';
const IMG_VINEYARD = 'https://images.unsplash.com/photo-1779709285916-aca6929baef1?w=900&h=700&fit=crop&auto=format';
const IMG_MOUNTAIN = 'https://images.unsplash.com/photo-1591296795955-92a580509b82?w=900&h=700&fit=crop&auto=format';
const IMG_HARBOR = 'https://images.unsplash.com/photo-1575540538034-c69be309c367?w=900&h=700&fit=crop&auto=format';
const IMG_CAPE = 'https://images.unsplash.com/photo-1688666272717-7f13536b4dac?w=900&h=700&fit=crop&auto=format';
const IMG_VINEYARD2 = 'https://images.unsplash.com/photo-1779709287920-1f1375b26871?w=900&h=700&fit=crop&auto=format';

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

const experiences = [
  {
    img: IMG_VINEYARD,
    label: 'Full Day · Private Fly-In',
    title: 'Sossusvlei Desert Dunes Excursion',
    duration: '6–8 hours',
    guests: 'Up to 6 guests',
    desc: 'A curated private flight and morning among the towering red dunes of Sossusvlei and Deadvlei. Your Aurora guide takes you beyond the usual pathways to climb Big Daddy, explore the ancient clay pan, and enjoy a private dune-side lunch paired with reserve Namibian estate wines. Return by late afternoon for sunset cocktails on the 18th floor.',
    highlight: 'Private fly-in safari · Dune access · Gourmet desert lunch included',
  },
  {
    img: IMG_MOUNTAIN,
    label: 'Early Morning · Small Group',
    title: 'Spitzkoppe Peak Sunrise Hike',
    duration: '3–4 hours',
    guests: '2–8 guests',
    desc: 'Depart the hotel at 05:00 for the iconic Spitzkoppe granite peaks, arriving at the base as the Namibian sky turns from indigo to gold. An Aurora naturalist guide shares the mountain\'s geological history, ancient San rock art, and the panoramic desert views. Post-hike breakfast at the hotel awaits on your return.',
    highlight: 'Expert naturalist guide · San rock art viewing · Hotel transfer included',
  },
  {
    img: IMG_CAPE,
    label: 'Full Day',
    title: 'Pelican Point & Sandwich Harbour Tour',
    duration: '8–9 hours',
    guests: 'Up to 8 guests',
    desc: 'Travel the dramatic Namib coast — past Walvis Bay lagoon\'s flamingos, Pelican Point\'s lighthouse, and to Sandwich Harbour where giant dunes plunge straight into the Atlantic Ocean. A private 4x4 vehicle, a gourmet beach picnic, and insider access throughout.',
    highlight: 'Private 4x4 dune drive · Flamingos & seal colonies · Gourmet beach picnic',
  },
  {
    img: IMG_HARBOR,
    label: 'Afternoon · Private',
    title: 'Swakopmund Heritage & Art Circuit',
    duration: '3–4 hours',
    guests: '2–4 guests',
    desc: 'Swakopmund\'s contemporary art scene is one of Namibia\'s most vibrant. An Aurora cultural guide leads a curated walk through local galleries, selected Swakopmund creative studios, and the Swakopmund Museum — with introductions to artists where possible. Ends with a gallery sundowner.',
    highlight: 'Art historian guide · Studio access · Gallery priority entry',
  },
  {
    img: IMG_VINEYARD2,
    label: 'Half Day · Immersive',
    title: 'Mondesa Cultural Immersion',
    duration: '4–5 hours',
    guests: '2–6 guests',
    desc: 'An ethical, community-led experience in Mondesa — Swakopmund\'s vibrant township. Meet community leaders, artists, and entrepreneurs shaping the local culture. Lunch at a neighbourhood home restaurant. Guided by local residents. Sensitive, considered, unforgettable.',
    highlight: 'Local community guides · Home restaurant lunch · Zero-commission model — proceeds direct to guides',
  },
  {
    img: IMG_MOUNTAIN,
    label: 'Evening · Exclusive',
    title: 'Private Sunset Harbour Cruise',
    duration: '2–3 hours',
    guests: '2–10 guests',
    desc: 'Board a private 40-foot sailing yacht from the Swakopmund Waterfront and slip into the Atlantic for a golden hour unlike any other. Pelican Point behind you, the desert coast ahead, and the sky turning amber as the sun drops. Champagne and fresh Atlantic seafood on board.',
    highlight: 'Private yacht · Champagne & seafood · Professional skipper',
  },
];

function ExperienceCard({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const { ref, visible } = useFadeIn();
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 lg:grid-cols-2 ${isEven ? '' : 'lg:grid-flow-dense'}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
        border: '1px solid rgba(201,169,110,0.12)',
      }}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden ${isEven ? '' : 'lg:col-start-2'}`}
        style={{ minHeight: '360px' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={exp.img}
          alt={exp.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(10,9,7,0.5) 100%)' }} />
        <div className="absolute top-6 left-6 px-4 py-1.5" style={{ background: 'rgba(10,9,7,0.75)', border: '1px solid rgba(201,169,110,0.3)' }}>
          <span className="text-xs tracking-[0.2em]" style={{ color: 'var(--gold)', fontFamily: 'var(--font-body)' }}>{exp.label}</span>
        </div>
      </div>

      {/* Content */}
      <div
        className={`p-10 lg:p-14 flex flex-col justify-center ${isEven ? '' : 'lg:col-start-1 lg:row-start-1'}`}
        style={{ background: 'var(--dark-2)' }}
      >
        <GoldDivider />
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--cream)', fontWeight: 500, marginBottom: '0.5rem', lineHeight: 1.15 }}>
          {exp.title}
        </h2>
        <div className="flex flex-wrap gap-4 mb-5">
          <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>
            <Clock size={12} style={{ color: 'var(--gold)' }} /> {exp.duration}
          </span>
          <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>
            <Users size={12} style={{ color: 'var(--gold)' }} /> {exp.guests}
          </span>
        </div>
        <p className="leading-relaxed text-sm mb-6" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)', fontWeight: 300 }}>
          {exp.desc}
        </p>
        <p className="text-xs italic mb-8" style={{ color: 'var(--gold-light)', fontFamily: 'var(--font-body)' }}>
          {exp.highlight}
        </p>
        <button
          onClick={() => navigate('/contact')}
          className="self-start inline-flex items-center gap-3 text-xs tracking-[0.18em] uppercase transition-all duration-300 hover:gap-5"
          style={{ color: 'var(--gold)', fontFamily: 'var(--font-body)', fontWeight: 500 }}
        >
          Enquire About This Experience <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

export function Experiences() {
  const navigate = useNavigate();
  const { ref, visible } = useFadeIn();

  return (
    <div style={{ background: 'var(--dark-1)' }}>
      {/* Hero */}
      <div className="relative flex items-end" style={{ height: '70vh', minHeight: '500px', background: '#0a0907' }}>
        <img src={IMG_HERO} alt="Namib dunes aerial view" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.5 }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,9,7,1) 0%, rgba(10,9,7,0.3) 65%)' }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pb-16 w-full">
          <SectionLabel>Experiences</SectionLabel>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'var(--cream)', fontWeight: 500, lineHeight: 1.05 }}>
            Swakopmund, curated<br /><em>for you alone.</em>
          </h1>
        </div>
      </div>

      {/* Intro */}
      <section className="py-20 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          ref={ref}
          className="max-w-2xl"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
        >
          <GoldDivider />
          <p className="leading-relaxed" style={{ fontFamily: 'var(--font-body)', fontWeight: 300, color: 'var(--cream-muted)', fontSize: '1.1rem' }}>
            Aurora Concierge is more than a bookings desk — it is a team of Swakopmund obsessives who know which desert pilot to call for a private fly-in Saturday, which trail glows at sunrise, and which local chef is cooking the meal of the year. They build custom itineraries before you arrive, and adapt them the moment your plans change.
          </p>
        </div>
      </section>

      {/* Experience cards */}
      <section className="pb-20 max-w-[1400px] mx-auto px-6 lg:px-12 space-y-6">
        {experiences.map((exp, i) => (
          <ExperienceCard key={exp.title} exp={exp} index={i} />
        ))}
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: 'var(--dark-2)', borderTop: '1px solid rgba(201,169,110,0.12)' }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <GoldDivider />
          <SectionLabel>Aurora Concierge</SectionLabel>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--cream)', fontWeight: 500, marginBottom: '1.5rem' }}>
            Let's plan your stay together.
          </h2>
          <p className="max-w-lg mx-auto mb-10 leading-relaxed" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)', fontWeight: 300 }}>
            Send Aurora Concierge a note about your interests, and they'll build an itinerary before you even check in.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="px-10 py-4 text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:opacity-90"
            style={{ background: 'var(--gold)', color: 'var(--dark-1)', fontFamily: 'var(--font-body)', fontWeight: 500 }}
          >
            Start Planning Your Stay
          </button>
        </div>
      </section>
    </div>
  );
}
