import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PerfectFlightSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

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
        <div className="w-[40%] flex flex-col justify-center pl-12">
          <span className="inline-block bg-secondary text-muted-foreground text-[10px] uppercase tracking-[2px] font-body px-3 py-1 rounded-full w-fit mb-4">
            Aerodynamics
          </span>
          <h2 ref={headlineRef} className="font-display text-foreground text-7xl lg:text-8xl leading-none mb-8">
            PERFECT FLIGHT
          </h2>

          <div ref={statsRef} className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full border border-muted flex items-center justify-center flex-shrink-0">
                <span className="text-foreground text-sm font-display">0.85</span>
              </div>
              <div>
                <p className="text-foreground text-3xl font-display">0.85</p>
                <p className="text-muted-foreground text-[10px] uppercase tracking-[2px] font-body">
                  Drag Coefficient
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full border border-muted flex items-center justify-center flex-shrink-0">
                <span className="text-foreground text-sm font-display">28.5</span>
              </div>
              <div>
                <p className="text-foreground text-3xl font-display">28.5</p>
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
