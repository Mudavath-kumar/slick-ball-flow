import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from '@/components/SplitText';
import { useCountUp } from '@/hooks/useCountUp';
import { Wind, RotateCcw, Target } from 'lucide-react';

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
            y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out',
            scrollTrigger: { trigger: statsRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-20 min-h-screen w-full flex items-center overflow-hidden measurement-bg bg-background">
      <div className="w-full max-w-7xl mx-auto px-8 lg:px-16 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - visual */}
          <div className="hidden lg:flex items-center justify-center order-1">
            <div className="relative w-80 h-80">
              {/* Flight path lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 320">
                <path d="M 40 280 Q 160 40 280 160" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="8 4" opacity="0.3" />
                <path d="M 60 260 Q 160 80 260 180" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="8 4" opacity="0.2" />
                <circle cx="280" cy="160" r="6" fill="hsl(var(--primary))" opacity="0.5" />
                <circle cx="40" cy="280" r="4" fill="hsl(var(--primary))" opacity="0.3" />
              </svg>
              {/* Center target */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border border-primary/20 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center">
                    <Target size={20} className="text-primary/50" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - text content */}
          <div className="relative z-20 order-2">
            <span className="inline-block bg-secondary text-muted-foreground text-[10px] uppercase tracking-[2px] font-body px-3 py-1 rounded-full w-fit mb-4">
              Aerodynamics
            </span>
            <SplitText as="h2" className="font-display text-foreground text-7xl lg:text-8xl leading-none mb-6">
              PERFECT FLIGHT
            </SplitText>
            <p className="text-muted-foreground text-sm font-body leading-relaxed max-w-md mb-10">
              Symmetrically balanced weight distribution ensures true flight path and consistent
              rotation speed, critical for long-range precision shooting.
            </p>

            <div ref={statsRef} className="space-y-8">
              <div ref={drag1Ref} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Wind size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-foreground text-4xl font-display">{dragVal}</p>
                  <p className="text-muted-foreground text-[10px] uppercase tracking-[2px] font-body">Drag Coefficient</p>
                  <p className="text-muted-foreground text-xs font-body mt-2 max-w-[280px] leading-relaxed">
                    Optimized aerodynamic profile reduces air resistance for cleaner, longer shots.
                  </p>
                </div>
              </div>

              <div ref={rot1Ref} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <RotateCcw size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-foreground text-4xl font-display">{rotVal}</p>
                  <p className="text-muted-foreground text-[10px] uppercase tracking-[2px] font-body">Rotational Stability</p>
                  <p className="text-muted-foreground text-xs font-body mt-2 max-w-[280px] leading-relaxed">
                    Consistent backspin rate for predictable arc and soft touch on the rim.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerfectFlightSection;
