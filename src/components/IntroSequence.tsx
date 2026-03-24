import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface IntroSequenceProps {
  onComplete: () => void;
}

const IntroSequence = ({ onComplete }: IntroSequenceProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const borderTopRef = useRef<HTMLDivElement>(null);
  const borderRightRef = useRef<HTMLDivElement>(null);
  const borderBottomRef = useRef<HTMLDivElement>(null);
  const borderLeftRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const loadTextRef = useRef<HTMLParagraphElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete,
        });
      },
    });

    tl.fromTo(borderTopRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: 'power2.inOut' }, 0)
      .fromTo(borderRightRef.current, { scaleY: 0 }, { scaleY: 1, duration: 0.4, ease: 'power2.inOut' }, 0.3)
      .fromTo(borderBottomRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: 'power2.inOut' }, 0.6)
      .fromTo(borderLeftRef.current, { scaleY: 0 }, { scaleY: 1, duration: 0.4, ease: 'power2.inOut' }, 0.9);

    tl.fromTo(logoRef.current, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }, 1.0);

    tl.fromTo(loadTextRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, 1.2)
      .fromTo(progressRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'power1.inOut' }, 1.4);

    tl.to({}, { duration: 0.3 });

    return () => { tl.kill(); };
  }, [ready, onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9998] bg-background flex items-center justify-center"
    >
      <div ref={borderTopRef} className="absolute top-0 left-0 right-0 h-[3px] bg-primary origin-left" />
      <div ref={borderRightRef} className="absolute top-0 right-0 bottom-0 w-[3px] bg-primary origin-top" />
      <div ref={borderBottomRef} className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary origin-right" />
      <div ref={borderLeftRef} className="absolute top-0 left-0 bottom-0 w-[3px] bg-primary origin-bottom" />

      <div className="flex flex-col items-center gap-6">
        <div ref={logoRef} className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center">
          <div className="text-center leading-none font-display text-primary">
            <span className="block text-[11px] tracking-wider">SLAM</span>
            <span className="block text-[11px] tracking-wider">DUNK</span>
          </div>
        </div>
        <p ref={loadTextRef} className="text-muted-foreground text-[10px] uppercase tracking-[4px] font-body">
          Loading Experience
        </p>
        <div className="w-48 h-[2px] bg-secondary overflow-hidden rounded-full">
          <div ref={progressRef} className="h-full bg-primary origin-left" />
        </div>
      </div>
    </div>
  );
};

export default IntroSequence;