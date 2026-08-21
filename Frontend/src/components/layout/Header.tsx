import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUI, useCart, useWishlist, useSearch } from '../../context';
import { NAV_LINKS, SITE_NAME } from '../../utils/constants';
import { isAuthenticated, getStoredUser, logout } from '../../utils/api';

function Badge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[16px] h-4 px-1 text-[9px] font-medium bg-gold text-white rounded-full leading-none">
      {count > 99 ? '99+' : count}
    </span>
  );
}

export function Header() {
  const { isScrolled, openMobileMenu } = useUI();
  const { itemCount, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { openSearch } = useSearch();
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();
  const user = getStoredUser();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative text-[13px] tracking-[0.12em] uppercase transition-colors duration-300 font-medium ${
      isActive ? 'text-gold' : 'text-charcoal-light hover:text-gold'
    } after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:bg-gold after:transition-transform after:duration-300 ${
      isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
    } after:origin-center after:w-full`;

  return (
    <motion.header
      className="sticky top-0 z-40 w-full backdrop-blur-md"
      animate={{
        backgroundColor: isScrolled ? 'rgba(250, 248, 245, 0.97)' : 'rgba(250, 248, 245, 0.85)',
        boxShadow: isScrolled ? '0 1px 20px rgba(0,0,0,0.06)' : '0 0 0 rgba(0,0,0,0)',
      }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`mx-auto max-w-7xl flex items-center justify-between px-6 lg:px-10 transition-all duration-300 ${
          isScrolled ? 'h-16' : 'h-[72px]'
        }`}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={openMobileMenu}
            className="lg:hidden flex items-center justify-center w-10 h-10 -ml-2"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 text-charcoal" strokeWidth={1.5} />
          </button>

          <Link
            to="/"
            className={`font-serif tracking-[0.3em] text-charcoal font-semibold transition-all duration-300 ${
              isScrolled ? 'text-xl' : 'text-2xl lg:text-[28px]'
            }`}
          >
            {SITE_NAME}
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} to={link.href} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-0.5">
          <button
            onClick={openSearch}
            className="flex items-center justify-center w-10 h-10"
            aria-label="Search"
          >
            <Search className="w-[18px] h-[18px] text-charcoal-light" strokeWidth={1.5} />
          </button>

          <Link
            to="/wishlist"
            className="relative flex items-center justify-center w-10 h-10"
            aria-label="Wishlist"
          >
            <Heart className="w-[18px] h-[18px] text-charcoal-light" strokeWidth={1.5} />
            <Badge count={wishlistCount} />
          </Link>

          {loggedIn ? (
            <div className="hidden lg:flex items-center gap-3">
              {user?.is_admin && (
                <Link to="/admin" className="text-xs font-medium text-gold hover:text-gold-dark transition-colors border border-gold rounded px-2 py-1">
                  Admin
                </Link>
              )}
              <span className="text-xs text-charcoal-muted font-sans">{user?.name}</span>
              <button
                onClick={() => { logout(); navigate('/'); window.location.reload(); }}
                className="text-xs text-gold font-sans hover:text-gold-dark transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden lg:flex items-center justify-center w-10 h-10"
              aria-label="Account"
            >
              <User className="w-[18px] h-[18px] text-charcoal-light" strokeWidth={1.5} />
            </Link>
          )}

          <button
            onClick={openCart}
            className="relative flex items-center justify-center w-10 h-10"
            aria-label="Shopping bag"
          >
            <ShoppingBag className="w-[18px] h-[18px] text-charcoal-light" strokeWidth={1.5} />
            <Badge count={itemCount} />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
