import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { ArrowRight, Leaf, Zap, Droplets, ShoppingBag } from 'lucide-react';

const IMG_HERO = 'https://images.unsplash.com/photo-1585896162053-6ae8d00f6b25?w=1920&h=900&fit=crop&auto=format';
const IMG_WATERFRONT = 'https://images.unsplash.com/photo-1575540538034-c69be309c367?w=1200&h=900&fit=crop&auto=format';
const IMG_CAPE = 'https://images.unsplash.com/photo-1658899818108-64b723a317b4?w=1200&h=800&fit=crop&auto=format';
const IMG_VINEYARD = 'https://images.unsplash.com/photo-1766834087772-014d322b82c8?w=1200&h=800&fit=crop&auto=format';
const IMG_MOUNTAIN = 'https://images.unsplash.com/photo-1557077590-f7cc67c1a101?w=1200&h=800&fit=crop&auto=format';

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

const sustainability = [
  {
    icon: <Zap size={22} />,
    title: 'Solar-Powered Operations',
    desc: 'Aurora\'s rooftop solar array generates 65% of the hotel\'s daytime energy needs. We supplement with renewable electricity purchasing for the remainder, targeting net-zero operations by 2028.',
  },
  {
    icon: <Droplets size={22} />,
    title: 'Grey Water Recycling',
    desc: 'Our closed-loop grey water system recycles and treats water from showers and laundry, redistributing it for irrigation, toilet flushing, and pool maintenance. Saving over 1.2 million litres annually.',
  },
  {
    icon: <ShoppingBag size={22} />,
    title: 'Locally Sourced Produce',
    desc: 'Over 85% of ingredients served in Aurora Restaurant and the Sky Bar come from within 250 km of Swakopmund — from Walvis Bay fishers to Swakop Valley market gardeners to Damaraland heritage grain farmers.',
  },
  {
    icon: <Leaf size={22} />,
    title: 'Zero Single-Use Plastics',
    desc: 'Aurora eliminated all single-use plastic from guest rooms and food service in 2023. Room amenities arrive in refillable glass vessels; room service packaging is 100% compostable.',
  },
];

const values = [
  { number: '01', title: 'Place', desc: 'Every design decision is rooted in Swakopmund — its light, its desert dunes, its living culture.' },
  { number: '02', title: 'Craft', desc: 'We commission, collect, and collaborate with Namibian makers — artists, weavers, ceramicists, furniture builders.' },
  { number: '03', title: 'Restraint', desc: 'Luxury is not excess. It\'s the quality of a single perfect material, a view framed exactly right, a service offered before it\'s asked for.' },
  { number: '04', title: 'Responsibility', desc: 'We are guests in this city and this landscape. We take that seriously — environmentally, culturally, economically.' },
];

function SustainCard({ s, i }: { s: typeof sustainability[0]; i: number }) {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      className="flex gap-5 p-6"
      style={{
        border: '1px solid rgba(201,169,110,0.12)',
        background: 'var(--dark-2)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
      }}
    >
      <div className="shrink-0 mt-0.5" style={{ color: 'var(--gold)' }}>{s.icon}</div>
      <div>
        <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--cream)', fontSize: '1.05rem', fontWeight: 500, marginBottom: '0.4rem' }}>{s.title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>{s.desc}</p>
      </div>
    </div>
  );
}

