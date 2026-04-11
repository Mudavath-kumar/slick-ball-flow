import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import videoAsset from '@/assets/basketball-showcase.mp4.asset.json';

gsap.registerPlugin(ScrollTrigger);

const VideoShowcaseSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTime = () => {
      if (video.duration) setProgress((video.currentTime / video.duration) * 100);
    };
    const onEnd = () => setIsPlaying(false);
    video.addEventListener('timeupdate', onTime);
    video.addEventListener('ended', onEnd);
    return () => {
      video.removeEventListener('timeupdate', onTime);
      video.removeEventListener('ended', onEnd);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section ref={sectionRef} className="relative w-full py-28 overflow-hidden z-20">
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

          {/* Video player */}
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-card border border-border group cursor-pointer">
            <video
              ref={videoRef}
              src={videoAsset.url}
              muted={isMuted}
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Play/pause overlay */}
            <div
              className={`absolute inset-0 flex items-center justify-center z-10 bg-background/30 transition-opacity duration-500 ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}
              onClick={togglePlay}
            >
              <button className="w-24 h-24 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_0_60px_hsl(var(--primary)/0.4)]">
                {isPlaying ? (
                  <Pause size={32} className="text-primary-foreground" fill="currentColor" />
                ) : (
                  <Play size={32} className="text-primary-foreground ml-1" fill="currentColor" />
                )}
              </button>
            </div>

            {/* Bottom info bar */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground text-sm font-body font-semibold">The Making of a Championship Ball</p>
                  <p className="text-muted-foreground text-xs font-body">Behind the Scenes</p>
                </div>
                <button onClick={(e) => { e.stopPropagation(); toggleMute(); }} className="text-muted-foreground hover:text-primary transition-colors">
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-border z-20">
              <div className="h-full bg-primary rounded-full transition-all duration-200" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Feature pills */}
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
