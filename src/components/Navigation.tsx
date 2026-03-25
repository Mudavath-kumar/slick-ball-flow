import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/products', label: 'Products' },
  { path: '/customize', label: 'Customize' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contacts' },
];

const Navigation = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-10 py-5 backdrop-blur-md bg-background/60">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full border-2 border-foreground flex items-center justify-center hover:border-primary transition-colors">
            <div className="text-center leading-none font-display">
              <span className="block text-[8px] tracking-wider">SLAM</span>
              <span className="block text-[8px] tracking-wider">DUNK</span>
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-body font-medium tracking-wide transition-colors ${
                location.pathname === link.path
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="text-foreground hover:text-primary transition-colors">
            <User size={20} />
          </button>
          <Link to="/products" className="text-foreground hover:text-primary transition-colors relative">
            <ShoppingCart size={20} />
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary rounded-full text-[9px] text-primary-foreground flex items-center justify-center font-body font-bold">
              0
            </span>
          </Link>
          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-foreground hover:text-primary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 md:hidden">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`font-display text-4xl tracking-wide transition-colors ${
                location.pathname === link.path ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              {link.label.toUpperCase()}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Navigation;
