import { Link, NavLink } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUI, useCart, useWishlist, useSearch } from '../../context';
import { NAV_LINKS, SITE_NAME } from '../../utils/constants';

function Badge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 text-[9px] font-medium bg-gold text-white rounded-full leading-none">
      {count > 99 ? '99+' : count}
    </span>
  );
}

export function Header() {
  const { isScrolled, openMobileMenu } = useUI();
  const { itemCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { openSearch } = useSearch();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative text-sm tracking-widest uppercase transition-colors duration-300 ${
      isActive ? 'text-gold' : 'text-charcoal-light hover:text-gold'
    } after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:bg-gold after:transition-transform after:duration-300 ${
      isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
    } after:origin-center after:w-full`;

  return (
    <motion.header
      className="sticky top-0 z-40 w-full transition-all duration-500"
      animate={{
        backgroundColor: isScrolled ? 'var(--color-ivory)' : 'rgba(250, 248, 245, 0.85)',
        boxShadow: isScrolled ? '0 1px 20px rgba(0,0,0,0.06)' : '0 0 0 rgba(0,0,0,0)',
      }}
    >
      <div
        className={`mx-auto flex items-center justify-between px-5 lg:px-10 transition-all duration-500 ${
          isScrolled ? 'h-16' : 'h-20'
        }`}
      >
        {/* Mobile hamburger */}
        <button
          onClick={openMobileMenu}
          className="lg:hidden flex items-center justify-center w-10 h-10 -ml-2"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5 text-charcoal" strokeWidth={1.5} />
        </button>

        {/* Logo */}
        <Link
          to="/"
          className={`font-serif tracking-[0.3em] text-charcoal font-semibold transition-all duration-500 ${
            isScrolled ? 'text-xl' : 'text-2xl lg:text-3xl'
          }`}
        >
          {SITE_NAME}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} to={link.href} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-1">
          <button
            onClick={openSearch}
            className="hidden lg:flex items-center justify-center w-10 h-10"
            aria-label="Search"
          >
            <Search className="w-[18px] h-[18px] text-charcoal-light" strokeWidth={1.5} />
          </button>

          <Link
            to="/wishlist"
            className="hidden lg:flex relative items-center justify-center w-10 h-10"
            aria-label="Wishlist"
          >
            <Heart className="w-[18px] h-[18px] text-charcoal-light" strokeWidth={1.5} />
            <Badge count={wishlistCount} />
          </Link>

          <button
            onClick={openSearch}
            className="lg:hidden flex items-center justify-center w-10 h-10"
            aria-label="Search"
          >
            <Search className="w-5 h-5 text-charcoal" strokeWidth={1.5} />
          </button>

          <Link
            to="/account"
            className="hidden lg:flex items-center justify-center w-10 h-10"
            aria-label="Account"
          >
            <User className="w-[18px] h-[18px] text-charcoal-light" strokeWidth={1.5} />
          </Link>

          <Link
            to="/cart"
            className="relative flex items-center justify-center w-10 h-10"
            aria-label="Cart"
          >
            <ShoppingBag className="w-5 h-5 text-charcoal" strokeWidth={1.5} />
            <Badge count={itemCount} />
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
