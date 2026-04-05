import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const athletes = [
  {
    name: 'Marcus "Flash" Williams',
    role: 'NBA All-Star Guard',
    quote: 'The TF-1000 Legacy is the only ball I trust for game day. The grip is unmatched.',
    stats: { ppg: '28.4', apg: '8.2', years: '12' },
    emoji: '⚡',
    signatureBall: 'TF-1000 LEGACY',
  },
  {
    name: 'Elena Vasquez',
    role: 'WNBA MVP 2024',
    quote: 'Precision and control define my game. This ball delivers both, every single time.',
    stats: { ppg: '24.1', apg: '6.7', years: '8' },
    emoji: '🔥',
    signatureBall: 'PRECISION',
  },
  {
    name: 'DJ "Concrete" Carter',
    role: 'Streetball Legend',
    quote: 'From Venice Beach to Rucker Park, the Street Phantom survives everything I throw at it.',
    stats: { ppg: '32.0', apg: '5.4', years: '15' },
    emoji: '💎',
    signatureBall: 'STREET PHANTOM',
  },
];

const ProAthletesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.athlete-card',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
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
    <section ref={sectionRef} className="relative w-full py-28 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/3 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-8 lg:px-16">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-[10px] uppercase tracking-[4px] font-body font-semibold">
            Endorsed by the Best
          </span>
          <h2 className="font-display text-foreground text-6xl lg:text-7xl leading-none mt-3">
            PRO ATHLETES
          </h2>
          <p className="text-muted-foreground text-sm font-body mt-4 max-w-md mx-auto">
            The world's top players choose SlamDunk. Here's why.
          </p>
        </div>

        {/* Athlete Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {athletes.map((athlete, i) => (
            <div
              key={i}
              className="athlete-card group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all duration-500 overflow-hidden"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Emoji Avatar */}
              <div className="relative w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-3xl mb-6">
                {athlete.emoji}
              </div>

              {/* Info */}
              <div className="relative">
                <h3 className="font-display text-foreground text-2xl">{athlete.name}</h3>
                <p className="text-primary text-[10px] uppercase tracking-[2px] font-body font-semibold mt-1 mb-4">
                  {athlete.role}
                </p>

                {/* Quote */}
                <div className="relative pl-4 border-l-2 border-primary/30 mb-6">
                  <Quote size={14} className="text-primary/40 absolute -left-[1px] -top-3 bg-card" />
                  <p className="text-muted-foreground text-sm font-body leading-relaxed italic">
                    "{athlete.quote}"
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="text-center p-2 rounded-lg bg-secondary/50">
                    <p className="text-foreground font-display text-xl">{athlete.stats.ppg}</p>
                    <p className="text-muted-foreground text-[9px] uppercase tracking-[1px] font-body">PPG</p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-secondary/50">
                    <p className="text-foreground font-display text-xl">{athlete.stats.apg}</p>
                    <p className="text-muted-foreground text-[9px] uppercase tracking-[1px] font-body">APG</p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-secondary/50">
                    <p className="text-foreground font-display text-xl">{athlete.stats.years}</p>
                    <p className="text-muted-foreground text-[9px] uppercase tracking-[1px] font-body">YRS</p>
                  </div>
                </div>

                {/* Signature ball */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <p className="text-muted-foreground text-[9px] uppercase tracking-[2px] font-body">Signature Ball</p>
                    <p className="text-foreground text-sm font-display">{athlete.signatureBall}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all duration-300">
                    <ArrowRight size={12} className="text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/community"
            className="inline-flex items-center gap-2 text-primary text-sm font-body font-medium hover:underline transition-all"
          >
            Join the Pro Community <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProAthletesSection;
