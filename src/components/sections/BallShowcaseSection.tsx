import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products } from '@/data/products';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const BallShowcaseSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!trackRef.current || !sectionRef.current) return;

      const track = trackRef.current;
      const scrollWidth = track.scrollWidth - window.innerWidth;

      // Horizontal scroll animation
      gsap.to(track, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Title parallax
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { x: 0 },
          {
            x: -200,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: () => `+=${scrollWidth}`,
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-background">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-border" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-border" />

      {/* Section header */}
      <div className="absolute top-12 left-16 z-20">
        <span className="text-primary text-[10px] uppercase tracking-[4px] font-body font-semibold">
          The Collection
        </span>
      </div>

      {/* Large background title */}
      <div
        ref={titleRef}
        className="absolute top-1/2 -translate-y-1/2 left-8 z-0 pointer-events-none select-none whitespace-nowrap"
      >
        <span
          className="font-display text-[clamp(150px,20vw,300px)] leading-none text-transparent tracking-wider"
          style={{ WebkitTextStroke: '1px hsl(var(--border))' }}
        >
          COLLECTION • COLLECTION • COLLECTION
        </span>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className="absolute top-0 left-0 h-full flex items-center gap-0 pl-16"
        style={{ willChange: 'transform' }}
      >
        {/* Intro card */}
        <div className="flex-shrink-0 w-[400px] h-full flex flex-col justify-center pr-16">
          <h2 className="font-display text-foreground text-6xl lg:text-7xl leading-none mb-6">
            EXPLORE<br />THE LINEUP
          </h2>
          <p className="text-muted-foreground text-sm font-body leading-relaxed max-w-[300px] mb-8">
            From pro-grade indoor leather to street-tough outdoor rubber — scroll through our complete range.
          </p>
          <div className="flex items-center gap-2 text-primary text-sm font-body font-medium">
            <span>Scroll to explore</span>
            <ArrowRight size={16} />
          </div>
        </div>

        {/* Product cards */}
        {products.map((product, i) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="flex-shrink-0 group"
          >
            <div className="relative w-[420px] h-[85vh] mx-4 rounded-3xl overflow-hidden border border-border bg-card hover:border-primary/40 transition-all duration-700">
              {/* Badge */}
              {product.badge && (
                <span className={`absolute top-6 left-6 z-10 text-[10px] uppercase tracking-[2px] font-body font-semibold px-3 py-1 rounded-full ${
                  product.badge === 'SALE' ? 'bg-destructive text-destructive-foreground' :
                  product.badge === 'NEW' ? 'bg-primary text-primary-foreground' :
                  'bg-secondary text-foreground'
                }`}>
                  {product.badge}
                </span>
              )}

              {/* Ball image */}
              <div className="h-[55%] flex items-center justify-center relative overflow-hidden bg-secondary/20">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  width={512}
                  height={512}
                  className="w-64 h-64 object-contain group-hover:scale-110 group-hover:rotate-12 transition-all duration-700"
                />
                {/* Glow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              {/* Info */}
              <div className="p-8 flex flex-col justify-between h-[45%]">
                <div>
                  <p className="text-primary text-[10px] uppercase tracking-[3px] font-body font-semibold mb-2">
                    {product.subtitle}
                  </p>
                  <h3 className="font-display text-foreground text-4xl mb-3">{product.name}</h3>
                  <p className="text-muted-foreground text-xs font-body leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-primary text-3xl font-display">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-muted-foreground text-sm line-through font-body">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-1.5 mt-2">
                      {product.colors.map((c, j) => (
                        <div key={j} className="w-3 h-3 rounded-full border border-border" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                  </div>

                  <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all duration-500">
                    <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary-foreground transition-colors duration-500" />
                  </div>
                </div>
              </div>

              {/* Number */}
              <span className="absolute top-6 right-6 font-display text-border text-5xl">
                0{i + 1}
              </span>
            </div>
          </Link>
        ))}

        {/* End CTA card */}
        <div className="flex-shrink-0 w-[400px] h-full flex flex-col justify-center items-center px-16">
          <h3 className="font-display text-foreground text-5xl mb-4 text-center">
            SEE ALL
          </h3>
          <Link
            to="/products"
            className="bg-primary text-primary-foreground px-10 py-4 rounded-lg font-body font-semibold text-sm tracking-wide hover:brightness-110 transition-all magnetic-btn"
          >
            VIEW COLLECTION
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BallShowcaseSection;
