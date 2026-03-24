import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from '@/components/SplitText';
import { useCountUp } from '@/hooks/useCountUp';

gsap.registerPlugin(ScrollTrigger);

const PerfectFlightSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const drag1Ref = useRef<HTMLDivElement>(null);
  const rot1Ref = useRef<HTMLDivElement>(null);

  const dragVal = useCountUp(0.85, drag1Ref, { decimals: 2 });
  const rotVal = useCountUp(28.5, rot1Ref, { decimals: 1 });

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
        {/* Left side - space for ball */}
        <div className="w-[60%]" />

        {/* Right side - text content */}
        <div className="relative z-20 w-[40%] flex flex-col justify-center pl-12">
          <span className="inline-block bg-secondary text-muted-foreground text-[10px] uppercase tracking-[2px] font-body px-3 py-1 rounded-full w-fit mb-4">
            Aerodynamics
          </span>
          <SplitText as="h2" className="font-display text-foreground text-7xl lg:text-8xl leading-none mb-8">
            PERFECT FLIGHT
          </SplitText>

          <div ref={statsRef} className="space-y-8">
            <div ref={drag1Ref} className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full border border-muted flex items-center justify-center flex-shrink-0">
                <span className="text-foreground text-sm font-display">{dragVal}</span>
              </div>
              <div>
                <p className="text-foreground text-3xl font-display">{dragVal}</p>
                <p className="text-muted-foreground text-[10px] uppercase tracking-[2px] font-body">
                  Drag Coefficient
                </p>
              </div>
            </div>

            <div ref={rot1Ref} className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full border border-muted flex items-center justify-center flex-shrink-0">
                <span className="text-foreground text-sm font-display">{rotVal}</span>
              </div>
              <div>
                <p className="text-foreground text-3xl font-display">{rotVal}</p>
                <p className="text-muted-foreground text-[10px] uppercase tracking-[2px] font-body">
                  Rotational Stability
                </p>
              </div>
            </div>

            <p className="text-muted-foreground text-xs font-body leading-relaxed max-w-[280px]">
              Symmetrically balanced weight distribution ensures true flight path and consistent
              rotation speed, critical for long-range precision.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerfectFlightSection;
