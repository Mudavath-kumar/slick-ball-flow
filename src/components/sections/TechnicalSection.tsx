import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const specs = [
  { pos: 'top-[20%] left-[10%]', value: '1.2mm', label: 'Pebble Height', lineDir: 'right' },
  { pos: 'top-[15%] right-[10%]', value: '45.2°', label: 'Channel Angle', lineDir: 'left' },
  { pos: 'bottom-[30%] left-[10%]', value: '22 oz', label: 'Official Weight', lineDir: 'right' },
  { pos: 'bottom-[25%] right-[10%]', value: 'High-Tack', label: 'Coating Spec', lineDir: 'left' },
  { pos: 'top-[50%] left-[8%]', value: '29.5"', label: 'Circumference', lineDir: 'right' },
  { pos: 'top-[45%] right-[8%]', value: '8 PSI', label: 'Optimal Pressure', lineDir: 'left' },
];

const TechnicalSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (labelsRef.current) {
        gsap.fromTo(
          labelsRef.current.querySelectorAll('.tech-label'),
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1, scale: 1, duration: 0.8, stagger: 0.12, ease: 'power2.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 50%', toggleActions: 'play none none reverse' },
          }
        );
      }
      gsap.fromTo(
        '.tech-line',
        { strokeDashoffset: 200 },
        {
          strokeDashoffset: 0, duration: 1, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 50%', toggleActions: 'play none none reverse' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-20 min-h-screen w-full flex items-center justify-center overflow-hidden bg-background">
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
          <div key={i} className="absolute rounded-full border border-primary opacity-10" style={{ width: size, height: size }} />
        ))}
        <div
          className="absolute w-[400px] h-[400px] radar-sweep"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0deg, hsl(var(--slam-orange) / 0.15) 30deg, transparent 60deg)',
            borderRadius: '50%',
          }}
        />
      </div>

      {/* Technical labels */}
      <div ref={labelsRef} className="w-full h-full">
        {specs.map((spec, i) => (
          <div key={i} className={`tech-label absolute ${spec.pos}`}>
            <p className="text-foreground text-2xl font-display">{spec.value}</p>
            <p className="text-muted-foreground text-[10px] uppercase tracking-[2px] font-body">{spec.label}</p>
            <svg
              className={`absolute ${spec.lineDir === 'right' ? '-right-20' : '-left-20'} top-4 w-20 h-px`}
              viewBox="0 0 80 1"
            >
              <line className="tech-line" x1="0" y1="0.5" x2="80" y2="0.5" stroke="hsl(var(--slam-gray))" strokeWidth="1" strokeDasharray="200" />
            </svg>
            <div className={`absolute ${spec.lineDir === 'right' ? '-right-[84px]' : '-left-[84px]'} top-3 w-2 h-2 rounded-full bg-primary`} />
          </div>
        ))}
      </div>

      {/* Title */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2">
        <p className="text-muted-foreground text-[10px] uppercase tracking-[4px] font-body">Technical Analysis</p>
      </div>

      {/* Center info */}
      <div className="relative z-10 text-center">
        <div className="w-20 h-20 rounded-full border-2 border-primary/30 flex items-center justify-center mx-auto mb-4">
          <span className="font-display text-primary text-2xl">SD</span>
        </div>
        <p className="text-muted-foreground text-[10px] uppercase tracking-[3px] font-body">360° Breakdown</p>
      </div>
    </section>
  );
};

export default TechnicalSection;
