import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { ArrowRight, Clock, MapPin } from 'lucide-react';

const IMG_HERO = 'https://images.unsplash.com/photo-1653259038915-7cf0b7a4dd6c?w=1920&h=900&fit=crop&auto=format';
const IMG_RESTAURANT = 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=1200&h=900&fit=crop&auto=format';
const IMG_WINE = 'https://images.unsplash.com/photo-1469234496837-d0101f54be3e?w=1200&h=900&fit=crop&auto=format';
const IMG_POOL = 'https://images.unsplash.com/photo-1776361964513-86fba5039617?w=1920&h=1000&fit=crop&auto=format';
const IMG_COCKTAIL = 'https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?w=900&h=1200&fit=crop&auto=format';
const IMG_MENU = 'https://images.unsplash.com/photo-1560053608-13721e0d69e8?w=900&h=700&fit=crop&auto=format';

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

const menuItems = [
  { course: 'To Begin', name: 'West Coast Snoek Rillettes', note: 'Pickled cucumber, rye toast, crème fraîche, dill oil' },
  { course: 'To Begin', name: 'Beet & Ricotta Tart', note: 'Hazelnuts, micro herbs, aged balsamic, truffle honey' },
  { course: 'From the Sea', name: 'Grilled Kingklip', note: 'Saffron bouillabaisse, samphire, Paternoster mussels, rouille' },
  { course: 'From the Sea', name: 'Cape Lobster Thermidor', note: 'Cognac cream, gruyère gratin, saffron risotto, herb salad' },
  { course: 'From the Land', name: 'Karoo Lamb Saddle', note: 'Roasted root vegetables, quince jus, smoked labneh, lamb fat crouton' },
  { course: 'From the Land', name: 'Free-Range Duck Breast', note: 'Waterblommetjie stew, pistachio dukkah, fig & port reduction' },
  { course: 'To Close', name: 'Malva Pudding', note: 'Amarula custard, naartjie sorbet, caramelised pecan' },
  { course: 'To Close', name: 'Chocolate Fondant', note: 'Valrhona 70%, sea salt caramel, vanilla bean ice cream' },
];

const cocktails = [
  { name: 'Boulders Sunset', base: 'Rum, passion fruit, lime, ginger beer, sea salt rim' },
  { name: 'Cape Doctor', base: 'Cape Town gin, elderflower, cucumber, tonic, wild herbs' },
  { name: 'Stellenbosch Sour', base: 'Pinotage brandy, lemon, egg white, aromatic bitters' },
  { name: 'Signal Hill', base: 'Dark rum, Fynbos honey, smoked orange, sparkling wine' },
  { name: 'Robben Blue', base: 'Vodka, blue pea flower, lychee, prosecco, rose water' },
  { name: 'Atlantic Breeze', base: 'Tequila, watermelon, fresh mint, agave, chilli salt rim' },
];

