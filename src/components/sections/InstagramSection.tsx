import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, ArrowUpRight } from 'lucide-react';
import { products } from '@/data/products';

gsap.registerPlugin(ScrollTrigger);

const gridItems = [
  { img: products[0]?.image, label: '@slamdunk', type: 'product' as const },
  { img: products[2]?.image, label: 'Street vibes 🔥', type: 'lifestyle' as const },
  { img: products[4]?.image, label: 'Limited drop', type: 'product' as const },
  { img: products[1]?.image, label: 'Indoor precision', type: 'product' as const },
  { img: products[3]?.image, label: 'NeverFlat tech', type: 'product' as const },
  { img: products[5]?.image, label: 'ZI/O on sale', type: 'product' as const },
];

const InstagramSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.insta-card',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Instagram size={20} className="text-primary" />
              <span className="text-primary text-[10px] uppercase tracking-[4px] font-body font-semibold">
                @SlamDunkOfficial
              </span>
            </div>
            <h2 className="font-display text-foreground text-5xl lg:text-6xl">
              FOLLOW THE GAME
            </h2>
          </div>
          <a
            href="#"
            className="hidden md:flex items-center gap-2 text-sm font-body font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            View Profile <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {gridItems.map((item, i) => (
            <div
              key={i}
              className="insta-card group relative aspect-square rounded-2xl overflow-hidden bg-secondary/30 border border-border hover:border-primary/40 transition-all duration-500 cursor-pointer"
            >
              {item.img && (
                <img
                  src={item.img}
                  alt={item.label}
                  className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700"
                />
              )}
              {/* Overlay */}
              <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-foreground text-xs font-body font-medium text-center px-3">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
