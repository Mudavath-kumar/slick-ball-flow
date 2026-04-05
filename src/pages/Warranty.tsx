import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import BackToTop from '@/components/BackToTop';
import { Shield, CheckCircle, Clock, ArrowRight, ChevronDown, Package, RefreshCw, AlertTriangle, Truck } from 'lucide-react';

const warrantyTiers = [
  {
    name: 'Standard',
    duration: '1 Year',
    price: 'Included',
    features: ['Manufacturing defects', 'Bladder failure', 'Seam separation', 'Email support'],
    highlight: false,
  },
  {
    name: 'Pro Shield',
    duration: '3 Years',
    price: '$9.99',
    features: ['Everything in Standard', 'Surface wear coverage', 'Free replacement ball', 'Priority support', 'Grip restoration kit'],
    highlight: true,
  },
  {
    name: 'Lifetime',
    duration: 'Forever',
    price: '$24.99',
    features: ['Everything in Pro Shield', 'Unlimited replacements', 'Any damage covered', 'VIP hotline', 'Annual free ball', 'Early access to drops'],
    highlight: false,
  },
];

const faqs = [
  { q: 'What does the warranty cover?', a: 'Our standard warranty covers manufacturing defects including bladder leaks, seam separation, cover delamination, and shape deformation under normal use conditions.' },
  { q: 'How do I file a warranty claim?', a: 'Email warranty@slamdunk.com with your order number, photos of the defect, and a brief description. We respond within 24 hours on business days.' },
  { q: 'What isn\'t covered?', a: 'Normal wear and tear, intentional damage, use on inappropriate surfaces (e.g., indoor balls on concrete), and cosmetic changes like fading are not covered under standard warranty.' },
  { q: 'How long does replacement take?', a: 'Once your claim is approved, we ship a replacement within 2-3 business days via standard shipping. Express upgrades are available.' },
  { q: 'Can I transfer my warranty?', a: 'Yes! Warranty transfers with the ball. If you gift or sell a SlamDunk ball, the warranty follows it. Just provide the original order number.' },
  { q: 'Do custom balls have warranty?', a: 'Custom balls carry the same standard 1-year warranty. Pro Shield and Lifetime upgrades are also available at checkout.' },
];

const process = [
  { icon: AlertTriangle, title: 'Report Issue', desc: 'Submit a claim with photos via email or your account dashboard' },
  { icon: CheckCircle, title: 'Claim Review', desc: 'Our team reviews within 24 hours and approves qualifying claims' },
  { icon: Package, title: 'Ship Return', desc: 'We send a prepaid label — drop off the defective ball for free' },
  { icon: Truck, title: 'Get Replacement', desc: 'Your new ball ships in 2-3 days, brand new and game-ready' },
];

const Warranty = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current.children, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out' });
    }
  }, []);

  return (
    <div className="relative bg-background min-h-screen">
      <div className="noise-overlay" />
      <CustomCursor />
      <Navigation />

      <div ref={contentRef} className="pt-40 pb-24 px-8 lg:px-16 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
            <Shield size={28} className="text-primary" />
          </div>
          <span className="text-primary text-[10px] uppercase tracking-[4px] font-body font-semibold">
            Peace of Mind
          </span>
          <h1 className="font-display text-foreground text-7xl lg:text-9xl leading-none mt-3">
            WARRANTY
          </h1>
          <p className="text-muted-foreground text-sm font-body mt-4 max-w-lg mx-auto">
            Every SlamDunk ball is backed by our industry-leading warranty. Play with confidence.
          </p>
        </div>

        {/* Warranty Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {warrantyTiers.map(tier => (
            <div
              key={tier.name}
              className={`relative p-8 rounded-2xl border transition-all ${
                tier.highlight
                  ? 'bg-primary/5 border-primary/40 scale-[1.02]'
                  : 'bg-card border-border hover:border-primary/20'
              }`}
            >
              {tier.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] uppercase tracking-[2px] font-body font-semibold px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <h3 className="font-display text-foreground text-3xl mb-1">{tier.name}</h3>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-primary font-display text-2xl">{tier.price}</span>
                {tier.price !== 'Included' && <span className="text-muted-foreground text-xs font-body">one-time</span>}
              </div>
              <div className="flex items-center gap-1.5 mb-6">
                <Clock size={12} className="text-muted-foreground" />
                <span className="text-muted-foreground text-xs font-body">{tier.duration} coverage</span>
              </div>
              <ul className="space-y-3">
                {tier.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-foreground text-sm font-body">
                    <CheckCircle size={14} className="text-primary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full mt-8 py-3 rounded-lg font-body font-semibold text-sm tracking-wide transition-all ${
                tier.highlight
                  ? 'bg-primary text-primary-foreground hover:brightness-110'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}>
                {tier.price === 'Included' ? 'INCLUDED FREE' : 'ADD TO ORDER'}
              </button>
            </div>
          ))}
        </div>

        {/* Process */}
        <div className="mb-24">
          <h2 className="font-display text-foreground text-4xl text-center mb-12">HOW IT WORKS</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {process.map((step, i) => (
              <div key={i} className="text-center">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                    <step.icon size={22} className="text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground font-display text-sm">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-display text-foreground text-lg mb-1">{step.title}</h3>
                <p className="text-muted-foreground text-xs font-body leading-relaxed">{step.desc}</p>
                {i < process.length - 1 && (
                  <ArrowRight size={16} className="text-border mx-auto mt-4 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Guarantee Badge */}
        <div className="mb-24 p-10 rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 text-center">
          <RefreshCw size={32} className="text-primary mx-auto mb-4" />
          <h2 className="font-display text-foreground text-4xl mb-2">30-DAY MONEY BACK</h2>
          <p className="text-muted-foreground text-sm font-body max-w-lg mx-auto leading-relaxed">
            Not satisfied? Return any unused ball within 30 days for a full refund, no questions asked.
            Custom balls excluded.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="mb-16">
          <h2 className="font-display text-foreground text-4xl text-center mb-10">WARRANTY FAQ</h2>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl bg-card border border-border overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-secondary/20 transition-colors"
                >
                  <span className="text-foreground text-sm font-body font-medium pr-4">{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`text-muted-foreground flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-muted-foreground text-sm font-body leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-10 py-4 rounded-lg font-body font-semibold text-sm tracking-wide hover:brightness-110 transition-all magnetic-btn"
          >
            SHOP WITH CONFIDENCE <ArrowRight size={16} />
          </Link>
        </div>
      </div>
      <BackToTop />
    </div>
  );
};

export default Warranty;
