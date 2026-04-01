import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Volume2, VolumeX } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const VideoShowcaseSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.video-content',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 55%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-8 lg:px-16">
        <div className="video-content">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-primary text-[10px] uppercase tracking-[4px] font-body font-semibold">
                Behind the Craft
              </span>
              <h2 className="font-display text-foreground text-6xl lg:text-7xl leading-none mt-2">
                HOW IT'S MADE
              </h2>
            </div>
            <p className="text-muted-foreground text-sm font-body max-w-sm leading-relaxed">
              From raw leather to game-ready precision — watch the 127-year legacy behind every bounce.
            </p>
          </div>

          {/* Video placeholder */}
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-card border border-border group cursor-pointer">
            {/* Gradient background simulating video thumbnail */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-secondary" />
            
            {/* Decorative basketball lines */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 rounded-full border border-primary/10" />
              <div className="absolute w-48 h-48 rounded-full border border-primary/5" />
              <div className="absolute w-[1px] h-64 bg-primary/10 rotate-45" />
              <div className="absolute w-[1px] h-64 bg-primary/10 -rotate-45" />
            </div>

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-24 h-24 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_0_60px_hsl(var(--primary)/0.4)]"
              >
                <Play size={32} className="text-primary-foreground ml-1" fill="currentColor" />
              </button>
            </div>

            {/* Bottom info bar */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground text-sm font-body font-semibold">The Making of a Championship Ball</p>
                  <p className="text-muted-foreground text-xs font-body">3:42 • Behind the Scenes</p>
                </div>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-border z-20">
              <div className="h-full w-1/3 bg-primary rounded-full" />
            </div>
          </div>

          {/* Feature pills below video */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            {['Hand-Stitched', '32 Panels', 'Quality Tested', 'ISO Certified', '72hr Curing'].map(tag => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full bg-secondary border border-border text-foreground text-xs font-body font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcaseSection;
