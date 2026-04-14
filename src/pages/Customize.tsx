import { useState, useEffect, useRef } from 'react';
import { RotateCw, Download, Share2, Check } from 'lucide-react';
import gsap from 'gsap';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import BackToTop from '@/components/BackToTop';
import { useCart } from '@/contexts/CartContext';

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

const RealisticBall = ({ color, engravingText, showEngraving, rotation }: { color: string; engravingText: string; showEngraving: boolean; rotation: number }) => {
  // Derive highlight/shadow colors from the base
  const darken = (hex: string, amt: number) => {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.max(0, (num >> 16) - amt);
    const g = Math.max(0, ((num >> 8) & 0x00FF) - amt);
    const b = Math.max(0, (num & 0x0000FF) - amt);
    return `rgb(${r},${g},${b})`;
  };
  const lighten = (hex: string, amt: number) => {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.min(255, (num >> 16) + amt);
    const g = Math.min(255, ((num >> 8) & 0x00FF) + amt);
    const b = Math.min(255, (num & 0x0000FF) + amt);
    return `rgb(${r},${g},${b})`;
  };

  return (
    <div className="relative w-72 h-72 lg:w-[400px] lg:h-[400px]" style={{ transform: `rotate(${rotation}deg)` }}>
      <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl">
        <defs>
          {/* Main sphere gradient */}
          <radialGradient id="ballGrad" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor={lighten(color, 80)} />
            <stop offset="25%" stopColor={lighten(color, 30)} />
            <stop offset="55%" stopColor={color} />
            <stop offset="85%" stopColor={darken(color, 60)} />
            <stop offset="100%" stopColor={darken(color, 100)} />
          </radialGradient>
          {/* Specular highlight */}
          <radialGradient id="specular" cx="32%" cy="25%" r="25%">
            <stop offset="0%" stopColor="white" stopOpacity="0.6" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          {/* Ambient light */}
          <radialGradient id="rimLight" cx="75%" cy="70%" r="50%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="70%" stopColor="transparent" />
            <stop offset="100%" stopColor={lighten(color, 20)} stopOpacity="0.3" />
          </radialGradient>
          {/* Pebble texture */}
          <filter id="pebble">
            <feTurbulence type="turbulence" baseFrequency="0.8" numOctaves="4" seed="5" result="noise" />
            <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
            <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" />
          </filter>
          {/* Shadow */}
          <radialGradient id="shadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="black" stopOpacity="0.4" />
            <stop offset="100%" stopColor="black" stopOpacity="0" />
          </radialGradient>
          <clipPath id="ballClip"><circle cx="200" cy="200" r="170" /></clipPath>
        </defs>

        {/* Drop shadow */}
        <ellipse cx="200" cy="380" rx="120" ry="15" fill="url(#shadow)" />

        {/* Main ball */}
        <circle cx="200" cy="200" r="170" fill="url(#ballGrad)" filter="url(#pebble)" />

        {/* Seam lines - realistic curved */}
        <g clipPath="url(#ballClip)" strokeLinecap="round">
          {/* Horizontal seam */}
          <path d="M 30 200 Q 100 180, 200 195 Q 300 210, 370 200" fill="none" stroke={darken(color, 80)} strokeWidth="2.5" opacity="0.7" />
          {/* Vertical seam */}
          <path d="M 200 30 Q 180 100, 195 200 Q 210 300, 200 370" fill="none" stroke={darken(color, 80)} strokeWidth="2.5" opacity="0.7" />
          {/* Channel grooves - thicker dark lines alongside seams */}
          <path d="M 30 200 Q 100 180, 200 195 Q 300 210, 370 200" fill="none" stroke={darken(color, 50)} strokeWidth="5" opacity="0.15" />
          <path d="M 200 30 Q 180 100, 195 200 Q 210 300, 200 370" fill="none" stroke={darken(color, 50)} strokeWidth="5" opacity="0.15" />
          {/* Secondary curved seam */}
          <path d="M 80 80 Q 150 150, 200 200 Q 250 250, 320 320" fill="none" stroke={darken(color, 80)} strokeWidth="2" opacity="0.5" />
          <path d="M 320 80 Q 250 150, 200 200 Q 150 250, 80 320" fill="none" stroke={darken(color, 80)} strokeWidth="2" opacity="0.5" />
        </g>

        {/* Specular highlight */}
        <circle cx="200" cy="200" r="170" fill="url(#specular)" />
        {/* Rim light */}
        <circle cx="200" cy="200" r="170" fill="url(#rimLight)" />

        {/* Brand text */}
        <text x="200" y="170" textAnchor="middle" fontFamily="'Bebas Neue', sans-serif" fontSize="28" fill={lighten(color, 100)} opacity="0.25" letterSpacing="6">SLAM DUNK</text>

        {/* Engraving */}
        {showEngraving && engravingText && (
          <text x="200" y="230" textAnchor="middle" fontFamily="'Bebas Neue', sans-serif" fontSize="22" fill={lighten(color, 120)} opacity="0.6" letterSpacing="3">{engravingText.toUpperCase()}</text>
        )}
      </svg>
    </div>
  );
};

