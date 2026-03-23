import { useEffect, useRef } from 'react';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Split title animation
    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        0.2
      );
    }

    if (priceRef.current) {
      tl.fromTo(
        priceRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        0.8
      );
    }

    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        1
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Orange frame border */}
      <div className="absolute inset-0 border-[20px] border-primary rounded-none z-20 pointer-events-none" />

      {/* Inner container */}
      <div className="absolute inset-[20px] bg-background rounded-[32px] overflow-hidden">
        {/* Content */}
        <div className="relative h-full flex flex-col justify-between px-16 py-24">
          {/* Top left - promo video */}
          <div className="flex items-center gap-3 mt-8">
            <button className="w-10 h-10 rounded-full border border-foreground flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
              <Play size={14} className="ml-0.5" />
            </button>
            <span className="text-sm text-muted-foreground font-body">Promotion Video</span>
          </div>

          {/* Main title */}
          <div className="flex-1 flex items-center justify-center">
            <h1
              ref={titleRef}
              className="font-display text-slam-gray text-[clamp(120px,18vw,280px)] leading-none tracking-tight select-none"
            >
              SPALDING
            </h1>
          </div>

          {/* Bottom row */}
          <div className="flex items-end justify-between pb-4">
            {/* Price */}
            <div ref={priceRef}>
              <p className="text-primary text-5xl font-display">$34.99</p>
              <p className="text-muted-foreground text-xs mt-1 font-body">
                SIZE: 29.5 • OFFICIAL
              </p>
            </div>

            {/* CTA */}
            <button
              ref={ctaRef}
              className="bg-primary text-primary-foreground px-12 py-4 rounded font-body font-semibold text-base tracking-wide hover:brightness-110 transition-all magnetic-btn"
            >
              ADD TO CART
            </button>

            {/* Nav arrows */}
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-full border border-muted flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                <ChevronLeft size={18} />
              </button>
              <button className="w-10 h-10 rounded-full border border-muted flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
