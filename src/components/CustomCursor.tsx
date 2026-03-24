import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.08, ease: 'power2.out' });
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.35, ease: 'power3.out' });
    };

    const onEnter = () => {
      gsap.to(cursor, { scale: 2.2, opacity: 0.3, duration: 0.3 });
      gsap.to(dot, { scale: 0.4, duration: 0.3 });
    };

    const onLeave = () => {
      gsap.to(cursor, { scale: 1, opacity: 0.5, duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    const onMagMove = (e: MouseEvent) => {
      const t = e.currentTarget as HTMLElement;
      const r = t.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * 0.25;
      const dy = (e.clientY - (r.top + r.height / 2)) * 0.25;
      gsap.to(t, { x: dx, y: dy, duration: 0.3, ease: 'power2.out' });
    };

    const onMagLeave = (e: MouseEvent) => {
      gsap.to(e.currentTarget as HTMLElement, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
    };

    window.addEventListener('mousemove', onMouseMove);

    const setupListeners = () => {
      document.querySelectorAll('button, a').forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
      document.querySelectorAll('.magnetic-btn').forEach((el) => {
        el.addEventListener('mousemove', onMagMove as EventListener);
        el.addEventListener('mouseleave', onMagLeave as EventListener);
      });
    };

    const timer = setTimeout(setupListeners, 1000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-primary/50 pointer-events-none z-[9997] mix-blend-difference hidden md:block"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-primary pointer-events-none z-[9997] hidden md:block"
        style={{ willChange: 'transform' }}
      />
    </>
  );
};

export default CustomCursor;