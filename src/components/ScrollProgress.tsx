import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ScrollProgressProps {
  progress: number;
}

const ScrollProgress = ({ progress }: ScrollProgressProps) => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (barRef.current) {
      gsap.to(barRef.current, { scaleY: progress, duration: 0.15, ease: 'none' });
    }
  }, [progress]);

  return (
    <div className="fixed right-0 top-0 bottom-0 w-[3px] z-[60] pointer-events-none">
      <div className="absolute inset-0 bg-secondary/30" />
      <div
        ref={barRef}
        className="absolute top-0 left-0 w-full h-full bg-primary origin-top"
        style={{ transform: 'scaleY(0)' }}
      />
    </div>
  );
};

export default ScrollProgress;