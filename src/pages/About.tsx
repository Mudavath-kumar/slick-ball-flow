import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Award, Globe, Users, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import BackToTop from '@/components/BackToTop';
import SplitText from '@/components/SplitText';
import { useCountUp } from '@/hooks/useCountUp';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 130, suffix: '+', label: 'Years of Innovation', icon: Award },
  { value: 50, suffix: '+', label: 'Countries Served', icon: Globe },
  { value: 200, suffix: 'M+', label: 'Balls Produced', icon: Zap },
  { value: 10, suffix: 'K+', label: 'Pro Athletes Trust Us', icon: Users },
];

const timeline = [
  { year: '1876', title: 'THE BEGINNING', desc: 'A.G. Spalding founded the company in Chicago, pioneering American sports equipment manufacturing.' },
  { year: '1894', title: 'FIRST BASKETBALL', desc: 'Produced the very first official basketball, shaping the future of the sport forever.' },
  { year: '1983', title: 'NBA OFFICIAL', desc: 'Became the official basketball supplier of the NBA, a partnership spanning decades.' },
  { year: '2006', title: 'CROSS-TRAXXION', desc: 'Introduced revolutionary Cross-Traxxion technology for enhanced grip and ball control.' },
  { year: '2024', title: 'NEXT GENERATION', desc: 'Pushing boundaries with AI-assisted design, sustainable materials, and precision engineering.' },
];

const values = [
  { title: 'Precision', desc: 'Every ball undergoes 20,000 bounce tests and spin consistency analysis before leaving our facility.' },
  { title: 'Innovation', desc: 'We invest 12% of revenue into R&D, exploring AI-assisted design and sustainable materials.' },
  { title: 'Community', desc: 'From NBA arenas to neighborhood courts — we serve every player who picks up a ball.' },
  { title: 'Sustainability', desc: 'By 2026, 100% of our rubber compounds will come from recycled or renewable sources.' },
];

const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const stat1Ref = useRef<HTMLDivElement>(null);
  const stat2Ref = useRef<HTMLDivElement>(null);
  const stat3Ref = useRef<HTMLDivElement>(null);
  const stat4Ref = useRef<HTMLDivElement>(null);
  const statRefs = [stat1Ref, stat2Ref, stat3Ref, stat4Ref];

  const s1 = useCountUp(stats[0].value, stat1Ref);
  const s2 = useCountUp(stats[1].value, stat2Ref);
  const s3 = useCountUp(stats[2].value, stat3Ref);
  const s4 = useCountUp(stats[3].value, stat4Ref);
  const statValues = [s1, s2, s3, s4];

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(heroRef.current.children, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' });
    }
    if (timelineRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo('.timeline-item', { x: -40, opacity: 0 }, {
          x: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: timelineRef.current, start: 'top 60%', toggleActions: 'play none none reverse' },
        });
      }, timelineRef);
      return () => ctx.revert();
    }
  }, []);

  return (
    <div className="relative bg-background min-h-screen">
      <div className="noise-overlay" />
      <CustomCursor />
      <Navigation />

      {/* Hero */}
      <div ref={heroRef} className="pt-40 pb-16 px-8 lg:px-16 max-w-7xl mx-auto">
        <div><span className="text-primary text-[10px] uppercase tracking-[4px] font-body font-semibold">Our Story</span></div>
        <div><h1 className="font-display text-foreground text-7xl lg:text-9xl leading-none mt-2">ABOUT US</h1></div>
        <div>
          <p className="text-muted-foreground text-sm font-body mt-4 max-w-xl leading-relaxed">
            For over a century, we've been crafting the world's finest basketballs. From neighborhood courts
            to the biggest stages in sports — every ball tells a story of precision, passion, and performance.
          </p>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="px-8 lg:px-16 max-w-7xl mx-auto py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SplitText as="h2" className="font-display text-foreground text-5xl lg:text-6xl leading-none">
              CRAFTED FOR GREATNESS
            </SplitText>
          </div>
          <div>
            <p className="text-muted-foreground text-sm font-body leading-relaxed mb-6">
              Every basketball we produce undergoes rigorous testing — 20,000 bounces, spin consistency analysis,
              and grip assessment under varying humidity conditions. We don't just make balls, we engineer perfection.
            </p>
            <p className="text-muted-foreground text-sm font-body leading-relaxed">
              Our commitment to innovation means integrating cutting-edge materials science with traditional
              craftsmanship. The result: a basketball that becomes an extension of the player.
            </p>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="px-8 lg:px-16 max-w-7xl mx-auto py-16">
        <SplitText as="h2" className="font-display text-foreground text-5xl mb-12">OUR VALUES</SplitText>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div key={i} className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-primary font-display text-lg">0{i + 1}</span>
              </div>
              <h3 className="text-foreground font-display text-2xl mb-2">{v.title}</h3>
              <p className="text-muted-foreground text-xs font-body leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="px-8 lg:px-16 max-w-7xl mx-auto py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} ref={statRefs[i]} className="text-center p-8 bg-card rounded-2xl border border-border">
              <stat.icon size={24} className="text-primary mx-auto mb-4" />
              <p className="text-foreground text-4xl font-display">{statValues[i]}{stat.suffix}</p>
              <p className="text-muted-foreground text-[10px] uppercase tracking-[2px] font-body mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div ref={timelineRef} className="px-8 lg:px-16 max-w-7xl mx-auto py-24">
        <SplitText as="h2" className="font-display text-foreground text-5xl mb-16">OUR JOURNEY</SplitText>
        <div className="relative">
          <div className="absolute left-[60px] top-0 bottom-0 w-px bg-border" />
          <div className="space-y-12">
            {timeline.map((item, i) => (
              <div key={i} className="timeline-item flex items-start gap-8">
                <div className="flex-shrink-0 w-[120px] text-right">
                  <span className="text-primary text-3xl font-display">{item.year}</span>
                </div>
                <div className="relative">
                  <div className="absolute -left-[14px] top-2 w-3 h-3 rounded-full bg-primary border-2 border-background" />
                </div>
                <div className="pt-1">
                  <h3 className="text-foreground text-lg font-display mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-xs font-body leading-relaxed max-w-md">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-8 lg:px-16 max-w-7xl mx-auto py-24 text-center">
        <SplitText as="h2" className="font-display text-foreground text-6xl lg:text-7xl mb-6">
          JOIN THE LEGACY
        </SplitText>
        <p className="text-muted-foreground text-sm font-body max-w-md mx-auto mb-8">
          Experience the difference that 130+ years of craftsmanship makes.
        </p>
        <Link to="/products" className="inline-block bg-primary text-primary-foreground px-12 py-4 rounded-lg font-body font-semibold text-sm tracking-wide hover:brightness-110 transition-all magnetic-btn">
          EXPLORE COLLECTION
        </Link>
      </div>

      <BackToTop />
    </div>
  );
};

export default About;
