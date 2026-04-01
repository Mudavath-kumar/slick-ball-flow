import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import BackToTop from '@/components/BackToTop';
import { products, Product } from '@/data/products';
import { Plus, X, ArrowRight, Check, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const Compare = () => {
  const [selected, setSelected] = useState<Product[]>([products[0], products[1]]);
  const [showPicker, setShowPicker] = useState<number | null>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
    }
  }, []);

  const setSlot = (index: number, product: Product) => {
    const next = [...selected];
    next[index] = product;
    setSelected(next);
    setShowPicker(null);
  };

  const removeSlot = (index: number) => {
    if (selected.length > 2) {
      setSelected(selected.filter((_, i) => i !== index));
    }
  };

  const addSlot = () => {
    if (selected.length < 4) {
      const unused = products.find(p => !selected.some(s => s.id === p.id));
      if (unused) setSelected([...selected, unused]);
    }
  };

  const specs = [
    { label: 'Price', get: (p: Product) => `$${p.price}` },
    { label: 'Category', get: (p: Product) => p.category.charAt(0).toUpperCase() + p.category.slice(1) },
    { label: 'Size', get: (p: Product) => p.size },
    { label: 'Weight', get: (p: Product) => p.specs.weight },
    { label: 'Circumference', get: (p: Product) => p.specs.circumference },
    { label: 'Material', get: (p: Product) => p.specs.material },
    { label: 'Construction', get: (p: Product) => p.specs.construction },
  ];

  return (
    <div className="relative bg-background min-h-screen">
      <div className="noise-overlay" />
      <CustomCursor />
      <Navigation />

      <div className="pt-40 pb-24 px-8 lg:px-16 max-w-6xl mx-auto">
        <div ref={titleRef} className="mb-12">
          <span className="text-primary text-[10px] uppercase tracking-[4px] font-body font-semibold">Side by Side</span>
          <h1 className="font-display text-foreground text-7xl lg:text-9xl leading-none mt-2">COMPARE</h1>
          <p className="text-muted-foreground text-sm font-body mt-4">
            Select up to 4 balls to compare specs, features, and pricing.
          </p>
        </div>

        {/* Product headers */}
        <div className="overflow-x-auto">
          <div style={{ minWidth: `${(selected.length + 1) * 200 + 160}px` }}>
            <div className="grid border-b border-border" style={{ gridTemplateColumns: `160px repeat(${selected.length}, 1fr) ${selected.length < 4 ? '80px' : ''}` }}>
              <div className="p-4" />
              {selected.map((p, i) => (
                <div key={`${p.id}-${i}`} className="p-6 text-center border-l border-border relative group">
                  {selected.length > 2 && (
                    <button onClick={() => removeSlot(i)} className="absolute top-2 right-2 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100">
                      <X size={14} />
                    </button>
                  )}
                  <button onClick={() => setShowPicker(i)} className="w-full">
                    <img src={p.image} alt={p.name} className="w-20 h-20 object-contain mx-auto mb-3" />
                    <p className="font-display text-foreground text-lg">{p.name}</p>
                    <p className="text-primary text-xs font-body">{p.subtitle}</p>
                  </button>
                </div>
              ))}
              {selected.length < 4 && (
                <div className="p-6 flex items-center justify-center border-l border-border">
                  <button onClick={addSlot} className="w-12 h-12 rounded-full border border-dashed border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all">
                    <Plus size={18} />
                  </button>
                </div>
              )}
            </div>

            {/* Spec rows */}
            {specs.map((spec, si) => (
              <div
                key={spec.label}
                className={`grid border-b border-border ${si % 2 === 0 ? '' : 'bg-secondary/20'}`}
                style={{ gridTemplateColumns: `160px repeat(${selected.length}, 1fr) ${selected.length < 4 ? '80px' : ''}` }}
              >
                <div className="p-4 flex items-center">
                  <p className="text-muted-foreground text-sm font-body">{spec.label}</p>
                </div>
                {selected.map((p, i) => (
                  <div key={`${p.id}-${i}`} className="p-4 text-center border-l border-border flex items-center justify-center">
                    <p className="text-foreground text-sm font-body font-medium">{spec.get(p)}</p>
                  </div>
                ))}
                {selected.length < 4 && <div className="border-l border-border" />}
              </div>
            ))}

            {/* Features row */}
            <div className="grid border-b border-border" style={{ gridTemplateColumns: `160px repeat(${selected.length}, 1fr) ${selected.length < 4 ? '80px' : ''}` }}>
              <div className="p-4 flex items-start pt-5">
                <p className="text-muted-foreground text-sm font-body">Key Features</p>
              </div>
              {selected.map((p, i) => (
                <div key={`${p.id}-${i}`} className="p-4 border-l border-border">
                  <ul className="space-y-2">
                    {p.features.map(f => (
                      <li key={f} className="flex items-start gap-2 text-xs font-body text-foreground">
                        <Check size={12} className="text-primary flex-shrink-0 mt-0.5" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {selected.length < 4 && <div className="border-l border-border" />}
            </div>

            {/* Action row */}
            <div className="grid" style={{ gridTemplateColumns: `160px repeat(${selected.length}, 1fr) ${selected.length < 4 ? '80px' : ''}` }}>
              <div className="p-4" />
              {selected.map((p, i) => (
                <div key={`${p.id}-${i}`} className="p-6 text-center border-l border-border space-y-3">
                  <p className="text-primary text-3xl font-display">${p.price}</p>
                  <div className="flex flex-col gap-2">
                    <Link
                      to={`/products/${p.id}`}
                      className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg font-body font-semibold text-xs tracking-wide hover:brightness-110 transition-all"
                    >
                      VIEW <ArrowRight size={12} />
                    </Link>
                    <button
                      onClick={() => addItem(p)}
                      className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-4 py-2.5 rounded-lg font-body text-xs hover:border-primary transition-colors"
                    >
                      <ShoppingCart size={12} /> ADD TO CART
                    </button>
                  </div>
                </div>
              ))}
              {selected.length < 4 && <div className="border-l border-border" />}
            </div>
          </div>
        </div>

        {/* Picker modal */}
        {showPicker !== null && (
          <div className="fixed inset-0 z-50 bg-background/90 backdrop-blur-lg flex items-center justify-center p-8">
            <div className="bg-card border border-border rounded-2xl p-8 max-w-lg w-full max-h-[70vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-foreground text-2xl">SELECT A BALL</h3>
                <button onClick={() => setShowPicker(null)} className="text-muted-foreground hover:text-foreground">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-3">
                {products.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setSlot(showPicker, p)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                      selected[showPicker]?.id === p.id ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/40'
                    }`}
                  >
                    <img src={p.image} alt={p.name} className="w-14 h-14 object-contain" />
                    <div className="text-left flex-1">
                      <p className="text-foreground text-sm font-body font-semibold">{p.name}</p>
                      <p className="text-muted-foreground text-xs font-body">{p.subtitle}</p>
                    </div>
                    <p className="text-primary font-display text-lg">${p.price}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <BackToTop />
    </div>
  );
};

export default Compare;
