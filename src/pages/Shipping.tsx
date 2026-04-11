import Navigation from '@/components/Navigation';
import FooterSection from '@/components/sections/FooterSection';
import { Link } from 'react-router-dom';
import { Truck, RotateCcw, Clock, Globe, Package, ShieldCheck } from 'lucide-react';

const shippingMethods = [
  { name: 'Standard Shipping', time: '5-7 Business Days', price: 'FREE over $50', icon: Truck },
  { name: 'Express Shipping', time: '2-3 Business Days', price: '$9.99', icon: Clock },
  { name: 'Next Day', time: '1 Business Day', price: '$19.99', icon: Package },
  { name: 'International', time: '10-15 Business Days', price: 'From $14.99', icon: Globe },
];

const returnSteps = [
  { step: '01', title: 'Start Return', desc: 'Log in to your account and select the item to return from your order history.' },
  { step: '02', title: 'Get Label', desc: 'A prepaid return shipping label will be emailed to you within 24 hours.' },
  { step: '03', title: 'Ship It Back', desc: 'Pack the item in its original packaging and drop it off at any carrier location.' },
  { step: '04', title: 'Get Refunded', desc: 'Refund processed within 3-5 business days after we receive the return.' },
];

const Shipping = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-28 pb-20 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <span className="text-primary text-[10px] uppercase tracking-[4px] font-body font-semibold">
              Delivery & Returns
            </span>
            <h1 className="font-display text-foreground text-7xl lg:text-8xl mt-2">SHIPPING</h1>
            <p className="text-muted-foreground text-sm font-body mt-4 max-w-lg mx-auto leading-relaxed">
              Fast, reliable shipping with hassle-free returns. Because getting your ball should be as smooth as your game.
            </p>
          </div>

          {/* Shipping Methods */}
          <div className="mb-20">
            <h2 className="font-display text-foreground text-4xl mb-8">SHIPPING OPTIONS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {shippingMethods.map(method => (
                <div key={method.name} className="p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-colors group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <method.icon size={20} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-foreground text-lg font-display">{method.name.toUpperCase()}</h3>
                      <p className="text-muted-foreground text-sm font-body mt-1">{method.time}</p>
                      <p className="text-primary text-sm font-body font-semibold mt-2">{method.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Free Shipping Banner */}
          <div className="mb-20 p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 text-center">
            <Truck size={40} className="text-primary mx-auto mb-4" />
            <h3 className="font-display text-foreground text-4xl mb-2">FREE SHIPPING ON $50+</h3>
            <p className="text-muted-foreground text-sm font-body">All US orders over $50 qualify for free standard shipping. No code needed.</p>
          </div>

          {/* Returns Section */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <RotateCcw size={24} className="text-primary" />
              <h2 className="font-display text-foreground text-4xl">30-DAY RETURNS</h2>
            </div>
            <p className="text-muted-foreground text-sm font-body mb-10 max-w-2xl leading-relaxed">
              Not the right fit? No problem. We accept returns within 30 days of delivery for unused items in their original packaging. Custom basketballs are made to order and are final sale.
            </p>

            {/* Return Steps */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {returnSteps.map(step => (
                <div key={step.step} className="relative">
                  <span className="text-primary/20 font-display text-7xl">{step.step}</span>
                  <h4 className="font-display text-foreground text-xl mt-2">{step.title.toUpperCase()}</h4>
                  <p className="text-muted-foreground text-xs font-body mt-2 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Policy Details */}
          <div className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-card border border-border">
              <ShieldCheck size={20} className="text-primary mb-3" />
              <h4 className="font-display text-foreground text-xl mb-2">DAMAGE PROTECTION</h4>
              <p className="text-muted-foreground text-xs font-body leading-relaxed">
                If your order arrives damaged, contact us within 48 hours with photos. We'll replace it free of charge or issue a full refund — your choice.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border">
              <Package size={20} className="text-primary mb-3" />
              <h4 className="font-display text-foreground text-xl mb-2">ORDER TRACKING</h4>
              <p className="text-muted-foreground text-xs font-body leading-relaxed">
                Every order includes real-time tracking. You'll receive an email with your tracking number as soon as your order ships. Track anytime from your Account.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-muted-foreground text-sm font-body mb-4">Have questions about your order?</p>
            <Link
              to="/contact"
              className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-body font-semibold text-sm tracking-wide hover:brightness-110 transition-all"
            >
              CONTACT SUPPORT
            </Link>
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default Shipping;
