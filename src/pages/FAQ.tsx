import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import FooterSection from '@/components/sections/FooterSection';
import { ChevronDown, Search, MessageCircle } from 'lucide-react';

const faqCategories = [
  {
    name: 'Orders & Shipping',
    questions: [
      { q: 'How long does shipping take?', a: 'Standard shipping takes 5-7 business days within the US. Express shipping (2-3 days) is available for an additional $9.99. Free standard shipping on all orders over $50.' },
      { q: 'Do you ship internationally?', a: 'Yes! We ship to over 40 countries. International orders typically arrive in 10-15 business days. Customs duties may apply depending on your country.' },
      { q: 'Can I track my order?', a: 'Absolutely. Once your order ships, you\'ll receive an email with a tracking number. You can also track it from your Account page under "Order History".' },
      { q: 'What if my order arrives damaged?', a: 'We\'re sorry to hear that! Contact us within 48 hours of delivery with photos of the damage. We\'ll send a replacement at no cost or issue a full refund.' },
    ],
  },
  {
    name: 'Returns & Exchanges',
    questions: [
      { q: 'What is your return policy?', a: 'We accept returns within 30 days of delivery for unused items in original packaging. Custom basketballs are final sale and cannot be returned.' },
      { q: 'How do I start a return?', a: 'Log in to your account, go to Order History, and click "Return Item." You\'ll receive a prepaid shipping label via email within 24 hours.' },
      { q: 'How long do refunds take?', a: 'Once we receive your return, refunds are processed within 3-5 business days. It may take an additional 2-3 days for the refund to appear on your statement.' },
      { q: 'Can I exchange for a different size?', a: 'Yes! Start a return and place a new order for the correct size. We recommend using our Size Finder tool to ensure the perfect fit.' },
    ],
  },
  {
    name: 'Products',
    questions: [
      { q: 'What\'s the difference between indoor and outdoor balls?', a: 'Indoor balls use softer composite leather or genuine leather for gym floors. Outdoor balls use durable rubber compounds that withstand rough surfaces like concrete and asphalt.' },
      { q: 'How do I choose the right size?', a: 'Size 7 (29.5") is the official men\'s size. Size 6 (28.5") is for women and youth ages 12+. Size 5 (27.5") is for youth ages 9-11. Use our Size Finder for a personalized recommendation.' },
      { q: 'How should I care for my basketball?', a: 'Wipe with a damp cloth after use. Avoid leaving in extreme heat or cold. Store inflated to proper pressure (7-9 PSI). Indoor balls should never be used on outdoor surfaces.' },
      { q: 'What does "NeverFlat" technology mean?', a: 'NeverFlat technology uses a special sealant inside the bladder that maintains air pressure up to 10x longer than standard basketballs, reducing the need for re-inflation.' },
    ],
  },
  {
    name: 'Customization',
    questions: [
      { q: 'What customization options are available?', a: 'You can customize colors, add text (name, number, message), upload logos, and choose from different materials. Visit our Customize page to design your ball.' },
      { q: 'How long does a custom order take?', a: 'Custom basketballs take 2-3 weeks to produce plus shipping time. Rush production (1 week) is available for an additional fee.' },
      { q: 'Can I order custom balls in bulk for my team?', a: 'Yes! We offer team discounts for orders of 10+ balls. Contact us for a custom quote with your team logo, colors, and player names.' },
      { q: 'Are custom balls returnable?', a: 'Custom basketballs are made to order and are final sale. We do offer replacements if there\'s a manufacturing defect.' },
    ],
  },
  {
    name: 'Warranty',
    questions: [
      { q: 'What does the warranty cover?', a: 'Our standard warranty covers manufacturing defects including seam separation, bladder failure, and cover peeling for 1 year from purchase. See our Warranty page for full details.' },
      { q: 'How do I file a warranty claim?', a: 'Visit our Warranty page and fill out the claim form with your order number and photos of the defect. Claims are typically reviewed within 5 business days.' },
      { q: 'Does the warranty cover normal wear?', a: 'No, the warranty covers manufacturing defects only. Normal wear from use, including surface wear on outdoor courts, is not covered.' },
    ],
  },
];

const FAQ = () => {
  const [search, setSearch] = useState('');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (key: string) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const filtered = faqCategories
    .map(cat => ({
      ...cat,
      questions: cat.questions.filter(
        q =>
          q.q.toLowerCase().includes(search.toLowerCase()) ||
          q.a.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter(cat => cat.questions.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-28 pb-20 px-6 lg:px-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-primary text-[10px] uppercase tracking-[4px] font-body font-semibold">
              Help Center
            </span>
            <h1 className="font-display text-foreground text-7xl lg:text-8xl mt-2">FAQ</h1>
            <p className="text-muted-foreground text-sm font-body mt-4 max-w-lg mx-auto leading-relaxed">
              Find answers to the most common questions about our products, orders, and services.
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-12">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-card border border-border text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Categories */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-6xl mb-4">🏀</p>
              <p className="text-foreground font-display text-2xl">No results found</p>
              <p className="text-muted-foreground text-sm font-body mt-2">Try a different search term</p>
            </div>
          ) : (
            <div className="space-y-10">
              {filtered.map(cat => (
                <div key={cat.name}>
                  <h2 className="font-display text-foreground text-3xl mb-4">{cat.name.toUpperCase()}</h2>
                  <div className="space-y-2">
                    {cat.questions.map((item, i) => {
                      const key = `${cat.name}-${i}`;
                      const isOpen = openItems.has(key);
                      return (
                        <div key={key} className="border border-border rounded-xl overflow-hidden bg-card/50">
                          <button
                            onClick={() => toggleItem(key)}
                            className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-secondary/50 transition-colors"
                          >
                            <span className="text-foreground text-sm font-body font-medium pr-4">{item.q}</span>
                            <ChevronDown
                              size={18}
                              className={`text-muted-foreground flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                            />
                          </button>
                          {isOpen && (
                            <div className="px-6 pb-4">
                              <p className="text-muted-foreground text-sm font-body leading-relaxed">{item.a}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Contact CTA */}
          <div className="mt-16 p-8 rounded-2xl bg-card border border-border text-center">
            <MessageCircle size={32} className="text-primary mx-auto mb-4" />
            <h3 className="font-display text-foreground text-3xl mb-2">STILL HAVE QUESTIONS?</h3>
            <p className="text-muted-foreground text-sm font-body mb-6">
              Our support team is here to help. Reach out anytime.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-body font-semibold text-sm tracking-wide hover:brightness-110 transition-all"
            >
              CONTACT US
            </Link>
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default FAQ;