const Customize = () => {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState(0);
  const [selectedEngraving, setSelectedEngraving] = useState(0);
  const [engravingText, setEngravingText] = useState('');
  const [selectedSize, setSelectedSize] = useState(2);
  const [added, setAdded] = useState(false);
  const [rotation, setRotation] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

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

  const handleRotate = () => setRotation(prev => prev + 45);

  const handleAddToCart = () => {
    const customProduct = {
      id: `custom-${Date.now()}`,
      name: 'CUSTOM BALL',
      subtitle: `${panelColors[selectedColor].name} · ${materials[selectedMaterial].name}`,
      price: totalPrice,
      category: 'limited' as const,
      size: sizes[selectedSize],
      image: '',
      description: `Custom basketball: ${panelColors[selectedColor].name}, ${materials[selectedMaterial].name}${engravingText ? `, Engraving: ${engravingText}` : ''}`,
      features: ['Custom Design', materials[selectedMaterial].name, panelColors[selectedColor].name],
      specs: { weight: '22 oz', circumference: sizes[selectedSize], material: materials[selectedMaterial].name, construction: 'Custom Build' },
      colors: [panelColors[selectedColor].hex],
    };
    addItem(customProduct, sizes[selectedSize]);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="relative bg-background min-h-screen">
      <div className="noise-overlay" />
      <CustomCursor />
      <Navigation />

      <div ref={contentRef} className="pt-40 pb-24 px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="text-primary text-[10px] uppercase tracking-[4px] font-body font-semibold">Build Your Own</span>
          <h1 className="font-display text-foreground text-7xl lg:text-9xl leading-none mt-2">CUSTOMIZE</h1>
          <p className="text-muted-foreground text-sm font-body mt-4 max-w-md">
            Design your dream ball from scratch. Pick colors, materials, size, and add personal engravings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left - Realistic Preview */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative">
              {/* Ambient glow behind ball */}
              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-20 scale-75"
                style={{ backgroundColor: panelColors[selectedColor].hex }}
              />
              <RealisticBall
                color={panelColors[selectedColor].hex}
                engravingText={engravingText}
                showEngraving={selectedEngraving > 0}
                rotation={rotation}
              />
            </div>

            <div className="flex items-center gap-3 mt-6">
              <p className="text-muted-foreground text-xs font-body">
                {panelColors[selectedColor].name} • {materials[selectedMaterial].name} • {sizes[selectedSize]}
              </p>
              <button onClick={handleRotate} className="text-muted-foreground hover:text-primary transition-colors">
                <RotateCw size={14} />
              </button>
            </div>

            {/* Price summary */}
            <div className="mt-6 w-full max-w-xs space-y-2">
              <div className="flex justify-between text-xs font-body">
                <span className="text-muted-foreground">Base ball</span>
                <span className="text-foreground">${basePrice.toFixed(2)}</span>
              </div>
              {materialUpcharge > 0 && (
                <div className="flex justify-between text-xs font-body">
                  <span className="text-muted-foreground">{materials[selectedMaterial].name}</span>
                  <span className="text-primary">+${materialUpcharge.toFixed(2)}</span>
                </div>
              )}
              {engravingUpcharge > 0 && (
                <div className="flex justify-between text-xs font-body">
                  <span className="text-muted-foreground">Engraving</span>
                  <span className="text-primary">+${engravingUpcharge.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-body font-semibold pt-2 border-t border-border">
                <span className="text-foreground">Total</span>
                <span className="text-primary font-display text-2xl">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Right - Options */}
          <div className="space-y-10">
            {/* Color */}
            <div>
              <h3 className="text-foreground text-xs uppercase tracking-[2px] font-body font-medium mb-4">Panel Color</h3>
              <div className="grid grid-cols-4 gap-3">
                {panelColors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 ${
                      selectedColor === i ? 'bg-secondary border border-primary/50' : 'hover:bg-secondary/50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full border-2 transition-all shadow-md ${selectedColor === i ? 'border-primary scale-110 ring-2 ring-primary/30' : 'border-border'}`} style={{ backgroundColor: color.hex }} />
                    <span className="text-[10px] text-muted-foreground font-body">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Material */}
            <div>
              <h3 className="text-foreground text-xs uppercase tracking-[2px] font-body font-medium mb-4">Material</h3>
              <div className="grid grid-cols-2 gap-3">
                {materials.map((mat, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedMaterial(i)}
                    className={`text-left p-4 rounded-xl border transition-all duration-300 ${
                      selectedMaterial === i ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground'
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
              <h3 className="text-foreground text-xs uppercase tracking-[2px] font-body font-medium mb-4">Size</h3>
              <div className="flex gap-3">
                {sizes.map((size, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedSize(i)}
                    className={`px-5 py-2.5 rounded-lg text-sm font-body font-medium transition-all duration-300 ${
                      selectedSize === i ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'
                    }`}
                  >{size}</button>
                ))}
              </div>
            </div>

            {/* Engraving */}
            <div>
              <h3 className="text-foreground text-xs uppercase tracking-[2px] font-body font-medium mb-4">Engraving (+$12)</h3>
              <div className="flex gap-3 mb-3">
                {engravings.map((eng, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedEngraving(i)}
                    className={`px-4 py-2 rounded-lg text-xs font-body font-medium transition-all duration-300 ${
                      selectedEngraving === i ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'
                    }`}
                  >{eng}</button>
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

            {/* CTA */}
            <div className="flex items-center justify-between pt-6 border-t border-border">
              <div className="flex items-center gap-3">
                <button className="p-3 border border-border rounded-lg text-muted-foreground hover:text-primary hover:border-primary transition-all"><Share2 size={18} /></button>
                <button className="p-3 border border-border rounded-lg text-muted-foreground hover:text-primary hover:border-primary transition-all"><Download size={18} /></button>
              </div>
              <button
                onClick={handleAddToCart}
                className={`px-10 py-4 rounded-lg font-body font-semibold text-sm tracking-wide transition-all magnetic-btn flex items-center gap-2 ${
                  added ? 'bg-green-600 text-white' : 'bg-primary text-primary-foreground hover:brightness-110'
                }`}
              >
                {added ? <><Check size={16} /> ADDED TO CART</> : `ADD TO CART — $${totalPrice.toFixed(2)}`}
              </button>
            </div>
          </div>
        </div>
      </div>
      <BackToTop />
    </div>
  );
};

export default Customize;