export function About() {
  const navigate = useNavigate();
  const { ref: storyRef, visible: storyVisible } = useFadeIn();
  const { ref: sustainRef, visible: sustainVisible } = useFadeIn();
  const { ref: valuesRef, visible: valuesVisible } = useFadeIn();

  return (
    <div style={{ background: 'var(--dark-1)' }}>
      {/* Hero */}
      <div className="relative flex items-end" style={{ height: '70vh', minHeight: '500px', background: '#0a0907' }}>
        <img src={IMG_HERO} alt="Swakopmund aerial panorama from above the Namib Dunes" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.5 }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,9,7,1) 0%, rgba(10,9,7,0.3) 65%)' }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pb-16 w-full">
          <SectionLabel>Our Story</SectionLabel>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'var(--cream)', fontWeight: 500, lineHeight: 1.05 }}>
            A love letter to<br /><em>Swakopmund.</em>
          </h1>
        </div>
      </div>

      {/* Brand story */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div
            ref={storyRef}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            style={{ opacity: storyVisible ? 1 : 0, transform: storyVisible ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}
          >
            <div>
              <GoldDivider />
              <SectionLabel>Aurora Skyline Hotel</SectionLabel>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', color: 'var(--cream)', fontWeight: 500, lineHeight: 1.15, marginBottom: '1.5rem' }}>
                Contemporary African<br /><em>luxury, grounded in craft.</em>
              </h2>
              <div className="space-y-5" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)', fontWeight: 300 }}>
                <p className="leading-relaxed">
                  Aurora Skyline Hotel was conceived by Swakopmund architect Nadia Fortuin and hotelier Tendai Mwangi as a response to a specific question: what would a truly Namibian luxury hotel look like — one that didn't borrow its language from Europe or Asia, but emerged entirely from this country and this continent?
                </p>
                <p className="leading-relaxed">
                  The answer, which opened in 2022, is a building wrapped in locally quarried sandstone, furnished in collaboration with over forty Namibian makers, and decorated with works selected from the country's most significant contemporary artists. The art rotates through a partnership with the Woermannhaus Art Gallery — new works from the collection appear in Aurora's public spaces each quarter.
                </p>
                <p className="leading-relaxed">
                  Every material tells a story of provenance: the woven rush matting from Kavango artisans in Northern Namibia, the raw-edge timber tables from a Kalahari salvager, the handmade ceramic tableware from a Swakopmund studio, the linen from an Okavango cotton farm. The hotel is, in a sense, a museum of contemporary Namibian making — one you can sleep in.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <img src={IMG_WATERFRONT} alt="Swakopmund Waterfront" className="w-full object-cover" style={{ aspectRatio: '3/4', gridRow: 'span 2' }} />
              <img src={IMG_CAPE} alt="Swakopmund city with Namib Dunes" className="w-full object-cover" style={{ aspectRatio: '4/3' }} />
              <img src={IMG_MOUNTAIN} alt="Swakopmund dunes aerial" className="w-full object-cover" style={{ aspectRatio: '4/3' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20" style={{ background: 'var(--dark-2)' }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <SectionLabel>What We Stand For</SectionLabel>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--cream)', fontWeight: 500 }}>
              The principles behind Aurora.
            </h2>
          </div>
          <div
            ref={valuesRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
            style={{ border: '1px solid rgba(201,169,110,0.12)', opacity: valuesVisible ? 1 : 0, transform: valuesVisible ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
          >
            {values.map((v) => (
              <div key={v.number} className="p-8 lg:p-10" style={{ background: 'var(--dark-2)' }}>
                <div
                  className="mb-4 leading-none"
                  style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'rgba(201,169,110,0.15)', fontWeight: 400 }}
                >
                  {v.number}
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--cream)', fontSize: '1.3rem', fontWeight: 500, marginBottom: '0.75rem' }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div ref={sustainRef} style={{ opacity: sustainVisible ? 1 : 0, transform: sustainVisible ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
              <GoldDivider />
              <SectionLabel>Sustainability</SectionLabel>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', color: 'var(--cream)', fontWeight: 500, lineHeight: 1.15, marginBottom: '1.5rem' }}>
                Built to belong<br /><em>to this place.</em>
              </h2>
              <p className="leading-relaxed mb-6" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)', fontWeight: 300 }}>
                Swakopmund is situated beside the Namib-Naukluft park, built where one of the world's oldest deserts meets a rich marine coastline. For Aurora, sustainability is not marketing — it is an obligation that comes with the address.
              </p>
              <p className="leading-relaxed" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)', fontWeight: 300 }}>
                We publish an annual sustainability report, audit our supply chain against ILO labour standards, and allocate 2% of net room revenue to the Aurora Community Foundation — supporting education and skills development in Swakopmund's Mondesa community.
              </p>
            </div>
            <div className="space-y-4">
              {sustainability.map((s, i) => <SustainCard key={s.title} s={s} i={i} />)}
            </div>
          </div>
        </div>
      </section>

      {/* Vineyard image + CTA */}
      <section className="relative py-28 overflow-hidden" style={{ minHeight: '400px' }}>
        <img src={IMG_VINEYARD} alt="Sossusvlei desert dunes" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.4 }} />
        <div className="absolute inset-0" style={{ background: 'rgba(10,9,7,0.65)' }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <GoldDivider />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--cream)', fontWeight: 500, marginBottom: '1.5rem' }}>
            Come, and see for yourself.
          </h2>
          <button
            onClick={() => navigate('/contact')}
            className="inline-flex items-center gap-3 text-sm tracking-[0.18em] uppercase transition-all duration-300"
            style={{ color: 'var(--gold)', fontFamily: 'var(--font-body)', fontWeight: 500 }}
          >
            Book Your Stay at Aurora <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}
