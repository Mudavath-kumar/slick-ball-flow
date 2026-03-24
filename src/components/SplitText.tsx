import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
  triggerStart?: string;
  stagger?: number;
  scrollTrigger?: boolean;
}

const SplitText = ({
  children,
  className = '',
  as: Tag = 'h2',
  delay = 0,
  triggerStart = 'top 65%',
  stagger = 0.035,
  scrollTrigger: useScrollTrigger = true,
}: SplitTextProps) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chars = el.querySelectorAll('.split-char');

    const animConfig: gsap.TweenVars = {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: 0.7,
      stagger,
      delay,
      ease: 'power3.out',
    };

    if (useScrollTrigger) {
      animConfig.scrollTrigger = {
        trigger: el,
        start: triggerStart,
        toggleActions: 'play none none reverse',
      };
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(chars, { y: 55, opacity: 0, rotateX: -45 }, animConfig);
    }, el);

    return () => ctx.revert();
  }, [children, delay, triggerStart, stagger, useScrollTrigger]);

  const letters = children.split('');

  return (
    <Tag
      ref={containerRef as any}
      className={`${className} overflow-hidden`}
      style={{ perspective: '600px' }}
    >
      {letters.map((char, i) => (
        <span
          key={`${char}-${i}`}
          className="split-char inline-block"
          style={{ willChange: 'transform, opacity' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </Tag>
  );
};

export default SplitText;