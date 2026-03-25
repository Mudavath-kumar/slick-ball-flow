import { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Instagram, Twitter, Youtube } from 'lucide-react';
import gsap from 'gsap';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current.children, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out' });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="relative bg-background min-h-screen">
      <div className="noise-overlay" />
      <CustomCursor />
      <Navigation />

      <div ref={contentRef} className="pt-32 pb-24 px-8 lg:px-16 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <span className="text-primary text-[10px] uppercase tracking-[4px] font-body font-semibold">
            Get In Touch
          </span>
          <h1 className="font-display text-foreground text-7xl lg:text-9xl leading-none mt-2">
            CONTACT
          </h1>
          <p className="text-muted-foreground text-sm font-body mt-4 max-w-md">
            Have questions about our products? Need custom orders for your team? We're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left - Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-foreground text-xs uppercase tracking-[2px] font-body font-medium mb-2 block">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full bg-secondary border border-border rounded-lg px-4 py-3.5 text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-foreground text-xs uppercase tracking-[2px] font-body font-medium mb-2 block">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full bg-secondary border border-border rounded-lg px-4 py-3.5 text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="you@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-foreground text-xs uppercase tracking-[2px] font-body font-medium mb-2 block">Subject</label>
                <select
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3.5 text-foreground text-sm font-body focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="">Select a topic</option>
                  <option value="order">Order Inquiry</option>
                  <option value="custom">Custom Order</option>
                  <option value="team">Team/Bulk Orders</option>
                  <option value="support">Product Support</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-foreground text-xs uppercase tracking-[2px] font-body font-medium mb-2 block">Message</label>
                <textarea
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3.5 text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Tell us how we can help..."
                />
              </div>

              <button
                type="submit"
                className={`w-full py-4 rounded-lg font-body font-semibold text-sm tracking-wide transition-all magnetic-btn flex items-center justify-center gap-2 ${
                  sent
                    ? 'bg-green-600 text-white'
                    : 'bg-primary text-primary-foreground hover:brightness-110'
                }`}
              >
                {sent ? (
                  '✓ MESSAGE SENT'
                ) : (
                  <>
                    <Send size={16} /> SEND MESSAGE
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right - Info */}
          <div className="space-y-10">
            {/* Contact info */}
            <div className="space-y-6">
              {[
                { icon: MapPin, label: 'Headquarters', value: '6120 W Donovan Dr, Phoenix, AZ 85043' },
                { icon: Phone, label: 'Phone', value: '+1 (800) 772-5346' },
                { icon: Mail, label: 'Email', value: 'info@slamdunk.com' },
                { icon: Clock, label: 'Hours', value: 'Mon - Fri: 9AM - 6PM EST' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center flex-shrink-0">
                    <item.icon size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-[10px] uppercase tracking-[2px] font-body font-semibold">{item.label}</p>
                    <p className="text-foreground text-sm font-body mt-0.5">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="relative rounded-2xl border border-border overflow-hidden h-56 bg-card">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={32} className="text-primary mx-auto mb-2" />
                  <p className="text-muted-foreground text-xs font-body">Phoenix, Arizona</p>
                </div>
              </div>
              {/* Grid lines for map feel */}
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `
                    linear-gradient(hsl(var(--border)) 1px, transparent 1px),
                    linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
                  `,
                  backgroundSize: '30px 30px',
                }}
              />
            </div>

            {/* Social */}
            <div>
              <p className="text-foreground text-xs uppercase tracking-[2px] font-body font-medium mb-4">Follow Us</p>
              <div className="flex gap-4">
                {[
                  { icon: Instagram, label: 'Instagram' },
                  { icon: Twitter, label: 'X / Twitter' },
                  { icon: Youtube, label: 'YouTube' },
                ].map((social, i) => (
                  <button
                    key={i}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-secondary text-muted-foreground text-sm font-body hover:text-primary hover:bg-primary/5 transition-all"
                  >
                    <social.icon size={16} />
                    {social.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <h2 className="font-display text-foreground text-4xl mb-8">FAQ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { q: 'How long does shipping take?', a: 'Standard shipping takes 5-7 business days. Express shipping is available for 2-3 day delivery.' },
              { q: 'Can I customize team orders?', a: 'Yes! We offer bulk team orders with custom logos, colors, and player names. Minimum order of 12 balls.' },
              { q: 'What is your return policy?', a: 'We offer a 30-day return policy on unused items in original packaging. Custom orders are final sale.' },
              { q: 'Do you ship internationally?', a: 'Yes, we ship to over 50 countries worldwide. International shipping rates are calculated at checkout.' },
            ].map((faq, i) => (
              <div key={i} className="bg-card rounded-xl border border-border p-6">
                <h3 className="text-foreground text-sm font-body font-semibold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground text-xs font-body leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
