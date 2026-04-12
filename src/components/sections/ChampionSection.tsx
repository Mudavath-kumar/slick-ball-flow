import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from '@/components/SplitText';
import { ArrowRight, Trophy, Shield, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ChampionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 50%', toggleActions: 'play none none reverse' },
        }
      );
      gsap.fromTo(
        rightRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 50%', toggleActions: 'play none none reverse' },
        }
      );
      gsap.fromTo(
        ctaRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubscribe = () => {
    if (email) { setSubscribed(true); setEmail(''); setTimeout(() => setSubscribed(false), 5000); }
  };

  return (
    <section ref={sectionRef} className="relative z-20 w-full overflow-hidden bg-background">
      {/* Main Champion CTA */}
      <div className="min-h-screen flex flex-col items-center justify-center px-8 lg:px-16 py-24">
        <SplitText as="h2" className="font-display text-foreground text-7xl lg:text-[10rem] leading-none mb-8 text-center tracking-wide">
          BECOME THE CHAMPION
        </SplitText>

        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 mt-12">
          {/* Left info */}
          <div ref={leftRef} className="space-y-8">
            {[
              { icon: Trophy, title: 'Elite Tier', sub: 'Rank: 01', desc: 'Constructed for the highest level of competition. Used by professionals worldwide.' },
              { icon: Shield, title: 'Gold Standard', sub: 'Certified', desc: 'Meets all regulation weight and size requirements for official play.' },
              { icon: Zap, title: 'Innovation', sub: 'Next Gen', desc: 'AI-assisted design with sustainable materials pushing the boundaries of performance.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <item.icon size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-primary text-[10px] uppercase tracking-[2px] font-body font-semibold">{item.sub}</p>
                  <p className="text-foreground text-xl font-display">{item.title}</p>
                  <p className="text-muted-foreground text-xs font-body leading-relaxed mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right CTA */}
          <div ref={rightRef} className="flex flex-col justify-center">
            <div className="p-8 rounded-3xl bg-card border border-border">
              <h3 className="font-display text-foreground text-4xl mb-2">JOIN THE ELITE</h3>
              <p className="text-muted-foreground text-sm font-body leading-relaxed mb-6">
                Be the first to access limited drops, exclusive athlete content, and member-only pricing.
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="flex-1 px-4 py-3.5 rounded-xl bg-secondary border border-border text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                  <button
                    onClick={handleSubscribe}
                    className={`px-6 py-3.5 rounded-xl font-body font-semibold text-sm tracking-wide transition-all whitespace-nowrap ${
                      subscribed ? 'bg-green-600 text-white' : 'bg-primary text-primary-foreground hover:brightness-110'
                    }`}
                  >
                    {subscribed ? '✓ JOINED' : 'JOIN'}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/products"
                    className="flex items-center justify-center gap-2 py-3.5 rounded-xl border border-border text-foreground text-sm font-body font-medium hover:border-primary hover:text-primary transition-all"
                  >
                    Shop Now <ArrowRight size={14} />
                  </Link>
                  <Link
                    to="/customize"
                    className="flex items-center justify-center gap-2 py-3.5 rounded-xl border border-border text-foreground text-sm font-body font-medium hover:border-primary hover:text-primary transition-all"
                  >
                    Customize <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-6 mt-6 pt-6 border-t border-border">
                <div className="text-center">
                  <p className="text-foreground font-display text-2xl">50M+</p>
                  <p className="text-muted-foreground text-[9px] uppercase tracking-[1px] font-body">Balls Sold</p>
                </div>
                <div className="text-center">
                  <p className="text-foreground font-display text-2xl">130+</p>
                  <p className="text-muted-foreground text-[9px] uppercase tracking-[1px] font-body">Years</p>
                </div>
                <div className="text-center">
                  <p className="text-foreground font-display text-2xl">98%</p>
                  <p className="text-muted-foreground text-[9px] uppercase tracking-[1px] font-body">Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick links bar */}
      <div ref={ctaRef} className="w-full border-t border-border py-12 px-8 lg:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Products', to: '/products', desc: 'Browse collection' },
            { label: 'Size Finder', to: '/size-finder', desc: 'Find your fit' },
            { label: 'Compare', to: '/compare', desc: 'Side by side' },
            { label: 'Warranty', to: '/warranty', desc: 'We got you' },
          ].map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="group flex items-center justify-between p-5 rounded-xl bg-card border border-border hover:border-primary/40 transition-all"
            >
              <div>
                <p className="text-foreground text-sm font-body font-semibold">{link.label}</p>
                <p className="text-muted-foreground text-[10px] font-body">{link.desc}</p>
              </div>
              <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChampionSection;
