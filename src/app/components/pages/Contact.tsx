import { useState, useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, Clock, ChevronDown } from 'lucide-react';

const IMG_HERO = 'https://images.unsplash.com/photo-1688666272717-7f13536b4dac?w=1920&h=900&fit=crop&auto=format';

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

const reasons = ['Room Reservation', 'Dining Reservation', 'Spa Booking', 'Event / Wedding Enquiry', 'Experience Planning', 'Corporate Enquiry', 'Press & Media', 'General Enquiry'];

function InputField({ label, type = 'text', placeholder, value, onChange }: { label: string; type?: string; placeholder: string; value: string; onChange: (v: string) => void }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label className="block text-xs tracking-[0.15em] uppercase mb-2" style={{ color: focused ? 'var(--gold)' : 'var(--cream-muted)', fontFamily: 'var(--font-body)', transition: 'color 0.2s' }}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-4 py-3.5 text-sm outline-none transition-all duration-200"
        style={{
          background: 'var(--dark-3)',
          border: `1px solid ${focused ? 'var(--gold)' : 'rgba(201,169,110,0.2)'}`,
          color: 'var(--cream)',
          fontFamily: 'var(--font-body)',
        }}
      />
    </div>
  );
}

function SelectField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label className="block text-xs tracking-[0.15em] uppercase mb-2" style={{ color: focused ? 'var(--gold)' : 'var(--cream-muted)', fontFamily: 'var(--font-body)', transition: 'color 0.2s' }}>
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full px-4 py-3.5 text-sm outline-none appearance-none transition-all duration-200"
          style={{
            background: 'var(--dark-3)',
            border: `1px solid ${focused ? 'var(--gold)' : 'rgba(201,169,110,0.2)'}`,
            color: value ? 'var(--cream)' : 'var(--cream-muted)',
            fontFamily: 'var(--font-body)',
          }}
        >
          <option value="" style={{ background: 'var(--dark-3)' }}>Select a reason</option>
          {reasons.map((r) => (
            <option key={r} value={r} style={{ background: 'var(--dark-3)' }}>{r}</option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--gold)' }} />
      </div>
    </div>
  );
}

