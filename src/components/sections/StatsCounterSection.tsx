import { useRef } from 'react';
import { useCountUp } from '@/hooks/useCountUp';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StatsCounterSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const s1 = useRef<HTMLDivElement>(null);
  const s2 = useRef<HTMLDivElement>(null);
  const s3 = useRef<HTMLDivElement>(null);
  const s4 = useRef<HTMLDivElement>(null);

  const v1 = useCountUp(50, s1, { suffix: 'M+' });
  const v2 = useCountUp(137, s2, { suffix: '' });
  const v3 = useCountUp(98, s3, { suffix: '%' });
  const v4 = useCountUp(4.9, s4, { decimals: 1, suffix: '' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stat-block',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
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
    <section ref={sectionRef} className="relative z-20 w-full py-24 overflow-hidden">
      {/* Diagonal accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { ref: s1, value: v1, label: 'Balls Sold Worldwide', sub: 'Since 1894' },
            { ref: s2, value: v2, label: 'Countries', sub: 'Global Distribution' },
            { ref: s3, value: v3, label: 'Player Satisfaction', sub: 'Verified Reviews' },
            { ref: s4, value: v4, label: 'Average Rating', sub: '★ Out of 5.0' },
          ].map((stat, i) => (
            <div
              key={i}
              ref={stat.ref}
              className="stat-block relative p-8 rounded-2xl bg-card border border-border text-center group hover:border-primary/40 transition-all duration-500"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <p className="relative text-primary text-5xl lg:text-6xl font-display mb-2">{stat.value}</p>
              <p className="relative text-foreground text-sm font-body font-semibold">{stat.label}</p>
              <p className="relative text-muted-foreground text-[10px] uppercase tracking-[2px] font-body mt-1">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounterSection;
