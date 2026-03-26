import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import { products, type Product } from '@/data/products';

const categories = [
  { key: 'all', label: 'All' },
  { key: 'indoor', label: 'Indoor' },
  { key: 'outdoor', label: 'Outdoor' },
  { key: 'all-court', label: 'All-Court' },
  { key: 'limited', label: 'Limited' },
];

const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, delay: index * 0.1, ease: 'power3.out' }
    );
  }, [index]);

  return (
    <Link to={`/products/${product.id}`}>
      <div
        ref={cardRef}
        className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-500"
      >
        {product.badge && (
          <span className={`absolute top-4 left-4 z-10 text-[10px] uppercase tracking-[2px] font-body font-semibold px-3 py-1 rounded-full ${
            product.badge === 'SALE' ? 'bg-destructive text-destructive-foreground' :
            product.badge === 'NEW' ? 'bg-primary text-primary-foreground' :
            'bg-secondary text-foreground'
          }`}>
            {product.badge}
          </span>
        )}

        {/* Product visual */}
        <div className="relative h-64 flex items-center justify-center bg-secondary/30 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={512}
            height={512}
            className="w-44 h-44 object-contain group-hover:scale-110 group-hover:rotate-6 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
        </div>

        {/* Info */}
        <div className="p-6">
          <p className="text-primary text-[10px] uppercase tracking-[2px] font-body font-semibold mb-1">
            {product.subtitle}
          </p>
          <h3 className="font-display text-foreground text-2xl mb-3">{product.name}</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-primary text-xl font-display">${product.price}</span>
              {product.originalPrice && (
                <span className="text-muted-foreground text-sm line-through font-body">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <div className="flex gap-1.5">
              {product.colors.map((c, i) => (
                <div key={i} className="w-3 h-3 rounded-full border border-border" style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </Link>
  );
};

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const titleRef = useRef<HTMLDivElement>(null);

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
    }
  }, []);

  return (
    <div className="relative bg-background min-h-screen">
      <div className="noise-overlay" />
      <CustomCursor />
      <Navigation />

      <div className="pt-32 pb-24 px-8 lg:px-16 max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="mb-16">
          <span className="text-primary text-[10px] uppercase tracking-[4px] font-body font-semibold">
            Collection
          </span>
          <h1 className="font-display text-foreground text-7xl lg:text-9xl leading-none mt-2">
            PRODUCTS
          </h1>
          <p className="text-muted-foreground text-sm font-body mt-4 max-w-md">
            Engineered for every level of play. From pro-grade indoor balls to street-tough outdoor performers.
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-12 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2 rounded-full text-xs uppercase tracking-[2px] font-body font-medium transition-all duration-300 magnetic-btn ${
                activeCategory === cat.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
