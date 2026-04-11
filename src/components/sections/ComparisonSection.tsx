import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { products } from '@/data/products';
import { Check, X, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const compareProducts = products.slice(0, 3);

const features = [
  { label: 'Indoor Use', key: 'indoor', values: [true, true, false] },
  { label: 'Outdoor Use', key: 'outdoor', values: [false, false, true] },
  { label: 'NFHS Approved', key: 'nfhs', values: [true, false, false] },
  { label: 'NeverFlat Tech', key: 'neverflat', values: [false, false, false] },
  { label: 'Composite Leather', key: 'leather', values: [true, true, false] },
  { label: 'Deep Channels', key: 'channels', values: [true, false, true] },
];

const ComparisonSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.compare-row',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 55%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-20 w-full py-28 overflow-hidden">
      <div className="max-w-5xl mx-auto px-8 lg:px-16">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-[10px] uppercase tracking-[4px] font-body font-semibold">
            Find Your Ball
          </span>
          <h2 className="font-display text-foreground text-6xl lg:text-7xl leading-none mt-3">
            COMPARE MODELS
          </h2>
          <p className="text-muted-foreground text-sm font-body mt-4 max-w-md mx-auto">
            Stack our top three side by side. Every player has a perfect match.
          </p>
        </div>

        {/* Comparison table */}
        <div className="rounded-2xl border border-border overflow-hidden bg-card">
          {/* Product headers */}
          <div className="grid grid-cols-4 border-b border-border">
            <div className="p-6">
              <p className="text-muted-foreground text-xs font-body uppercase tracking-wider">Feature</p>
            </div>
            {compareProducts.map((p, i) => (
              <div
                key={p.id}
                onMouseEnter={() => setHoveredCol(i)}
                onMouseLeave={() => setHoveredCol(null)}
                className={`p-6 text-center border-l border-border transition-colors duration-300 ${
                  hoveredCol === i ? 'bg-primary/5' : ''
                }`}
              >
                <img src={p.image} alt={p.name} className="w-16 h-16 object-contain mx-auto mb-3" />
                <p className="font-display text-foreground text-lg">{p.name}</p>
                <p className="text-primary text-sm font-display mt-1">${p.price}</p>
              </div>
            ))}
          </div>

          {/* Feature rows */}
          {features.map((feat, fi) => (
            <div
              key={feat.key}
              className={`compare-row grid grid-cols-4 border-b border-border last:border-b-0 ${
                fi % 2 === 0 ? '' : 'bg-secondary/20'
              }`}
            >
              <div className="p-5 flex items-center">
                <p className="text-foreground text-sm font-body">{feat.label}</p>
              </div>
              {feat.values.map((v, ci) => (
                <div
                  key={ci}
                  onMouseEnter={() => setHoveredCol(ci)}
                  onMouseLeave={() => setHoveredCol(null)}
                  className={`p-5 flex items-center justify-center border-l border-border transition-colors duration-300 ${
                    hoveredCol === ci ? 'bg-primary/5' : ''
                  }`}
                >
                  {v ? (
                    <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center">
                      <Check size={14} className="text-primary" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center">
                      <X size={14} className="text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-10 py-4 rounded-lg font-body font-semibold text-sm tracking-wide hover:brightness-110 transition-all magnetic-btn"
          >
            VIEW ALL PRODUCTS <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
