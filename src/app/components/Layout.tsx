import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import { Menu, X, Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';

const navLinks = [
  { label: 'Rooms & Suites', to: '/rooms' },
  { label: 'Dining', to: '/dining' },
  { label: 'Spa', to: '/spa' },
  { label: 'Experiences', to: '/experiences' },
  { label: 'Events', to: '/events' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export function Layout() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen" style={{ background: 'var(--dark-1)', color: 'var(--cream)' }}>
      {/* HEADER */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(10,9,7,0.97)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(201,169,110,0.15)' : 'none',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none group">
            <span
              className="tracking-[0.35em] uppercase text-xs transition-colors duration-300"
              style={{ color: 'var(--gold)', fontFamily: 'var(--font-body)', fontWeight: 300 }}
            >
              Aurora
            </span>
            <span
              className="tracking-[0.12em] uppercase text-xl transition-colors duration-300"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 500, color: 'var(--cream)' }}
            >
              Skyline Hotel
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="relative text-xs tracking-[0.18em] uppercase transition-colors duration-300 group"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                  color: location.pathname === link.to ? 'var(--gold)' : 'var(--cream-muted)',
                }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 h-px transition-all duration-300"
                  style={{
                    background: 'var(--gold)',
                    width: location.pathname === link.to ? '100%' : '0%',
                  }}
                />
              </Link>
            ))}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/contact')}
              className="hidden lg:block px-6 py-2.5 text-xs tracking-[0.18em] uppercase transition-all duration-300 hover:bg-[var(--gold)] hover:text-[var(--dark-1)]"
              style={{
                border: '1px solid var(--gold)',
                color: 'var(--gold)',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
              }}
            >
              Book Your Stay
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2"
              style={{ color: 'var(--cream)' }}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className="lg:hidden overflow-hidden transition-all duration-500"
          style={{
            maxHeight: menuOpen ? '600px' : '0',
            background: 'rgba(10,9,7,0.98)',
            borderTop: menuOpen ? '1px solid rgba(201,169,110,0.12)' : 'none',
          }}
        >
          <div className="px-6 py-8 flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm tracking-[0.2em] uppercase transition-colors duration-200"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                  color: location.pathname === link.to ? 'var(--gold)' : 'var(--cream)',
                }}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => navigate('/contact')}
              className="mt-2 py-3 text-xs tracking-[0.18em] uppercase"
              style={{
                border: '1px solid var(--gold)',
                color: 'var(--gold)',
                fontFamily: 'var(--font-body)',
              }}
            >
              Book Your Stay
            </button>
          </div>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main>
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer style={{ background: 'var(--dark-2)', borderTop: '1px solid rgba(201,169,110,0.15)' }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="mb-4">
                <span
                  className="block tracking-[0.35em] uppercase text-xs mb-1"
                  style={{ color: 'var(--gold)', fontFamily: 'var(--font-body)', fontWeight: 300 }}
                >
                  Aurora
                </span>
                <span
                  className="block tracking-[0.12em] uppercase text-lg"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 500, color: 'var(--cream)' }}
                >
                  Skyline Hotel
                </span>
              </div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>
                A design-forward five-star retreat above Cape Town's V&A Waterfront. Where contemporary African luxury meets the wild beauty of Table Mountain.
              </p>
              <div className="flex gap-4">
                <a href="#" aria-label="Instagram" className="transition-colors duration-200 hover:text-[var(--gold)]" style={{ color: 'var(--cream-muted)' }}>
                  <Instagram size={18} />
                </a>
                <a href="#" aria-label="Facebook" className="transition-colors duration-200 hover:text-[var(--gold)]" style={{ color: 'var(--cream-muted)' }}>
                  <Facebook size={18} />
                </a>
              </div>
            </div>

            {/* Explore */}
            <div>
              <h4
                className="text-xs tracking-[0.25em] uppercase mb-6"
                style={{ color: 'var(--gold)', fontFamily: 'var(--font-body)', fontWeight: 500 }}
              >
                Explore
              </h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm transition-colors duration-200 hover:text-[var(--gold)]"
                      style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4
                className="text-xs tracking-[0.25em] uppercase mb-6"
                style={{ color: 'var(--gold)', fontFamily: 'var(--font-body)', fontWeight: 500 }}
              >
                Contact
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin size={14} className="mt-0.5 shrink-0" style={{ color: 'var(--gold)' }} />
                  <span className="text-sm leading-relaxed" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>
                    V&A Waterfront, Cape Town<br />8001, South Africa
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={14} className="shrink-0" style={{ color: 'var(--gold)' }} />
                  <a href="tel:+27214001234" className="text-sm transition-colors hover:text-[var(--gold)]" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>
                    +27 21 400 1234
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={14} className="shrink-0" style={{ color: 'var(--gold)' }} />
                  <a href="mailto:stay@auroraskyline.com" className="text-sm transition-colors hover:text-[var(--gold)]" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>
                    stay@auroraskyline.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4
                className="text-xs tracking-[0.25em] uppercase mb-6"
                style={{ color: 'var(--gold)', fontFamily: 'var(--font-body)', fontWeight: 500 }}
              >
                Stay in Touch
              </h4>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>
                Receive exclusive offers, seasonal packages, and curated Cape Town inspiration.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-3 text-sm outline-none transition-all duration-200"
                  style={{
                    background: 'var(--dark-3)',
                    border: '1px solid rgba(201,169,110,0.2)',
                    color: 'var(--cream)',
                    fontFamily: 'var(--font-body)',
                  }}
                />
                <button
                  type="submit"
                  className="py-3 text-xs tracking-[0.18em] uppercase transition-all duration-300 hover:bg-[var(--gold)] hover:text-[var(--dark-1)]"
                  style={{
                    border: '1px solid var(--gold)',
                    color: 'var(--gold)',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 500,
                  }}
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div
            className="mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
            style={{ borderTop: '1px solid rgba(201,169,110,0.1)' }}
          >
            <p className="text-xs" style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}>
              © 2025 Aurora Skyline Hotel. All rights reserved.
            </p>
            <div className="flex gap-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-xs transition-colors hover:text-[var(--gold)]"
                  style={{ color: 'var(--cream-muted)', fontFamily: 'var(--font-body)' }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
