import { Suspense } from 'react';
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

  return (
    <div className="relative bg-background">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* 3D Basketball - persistent across all sections */}
      <Suspense fallback={null}>
        <Basketball3D scrollProgress={scrollProgress} />
      </Suspense>

      {/* Sections */}
      <HeroSection />
      <EliteControlSection />
      <PerfectFlightSection />
      <TechnicalSection />
      <ChampionSection />
      <FooterSection />
    </div>
  );
};

export default Index;
