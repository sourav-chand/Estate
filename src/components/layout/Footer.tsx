import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { SITE_NAME, SOCIAL_LINKS } from '../../utils/constants';

const shopLinks = [
  { label: 'New Arrivals', href: '/shop?sort=newest' },
  { label: 'Bestsellers', href: '/shop?sort=bestselling' },
  { label: 'Necklaces', href: '/shop?category=necklaces' },
  { label: 'Earrings', href: '/shop?category=earrings' },
  { label: 'Rings', href: '/shop?category=rings' },
  { label: 'Bracelets', href: '/shop?category=bracelets' },
];

const aboutLinks = [
  { label: 'Our Story', href: '/about' },
  { label: 'Craftsmanship', href: '/craftsmanship' },
  { label: 'Stores', href: '/stores' },
  { label: 'Journal', href: '/journal' },
];

const helpLinks = [
  { label: 'Contact', href: '/contact' },
  { label: 'Shipping', href: '/shipping' },
  { label: 'Returns', href: '/returns' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Track Order', href: '/track-order' },
];

const socialItems = [
  { label: 'Instagram', url: SOCIAL_LINKS.instagram, icon: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  ) },
  { label: 'Facebook', url: SOCIAL_LINKS.facebook, icon: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ) },
  { label: 'Pinterest', url: SOCIAL_LINKS.pinterest, icon: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.425 1.808-2.425.853 0 1.265.64 1.265 1.408 0 .858-.546 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.745 2.282a.3.3 0 0 1 .069.288l-.278 1.133c-.044.183-.145.222-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.527-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.449 2.962.449 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
    </svg>
  ) },
  { label: 'YouTube', url: SOCIAL_LINKS.youtube, icon: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.13C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  ) },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-3.5">
      <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-charcoal-muted mb-1">
        {title}
      </h3>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              to={link.href}
              className="text-sm text-charcoal-light/80 hover:text-gold transition-colors duration-300"
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <footer className="bg-charcoal text-ivory">
      {/* Newsletter */}
      <div className="border-b border-white/[0.08]">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 py-16 lg:py-20 flex flex-col items-center text-center">
          <h2 className="font-serif text-3xl lg:text-4xl tracking-wide text-ivory mb-3">
            A LITTLE SPARKLE, IN YOUR INBOX
          </h2>
          <p className="text-sm text-ivory/50 mb-8 max-w-md">
            Subscribe for exclusive offers, new arrivals, and jewellery styling inspiration.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-md border border-white/20 rounded-sm overflow-hidden"
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent px-5 py-3.5 text-sm text-ivory placeholder:text-ivory/30 outline-none"
            />
            <button
              type="submit"
              className="px-7 py-3.5 bg-gold text-white text-xs uppercase tracking-[0.15em] font-medium hover:bg-gold-dark transition-colors duration-300"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      {/* Columns */}
      <div className="mx-auto max-w-6xl px-6 lg:px-10 py-14 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <FooterColumn title="Shop" links={shopLinks} />
          <FooterColumn title="About" links={aboutLinks} />
          <FooterColumn title="Help" links={helpLinks} />

          {/* Follow column */}
          <div className="flex flex-col gap-3.5">
            <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-charcoal-muted mb-1">
              Follow
            </h3>
            <ul className="flex flex-col gap-3">
              {socialItems.map(({ label, url, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-sm text-ivory/60 hover:text-gold transition-colors duration-300"
                  >
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.08]">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-serif text-lg tracking-[0.2em] text-ivory/40">
            {SITE_NAME}
          </p>
          <p className="text-xs text-ivory/30">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              to="/privacy"
              className="text-xs text-ivory/30 hover:text-ivory/60 transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-xs text-ivory/30 hover:text-ivory/60 transition-colors duration-300"
            >
              Terms
            </Link>
            <Link
              to="/refund"
              className="text-xs text-ivory/30 hover:text-ivory/60 transition-colors duration-300"
            >
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
