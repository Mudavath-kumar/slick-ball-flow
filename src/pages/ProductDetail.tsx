import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, ShoppingCart, Heart, Share2, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import { products } from '@/data/products';

const sizes = ['27.5"', '28.5"', '29.5"'];

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState('29.5"');
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('features');
  const contentRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
      );
    }
  }, [id]);

  // Subtle float animation on hero image
  useEffect(() => {
    if (imgRef.current) {
      gsap.to(imgRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }
  }, [id]);

  if (!product) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-foreground text-5xl mb-4">PRODUCT NOT FOUND</h1>
          <Link to="/products" className="text-primary font-body text-sm hover:underline">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-background min-h-screen">
      <div className="noise-overlay" />
      <CustomCursor />
      <Navigation />

      <div className="pt-28 pb-24 px-8 lg:px-16 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-muted-foreground text-sm font-body hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Back to Products
        </Link>

        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left - Product Visual */}
          <div>
            <div className="relative bg-card rounded-3xl border border-border overflow-hidden aspect-square flex items-center justify-center">
              {product.badge && (
                <span className={`absolute top-6 left-6 z-10 text-[10px] uppercase tracking-[2px] font-body font-semibold px-3 py-1 rounded-full ${
                  product.badge === 'SALE' ? 'bg-destructive text-destructive-foreground' :
                  product.badge === 'NEW' ? 'bg-primary text-primary-foreground' :
                  'bg-secondary text-foreground'
                }`}>
                  {product.badge}
                </span>
              )}
              <img
                ref={imgRef}
                src={product.image}
                alt={product.name}
                width={512}
                height={512}
                className="w-72 h-72 lg:w-96 lg:h-96 object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent pointer-events-none" />
              {/* Glow */}
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-56 h-20 bg-primary/10 rounded-full blur-3xl" />
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="flex flex-col justify-center">
            <div>
              <span className="text-primary text-[10px] uppercase tracking-[3px] font-body font-semibold">
                {product.subtitle}
              </span>
              <h1 className="font-display text-foreground text-6xl lg:text-7xl leading-none mt-2 mb-4">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-primary text-4xl font-display">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-muted-foreground text-lg line-through font-body">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground text-sm font-body leading-relaxed mb-8 max-w-md">
                {product.description}
              </p>
            </div>

            {/* Color selector */}
            <div className="mb-6">
              <p className="text-foreground text-xs uppercase tracking-[2px] font-body font-medium mb-3">Color</p>
              <div className="flex gap-3">
                {product.colors.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === i ? 'border-primary scale-110' : 'border-border'
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* Size selector */}
            <div className="mb-8">
              <p className="text-foreground text-xs uppercase tracking-[2px] font-body font-medium mb-3">Size</p>
              <div className="flex gap-3">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2.5 rounded-lg text-sm font-body font-medium transition-all duration-300 ${
                      selectedSize === size
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + CTA */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-0 bg-secondary rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center text-foreground font-body font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button className="flex-1 bg-primary text-primary-foreground py-4 rounded-lg font-body font-semibold text-sm tracking-wide hover:brightness-110 transition-all magnetic-btn flex items-center justify-center gap-2">
                <ShoppingCart size={18} />
                ADD TO CART — ${(product.price * quantity).toFixed(2)}
              </button>

              <button className="p-3 border border-border rounded-lg text-muted-foreground hover:text-primary hover:border-primary transition-all">
                <Heart size={18} />
              </button>
              <button className="p-3 border border-border rounded-lg text-muted-foreground hover:text-primary hover:border-primary transition-all">
                <Share2 size={18} />
              </button>
            </div>

            {/* Accordion details */}
            <div className="border-t border-border">
              {[
                { key: 'features', title: 'Features', content: product.features.join(' • ') },
                { key: 'specs', title: 'Specifications', content: `Weight: ${product.specs.weight} | Circumference: ${product.specs.circumference} | Material: ${product.specs.material} | Construction: ${product.specs.construction}` },
                { key: 'shipping', title: 'Shipping & Returns', content: 'Free standard shipping on orders over $50. 30-day return policy. Items must be unused and in original packaging.' },
              ].map(section => (
                <div key={section.key} className="border-b border-border">
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === section.key ? null : section.key)}
                    className="w-full flex items-center justify-between py-4 text-foreground text-sm font-body font-medium"
                  >
                    {section.title}
                    <ChevronDown
                      size={16}
                      className={`text-muted-foreground transition-transform duration-300 ${
                        activeAccordion === section.key ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {activeAccordion === section.key && (
                    <p className="text-muted-foreground text-xs font-body leading-relaxed pb-4">
                      {section.content}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-24">
          <h2 className="font-display text-foreground text-4xl mb-8">YOU MAY ALSO LIKE</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.filter(p => p.id !== product.id).slice(0, 3).map(p => (
              <Link key={p.id} to={`/products/${p.id}`} className="group">
                <div className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-500">
                  <div className="h-48 flex items-center justify-center bg-secondary/30">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      width={512}
                      height={512}
                      className="w-32 h-32 object-contain group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-primary text-[9px] uppercase tracking-[2px] font-body font-semibold">{p.subtitle}</p>
                    <h3 className="font-display text-foreground text-xl">{p.name}</h3>
                    <span className="text-primary font-display text-lg">${p.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
