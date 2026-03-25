import { useState, useEffect, useRef } from 'react';
import { RotateCw, Download, Share2 } from 'lucide-react';
import gsap from 'gsap';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';

const panelColors = [
  { name: 'Classic Orange', hex: '#E8601C' },
  { name: 'Midnight Black', hex: '#1a1a1a' },
  { name: 'Storm Gray', hex: '#555555' },
  { name: 'Royal Blue', hex: '#1e3a8a' },
  { name: 'Forest Green', hex: '#166534' },
  { name: 'Cherry Red', hex: '#dc2626' },
  { name: 'Gold', hex: '#ca8a04' },
  { name: 'White', hex: '#f5f5f5' },
];

const materials = [
  { name: 'Composite Leather', desc: 'Indoor play, premium feel' },
  { name: 'Genuine Leather', desc: 'Pro-grade, official game' },
  { name: 'Rubber', desc: 'Outdoor durability' },
  { name: 'Microfiber', desc: 'All-weather performance' },
];

const engravings = ['None', 'Name', 'Number', 'Logo'];

const Customize = () => {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState(0);
  const [selectedEngraving, setSelectedEngraving] = useState(0);
  const [engravingText, setEngravingText] = useState('');
  const [selectedSize, setSelectedSize] = useState(2);
  const contentRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const sizes = ['Mini (22")', 'Youth (27.5")', 'Official (29.5")'];
  const basePrice = 59.99;
  const materialUpcharge = selectedMaterial === 1 ? 40 : selectedMaterial === 3 ? 15 : 0;
  const engravingUpcharge = selectedEngraving > 0 ? 12 : 0;
  const totalPrice = basePrice + materialUpcharge + engravingUpcharge;

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current.children, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out' });
    }
  }, []);

  useEffect(() => {
    if (previewRef.current) {
      gsap.to(previewRef.current, { scale: 0.95, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.inOut' });
    }
  }, [selectedColor, selectedMaterial]);

  return (
    <div className="relative bg-background min-h-screen">
      <div className="noise-overlay" />
      <CustomCursor />
      <Navigation />

      <div ref={contentRef} className="pt-32 pb-24 px-8 lg:px-16 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <span className="text-primary text-[10px] uppercase tracking-[4px] font-body font-semibold">
            Build Your Own
          </span>
          <h1 className="font-display text-foreground text-7xl lg:text-9xl leading-none mt-2">
            CUSTOMIZE
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left - Preview */}
          <div className="flex flex-col items-center justify-center">
            <div
              ref={previewRef}
              className="relative w-80 h-80 rounded-full flex items-center justify-center border-2 border-border"
              style={{ backgroundColor: panelColors[selectedColor].hex + '15' }}
            >
              <div
                className="w-56 h-56 rounded-full shadow-2xl flex items-center justify-center relative overflow-hidden"
                style={{ backgroundColor: panelColors[selectedColor].hex }}
              >
                {/* Seam lines */}
                <div className="absolute inset-0 rounded-full" style={{
                  background: `
                    linear-gradient(0deg, transparent 48%, rgba(0,0,0,0.2) 49%, rgba(0,0,0,0.2) 51%, transparent 52%),
                    linear-gradient(90deg, transparent 48%, rgba(0,0,0,0.2) 49%, rgba(0,0,0,0.2) 51%, transparent 52%)
                  `
                }} />
                {/* Pebble texture overlay */}
                <div className="absolute inset-0 rounded-full opacity-20" style={{
                  backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)',
                  backgroundSize: '4px 4px',
                }} />
                {engravingText && selectedEngraving > 0 && (
                  <span className="relative z-10 font-display text-white/80 text-2xl tracking-wide">
                    {engravingText}
                  </span>
                )}
              </div>
              {/* Rotating highlight ring */}
              <div className="absolute inset-0 rounded-full border border-primary/20 animate-[spin_12s_linear_infinite]" />
            </div>

            <div className="flex items-center gap-3 mt-8">
              <p className="text-muted-foreground text-xs font-body">
                {panelColors[selectedColor].name} • {materials[selectedMaterial].name} • {sizes[selectedSize]}
              </p>
              <button className="text-muted-foreground hover:text-primary transition-colors">
                <RotateCw size={14} />
              </button>
            </div>
          </div>

          {/* Right - Options */}
          <div className="space-y-10">
            {/* Color */}
            <div>
              <h3 className="text-foreground text-xs uppercase tracking-[2px] font-body font-medium mb-4">
                Panel Color
              </h3>
              <div className="grid grid-cols-4 gap-3">
                {panelColors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 ${
                      selectedColor === i ? 'bg-secondary border border-primary/50' : 'hover:bg-secondary/50'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor === i ? 'border-primary scale-110' : 'border-border'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-[10px] text-muted-foreground font-body">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Material */}
            <div>
              <h3 className="text-foreground text-xs uppercase tracking-[2px] font-body font-medium mb-4">
                Material
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {materials.map((mat, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedMaterial(i)}
                    className={`text-left p-4 rounded-xl border transition-all duration-300 ${
                      selectedMaterial === i
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-muted-foreground'
                    }`}
                  >
                    <p className="text-foreground text-sm font-body font-medium">{mat.name}</p>
                    <p className="text-muted-foreground text-[10px] font-body mt-1">{mat.desc}</p>
                    {i === 1 && <span className="text-primary text-[10px] font-body mt-1 inline-block">+$40</span>}
                    {i === 3 && <span className="text-primary text-[10px] font-body mt-1 inline-block">+$15</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <h3 className="text-foreground text-xs uppercase tracking-[2px] font-body font-medium mb-4">
                Size
              </h3>
              <div className="flex gap-3">
                {sizes.map((size, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedSize(i)}
                    className={`px-5 py-2.5 rounded-lg text-sm font-body font-medium transition-all duration-300 ${
                      selectedSize === i
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Engraving */}
            <div>
              <h3 className="text-foreground text-xs uppercase tracking-[2px] font-body font-medium mb-4">
                Engraving (+$12)
              </h3>
              <div className="flex gap-3 mb-3">
                {engravings.map((eng, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedEngraving(i)}
                    className={`px-4 py-2 rounded-lg text-xs font-body font-medium transition-all duration-300 ${
                      selectedEngraving === i
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {eng}
                  </button>
                ))}
              </div>
              {selectedEngraving > 0 && (
                <input
                  type="text"
                  value={engravingText}
                  onChange={e => setEngravingText(e.target.value.slice(0, 12))}
                  placeholder={selectedEngraving === 2 ? 'Enter number...' : 'Enter text...'}
                  maxLength={12}
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              )}
            </div>

            {/* Price + CTA */}
            <div className="flex items-center justify-between pt-6 border-t border-border">
              <div>
                <p className="text-muted-foreground text-[10px] uppercase tracking-[2px] font-body">Total</p>
                <p className="text-primary text-4xl font-display">${totalPrice.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-3 border border-border rounded-lg text-muted-foreground hover:text-primary hover:border-primary transition-all">
                  <Share2 size={18} />
                </button>
                <button className="p-3 border border-border rounded-lg text-muted-foreground hover:text-primary hover:border-primary transition-all">
                  <Download size={18} />
                </button>
                <button className="bg-primary text-primary-foreground px-10 py-4 rounded-lg font-body font-semibold text-sm tracking-wide hover:brightness-110 transition-all magnetic-btn">
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customize;
