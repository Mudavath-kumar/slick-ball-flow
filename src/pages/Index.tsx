import { Suspense, useState, useCallback } from 'react';
import Navigation from '@/components/Navigation';
import Basketball3D from '@/components/Basketball3D';
import IntroSequence from '@/components/IntroSequence';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import HeroSection from '@/components/sections/HeroSection';
import BallShowcaseSection from '@/components/sections/BallShowcaseSection';
import BrandBarSection from '@/components/sections/BrandBarSection';
import EliteControlSection from '@/components/sections/EliteControlSection';
import PerfectFlightSection from '@/components/sections/PerfectFlightSection';
import TechnicalSection from '@/components/sections/TechnicalSection';
import VideoShowcaseSection from '@/components/sections/VideoShowcaseSection';
import ComparisonSection from '@/components/sections/ComparisonSection';
import StatsCounterSection from '@/components/sections/StatsCounterSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import InstagramSection from '@/components/sections/InstagramSection';
import ChampionSection from '@/components/sections/ChampionSection';
import FooterSection from '@/components/sections/FooterSection';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const Index = () => {
  const scrollProgress = useSmoothScroll();
  const [introComplete, setIntroComplete] = useState(false);
  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);

  return (
    <div className="relative bg-background">
      {!introComplete && <IntroSequence onComplete={handleIntroComplete} />}
      <CustomCursor />
      <ScrollProgress progress={scrollProgress} />
      <div className="noise-overlay" />
      <Navigation />

      <Suspense fallback={null}>
        <Basketball3D scrollProgress={scrollProgress} />
      </Suspense>

      <HeroSection />
      <BrandBarSection />
      <BallShowcaseSection />
      <EliteControlSection />
      <PerfectFlightSection />
      <TechnicalSection />
      <VideoShowcaseSection />
      <ComparisonSection />
      <StatsCounterSection />
      <TestimonialsSection />
      <InstagramSection />
      <ChampionSection />
      <FooterSection />
      <BackToTop />
    </div>
  );
};

export default Index;
