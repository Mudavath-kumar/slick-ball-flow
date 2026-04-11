import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Bell, Flame } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const LAUNCH_DATE = new Date();
LAUNCH_DATE.setDate(LAUNCH_DATE.getDate() + 12); // 12 days from now

const useCountdown = (target: Date) => {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
};

const UpcomingDropSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const countdown = useCountdown(LAUNCH_DATE);
  const [notified, setNotified] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.drop-content',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
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

  const handleNotify = () => {
    if (email) {
      setNotified(true);
      setEmail('');
      setTimeout(() => setNotified(false), 5000);
    }
  };

  return (
    <section ref={sectionRef} className="relative z-20 w-full py-28 overflow-hidden">
      {/* Gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-background pointer-events-none" />

      <div className="max-w-5xl mx-auto px-8 lg:px-16">
        <div className="drop-content relative rounded-3xl border border-primary/20 bg-card overflow-hidden p-12 lg:p-16">
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary/30 rounded-tl-3xl" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary/30 rounded-br-3xl" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Flame size={16} className="text-primary" />
                <span className="text-primary text-[10px] uppercase tracking-[4px] font-body font-semibold">
                  Upcoming Drop
                </span>
              </div>
              <h2 className="font-display text-foreground text-5xl lg:text-6xl leading-none mb-4">
                INFERNO<br />SERIES
              </h2>
              <p className="text-muted-foreground text-sm font-body leading-relaxed mb-6 max-w-sm">
                Heat-reactive color-shifting panels. Thermochromic coating changes pattern based on court temperature.
                Limited to 500 units worldwide.
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-8">
                {['Heat Reactive', 'Limited 500', 'Premium Leather', 'Signed COA'].map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full text-[10px] uppercase tracking-[1px] font-body font-medium bg-primary/10 text-primary border border-primary/20">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Notify */}
              <div className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email for early access"
                  className="flex-1 px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
                <button
                  onClick={handleNotify}
                  className={`px-6 py-3 rounded-lg font-body font-semibold text-sm tracking-wide transition-all whitespace-nowrap flex items-center gap-2 ${
                    notified ? 'bg-green-600 text-white' : 'bg-primary text-primary-foreground hover:brightness-110'
                  }`}
                >
                  {notified ? '✓ NOTIFIED' : <><Bell size={14} /> NOTIFY ME</>}
                </button>
              </div>
            </div>

            {/* Right - Countdown */}
            <div className="flex flex-col items-center">
              <p className="text-muted-foreground text-[10px] uppercase tracking-[4px] font-body font-semibold mb-6">
                Drops In
              </p>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { value: countdown.days, label: 'Days' },
                  { value: countdown.hours, label: 'Hrs' },
                  { value: countdown.minutes, label: 'Min' },
                  { value: countdown.seconds, label: 'Sec' },
                ].map(unit => (
                  <div key={unit.label} className="text-center">
                    <div className="w-20 h-20 rounded-2xl bg-secondary border border-border flex items-center justify-center mb-2">
                      <span className="text-foreground font-display text-4xl">
                        {String(unit.value).padStart(2, '0')}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-[10px] uppercase tracking-[1px] font-body">
                      {unit.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className="text-primary font-display text-3xl">$149.99</p>
                <p className="text-muted-foreground text-[10px] uppercase tracking-[2px] font-body mt-1">
                  Retail Price
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingDropSection;
