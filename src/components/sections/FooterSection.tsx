import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FooterSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const defyRef = useRef<HTMLDivElement>(null);
  const gravityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        defyRef.current,
        { y: 60, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        gravityRef.current,
        { y: 80, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-16"
    >
      {/* Floating geometric shapes */}
      <div className="absolute bottom-[20%] left-[10%] w-0 h-0 border-l-[30px] border-r-[30px] border-b-[52px] border-l-transparent border-r-transparent border-b-primary opacity-60" />
      <div className="absolute top-[30%] right-[15%] w-6 h-6 bg-secondary rotate-45 opacity-40" />
      <div className="absolute bottom-[35%] right-[25%] w-4 h-4 bg-muted rotate-12 opacity-30" />

      {/* Main typography */}
      <div className="text-center mb-24">
        <div ref={defyRef}>
          <h2 className="font-display text-[clamp(80px,10vw,120px)] leading-none text-transparent tracking-wide"
            style={{
              WebkitTextStroke: '2px hsl(var(--slam-gray))',
            }}
          >
            DEFY
          </h2>
        </div>
        <div ref={gravityRef} className="flex items-baseline justify-center">
          <h2 className="font-display text-[clamp(100px,12vw,140px)] leading-none text-foreground tracking-wide">
            GRAVITY
          </h2>
          <span className="inline-block w-4 h-4 bg-primary ml-2 -mb-2" />
        </div>
      </div>

      {/* Footer info */}
      <div className="w-full max-w-4xl mx-auto">
        {/* Three columns */}
        <div className="flex items-center justify-between mb-12 text-sm font-body">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-foreground" />
            <span className="text-foreground">OFFICIAL STORE</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-foreground">GLOBAL SHIPPING</span>
          </div>
          <div>
            <span className="text-foreground">SECURE CHECKOUT</span>
          </div>
        </div>

        {/* CTA + Social */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-5">
            {['X', 'IG', 'YT'].map((icon) => (
              <button
                key={icon}
                className="text-foreground text-sm font-body hover:text-primary transition-colors"
              >
                {icon}
              </button>
            ))}
          </div>

          <button className="bg-foreground text-background px-10 py-4 rounded font-body font-semibold text-sm tracking-wide hover:bg-primary hover:text-primary-foreground transition-all magnetic-btn">
            SHOP COLLECTION
          </button>
        </div>

        {/* Copyright */}
        <p className="text-center text-muted-foreground text-[10px] font-body">
          © 2024 SlamDunk Inc. All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default FooterSection;
