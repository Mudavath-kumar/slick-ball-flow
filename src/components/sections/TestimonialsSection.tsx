import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Marcus "Flash" Williams',
    role: 'NCAA Division I Guard',
    quote: 'The TF-1000 changed my free-throw percentage from 78% to 91%. The grip consistency is unlike anything I\'ve ever felt.',
    rating: 5,
    avatar: '🏀',
    stat: '+13%',
    statLabel: 'FT Improvement',
  },
  {
    name: 'Sarah Chen',
    role: 'Streetball Legend, Venice Beach',
    quote: 'I play outdoor every day. The Street Phantom handles concrete like butter and still has grip after 6 months of daily abuse.',
    rating: 5,
    avatar: '👑',
    stat: '6mo+',
    statLabel: 'Outdoor Durability',
  },
  {
    name: 'Coach Derek Thompson',
    role: 'Head Coach, East Valley HS',
    quote: 'We switched our entire program to Spalding. The consistency between balls is perfect — my players know exactly what to expect.',
    rating: 5,
    avatar: '🎯',
    stat: '48',
    statLabel: 'Balls Ordered',
  },
  {
    name: 'Aliyah Brooks',
    role: 'WNBA Draft Prospect',
    quote: 'From warm-ups to game time, the Precision ball responds identically. That predictability is everything at the elite level.',
    rating: 5,
    avatar: '⭐',
    stat: '100%',
    statLabel: 'Would Recommend',
  },
];

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonial-header',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
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

  useEffect(() => {
    const card = cardRefs.current[active];
    if (card) {
      gsap.fromTo(card, { opacity: 0, y: 30, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' });
    }
  }, [active]);

  const next = () => setActive(p => (p + 1) % testimonials.length);
  const prev = () => setActive(p => (p - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[active];

  return (
    <section ref={sectionRef} className="relative w-full py-32 overflow-hidden">
      {/* Subtle glow behind */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-8 lg:px-16">
        {/* Header */}
        <div className="testimonial-header flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-primary text-[10px] uppercase tracking-[4px] font-body font-semibold">
              Real Players, Real Results
            </span>
            <h2 className="font-display text-foreground text-6xl lg:text-8xl leading-none mt-2">
              VOICES FROM<br />THE COURT
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Active testimonial */}
        <div
          ref={el => { cardRefs.current[active] = el; }}
          key={active}
          className="grid grid-cols-1 lg:grid-cols-5 gap-8"
        >
          {/* Quote */}
          <div className="lg:col-span-3 relative p-10 rounded-3xl bg-card border border-border">
            <Quote size={48} className="text-primary/20 absolute top-8 right-8" />
            <div className="flex gap-1 mb-6">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={16} className="text-primary fill-primary" />
              ))}
            </div>
            <p className="text-foreground text-xl lg:text-2xl font-body font-light leading-relaxed mb-8">
              "{t.quote}"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-2xl">
                {t.avatar}
              </div>
              <div>
                <p className="text-foreground text-sm font-body font-semibold">{t.name}</p>
                <p className="text-primary text-xs font-body">{t.role}</p>
              </div>
            </div>
          </div>

          {/* Stat highlight */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex-1 p-8 rounded-3xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 flex flex-col items-center justify-center text-center">
              <p className="text-primary text-7xl font-display">{t.stat}</p>
              <p className="text-foreground text-sm font-body font-medium mt-2">{t.statLabel}</p>
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 py-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === active ? 'bg-primary w-8' : 'bg-border hover:bg-muted-foreground'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
