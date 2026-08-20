import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { SITE_NAME, SOCIAL_LINKS } from '../../utils/constants';

const shopLinks = [
  { label: 'New Arrivals', href: '/shop?sort=newest' },
  { label: 'Bestsellers', href: '/shop?sort=bestselling' },
  { label: 'Necklaces', href: '/shop?category=Necklaces' },
  { label: 'Earrings', href: '/shop?category=Earrings' },
  { label: 'Rings', href: '/shop?category=Rings' },
  { label: 'Bracelets', href: '/shop?category=Bracelets' },
];

const aboutLinks = [
  { label: 'Our Story', href: '/about' },
  { label: 'Craftsmanship', href: '/about' },
  { label: 'Stores', href: '/about' },
  { label: 'Journal', href: '/about' },
];

const helpLinks = [
  { label: 'Contact', href: '/about' },
  { label: 'Shipping', href: '/cart' },
  { label: 'Returns', href: '/cart' },
  { label: 'FAQs', href: '/about' },
  { label: 'Track Order', href: '/cart' },
];

const socialItems = [
  { label: 'Instagram', url: SOCIAL_LINKS.instagram },
  { label: 'Facebook', url: SOCIAL_LINKS.facebook },
  { label: 'Pinterest', url: SOCIAL_LINKS.pinterest },
  { label: 'YouTube', url: SOCIAL_LINKS.youtube },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-sans text-[11px] uppercase tracking-[0.2em] text-ivory/40 mb-1">
        {title}
      </h3>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              to={link.href}
              className="text-sm text-ivory/60 hover:text-gold transition-colors duration-300"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
  };

  return (
    <footer className="bg-charcoal text-ivory">
      {/* Newsletter */}
      <div className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-20 flex flex-col items-center text-center">
          <h2 className="font-serif text-3xl lg:text-4xl tracking-wide text-ivory mb-3">
            A LITTLE SPARKLE, IN YOUR INBOX
          </h2>
          <p className="text-sm text-ivory/40 mb-8 max-w-md">
            Subscribe for exclusive offers, new arrivals, and jewellery styling inspiration.
          </p>
          {submitted ? (
            <p className="font-serif text-xl text-gold">Thank you for joining us ✦</p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex w-full max-w-md border border-white/15 rounded-sm overflow-hidden"
            >
              <input
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent px-5 py-3.5 text-sm text-ivory placeholder:text-ivory/25 outline-none"
              />
              <button
                type="submit"
                className="px-7 py-3.5 bg-gold text-white text-xs uppercase tracking-[0.15em] font-medium hover:bg-gold-dark transition-colors duration-300"
              >
                Join
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Columns */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-14 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <FooterColumn title="Shop" links={shopLinks} />
          <FooterColumn title="About" links={aboutLinks} />
          <FooterColumn title="Help" links={helpLinks} />

          {/* Follow column */}
          <div className="flex flex-col gap-3">
            <h3 className="font-sans text-[11px] uppercase tracking-[0.2em] text-ivory/40 mb-1">
              Follow
            </h3>
            <ul className="flex flex-col gap-2.5">
              {socialItems.map(({ label, url }) => (
                <li key={label}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-ivory/60 hover:text-gold transition-colors duration-300"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-serif text-lg tracking-[0.2em] text-ivory/30">
            {SITE_NAME}
          </p>
          <p className="text-xs text-ivory/25">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              to="/about"
              className="text-xs text-ivory/25 hover:text-ivory/50 transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              to="/about"
              className="text-xs text-ivory/25 hover:text-ivory/50 transition-colors duration-300"
            >
              Terms
            </Link>
            <Link
              to="/about"
              className="text-xs text-ivory/25 hover:text-ivory/50 transition-colors duration-300"
            >
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
