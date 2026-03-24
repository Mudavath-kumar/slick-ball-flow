import { useEffect, useState, useCallback } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useSmoothScroll = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const initScroll = useCallback(() => {
    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.08,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const onScroll = (e: { progress: number }) => {
      setScrollProgress(e.progress);
      ScrollTrigger.update();
    };

    lenis.on('scroll', onScroll);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onTick);

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', onScroll);
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const cleanup = initScroll();
    return cleanup;
  }, [initScroll]);

  return scrollProgress;
};
