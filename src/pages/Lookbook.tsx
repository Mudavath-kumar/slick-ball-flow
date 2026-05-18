import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { X, ArrowRight, Camera } from 'lucide-react';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import BackToTop from '@/components/BackToTop';
import PageTransition from '@/components/PageTransition';
import ball1 from '@/assets/ball-tf1000.png';
import ball2 from '@/assets/ball-precision.png';
import ball3 from '@/assets/ball-street.png';
import ball4 from '@/assets/ball-neverflat.png';
import ball5 from '@/assets/ball-marble.png';
import ball6 from '@/assets/ball-zio.png';
import court from '@/assets/basketball.jpg';
import texture from '@/assets/basketball-texture.jpg';

type Shot = {
  id: string;
  title: string;
  meta: string;
  img: string;
  span: string; // grid span classes
  gradient: string;
  tag: string;
};

const shots: Shot[] = [
  { id: 's1', title: 'Court Light // 4PM', meta: 'Brooklyn, NY', img: court, span: 'md:col-span-2 md:row-span-2', gradient: 'from-orange-500/40 to-transparent', tag: 'Editorial' },
  { id: 's2', title: 'TF-1000 Legacy', meta: 'Studio · ZK Micro', img: ball1, span: '', gradient: 'from-amber-600/30 to-transparent', tag: 'Product' },
  { id: 's3', title: 'Precision Cut', meta: 'Macro · Pebble', img: texture, span: '', gradient: 'from-rose-500/30 to-transparent', tag: 'Macro' },
  { id: 's4', title: 'Street Phantom', meta: 'Outdoor Run', img: ball3, span: 'md:row-span-2', gradient: 'from-zinc-500/30 to-transparent', tag: 'Lifestyle' },
  { id: 's5', title: 'NeverFlat Max', meta: 'Pressure Lab', img: ball4, span: '', gradient: 'from-emerald-500/30 to-transparent', tag: 'Product' },
  { id: 's6', title: 'Marble Series', meta: 'Limited Drop', img: ball5, span: 'md:col-span-2', gradient: 'from-sky-500/30 to-transparent', tag: 'Limited' },
  { id: 's7', title: 'ZI/O Excel', meta: 'All-Court', img: ball6, span: '', gradient: 'from-violet-500/30 to-transparent', tag: 'Product' },
  { id: 's8', title: 'Precision Spin', meta: 'High-speed · 1/4000', img: ball2, span: '', gradient: 'from-orange-500/30 to-transparent', tag: 'Action' },
];

const tags = ['All', 'Editorial', 'Product', 'Lifestyle', 'Macro', 'Limited', 'Action'];

const Lookbook = () => {
  const [filter, setFilter] = useState('All');
  const [active, setActive] = useState<Shot | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' });
    }
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const tiles = gridRef.current.querySelectorAll('[data-tile]');
    gsap.fromTo(tiles, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: 'power2.out' });
  }, [filter]);

  const visible = filter === 'All' ? shots : shots.filter(s => s.tag === filter);

  return (
    <PageTransition>
      <div className="relative bg-background min-h-screen">
        <div className="noise-overlay" />
        <CustomCursor />
        <Navigation />

        <div className="pt-40 pb-24 px-8 lg:px-16 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <Camera size={14} className="text-primary" />
            <span className="text-primary text-[10px] uppercase tracking-[4px] font-body font-semibold">Lookbook · FW26</span>
          </div>
          <h1 ref={titleRef} className="font-display text-foreground text-7xl lg:text-9xl leading-[0.9]">
            SHOT<br /><span className="italic text-primary">CHARTS</span>
          </h1>
          <p className="text-muted-foreground text-sm font-body mt-6 max-w-md">
            An editorial slice of every ball in the line — light, leather, and the courts where they live.
          </p>

          <div className="flex gap-2 flex-wrap mt-10 mb-10">
            {tags.map(t => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-[2px] font-body font-semibold transition-all ${
                  filter === t ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >{t}</button>
            ))}
          </div>

          <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4">
            {visible.map(s => (
              <button
                key={s.id}
                data-tile
                onClick={() => setActive(s)}
                className={`group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/40 transition-all ${s.span}`}
              >
                <img src={s.img} alt={s.title} loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" />
                <div className={`absolute inset-0 bg-gradient-to-t ${s.gradient}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute top-3 left-3 text-[9px] uppercase tracking-[2px] font-body font-semibold px-2 py-1 rounded-full bg-background/40 backdrop-blur text-foreground">{s.tag}</div>
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <p className="text-white font-display text-lg leading-tight">{s.title}</p>
                  <p className="text-white/60 text-[10px] font-body">{s.meta}</p>
                </div>
              </button>
            ))}
          </div>

          <Link to="/products" className="mt-16 inline-flex items-center gap-2 text-primary text-sm font-body font-semibold hover:gap-3 transition-all">
            Shop the line <ArrowRight size={16} />
          </Link>
        </div>

        {/* Lightbox */}
        {active && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 animate-fade-in" onClick={() => setActive(null)}>
            <div className="absolute inset-0 bg-background/90 backdrop-blur-lg" />
            <button onClick={() => setActive(null)} className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-card border border-border text-foreground flex items-center justify-center hover:border-primary">
              <X size={18} />
            </button>
            <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
              <div className="relative rounded-2xl overflow-hidden border border-border bg-card animate-scale-in">
                <img src={active.img} alt={active.title} className="w-full h-[60vh] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-primary text-[10px] uppercase tracking-[3px] font-body font-semibold mb-1">{active.tag}</p>
                  <p className="text-white font-display text-4xl">{active.title}</p>
                  <p className="text-white/60 text-sm font-body mt-1">{active.meta}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <BackToTop />
      </div>
    </PageTransition>
  );
};

export default Lookbook;
