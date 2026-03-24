import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useCountUp = (
  endValue: number,
  triggerRef: React.RefObject<HTMLElement>,
  opts?: { duration?: number; decimals?: number; suffix?: string; prefix?: string }
) => {
  const [display, setDisplay] = useState('0');
  const obj = useRef({ val: 0 });

  useEffect(() => {
    if (!triggerRef.current) return;
    const d = opts?.decimals ?? 0;
    const suf = opts?.suffix ?? '';
    const pre = opts?.prefix ?? '';

    const ctx = gsap.context(() => {
      gsap.fromTo(
        obj.current,
        { val: 0 },
        {
          val: endValue,
          duration: opts?.duration ?? 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
          onUpdate: () => {
            setDisplay(`${pre}${obj.current.val.toFixed(d)}${suf}`);
          },
        }
      );
    });

    return () => ctx.revert();
  }, [endValue, triggerRef]);

  return display;
};