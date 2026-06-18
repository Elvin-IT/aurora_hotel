import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Wifi, Coffee, UtensilsCrossed, Shield, Tv, Bath, ArrowRight, Check } from 'lucide-react';

const IMG_HERO = 'https://images.unsplash.com/photo-1605346434674-a440ca4dc4c0?w=1920&h=900&fit=crop&auto=format';
const IMG_SKYLINE = 'https://images.unsplash.com/photo-1552858725-a19e7fcd3ac4?w=900&h=700&fit=crop&auto=format';
const IMG_MOUNTAIN = 'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=900&h=700&fit=crop&auto=format';
const IMG_SUITE = 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=900&h=700&fit=crop&auto=format';
const IMG_PENTHOUSE = 'https://images.unsplash.com/photo-1572987669554-0ba2ba9aee1f?w=900&h=700&fit=crop&auto=format';

function useFadeIn(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
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

const rooms = [
  {
    img: IMG_SKYLINE,
    name: 'Skyline Room',
    category: 'Superior Room',
    size: '38 m²',
    from: 'From R 6,500 / night',
    desc: 'Oriented toward the Atlantic and the harbour lights, the Skyline Room is a study in warm restraint. Floor-to-ceiling glazing brings the city indoors, while hand-loomed textiles and Ethiopian stone surfaces keep the feel grounded and intimate.',
    amenities: ['Harbour & city view', 'King or twin beds', 'Rain shower', 'Nespresso & curated mini bar', 'Smart lighting control', 'Work desk with dual monitors'],
  },
  {
    img: IMG_MOUNTAIN,
    name: 'Mountain View Room',
    category: 'Deluxe Room',
    size: '42 m²',
    from: 'From R 7,800 / night',
    desc: "Wake to Table Mountain filling your window — its moods shift from morning mist to golden afternoon light to deep violet at dusk. Natural linen, raw brass fixtures, and woven Zulu rush matting honour the landscape outside.",
    amenities: ['Unobstructed Table Mountain view', 'King bed', 'Deep soaking tub + rain shower', 'Nespresso & curated mini bar', 'Bluetooth sound system', 'Complimentary mountain guide book'],
  },
  {
    img: IMG_SUITE,
    name: 'Junior Suite',
    category: 'Suite',
    size: '62 m²',
    from: 'From R 11,200 / night',
    desc: 'A separate living room with a reclaimed teak day bed, a private bar, and dual aspects across the mountain and waterfront. The Junior Suite is for those who want the city at arm\'s length and comfort at their fingertips.',
    amenities: ['Dual-aspect panoramic views', 'Separate living room', 'King bed + day bed', 'Freestanding bath + rain shower', 'Private bar & Nespresso', 'Aurora amenity kit', 'Priority room service'],
  },
  {
    img: IMG_PENTHOUSE,
    name: 'Aurora Penthouse',
    category: 'Signature Suite',
    size: '140 m²',
    from: 'From R 28,500 / night',
    desc: 'The pinnacle of Aurora. A two-bedroom private penthouse on the 17th floor with a wraparound terrace, a private plunge pool, a chef\'s pantry, and direct lift access. Table Mountain, the harbour, and the Atlantic at once — and yours alone.',
    amenities: ['Wraparound private terrace', 'Private plunge pool', 'Two king bedrooms', 'Chef\'s pantry', 'Full butler service', 'In-suite spa treatments on request', 'Private car & driver included'],
  },
];

const globalAmenities = [
  { icon: <Wifi size={16} />, label: 'High-speed Wi-Fi' },
  { icon: <Coffee size={16} />, label: 'Nespresso machine' },
  { icon: <Bath size={16} />, label: 'Luxury bedding & robes' },
  { icon: <UtensilsCrossed size={16} />, label: '24-hour room service' },
  { icon: <Tv size={16} />, label: 'Smart 4K TV' },
  { icon: <Shield size={16} />, label: 'Curated mini bar' },
];

function RoomCard({ room, index }: { room: typeof rooms[0]; index: number }) {
  const { ref, visible } = useFadeIn();
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const isReversed = index % 2 !== 0;

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${isReversed ? 'lg:grid-flow-dense' : ''}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
        border: '1px solid rgba(201,169,110,0.12)',
      }}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden ${isReversed ? 'lg:col-start-2' : ''}`}
        style={{ minHeight: '420px' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={room.img}
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)', position: 'absolute', inset: 0 }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(10,9,7,0.5) 100%)' }} />
        <div
          className="absolute top-6 left-6 px-4 py-1.5"
          style={{ background: 'var(--gold)', color: 'var(--dark-1)', fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500 }}
        >
          {room.category}
        </div>
      </div>

      {/* Content */}
      <div
        className={`p-10 lg:p-14 flex flex-col justify-center ${isReversed ? 'lg:col-start-1 lg:row-start-1' : ''}`}
        style={{ background: 'var(--dark-2)' }}
      >
        <div className="flex items-start justify-between mb-2 flex-wrap gap-4">
          <div>
            <GoldDivider />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--cream)', fontWeight: 500, lineHeight: 1.1 }}>
              {room.name}
            </h2>
            <div className="mt-1" style={{ color: 'var(--gold)', fontFamily: 'var(--font-body)', fontSize: '0.75rem', letterSpacing: '0.15em' }}>
              {room.size}
            </div>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', fontSize: '1.1rem', textAlign: 'right', lineHeight: 1.3 }}>
            {room.from}
          </div>
        </div>
        <p className="mt-4 mb-8 leading-relaxed text-sm" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)', fontWeight: 300 }}>
          {room.desc}
        </p>
        <ul className="space-y-2 mb-8">
          {room.amenities.map((a) => (
            <li key={a} className="flex items-center gap-3 text-sm" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>
              <Check size={13} style={{ color: 'var(--gold)', flexShrink: 0 }} />
              {a}
            </li>
          ))}
        </ul>
        <button
          onClick={() => navigate('/contact')}
          className="self-start inline-flex items-center gap-3 px-8 py-3.5 text-xs tracking-[0.18em] uppercase transition-all duration-300 hover:bg-[var(--gold)] hover:text-[var(--dark-1)]"
          style={{ border: '1px solid var(--gold)', color: 'var(--gold)', fontFamily: 'var(--font-body)', fontWeight: 500 }}
        >
          Reserve <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

export function Rooms() {
  const { ref, visible } = useFadeIn();

  return (
    <div style={{ background: 'var(--dark-1)' }}>
      {/* Hero */}
      <div className="relative flex items-end" style={{ height: '65vh', minHeight: '480px', background: '#0a0907' }}>
        <img src={IMG_HERO} alt="Aurora Skyline luxury room interior" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.55 }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,9,7,1) 0%, rgba(10,9,7,0.3) 60%)' }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pb-16 w-full">
          <SectionLabel>Rooms & Suites</SectionLabel>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'var(--cream)', fontWeight: 500, lineHeight: 1.05 }}>
            Your private<br /><em>Cape Town sanctuary.</em>
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
            Each of our seventy-two rooms and suites is shaped around a calm, residential sensibility. Natural materials — Ethiopian volcanic stone, reclaimed timber, hand-woven South African textiles — are paired with intuitive smart technology. The result is a retreat that feels genuinely restful, not performatively luxurious.
          </p>
        </div>
      </section>

      {/* Room cards */}
      <section className="pb-20 max-w-[1400px] mx-auto px-6 lg:px-12 space-y-6">
        {rooms.map((room, i) => (
          <RoomCard key={room.name} room={room} index={i} />
        ))}
      </section>

      {/* Global amenities */}
      <section className="py-20" style={{ background: 'var(--dark-2)', borderTop: '1px solid rgba(201,169,110,0.12)' }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <SectionLabel>Included in Every Room</SectionLabel>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--cream)', fontWeight: 500 }}>
              Aurora standards.
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {globalAmenities.map((a) => (
              <div key={a.label} className="flex flex-col items-center gap-3 p-6 text-center" style={{ border: '1px solid rgba(201,169,110,0.12)' }}>
                <div style={{ color: 'var(--gold)' }}>{a.icon}</div>
                <span className="text-xs tracking-[0.1em]" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>{a.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
