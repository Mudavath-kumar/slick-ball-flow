import Navigation from '@/components/Navigation';
import FooterSection from '@/components/sections/FooterSection';
import { Download, ExternalLink, Mail } from 'lucide-react';

const pressFeatures = [
  { outlet: 'ESPN', title: 'How SlamDunk Redefined the Modern Basketball', date: 'March 2024', quote: '"The most innovative basketball manufacturer in the industry right now."' },
  { outlet: 'Sports Illustrated', title: 'The Science Behind the Perfect Bounce', date: 'February 2024', quote: '"127 years of craftsmanship meets cutting-edge material science."' },
  { outlet: 'Forbes', title: 'SlamDunk\'s D2C Strategy Is Changing the Game', date: 'January 2024', quote: '"A masterclass in direct-to-consumer sports retail."' },
  { outlet: 'Bleacher Report', title: 'Why Pro Players Choose SlamDunk', date: 'December 2023', quote: '"9 out of 10 surveyed athletes preferred the feel and control of SlamDunk balls."' },
  { outlet: 'TechCrunch', title: 'SlamDunk Launches AI-Powered Size Finder', date: 'November 2023', quote: '"Blending sports heritage with modern tech for the perfect customer experience."' },
  { outlet: 'Hypebeast', title: 'Limited Edition Marble Series Sells Out in 3 Hours', date: 'October 2023', quote: '"SlamDunk has achieved streetwear-level hype in the sports equipment space."' },
];

const stats = [
  { value: '127+', label: 'Years of Heritage' },
  { value: '50M+', label: 'Balls Sold Globally' },
  { value: '40+', label: 'Countries' },
  { value: '98%', label: 'Customer Satisfaction' },
];

const Press = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-28 pb-20 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <span className="text-primary text-[10px] uppercase tracking-[4px] font-body font-semibold">
              Newsroom
            </span>
            <h1 className="font-display text-foreground text-7xl lg:text-8xl mt-2">PRESS</h1>
            <p className="text-muted-foreground text-sm font-body mt-4 max-w-lg mx-auto leading-relaxed">
              The latest news, media coverage, and brand assets.
            </p>
          </div>

          {/* Key stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {stats.map(s => (
              <div key={s.label} className="text-center p-6 rounded-2xl bg-card border border-border">
                <p className="text-primary font-display text-4xl">{s.value}</p>
                <p className="text-muted-foreground text-[10px] uppercase tracking-[2px] font-body mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Press Features */}
          <div className="mb-20">
            <h2 className="font-display text-foreground text-4xl mb-8">IN THE NEWS</h2>
            <div className="space-y-4">
              {pressFeatures.map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors group cursor-pointer">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-primary font-display text-lg">{item.outlet.toUpperCase()}</span>
                        <span className="text-muted-foreground text-xs font-body">{item.date}</span>
                      </div>
                      <h3 className="text-foreground text-base font-body font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm font-body italic">{item.quote}</p>
                    </div>
                    <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Brand Assets */}
          <div className="mb-20">
            <h2 className="font-display text-foreground text-4xl mb-8">BRAND ASSETS</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Logo Pack', 'Product Photos', 'Brand Guidelines'].map(asset => (
                <div key={asset} className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors group cursor-pointer flex items-center justify-between">
                  <div>
                    <h4 className="text-foreground font-display text-lg">{asset.toUpperCase()}</h4>
                    <p className="text-muted-foreground text-xs font-body mt-1">ZIP • Download</p>
                  </div>
                  <Download size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* Media Contact */}
          <div className="p-8 rounded-2xl bg-card border border-border text-center">
            <Mail size={32} className="text-primary mx-auto mb-4" />
            <h3 className="font-display text-foreground text-3xl mb-2">MEDIA INQUIRIES</h3>
            <p className="text-muted-foreground text-sm font-body mb-4">
              For press inquiries, interviews, or partnership opportunities:
            </p>
            <p className="text-primary text-sm font-body font-semibold">press@slamdunk.com</p>
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default Press;
