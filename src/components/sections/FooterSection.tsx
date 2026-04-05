import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube, Mail } from 'lucide-react';
import { useState } from 'react';

const footerLinks = {
  Shop: [
    { label: 'All Products', to: '/products' },
    { label: 'Indoor Balls', to: '/products' },
    { label: 'Outdoor Balls', to: '/products' },
    { label: 'Customize', to: '/customize' },
    { label: 'Sale', to: '/products' },
  ],
  Community: [
    { label: 'Court Finder', to: '/community' },
    { label: 'Leaderboard', to: '/community' },
    { label: 'Blog', to: '/blog' },
    { label: 'Events', to: '/community' },
  ],
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Contact', to: '/contact' },
    { label: 'Careers', to: '/about' },
    { label: 'Press', to: '/about' },
  ],
  Support: [
    { label: 'FAQ', to: '/contact' },
    { label: 'Shipping', to: '/contact' },
    { label: 'Returns', to: '/contact' },
    { label: 'Warranty', to: '/warranty' },
    { label: 'Size Guide', to: '/size-finder' },
    { label: 'Compare', to: '/compare' },
  ],
};

const FooterSection = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="relative w-full bg-card border-t border-border">
      {/* Newsletter */}
      <div className="px-8 lg:px-16 py-16 border-b border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-display text-foreground text-4xl mb-2">STAY IN THE GAME</h3>
            <p className="text-muted-foreground text-sm font-body">Get drops, deals, and stories straight to your inbox.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 md:w-64 px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
            <button
              onClick={handleSubscribe}
              className={`px-6 py-3 rounded-lg font-body font-semibold text-sm tracking-wide transition-all whitespace-nowrap ${
                subscribed ? 'bg-green-600 text-white' : 'bg-primary text-primary-foreground hover:brightness-110'
              }`}
            >
              {subscribed ? '✓ DONE' : 'SUBSCRIBE'}
            </button>
          </div>
        </div>
      </div>

      {/* Link grid */}
      <div className="px-8 lg:px-16 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-display text-foreground text-lg mb-4">{category.toUpperCase()}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-muted-foreground text-sm font-body hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-8 lg:px-16 py-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-foreground flex items-center justify-center">
              <div className="text-center leading-none font-display">
                <span className="block text-[6px] tracking-wider">SLAM</span>
                <span className="block text-[6px] tracking-wider">DUNK</span>
              </div>
            </div>
            <p className="text-muted-foreground text-xs font-body">© 2024 SlamDunk Inc. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-4">
            {[
              { icon: Twitter, label: 'Twitter' },
              { icon: Instagram, label: 'Instagram' },
              { icon: Youtube, label: 'YouTube' },
              { icon: Mail, label: 'Email' },
            ].map(social => (
              <button
                key={social.label}
                aria-label={social.label}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
              >
                <social.icon size={14} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