export function Dining() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { ref: introRef, visible: introVisible } = useFadeIn();
  const { ref: poolRef, visible: poolVisible } = useFadeIn();

  return (
    <div style={{ background: 'var(--dark-1)' }}>
      {/* Hero */}
      <div className="relative flex items-end" style={{ height: '70vh', minHeight: '500px', background: '#0a0907' }}>
        <img src={IMG_HERO} alt="Aurora Restaurant moody interior with city views" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.6 }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,9,7,1) 0%, rgba(10,9,7,0.25) 65%)' }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pb-16 w-full">
          <SectionLabel>Dining & Rooftop</SectionLabel>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'var(--cream)', fontWeight: 500, lineHeight: 1.05 }}>
            Taste the Cape.<br /><em>Savour the view.</em>
          </h1>
        </div>
      </div>

      {/* Aurora Restaurant */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div
            ref={introRef}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            style={{ opacity: introVisible ? 1 : 0, transform: introVisible ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}
          >
            <div>
              <GoldDivider />
              <SectionLabel>Aurora Restaurant</SectionLabel>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--cream)', fontWeight: 500, lineHeight: 1.1, marginBottom: '1.5rem' }}>
                Where the Cape's<br /><em>larder meets the light.</em>
              </h2>
              <p className="leading-relaxed mb-6" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)', fontWeight: 300 }}>
                Head Chef Sipho Dlamini sources from the Cape's extraordinary producers: daily-line fish from the West Coast, heritage vegetables from the Franschhoek Valley, wild foraged herbs from the Overberg. The menu shifts with the seasons, but the commitment to South Africa's extraordinary flavours remains constant.
              </p>
              <p className="leading-relaxed mb-8" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)', fontWeight: 300 }}>
                An award-winning wine list celebrates over 300 South African labels, with sommelier-led pairings available for the full tasting experience.
              </p>
              <div className="flex flex-wrap gap-6 mb-10">
                <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>
                  <Clock size={14} style={{ color: 'var(--gold)' }} />
                  Breakfast 6:30–10:30 · Dinner 18:30–22:30
                </div>
                <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>
                  <MapPin size={14} style={{ color: 'var(--gold)' }} />
                  Ground Floor, Aurora Skyline Hotel
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/contact')}
                  className="px-8 py-3.5 text-xs tracking-[0.18em] uppercase transition-all duration-300 hover:bg-[var(--gold)] hover:text-[var(--dark-1)]"
                  style={{ border: '1px solid var(--gold)', color: 'var(--gold)', fontFamily: 'var(--font-body)', fontWeight: 500 }}
                >
                  Reserve a Table
                </button>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="inline-flex items-center gap-2 px-8 py-3.5 text-xs tracking-[0.18em] uppercase transition-all duration-300"
                  style={{ border: '1px solid rgba(201,169,110,0.3)', color: 'var(--cream)', fontFamily: 'var(--font-body)', fontWeight: 400 }}
                >
                  {menuOpen ? 'Close Menu' : 'View Sample Menu'} <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Image grid */}
            <div className="grid grid-cols-2 gap-3">
              <img src={IMG_RESTAURANT} alt="Aurora Restaurant interior" className="w-full object-cover" style={{ aspectRatio: '3/4' }} />
              <div className="flex flex-col gap-3">
                <img src={IMG_WINE} alt="South African wine selection" className="w-full object-cover" style={{ aspectRatio: '4/3', flex: 1 }} />
                <img src={IMG_MENU} alt="Aurora restaurant table setting" className="w-full object-cover" style={{ aspectRatio: '4/3', flex: 1 }} />
              </div>
            </div>
          </div>

          {/* Sample menu */}
          {menuOpen && (
            <div className="mt-16 p-10 lg:p-14" style={{ background: 'var(--dark-2)', border: '1px solid rgba(201,169,110,0.2)' }}>
              <div className="text-center mb-10">
                <SectionLabel>Aurora Restaurant</SectionLabel>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--cream)', fontWeight: 400, fontStyle: 'italic' }}>
                  À la carte — winter season
                </h3>
              </div>
              {['To Begin', 'From the Sea', 'From the Land', 'To Close'].map((course) => (
                <div key={course} className="mb-10">
                  <div className="text-xs tracking-[0.25em] uppercase mb-6 pb-3" style={{ color: 'var(--gold)', fontFamily: 'var(--font-body)', borderBottom: '1px solid rgba(201,169,110,0.15)' }}>
                    {course}
                  </div>
                  <div className="space-y-5">
                    {menuItems.filter(m => m.course === course).map((item) => (
                      <div key={item.name} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                        <span style={{ fontFamily: 'var(--font-display)', color: 'var(--cream)', fontSize: '1.05rem', fontWeight: 500 }}>{item.name}</span>
                        <span className="text-sm" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)', fontStyle: 'italic' }}>{item.note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <p className="text-xs text-center mt-8" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>
                Menu changes seasonally. Please inform us of any dietary requirements at time of reservation.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Sky Bar hero section */}
      <section className="relative py-28 flex items-center overflow-hidden" style={{ minHeight: '700px' }}>
        <img src={IMG_POOL} alt="Aurora rooftop infinity pool at sunset" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.5 }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,9,7,0.92) 0%, rgba(10,9,7,0.3) 100%)' }} />
        <div
          ref={poolRef}
          className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12"
          style={{ opacity: poolVisible ? 1 : 0, transform: poolVisible ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}
        >
          <div className="max-w-xl">
            <GoldDivider />
            <SectionLabel>Sky Bar & Infinity Pool — Floor 18</SectionLabel>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--cream)', fontWeight: 500, lineHeight: 1.1, marginBottom: '1.5rem' }}>
              Sunset over the<br /><em>Atlantic, on repeat.</em>
            </h2>
            <p className="leading-relaxed mb-6" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)', fontWeight: 300 }}>
              The 18th floor is Aurora's crown. An 18-metre infinity pool appears to spill over the city below, while the Sky Bar serves signature Cape cocktails as Table Mountain turns amber at dusk. Weekend evenings bring resident DJs who play into the Atlantic night.
            </p>
            <div className="flex items-center gap-2 text-sm mb-8" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>
              <Clock size={14} style={{ color: 'var(--gold)' }} />
              Pool open 06:00–22:00 · Bar from 12:00 · DJ nights Fri & Sat 20:00–02:00
            </div>
            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-3 text-sm tracking-[0.18em] uppercase transition-all duration-300"
              style={{ color: 'var(--gold)', fontFamily: 'var(--font-body)', fontWeight: 500 }}
            >
              Reserve Pool Access <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Cocktail menu */}
      <section className="py-24" style={{ background: 'var(--dark-2)' }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <GoldDivider />
              <SectionLabel>Signature Cocktails</SectionLabel>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: 'var(--cream)', fontWeight: 500, marginBottom: '2rem', lineHeight: 1.1 }}>
                Cocktails rooted in<br /><em>Cape Town's soul.</em>
              </h2>
              <div className="space-y-5">
                {cocktails.map((c) => (
                  <div key={c.name} className="pb-5" style={{ borderBottom: '1px solid rgba(201,169,110,0.1)' }}>
                    <div style={{ fontFamily: 'var(--font-display)', color: 'var(--cream)', fontSize: '1.1rem', fontWeight: 500 }}>{c.name}</div>
                    <div className="mt-1 text-sm" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)', fontStyle: 'italic' }}>{c.base}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position: 'relative', aspectRatio: '3/4' }}>
              <img src={IMG_COCKTAIL} alt="Aurora Sky Bar signature cocktail" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(10,9,7,0.7) 100%)' }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
