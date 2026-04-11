import { useEffect, useRef } from 'react';
// z-20 on section to render above 3D ball
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const brands = [
  { name: 'NBA', display: 'NBA' },
  { name: 'NCAA', display: 'NCAA' },
  { name: 'FIBA', display: 'FIBA' },
  { name: 'NFHS', display: 'NFHS' },
  { name: 'WNBA', display: 'WNBA' },
  { name: 'EuroLeague', display: 'EUROLEAGUE' },
  { name: 'Big3', display: 'BIG3' },
  { name: 'AAU', display: 'AAU' },
];

const BrandBarSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.brand-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-16 border-y border-border overflow-hidden">
      <div className="max-w-6xl mx-auto px-8 lg:px-16">
        <p className="text-center text-muted-foreground text-[10px] uppercase tracking-[4px] font-body font-semibold mb-10">
          Trusted by leagues worldwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {brands.map(b => (
            <div
              key={b.name}
              className="brand-item font-display text-3xl lg:text-4xl text-muted-foreground/40 hover:text-primary transition-colors duration-500 cursor-default select-none"
            >
              {b.display}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandBarSection;
