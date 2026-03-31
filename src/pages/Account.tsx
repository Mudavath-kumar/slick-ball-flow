import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import BackToTop from '@/components/BackToTop';
import { products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import {
  User, Package, Heart, Trophy, Settings, ShoppingBag,
  ChevronRight, Trash2, Star, Lock, Unlock, Shield, Bell,
  Mail, Sun, Eye, Edit, X, Check
} from 'lucide-react';

const tabs = [
  { key: 'profile', label: 'Profile', icon: User },
  { key: 'orders', label: 'Orders', icon: Package },
  { key: 'wishlist', label: 'Wishlist', icon: Heart },
  { key: 'rewards', label: 'Rewards', icon: Trophy },
  { key: 'settings', label: 'Settings', icon: Settings },
];

const tiers = [
  { name: 'Rookie', min: 0, color: 'bg-muted-foreground' },
  { name: 'Starter', min: 200, color: 'bg-blue-500' },
  { name: 'All-Star', min: 500, color: 'bg-primary' },
  { name: 'MVP', min: 1000, color: 'bg-yellow-500' },
  { name: 'Hall of Fame', min: 2500, color: 'bg-purple-500' },
];

const achievements = [
  { name: 'First Purchase', desc: 'Complete your first order', earned: true, icon: ShoppingBag },
  { name: 'Collector', desc: 'Own 3 different balls', earned: true, icon: Star },
  { name: 'Customizer', desc: 'Design a custom ball', earned: false, icon: Edit },
  { name: 'Reviewer', desc: 'Leave 5 product reviews', earned: false, icon: Star },
  { name: 'Social Baller', desc: 'Share a product on social media', earned: true, icon: Eye },
  { name: 'Loyalty King', desc: 'Make 10 purchases', earned: false, icon: Trophy },
  { name: 'Early Bird', desc: 'Buy a product on launch day', earned: false, icon: Star },
  { name: 'Community MVP', desc: 'Join the community forum', earned: true, icon: User },
];

const mockOrders = [
  { id: 'ORD-2847', date: '2024-03-10', status: 'Delivered', tracking: 'TRK-9482761', items: [products[0]], total: 89.99 },
  { id: 'ORD-2831', date: '2024-02-28', status: 'Shipped', tracking: 'TRK-7361925', items: [products[2], products[4]], total: 69.98 },
  { id: 'ORD-2819', date: '2024-02-15', status: 'Delivered', tracking: 'TRK-5192847', items: [products[5]], total: 49.99 },
];

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({ name: 'Alex Johnson', email: 'alex@example.com', phone: '+1 555-0123', location: 'Los Angeles, CA' });
  const [wishlist, setWishlist] = useState([products[0], products[3], products[4]]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [notifications, setNotifications] = useState({ email: true, orders: true, promos: false, darkMode: false, twoFa: false, publicProfile: true });
  const { addItem } = useCart();
  const points = 720;
  const currentTier = tiers.filter(t => t.min <= points).pop()!;
  const nextTier = tiers.find(t => t.min > points);

  return (
    <div className="relative bg-background min-h-screen">
      <div className="noise-overlay" />
      <CustomCursor />
      <Navigation />

      <div className="pt-40 pb-24 px-8 lg:px-16 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="p-6 rounded-2xl bg-card border border-border mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <User size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-foreground font-body font-semibold text-sm">{profile.name}</p>
                  <span className={`text-[10px] uppercase tracking-[2px] font-body font-semibold px-2 py-0.5 rounded-full ${currentTier.color} text-white`}>
                    {currentTier.name}
                  </span>
                </div>
              </div>
              <div className="flex gap-4 text-center">
                <div><p className="text-foreground font-display text-xl">{points}</p><p className="text-muted-foreground text-[10px] font-body">Points</p></div>
                <div><p className="text-foreground font-display text-xl">{mockOrders.length}</p><p className="text-muted-foreground text-[10px] font-body">Orders</p></div>
                <div><p className="text-foreground font-display text-xl">{wishlist.length}</p><p className="text-muted-foreground text-[10px] font-body">Saved</p></div>
              </div>
            </div>

            <nav className="space-y-1">
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-body font-medium transition-all ${
                    activeTab === tab.key ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                  <ChevronRight size={14} className="ml-auto" />
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Profile */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-foreground text-4xl">PROFILE</h2>
                  <button
                    onClick={() => setEditing(!editing)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-body text-muted-foreground hover:text-foreground hover:border-primary transition-all"
                  >
                    {editing ? <><Check size={14} /> Save</> : <><Edit size={14} /> Edit Profile</>}
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(profile).map(([key, val]) => (
                    <div key={key} className="p-4 rounded-xl bg-card border border-border">
                      <p className="text-muted-foreground text-[10px] uppercase tracking-[2px] font-body mb-1">{key}</p>
                      {editing ? (
                        <input
                          value={val}
                          onChange={e => setProfile(p => ({ ...p, [key]: e.target.value }))}
                          className="w-full bg-transparent text-foreground text-sm font-body border-b border-primary/30 focus:outline-none focus:border-primary pb-1"
                        />
                      ) : (
                        <p className="text-foreground text-sm font-body font-medium">{val}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Quick actions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
                  {[
                    { label: 'Orders', icon: Package, tab: 'orders' },
                    { label: 'Wishlist', icon: Heart, tab: 'wishlist' },
                    { label: 'Rewards', icon: Trophy, tab: 'rewards' },
                    { label: 'Settings', icon: Settings, tab: 'settings' },
                  ].map(a => (
                    <button key={a.tab} onClick={() => setActiveTab(a.tab)} className="p-4 rounded-xl bg-card border border-border hover:border-primary/40 transition-all text-center">
                      <a.icon size={20} className="text-primary mx-auto mb-2" />
                      <p className="text-foreground text-xs font-body font-medium">{a.label}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Orders */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h2 className="font-display text-foreground text-4xl mb-6">ORDERS</h2>
                {mockOrders.map(order => (
                  <div key={order.id} className="rounded-xl bg-card border border-border overflow-hidden">
                    <button
                      onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                      className="w-full flex items-center justify-between p-5 hover:bg-secondary/20 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <Package size={18} className="text-primary" />
                        <div className="text-left">
                          <p className="text-foreground font-body font-semibold text-sm">{order.id}</p>
                          <p className="text-muted-foreground text-xs font-body">{order.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`text-[10px] uppercase tracking-[1px] font-body font-semibold px-2 py-0.5 rounded-full ${
                          order.status === 'Delivered' ? 'bg-green-500/20 text-green-400' : 'bg-primary/20 text-primary'
                        }`}>{order.status}</span>
                        <span className="text-foreground font-display text-lg">${order.total.toFixed(2)}</span>
                        <ChevronRight size={16} className={`text-muted-foreground transition-transform ${expandedOrder === order.id ? 'rotate-90' : ''}`} />
                      </div>
                    </button>
                    {expandedOrder === order.id && (
                      <div className="px-5 pb-5 border-t border-border pt-4 space-y-3">
                        <p className="text-muted-foreground text-xs font-body">Tracking: <span className="text-foreground">{order.tracking}</span></p>
                        {order.items.map(item => (
                          <div key={item.id} className="flex items-center gap-3">
                            <img src={item.image} alt={item.name} className="w-12 h-12 object-contain" />
                            <div className="flex-1">
                              <p className="text-foreground text-sm font-body font-medium">{item.name}</p>
                              <p className="text-muted-foreground text-xs font-body">${item.price}</p>
                            </div>
                            <button onClick={() => addItem(item)} className="text-primary text-xs font-body font-medium hover:underline">Reorder</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Wishlist */}
            {activeTab === 'wishlist' && (
              <div>
                <h2 className="font-display text-foreground text-4xl mb-6">WISHLIST</h2>
                {wishlist.length === 0 ? (
                  <div className="text-center py-16">
                    <Heart size={48} className="text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground font-body text-sm">Your wishlist is empty</p>
                    <Link to="/products" className="text-primary text-sm font-body mt-2 inline-block hover:underline">Browse Products</Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {wishlist.map(item => (
                      <div key={item.id} className="flex gap-4 p-4 rounded-xl bg-card border border-border">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-contain" />
                        <div className="flex-1">
                          <h4 className="font-display text-foreground text-lg">{item.name}</h4>
                          <p className="text-muted-foreground text-xs font-body">{item.subtitle}</p>
                          <p className="text-primary font-display text-lg mt-1">${item.price}</p>
                          <div className="flex gap-2 mt-2">
                            <button onClick={() => addItem(item)} className="text-primary text-xs font-body font-medium hover:underline">Add to Cart</button>
                            <button onClick={() => setWishlist(w => w.filter(x => x.id !== item.id))} className="text-muted-foreground text-xs font-body hover:text-destructive transition-colors">
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Rewards */}
            {activeTab === 'rewards' && (
              <div className="space-y-8">
                <h2 className="font-display text-foreground text-4xl">REWARDS</h2>

                {/* Progress */}
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-foreground font-body font-semibold text-sm">{currentTier.name} — {points} pts</p>
                    {nextTier && <p className="text-muted-foreground text-xs font-body">{nextTier.min - points} pts to {nextTier.name}</p>}
                  </div>
                  <div className="h-3 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-yellow-500 transition-all duration-1000"
                      style={{ width: nextTier ? `${((points - currentTier.min) / (nextTier.min - currentTier.min)) * 100}%` : '100%' }}
                    />
                  </div>
                </div>

                {/* How to earn */}
                <div>
                  <h3 className="font-display text-foreground text-2xl mb-4">HOW TO EARN POINTS</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { action: 'Make a purchase', pts: '1pt per $1' },
                      { action: 'Write a review', pts: '+50 pts' },
                      { action: 'Refer a friend', pts: '+100 pts' },
                      { action: 'Share on social', pts: '+25 pts' },
                      { action: 'Birthday bonus', pts: '+200 pts' },
                      { action: 'Complete profile', pts: '+30 pts' },
                    ].map(item => (
                      <div key={item.action} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border">
                        <span className="text-foreground text-sm font-body">{item.action}</span>
                        <span className="text-primary text-sm font-body font-semibold">{item.pts}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h3 className="font-display text-foreground text-2xl mb-4">ACHIEVEMENTS</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {achievements.map(a => (
                      <div key={a.name} className={`p-4 rounded-xl border text-center transition-all ${
                        a.earned ? 'bg-primary/10 border-primary/30' : 'bg-card border-border opacity-60'
                      }`}>
                        <div className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center ${
                          a.earned ? 'bg-primary/20' : 'bg-secondary'
                        }`}>
                          {a.earned ? <Unlock size={16} className="text-primary" /> : <Lock size={16} className="text-muted-foreground" />}
                        </div>
                        <p className="text-foreground text-xs font-body font-semibold">{a.name}</p>
                        <p className="text-muted-foreground text-[10px] font-body mt-1">{a.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tier roadmap */}
                <div>
                  <h3 className="font-display text-foreground text-2xl mb-4">TIER ROADMAP</h3>
                  <div className="flex gap-2">
                    {tiers.map(t => (
                      <div key={t.name} className={`flex-1 p-3 rounded-lg border text-center ${
                        t.name === currentTier.name ? 'border-primary bg-primary/10' : 'border-border bg-card'
                      }`}>
                        <div className={`w-6 h-6 rounded-full mx-auto mb-2 ${t.color}`} />
                        <p className="text-foreground text-xs font-body font-semibold">{t.name}</p>
                        <p className="text-muted-foreground text-[10px] font-body">{t.min}+ pts</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Settings */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="font-display text-foreground text-4xl">SETTINGS</h2>
                <div className="space-y-3">
                  {[
                    { key: 'email' as const, label: 'Email Notifications', desc: 'Receive email updates', icon: Mail },
                    { key: 'orders' as const, label: 'Order Updates', desc: 'Shipping & delivery alerts', icon: Package },
                    { key: 'promos' as const, label: 'Promotions', desc: 'Sales and special offers', icon: Bell },
                    { key: 'darkMode' as const, label: 'Dark Mode', desc: 'Always dark theme', icon: Sun },
                    { key: 'twoFa' as const, label: 'Two-Factor Auth', desc: 'Extra security layer', icon: Shield },
                    { key: 'publicProfile' as const, label: 'Public Profile', desc: 'Visible to community', icon: Eye },
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
                      <div className="flex items-center gap-3">
                        <item.icon size={16} className="text-muted-foreground" />
                        <div>
                          <p className="text-foreground text-sm font-body font-medium">{item.label}</p>
                          <p className="text-muted-foreground text-xs font-body">{item.desc}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setNotifications(n => ({ ...n, [item.key]: !n[item.key] }))}
                        className={`w-11 h-6 rounded-full transition-all relative ${notifications[item.key] ? 'bg-primary' : 'bg-secondary'}`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all ${notifications[item.key] ? 'left-5' : 'left-0.5'}`} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Danger zone */}
                <div className="mt-10 p-6 rounded-xl border border-destructive/30 bg-destructive/5">
                  <h3 className="text-destructive font-display text-xl mb-2">DANGER ZONE</h3>
                  <p className="text-muted-foreground text-xs font-body mb-4">Permanently delete your account and all data.</p>
                  <button className="px-4 py-2 rounded-lg border border-destructive text-destructive text-sm font-body font-medium hover:bg-destructive hover:text-destructive-foreground transition-all">
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <BackToTop />
    </div>
  );
};

export default Account;