export function Contact() {
  const { ref, visible } = useFadeIn();
  const { ref: mapRef, visible: mapVisible } = useFadeIn();

  const [form, setForm] = useState({ name: '', email: '', phone: '', reason: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const set = (field: string) => (v: string) => setForm((f) => ({ ...f, [field]: v }));

  return (
    <div style={{ background: 'var(--dark-1)' }}>
      {/* Hero */}
      <div className="relative flex items-end" style={{ height: '60vh', minHeight: '420px', background: '#0a0907' }}>
        <img src={IMG_HERO} alt="Cape Town city and V&A Waterfront aerial" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.5 }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,9,7,1) 0%, rgba(10,9,7,0.3) 65%)' }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pb-16 w-full">
          <SectionLabel>Contact & Location</SectionLabel>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'var(--cream)', fontWeight: 500, lineHeight: 1.05 }}>
            Let's begin<br /><em>your stay.</em>
          </h1>
        </div>
      </div>

      {/* Location strip */}
      <section className="py-12" style={{ background: 'var(--dark-2)', borderBottom: '1px solid rgba(201,169,110,0.12)' }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <MapPin size={20} className="shrink-0 mt-0.5" style={{ color: 'var(--gold)' }} />
              <div>
                <div className="text-xs tracking-[0.15em] uppercase mb-1" style={{ color: 'var(--gold)', fontFamily: 'var(--font-body)' }}>Address</div>
                <div className="text-sm leading-relaxed" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>
                  1 Dock Road, V&A Waterfront<br />Cape Town, 8001<br />South Africa
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone size={20} className="shrink-0 mt-0.5" style={{ color: 'var(--gold)' }} />
              <div>
                <div className="text-xs tracking-[0.15em] uppercase mb-1" style={{ color: 'var(--gold)', fontFamily: 'var(--font-body)' }}>Phone</div>
                <div className="text-sm" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>+27 21 400 1234</div>
                <div className="text-sm mt-1" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>WhatsApp: +27 82 400 1234</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail size={20} className="shrink-0 mt-0.5" style={{ color: 'var(--gold)' }} />
              <div>
                <div className="text-xs tracking-[0.15em] uppercase mb-1" style={{ color: 'var(--gold)', fontFamily: 'var(--font-body)' }}>Email</div>
                <div className="text-sm" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>
                  <a href="mailto:stay@auroraskyline.com" className="hover:text-[var(--gold)] transition-colors">stay@auroraskyline.com</a>
                </div>
                <div className="text-sm mt-1" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>
                  <a href="mailto:events@auroraskyline.com" className="hover:text-[var(--gold)] transition-colors">events@auroraskyline.com</a>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock size={20} className="shrink-0 mt-0.5" style={{ color: 'var(--gold)' }} />
              <div>
                <div className="text-xs tracking-[0.15em] uppercase mb-1" style={{ color: 'var(--gold)', fontFamily: 'var(--font-body)' }}>Arrivals</div>
                <div className="text-sm" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>Check-in from 15:00</div>
                <div className="text-sm mt-1" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>Check-out by 11:00</div>
                <div className="text-sm mt-1" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>24-hour reception</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form + info */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div
            ref={ref}
            className="grid grid-cols-1 lg:grid-cols-5 gap-16"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}
          >
            {/* Form — 3/5 */}
            <div className="lg:col-span-3">
              <GoldDivider />
              <SectionLabel>Send Us a Message</SectionLabel>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: 'var(--cream)', fontWeight: 500, lineHeight: 1.15, marginBottom: '2rem' }}>
                We respond within<br /><em>four hours.</em>
              </h2>

              {submitted ? (
                <div className="py-16 text-center" style={{ border: '1px solid rgba(201,169,110,0.2)', background: 'var(--dark-2)' }}>
                  <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center" style={{ border: '1px solid var(--gold)' }}>
                    <div className="w-2 h-2 rotate-45" style={{ background: 'var(--gold)' }} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--cream)', fontSize: '1.5rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                    Thank you.
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>
                    Your message has been received. Our team will respond within four hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField label="Full Name" placeholder="Your name" value={form.name} onChange={set('name')} />
                    <InputField label="Email Address" type="email" placeholder="your@email.com" value={form.email} onChange={set('email')} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField label="Phone Number" type="tel" placeholder="+27 · · · · · · · · ·" value={form.phone} onChange={set('phone')} />
                    <SelectField label="Reason for Contact" value={form.reason} onChange={set('reason')} />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase mb-2" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>
                      Your Message
                    </label>
                    <textarea
                      rows={6}
                      placeholder="Tell us about your visit, dates, preferences, or any questions you have…"
                      value={form.message}
                      onChange={(e) => set('message')(e.target.value)}
                      className="w-full px-4 py-3.5 text-sm outline-none resize-none transition-all duration-200"
                      style={{
                        background: 'var(--dark-3)',
                        border: '1px solid rgba(201,169,110,0.2)',
                        color: 'var(--cream)',
                        fontFamily: 'var(--font-body)',
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--gold)'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(201,169,110,0.2)'; }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:opacity-90"
                    style={{ background: 'var(--gold)', color: 'var(--dark-1)', fontFamily: 'var(--font-body)', fontWeight: 500 }}
                  >
                    Send Message
                  </button>
                  <p className="text-xs" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>
                    For urgent assistance, call our reservations team at +27 21 400 1234 (24 hours).
                  </p>
                </form>
              )}
            </div>

            {/* Sidebar — 2/5 */}
            <div className="lg:col-span-2 space-y-8">
              <div className="p-8" style={{ background: 'var(--dark-2)', border: '1px solid rgba(201,169,110,0.12)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--cream)', fontSize: '1.15rem', fontWeight: 500, marginBottom: '1rem' }}>Getting Here</h3>
                <div className="space-y-3 text-sm" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>
                  <div>
                    <span style={{ color: 'var(--gold)' }}>By Car:</span> 20 minutes from Cape Town International Airport (N2 highway). Valet parking available.
                  </div>
                  <div>
                    <span style={{ color: 'var(--gold)' }}>By Shuttle:</span> Aurora offers a complimentary airport shuttle for stays of 3+ nights. Book at reservation.
                  </div>
                  <div>
                    <span style={{ color: 'var(--gold)' }}>On Foot:</span> 5 minutes from the V&A Waterfront Clock Tower. Walking distance from the Cape Town CBD.
                  </div>
                  <div>
                    <span style={{ color: 'var(--gold)' }}>By MyCiTi:</span> Portswood Road stop, 3 minutes' walk.
                  </div>
                </div>
              </div>

              <div className="p-8" style={{ background: 'var(--dark-2)', border: '1px solid rgba(201,169,110,0.12)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--cream)', fontSize: '1.15rem', fontWeight: 500, marginBottom: '1rem' }}>Nearby</h3>
                <div className="space-y-2 text-sm" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>
                  {[
                    ['V&A Waterfront', '5 min walk'],
                    ['Cape Town CBD', '10 min drive'],
                    ['Zeitz MOCAA', '3 min walk'],
                    ['Table Mountain Cable Car', '15 min drive'],
                    ['Boulders Penguin Beach', '45 min drive'],
                    ['Stellenbosch Winelands', '40 min drive'],
                    ['Cape International Airport', '20 min drive'],
                  ].map(([place, time]) => (
                    <div key={place} className="flex justify-between">
                      <span>{place}</span>
                      <span style={{ color: 'var(--gold)' }}>{time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8" style={{ background: 'var(--dark-2)', border: '1px solid rgba(201,169,110,0.12)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--cream)', fontSize: '1.15rem', fontWeight: 500, marginBottom: '1rem' }}>Hotel Contacts</h3>
                <div className="space-y-3 text-sm" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>
                  {[
                    ['Reservations', '+27 21 400 1234'],
                    ['Concierge', '+27 21 400 1235'],
                    ['Spa', '+27 21 400 1240'],
                    ['Events', '+27 21 400 1250'],
                    ['Restaurant', '+27 21 400 1260'],
                  ].map(([dept, number]) => (
                    <div key={dept} className="flex justify-between">
                      <span>{dept}</span>
                      <a href={`tel:${number.replace(/\s/g, '')}`} className="hover:text-[var(--gold)] transition-colors" style={{ color: 'var(--gold)' }}>{number}</a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section ref={mapRef} style={{ opacity: mapVisible ? 1 : 0, transition: 'opacity 0.8s ease' }}>
        <div
          className="relative w-full flex items-center justify-center"
          style={{ height: '420px', background: 'var(--dark-3)', border: '1px solid rgba(201,169,110,0.1)' }}
        >
          {/* Decorative map placeholder */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(rgba(201,169,110,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
          <div className="text-center relative z-10">
            <MapPin size={32} className="mx-auto mb-3" style={{ color: 'var(--gold)' }} />
            <div style={{ fontFamily: 'var(--font-display)', color: 'var(--cream)', fontSize: '1.25rem', fontWeight: 500 }}>Aurora Skyline Hotel</div>
            <div className="mt-1 text-sm" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>1 Dock Road, V&A Waterfront, Cape Town</div>
            <a
              href="https://maps.google.com/?q=V+A+Waterfront+Cape+Town"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-6 py-2.5 text-xs tracking-[0.15em] uppercase transition-all duration-300 hover:bg-[var(--gold)] hover:text-[var(--dark-1)]"
              style={{ border: '1px solid var(--gold)', color: 'var(--gold)', fontFamily: 'var(--font-body)' }}
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
