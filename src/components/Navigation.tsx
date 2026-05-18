import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Sun, Moon } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useTheme } from '@/contexts/ThemeContext';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/products', label: 'Products' },
  { path: '/lookbook', label: 'Lookbook' },
  { path: '/training', label: 'Training' },
  { path: '/deals', label: 'Deals' },
  { path: '/customize', label: 'Customize' },
  { path: '/compare', label: 'Compare' },
  { path: '/blog', label: 'Blog' },
  { path: '/community', label: 'Community' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

const Navigation = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <nav className="fixed top-9 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-10 py-4 backdrop-blur-md bg-background/60 border-b border-border/30">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full border-2 border-foreground flex items-center justify-center hover:border-primary transition-colors">
            <div className="text-center leading-none font-display">
              <span className="block text-[8px] tracking-wider">SLAM</span>
              <span className="block text-[8px] tracking-wider">DUNK</span>
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative text-xs font-body font-medium tracking-wide transition-colors py-1 ${
                location.pathname === link.path
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {link.label}
              {location.pathname === link.path && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} className="text-foreground hover:text-primary transition-colors" title="Toggle theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link to="/account" className="text-foreground hover:text-primary transition-colors">
            <User size={18} />
          </Link>
          <button onClick={() => setIsOpen(true)} className="text-foreground hover:text-primary transition-colors relative">
            <ShoppingCart size={18} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary rounded-full text-[9px] text-primary-foreground flex items-center justify-center font-body font-bold">
                {totalItems}
              </span>
            )}
          </button>
          <button
            className="lg:hidden text-foreground hover:text-primary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg flex flex-col items-center justify-center gap-6 lg:hidden">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`font-display text-3xl tracking-wide transition-colors ${
                location.pathname === link.path ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              {link.label.toUpperCase()}
            </Link>
          ))}
          <div className="flex gap-4 mt-6">
            <Link to="/account" onClick={() => setMobileOpen(false)} className="px-6 py-3 rounded-lg border border-border text-foreground text-sm font-body font-medium hover:border-primary transition-colors">
              Account
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
