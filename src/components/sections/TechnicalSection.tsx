import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TechnicalSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate labels in
      if (labelsRef.current) {
        gsap.fromTo(
          labelsRef.current.querySelectorAll('.tech-label'),
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 50%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate SVG lines
      gsap.fromTo(
        '.tech-line',
        { strokeDashoffset: 200 },
        {
          strokeDashoffset: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
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
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Crosshair lines */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full h-px bg-border opacity-30" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-full w-px bg-border opacity-30" />
      </div>

      {/* Radar rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[120, 200, 300, 400].map((size, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-primary opacity-10"
            style={{ width: size, height: size }}
          />
        ))}
        {/* Radar sweep */}
        <div
          className="absolute w-[400px] h-[400px] radar-sweep"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0deg, hsl(var(--slam-orange) / 0.15) 30deg, transparent 60deg)',
            borderRadius: '50%',
          }}
        />
      </div>

      {/* Technical labels */}
      <div ref={labelsRef}>
        {/* Top left */}
        <div className="tech-label absolute top-[25%] left-[15%]">
          <p className="text-foreground text-2xl font-display">1.2mm</p>
          <p className="text-muted-foreground text-[10px] uppercase tracking-[2px] font-body">
            Pebble Height
          </p>
          <svg className="absolute -right-20 top-4 w-20 h-px" viewBox="0 0 80 1">
            <line
              className="tech-line"
              x1="0" y1="0.5" x2="80" y2="0.5"
              stroke="hsl(var(--slam-gray))"
              strokeWidth="1"
              strokeDasharray="200"
            />
          </svg>
          <div className="absolute -right-[84px] top-3 w-2 h-2 rounded-full bg-primary" />
        </div>

        {/* Bottom right */}
        <div className="tech-label absolute bottom-[25%] right-[15%]">
          <p className="text-foreground text-2xl font-display">High-Tack</p>
          <p className="text-muted-foreground text-[10px] uppercase tracking-[2px] font-body">
            Coating Spec
          </p>
          <svg className="absolute -left-20 top-4 w-20 h-px" viewBox="0 0 80 1">
            <line
              className="tech-line"
              x1="0" y1="0.5" x2="80" y2="0.5"
              stroke="hsl(var(--slam-gray))"
              strokeWidth="1"
              strokeDasharray="200"
            />
          </svg>
          <div className="absolute -left-[84px] top-3 w-2 h-2 rounded-full bg-primary" />
        </div>

        {/* Bottom left */}
        <div className="tech-label absolute bottom-[20%] left-[15%]">
          <p className="text-muted-foreground text-[10px] uppercase tracking-[2px] font-body">
            Elevation: 11.8°
          </p>
        </div>

        {/* Top right */}
        <div className="tech-label absolute top-[20%] right-[15%]">
          <p className="text-muted-foreground text-[10px] uppercase tracking-[2px] font-body">
            Azimuth: 45.2°
          </p>
          <p className="text-muted-foreground text-[10px] uppercase tracking-[2px] font-body mt-1">
            Channel Depth
          </p>
        </div>
      </div>

      {/* Title - subtle */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2">
        <p className="text-muted-foreground text-[10px] uppercase tracking-[4px] font-body">
          Technical Analysis
        </p>
      </div>
    </section>
  );
};

export default TechnicalSection;
