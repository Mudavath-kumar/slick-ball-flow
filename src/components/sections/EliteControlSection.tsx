import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from '@/components/SplitText';
import { useCountUp } from '@/hooks/useCountUp';

gsap.registerPlugin(ScrollTrigger);

const EliteControlSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const stat1Ref = useRef<HTMLDivElement>(null);
  const stat2Ref = useRef<HTMLDivElement>(null);

  const stat1 = useCountUp(100, stat1Ref, { suffix: '%' });
  const stat2 = useCountUp(0.5, stat2Ref, { decimals: 1, suffix: 'mm' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full flex items-center overflow-hidden measurement-bg"
    >
      <div className="w-full max-w-7xl mx-auto px-16 flex">
        {/* Left side - text content */}
        <div className="relative z-20 w-[40%] flex flex-col justify-center pr-12">
          <span className="text-primary text-[10px] uppercase tracking-[2px] font-body font-semibold mb-4">
            Performance Metrics
          </span>
          <SplitText as="h2" className="font-display text-foreground text-7xl lg:text-8xl leading-none mb-6">
            ELITE CONTROL
          </SplitText>
          <div className="w-10 h-0.5 bg-primary mb-10" />

          <div ref={statsRef} className="space-y-8">
            <div ref={stat1Ref}>
              <p className="text-foreground text-5xl font-display">{stat1}</p>
              <p className="text-muted-foreground text-[10px] uppercase tracking-[2px] font-body mt-1">
                Microfiber Composite
              </p>
              <p className="text-muted-foreground text-xs font-body mt-2 max-w-[200px] leading-relaxed">
                Exclusive coating material providing superior grip management in all weather conditions.
              </p>
            </div>

            <div ref={stat2Ref}>
              <p className="text-foreground text-5xl font-display">{stat2}</p>
              <p className="text-muted-foreground text-[10px] uppercase tracking-[2px] font-body mt-1">
                Pebble Depth
              </p>
              <p className="text-muted-foreground text-xs font-body mt-2 max-w-[200px] leading-relaxed">
                Optimized surface texture for precision handling and rotational feedback.
              </p>
            </div>
          </div>
        </div>

        {/* Right side - space for 3D ball */}
        <div className="w-[60%]" />
      </div>
    </section>
  );
};

export default EliteControlSection;
