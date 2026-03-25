import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from '@/components/SplitText';

gsap.registerPlugin(ScrollTrigger);

const FooterSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax floating shapes
      if (shapesRef.current) {
        gsap.to(shapesRef.current.querySelectorAll('.float-shape'), {
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-16"
    >
      {/* Parallax floating geometric shapes */}
      <div ref={shapesRef}>
        <div className="float-shape absolute bottom-[20%] left-[10%] w-0 h-0 border-l-[30px] border-r-[30px] border-b-[52px] border-l-transparent border-r-transparent border-b-primary opacity-60" />
        <div className="float-shape absolute top-[30%] right-[15%] w-6 h-6 bg-secondary rotate-45 opacity-40 animate-[spin_12s_linear_infinite]" />
        <div className="float-shape absolute bottom-[35%] right-[25%] w-4 h-4 bg-muted rotate-12 opacity-30 animate-[spin_8s_linear_infinite_reverse]" />
        <div className="float-shape absolute top-[45%] left-[20%] w-3 h-3 border border-primary/40 rotate-45 animate-[spin_10s_linear_infinite]" />
        <div className="float-shape absolute bottom-[30%] left-[35%] w-2 h-2 rounded-full bg-primary/30" />
      </div>

      {/* Main typography */}
      <div className="text-center mb-24">
        <div>
          <SplitText
            as="h2"
            className="font-display text-[clamp(80px,10vw,120px)] leading-none text-transparent tracking-wide"
            style={{
              WebkitTextStroke: '2px hsl(var(--slam-gray))',
            }}
          >
            DEFY
          </SplitText>
        </div>
        <div className="flex items-baseline justify-center">
          <SplitText as="h2" className="font-display text-[clamp(100px,12vw,140px)] leading-none text-foreground tracking-wide" delay={0.15}>
            GRAVITY
          </SplitText>
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
        {/* Footer links */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-6 text-sm font-body">
            <a href="/products" className="text-muted-foreground hover:text-primary transition-colors">Products</a>
            <a href="/customize" className="text-muted-foreground hover:text-primary transition-colors">Customize</a>
            <a href="/about" className="text-muted-foreground hover:text-primary transition-colors">About</a>
            <a href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
          </div>
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
        </div>

        <div className="flex items-center justify-between mb-8">
          <a href="/products" className="bg-foreground text-background px-10 py-4 rounded font-body font-semibold text-sm tracking-wide hover:bg-primary hover:text-primary-foreground transition-all magnetic-btn">
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
