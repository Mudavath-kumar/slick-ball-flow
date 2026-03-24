import { Suspense, useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import Navigation from '@/components/Navigation';
import Basketball3D from '@/components/Basketball3D';
import HeroSection from '@/components/sections/HeroSection';
import EliteControlSection from '@/components/sections/EliteControlSection';
import PerfectFlightSection from '@/components/sections/PerfectFlightSection';
import TechnicalSection from '@/components/sections/TechnicalSection';
import ChampionSection from '@/components/sections/ChampionSection';
import FooterSection from '@/components/sections/FooterSection';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const Index = () => {
  const scrollProgress = useSmoothScroll();
  const [loading, setLoading] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const logoTextRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loaderRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => setLoading(false),
    });

    // Line draws across
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: 'power2.inOut' },
      0
    );

    // Logo text reveals
    tl.fromTo(
      logoTextRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      0.3
    );

    // Hold for a moment
    tl.to({}, { duration: 0.6 });

    // Frame borders animate in
    tl.fromTo(
      frameRef.current,
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' },
      1.2
    );

    // Loader slides up and out
    tl.to(
      loaderRef.current,
      { yPercent: -100, duration: 0.8, ease: 'power3.inOut' },
      1.6
    );
  }, []);

  return (
    <div className="relative bg-background">
      {/* Opening loader */}
      {loading && (
        <div
          ref={loaderRef}
          className="fixed inset-0 z-[9998] bg-background flex flex-col items-center justify-center"
        >
          <div
            ref={lineRef}
            className="w-24 h-[2px] bg-primary mb-6 origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
          <div ref={logoTextRef} className="opacity-0">
            <p className="font-display text-primary text-5xl tracking-widest">
              SLAM DUNK
            </p>
            <p className="text-muted-foreground text-xs tracking-[6px] text-center mt-2 font-body">
              OFFICIAL BASKETBALL
            </p>
          </div>
        </div>
      )}

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* 3D Basketball - persistent across all sections */}
      <Suspense fallback={null}>
        <Basketball3D scrollProgress={scrollProgress} />
      </Suspense>

      {/* Sections */}
      <div ref={frameRef}>
        <HeroSection />
      </div>
      <EliteControlSection />
      <PerfectFlightSection />
      <TechnicalSection />
      <ChampionSection />
      <FooterSection />
    </div>
  );
};

export default Index;
