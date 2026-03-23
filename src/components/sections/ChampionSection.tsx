import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ChampionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
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

      gsap.fromTo(
        leftRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 40%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        rightRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 40%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden"
    >
      <h2 ref={titleRef} className="font-display text-foreground text-6xl lg:text-7xl mb-20 tracking-wide">
        THE CHAMPION
      </h2>

      <div className="w-full max-w-5xl mx-auto flex items-center justify-between px-16">
        {/* Left info */}
        <div ref={leftRef} className="max-w-[200px]">
          <p className="text-primary text-[10px] uppercase tracking-[2px] font-body font-semibold mb-2">
            Rank: 01
          </p>
          <p className="text-foreground text-2xl font-display mb-2">Elite Tier</p>
          <p className="text-muted-foreground text-xs font-body leading-relaxed">
            Constructed for the highest level of competition.
          </p>
        </div>

        {/* Center space for 3D ball */}
        <div className="w-[350px] h-[350px]" />

        {/* Right info */}
        <div ref={rightRef} className="max-w-[200px] text-right">
          <p className="text-primary text-[10px] uppercase tracking-[2px] font-body font-semibold mb-2">
            Certified
          </p>
          <p className="text-foreground text-2xl font-display mb-2">Gold Standard</p>
          <p className="text-muted-foreground text-xs font-body leading-relaxed">
            Meets all regulation weight and size requirements.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ChampionSection;
