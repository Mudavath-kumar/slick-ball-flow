import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import BackToTop from '@/components/BackToTop';
import { products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { Flame, Clock, ShoppingCart, Check, Zap, Gift, Percent, ArrowRight } from 'lucide-react';

const flashDeals = [
  { productId: 'spalding-zi-o', discount: 17, endsIn: 3600 * 4 + 1200 },
  { productId: 'spalding-street', discount: 25, endsIn: 3600 * 2 + 800 },
  { productId: 'spalding-neverflat', discount: 15, endsIn: 3600 * 6 },
];

const bundles = [
  {
    name: 'STARTER PACK',
    desc: 'Perfect for beginners. Indoor + outdoor ball combo.',
    items: ['spalding-precision', 'spalding-street'],
    originalPrice: 64.98,
    bundlePrice: 49.99,
    icon: '🏀',
  },
  {
    name: 'PRO BUNDLE',
    desc: 'For the serious player. Premium indoor ball + all-court backup.',
    items: ['spalding-tf-1000', 'spalding-neverflat'],
    originalPrice: 134.98,
    bundlePrice: 109.99,
    icon: '🔥',
  },
  {
    name: 'ULTIMATE COLLECTION',
    desc: 'One of everything. The complete SlamDunk experience.',
    items: ['spalding-tf-1000', 'spalding-precision', 'spalding-street'],
    originalPrice: 154.97,
    bundlePrice: 119.99,
    icon: '👑',
  },
];

const CountdownTimer = ({ seconds: initial }: { seconds: number }) => {
  const [secs, setSecs] = useState(initial);
  useEffect(() => {
    const interval = setInterval(() => setSecs(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(interval);
  }, []);
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return (
    <div className="flex items-center gap-1">
      {[h, m, s].map((v, i) => (
        <span key={i} className="flex items-center">
          <span className="bg-background text-primary font-display text-lg px-2 py-1 rounded-md min-w-[32px] text-center">
            {String(v).padStart(2, '0')}
          </span>
          {i < 2 && <span className="text-muted-foreground font-display mx-0.5">:</span>}
        </span>
      ))}
    </div>
  );
};

const Deals = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();
  const [addedIds, setAddedIds] = useState<string[]>([]);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
    }
  }, []);

  const handleAdd = (productId: string) => {
    const p = products.find(x => x.id === productId);
    if (p) {
      addItem(p);
      setAddedIds(prev => [...prev, productId]);
      setTimeout(() => setAddedIds(prev => prev.filter(id => id !== productId)), 2000);
    }
  };

  return (
    <div className="relative bg-background min-h-screen">
      <div className="noise-overlay" />
      <CustomCursor />
      <Navigation />

      <div className="pt-40 pb-24 px-8 lg:px-16 max-w-6xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="mb-16">
          <span className="text-primary text-[10px] uppercase tracking-[4px] font-body font-semibold flex items-center gap-2">
            <Flame size={14} /> Limited Time Offers
          </span>
          <h1 className="font-display text-foreground text-7xl lg:text-9xl leading-none mt-2">DEALS</h1>
          <p className="text-muted-foreground text-sm font-body mt-4 max-w-md">
            Flash sales, bundle discounts, and exclusive offers. Don't miss out — these won't last.
          </p>
        </div>

        {/* Flash Deals */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Zap size={20} className="text-primary" />
            <h2 className="font-display text-foreground text-4xl">FLASH DEALS</h2>
            <span className="text-[10px] uppercase tracking-[2px] font-body font-semibold px-3 py-1 rounded-full bg-destructive/20 text-destructive animate-pulse">
              ENDING SOON
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {flashDeals.map(deal => {
              const product = products.find(p => p.id === deal.productId);
              if (!product) return null;
              const salePrice = +(product.price * (1 - deal.discount / 100)).toFixed(2);
              const added = addedIds.includes(product.id);
              return (
                <div key={deal.productId} className="group relative bg-card rounded-2xl border border-border hover:border-primary/50 transition-all overflow-hidden">
                  {/* Discount badge */}
                  <div className="absolute top-4 left-4 z-10 bg-destructive text-destructive-foreground text-[10px] uppercase tracking-[1px] font-body font-semibold px-3 py-1 rounded-full">
                    -{deal.discount}%
                  </div>

                  <div className="h-48 flex items-center justify-center bg-secondary/30">
                    <img src={product.image} alt={product.name} className="w-32 h-32 object-contain group-hover:scale-110 transition-transform duration-700" />
                  </div>

                  <div className="p-6">
                    <p className="text-primary text-[10px] uppercase tracking-[2px] font-body font-semibold mb-1">{product.subtitle}</p>
                    <h3 className="font-display text-foreground text-2xl mb-3">{product.name}</h3>
                    
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-primary text-2xl font-display">${salePrice}</span>
                      <span className="text-muted-foreground text-sm line-through font-body">${product.price}</span>
                      <span className="text-destructive text-xs font-body font-semibold">SAVE ${(product.price - salePrice).toFixed(2)}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <Clock size={12} className="text-muted-foreground" />
                      <span className="text-muted-foreground text-[10px] font-body uppercase tracking-[1px]">Ends in</span>
                      <CountdownTimer seconds={deal.endsIn} />
                    </div>

                    <div className="flex gap-2">
                      <Link to={`/products/${product.id}`} className="flex-1 text-center border border-border text-foreground py-2.5 rounded-lg text-xs font-body font-medium hover:border-primary transition-colors">
                        VIEW
                      </Link>
                      <button
                        onClick={() => handleAdd(product.id)}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-body font-semibold transition-all ${
                          added ? 'bg-green-600 text-white' : 'bg-primary text-primary-foreground hover:brightness-110'
                        }`}
                      >
                        {added ? <><Check size={12} /> ADDED</> : <><ShoppingCart size={12} /> ADD</>}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bundles */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Gift size={20} className="text-primary" />
            <h2 className="font-display text-foreground text-4xl">BUNDLES</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bundles.map((bundle, i) => {
              const bundleProducts = bundle.items.map(id => products.find(p => p.id === id)!).filter(Boolean);
              return (
                <div key={i} className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all group relative overflow-hidden">
                  {i === 2 && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[9px] uppercase tracking-[1px] font-body font-semibold px-4 py-1.5 rounded-bl-xl">
                      BEST VALUE
                    </div>
                  )}
                  <span className="text-4xl mb-4 block">{bundle.icon}</span>
                  <h3 className="font-display text-foreground text-2xl mb-1">{bundle.name}</h3>
                  <p className="text-muted-foreground text-xs font-body mb-4 leading-relaxed">{bundle.desc}</p>

                  <div className="flex items-center gap-2 mb-4">
                    {bundleProducts.map(p => (
                      <div key={p.id} className="w-12 h-12 rounded-lg bg-secondary/50 flex items-center justify-center">
                        <img src={p.image} alt={p.name} className="w-8 h-8 object-contain" />
                      </div>
                    ))}
                  </div>

                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-primary text-3xl font-display">${bundle.bundlePrice}</span>
                    <span className="text-muted-foreground text-sm line-through font-body">${bundle.originalPrice.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Percent size={12} className="text-green-400" />
                    <span className="text-green-400 text-xs font-body font-semibold">
                      Save ${(bundle.originalPrice - bundle.bundlePrice).toFixed(2)} ({Math.round((1 - bundle.bundlePrice / bundle.originalPrice) * 100)}% off)
                    </span>
                  </div>

                  <button
                    onClick={() => bundleProducts.forEach(p => addItem(p))}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-body font-semibold text-xs tracking-wide hover:brightness-110 transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={14} /> ADD BUNDLE TO CART
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Referral */}
        <div className="p-12 rounded-3xl bg-gradient-to-br from-primary/15 via-card to-primary/5 border border-primary/20 text-center mb-16">
          <Gift size={32} className="text-primary mx-auto mb-4" />
          <h3 className="font-display text-foreground text-4xl mb-2">REFER A FRIEND</h3>
          <p className="text-muted-foreground text-sm font-body max-w-md mx-auto mb-6">
            Give your friends $10 off their first order. You get $10 credit when they purchase.
          </p>
          <div className="flex items-center justify-center gap-3 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="Friend's email"
              className="flex-1 px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-body font-semibold text-sm hover:brightness-110 transition-all">
              SEND
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/products" className="inline-flex items-center gap-2 text-primary font-body font-semibold text-sm hover:underline">
            VIEW ALL PRODUCTS <ArrowRight size={16} />
          </Link>
        </div>
      </div>
      <BackToTop />
    </div>
  );
};

export default Deals;
