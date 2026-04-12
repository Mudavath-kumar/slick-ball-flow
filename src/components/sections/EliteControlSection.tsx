import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from '@/components/SplitText';
import { useCountUp } from '@/hooks/useCountUp';
import { Grip, Droplets, Thermometer } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const EliteControlSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const stat1Ref = useRef<HTMLDivElement>(null);
  const stat2Ref = useRef<HTMLDivElement>(null);
  const stat3Ref = useRef<HTMLDivElement>(null);

  const stat1 = useCountUp(100, stat1Ref, { suffix: '%' });
  const stat2 = useCountUp(0.5, stat2Ref, { decimals: 1, suffix: 'mm' });
  const stat3 = useCountUp(32, stat3Ref, { suffix: '' });

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
          {/* Left side - text content */}
          <div className="relative z-20">
            <span className="text-primary text-[10px] uppercase tracking-[2px] font-body font-semibold mb-4 block">
              Performance Metrics
            </span>
            <SplitText as="h2" className="font-display text-foreground text-7xl lg:text-8xl leading-none mb-6">
              ELITE CONTROL
            </SplitText>
            <div className="w-10 h-0.5 bg-primary mb-8" />
            <p className="text-muted-foreground text-sm font-body leading-relaxed max-w-md mb-10">
              Every surface texture, every channel depth, every material choice is engineered for one purpose — 
              giving you absolute command over the ball in any condition.
            </p>

            <div ref={statsRef} className="space-y-8">
              <div ref={stat1Ref} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Grip size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-foreground text-4xl font-display">{stat1}</p>
                  <p className="text-muted-foreground text-[10px] uppercase tracking-[2px] font-body mt-1">Microfiber Composite</p>
                  <p className="text-muted-foreground text-xs font-body mt-2 max-w-[280px] leading-relaxed">
                    Exclusive coating material providing superior grip management in all weather conditions.
                  </p>
                </div>
              </div>

              <div ref={stat2Ref} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Droplets size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-foreground text-4xl font-display">{stat2}</p>
                  <p className="text-muted-foreground text-[10px] uppercase tracking-[2px] font-body mt-1">Pebble Depth</p>
                  <p className="text-muted-foreground text-xs font-body mt-2 max-w-[280px] leading-relaxed">
                    Optimized surface texture for precision handling and rotational feedback.
                  </p>
                </div>
              </div>

              <div ref={stat3Ref} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Thermometer size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-foreground text-4xl font-display">{stat3}</p>
                  <p className="text-muted-foreground text-[10px] uppercase tracking-[2px] font-body mt-1">Panel Configuration</p>
                  <p className="text-muted-foreground text-xs font-body mt-2 max-w-[280px] leading-relaxed">
                    Symmetrically aligned panels for consistent hand feel and balanced weight distribution.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - visual */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-80 h-80">
              {/* Concentric rings */}
              {[120, 200, 280, 360].map((size, i) => (
                <div
                  key={i}
                  className="absolute rounded-full border border-primary/10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ width: size, height: size }}
                />
              ))}
              {/* Center glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-primary/10 blur-3xl" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary/30 flex items-center justify-center">
                  <span className="text-primary font-display text-2xl">SD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EliteControlSection;
