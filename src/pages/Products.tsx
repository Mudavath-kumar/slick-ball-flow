import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import BackToTop from '@/components/BackToTop';
import { products, type Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { Search, SlidersHorizontal, Star, ShoppingCart, Check, ArrowRight, X } from 'lucide-react';

const categories = [
  { key: 'all', label: 'All' },
  { key: 'indoor', label: 'Indoor' },
  { key: 'outdoor', label: 'Outdoor' },
  { key: 'all-court', label: 'All-Court' },
  { key: 'limited', label: 'Limited' },
];

const priceRanges = [
  { key: 'all', label: 'All Prices' },
  { key: 'under35', label: 'Under $35' },
  { key: '35to50', label: '$35 – $50' },
  { key: 'over50', label: '$50+' },
];

const getRating = (id: string) => {
  const ratings: Record<string, number> = {
    'spalding-tf-1000': 4.8, 'spalding-precision': 4.5, 'spalding-street': 4.6,
    'spalding-neverflat': 4.3, 'spalding-marble': 4.7, 'spalding-zi-o': 4.4,
  };
  return ratings[id] || 4.5;
};

const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const rating = getRating(product.id);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(cardRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: index * 0.08, ease: 'power3.out' });
  }, [index]);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Link to={`/products/${product.id}`}>
      <div ref={cardRef} className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-500">
        {product.badge && (
          <span className={`absolute top-4 left-4 z-10 text-[10px] uppercase tracking-[2px] font-body font-semibold px-3 py-1 rounded-full ${
            product.badge === 'SALE' ? 'bg-destructive text-destructive-foreground' :
            product.badge === 'NEW' ? 'bg-primary text-primary-foreground' :
            'bg-secondary text-foreground'
          }`}>{product.badge}</span>
        )}

        <div className="relative h-64 flex items-center justify-center bg-secondary/30 overflow-hidden">
          <img src={product.image} alt={product.name} loading="lazy" width={512} height={512}
            className="w-44 h-44 object-contain group-hover:scale-110 group-hover:rotate-6 transition-all duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />

          {/* Quick add */}
          <button
            onClick={handleQuickAdd}
            className={`absolute bottom-4 right-4 z-10 flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10px] uppercase tracking-[1px] font-body font-semibold transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 ${
              added ? 'bg-green-600 text-white' : 'bg-primary text-primary-foreground hover:brightness-110'
            }`}
          >
            {added ? <><Check size={12} /> ADDED</> : <><ShoppingCart size={12} /> ADD</>}
          </button>
        </div>

        <div className="p-6">
          <p className="text-primary text-[10px] uppercase tracking-[2px] font-body font-semibold mb-1">{product.subtitle}</p>
          <h3 className="font-display text-foreground text-2xl mb-2">{product.name}</h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={12} className={i < Math.floor(rating) ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'} />
            ))}
            <span className="text-muted-foreground text-xs font-body ml-1">{rating}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-primary text-xl font-display">${product.price}</span>
              {product.originalPrice && (
                <span className="text-muted-foreground text-sm line-through font-body">${product.originalPrice}</span>
              )}
            </div>
            <div className="flex gap-1.5">
              {product.colors.map((c, i) => (
                <div key={i} className="w-3 h-3 rounded-full border border-border" style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
        </div>

        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </Link>
  );
};

const sortOptions = [
  { key: 'featured', label: 'Featured' },
  { key: 'price-asc', label: 'Price: Low → High' },
  { key: 'price-desc', label: 'Price: High → Low' },
  { key: 'name', label: 'Name: A–Z' },
  { key: 'rating', label: 'Top Rated' },
];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);

  const activeFilterCount = (activeCategory !== 'all' ? 1 : 0) + (priceRange !== 'all' ? 1 : 0) + (search ? 1 : 0);

  const filtered = products.filter(p => {
    if (activeCategory !== 'all' && p.category !== activeCategory) return false;
    if (priceRange === 'under35' && p.price >= 35) return false;
    if (priceRange === '35to50' && (p.price < 35 || p.price > 50)) return false;
    if (priceRange === 'over50' && p.price <= 50) return false;
    if (search) {
      const q = search.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.includes(q);
    }
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-asc': return a.price - b.price;
      case 'price-desc': return b.price - a.price;
      case 'name': return a.name.localeCompare(b.name);
      case 'rating': return (getRating(b.id) - getRating(a.id));
      default: return 0;
    }
  });

  const clearAll = () => { setActiveCategory('all'); setPriceRange('all'); setSearch(''); setSortBy('featured'); };

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

      <div className="pt-40 pb-24 px-8 lg:px-16 max-w-7xl mx-auto">
        <div ref={titleRef} className="mb-12">
          <span className="text-primary text-[10px] uppercase tracking-[4px] font-body font-semibold">Collection</span>
          <h1 className="font-display text-foreground text-7xl lg:text-9xl leading-none mt-2">PRODUCTS</h1>
          <p className="text-muted-foreground text-sm font-body mt-4 max-w-md">
            Engineered for every level of play. From pro-grade indoor balls to street-tough outdoor performers.
          </p>
        </div>

        {/* Search + Filter bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search balls..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X size={14} />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-3 rounded-xl border border-border text-sm font-body text-muted-foreground hover:text-foreground hover:border-primary transition-all"
          >
            <SlidersHorizontal size={14} />
            Filters
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm font-body focus:outline-none focus:border-primary transition-colors"
          >
            {sortOptions.map(opt => (
              <option key={opt.key} value={opt.key}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Expandable filters */}
        {showFilters && (
          <div className="mb-8 p-6 rounded-xl bg-card border border-border animate-fade-in space-y-4">
            <div>
              <p className="text-muted-foreground text-[10px] uppercase tracking-[2px] font-body font-semibold mb-3">Category</p>
              <div className="flex gap-2 flex-wrap">
                {categories.map(cat => (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`px-4 py-2 rounded-full text-xs uppercase tracking-[1px] font-body font-medium transition-all ${
                      activeCategory === cat.key ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'
                    }`}
                  >{cat.label}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-muted-foreground text-[10px] uppercase tracking-[2px] font-body font-semibold mb-3">Price Range</p>
              <div className="flex gap-2 flex-wrap">
                {priceRanges.map(r => (
                  <button
                    key={r.key}
                    onClick={() => setPriceRange(r.key)}
                    className={`px-4 py-2 rounded-full text-xs uppercase tracking-[1px] font-body font-medium transition-all ${
                      priceRange === r.key ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'
                    }`}
                  >{r.label}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Category pills (always visible) */}
        <div className="flex gap-3 mb-10 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2 rounded-full text-xs uppercase tracking-[2px] font-body font-medium transition-all magnetic-btn ${
                activeCategory === cat.key ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
              }`}
            >{cat.label}</button>
          ))}
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-6xl mb-4">🏀</p>
            <p className="text-foreground font-display text-2xl mb-2">NO RESULTS</p>
            <p className="text-muted-foreground font-body text-sm mb-6">No basketballs match your filters.</p>
            <button onClick={clearAll} className="text-primary text-sm font-body font-medium hover:underline">
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}

        {/* Cross-sell */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/customize" className="group p-10 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all flex items-center justify-between">
            <div>
              <h3 className="font-display text-foreground text-3xl mb-1">BUILD YOUR OWN</h3>
              <p className="text-muted-foreground text-sm font-body">Design a custom ball from scratch</p>
            </div>
            <ArrowRight size={20} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </Link>
          <Link to="/community" className="group p-10 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all flex items-center justify-between">
            <div>
              <h3 className="font-display text-foreground text-3xl mb-1">JOIN THE COMMUNITY</h3>
              <p className="text-muted-foreground text-sm font-body">Find courts, connect with players</p>
            </div>
            <ArrowRight size={20} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>
      <BackToTop />
    </div>
  );
};

export default Products;
