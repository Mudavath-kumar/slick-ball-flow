import { useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative bg-background min-h-screen">
      <div className="noise-overlay" />
      <CustomCursor />
      <Navigation />

      <div className="flex flex-col items-center justify-center min-h-screen text-center px-8">
        {/* Floating ball */}
        <div className="text-8xl mb-6 animate-bounce">🏀</div>

        {/* Headline */}
        <span className="text-primary text-[10px] uppercase tracking-[4px] font-body font-semibold mb-4">Error 404</span>
        <h1 className="font-display text-7xl lg:text-9xl leading-none mb-4">
          <span className="gradient-text">OUT OF</span>
          <br />
          <span className="text-foreground">BOUNDS</span>
        </h1>
        <p className="text-muted-foreground text-sm font-body max-w-md mb-10">
          Looks like this shot went wide. The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm tracking-wide hover:brightness-110 transition-all"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <Link
            to="/products"
            className="flex items-center gap-2 px-8 py-4 rounded-xl border border-border text-foreground font-body font-semibold text-sm tracking-wide hover:border-primary hover:text-primary transition-all"
          >
            <ShoppingBag size={16} /> Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
