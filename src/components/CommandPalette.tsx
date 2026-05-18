import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Home, Package, Sparkles, Users, BookOpen, Mail, User as UserIcon,
  Ruler, GitCompare, Tag, ShieldCheck, Truck, Briefcase, Newspaper, Camera, Dumbbell,
  Sun, Moon, ShoppingCart
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useCart } from '@/contexts/CartContext';
import { products } from '@/data/products';

type Cmd = { id: string; label: string; hint?: string; icon: React.ReactNode; run: () => void; group: string };

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const { toggleTheme, theme } = useTheme();
  const { setIsOpen: setCartOpen } = useCart();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(o => !o);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => { if (open) { setQuery(''); setActive(0); } }, [open]);

  const close = () => setOpen(false);

  const commands: Cmd[] = useMemo(() => {
    const nav = (path: string) => () => { navigate(path); close(); };
    const base: Cmd[] = [
      { id: 'home', group: 'Navigate', label: 'Home', icon: <Home size={15} />, run: nav('/') },
      { id: 'products', group: 'Navigate', label: 'All Products', icon: <Package size={15} />, run: nav('/products') },
      { id: 'lookbook', group: 'Navigate', label: 'Lookbook', hint: 'Gallery', icon: <Camera size={15} />, run: nav('/lookbook') },
      { id: 'training', group: 'Navigate', label: 'Training Hub', hint: 'Drills', icon: <Dumbbell size={15} />, run: nav('/training') },
      { id: 'customize', group: 'Navigate', label: 'Customize Your Ball', icon: <Sparkles size={15} />, run: nav('/customize') },
      { id: 'deals', group: 'Navigate', label: 'Deals', icon: <Tag size={15} />, run: nav('/deals') },
      { id: 'compare', group: 'Navigate', label: 'Compare', icon: <GitCompare size={15} />, run: nav('/compare') },
      { id: 'size', group: 'Navigate', label: 'Size Finder', icon: <Ruler size={15} />, run: nav('/size-finder') },
      { id: 'blog', group: 'Navigate', label: 'Blog', icon: <BookOpen size={15} />, run: nav('/blog') },
      { id: 'community', group: 'Navigate', label: 'Community', icon: <Users size={15} />, run: nav('/community') },
      { id: 'account', group: 'Navigate', label: 'Account', icon: <UserIcon size={15} />, run: nav('/account') },
      { id: 'contact', group: 'Navigate', label: 'Contact', icon: <Mail size={15} />, run: nav('/contact') },
      { id: 'warranty', group: 'Navigate', label: 'Warranty', icon: <ShieldCheck size={15} />, run: nav('/warranty') },
      { id: 'shipping', group: 'Navigate', label: 'Shipping', icon: <Truck size={15} />, run: nav('/shipping') },
      { id: 'careers', group: 'Navigate', label: 'Careers', icon: <Briefcase size={15} />, run: nav('/careers') },
      { id: 'press', group: 'Navigate', label: 'Press', icon: <Newspaper size={15} />, run: nav('/press') },
      { id: 'cart', group: 'Actions', label: 'Open Cart', icon: <ShoppingCart size={15} />, run: () => { setCartOpen(true); close(); } },
      { id: 'theme', group: 'Actions', label: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
        icon: theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />, run: () => { toggleTheme(); close(); } },
    ];
    const productCmds: Cmd[] = products.map(p => ({
      id: `p-${p.id}`, group: 'Products', label: p.name, hint: `$${p.price}`,
      icon: <Package size={15} />, run: nav(`/products/${p.id}`),
    }));
    return [...base, ...productCmds];
  }, [navigate, theme, toggleTheme, setCartOpen]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(c =>
      c.label.toLowerCase().includes(q) ||
      c.group.toLowerCase().includes(q) ||
      (c.hint ?? '').toLowerCase().includes(q)
    );
  }, [query, commands]);

  useEffect(() => { setActive(0); }, [query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(a + 1, filtered.length - 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
      else if (e.key === 'Enter') { e.preventDefault(); filtered[active]?.run(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, filtered, active]);

  if (!open) return null;

  let lastGroup = '';
  return (
    <div className="fixed inset-0 z-[9997] flex items-start justify-center pt-[12vh] px-4 animate-fade-in" onClick={close}>
      <div className="absolute inset-0 bg-background/70 backdrop-blur-md" />
      <div
        className="relative w-full max-w-xl rounded-2xl border border-border bg-card shadow-2xl overflow-hidden animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Search size={16} className="text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type a command, page, or product…"
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-sm font-body"
          />
          <kbd className="text-[10px] text-muted-foreground border border-border rounded px-1.5 py-0.5 font-body">ESC</kbd>
        </div>
        <div className="max-h-[55vh] overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <p className="px-4 py-8 text-center text-muted-foreground text-sm font-body">No results.</p>
          ) : filtered.map((c, i) => {
            const showGroup = c.group !== lastGroup;
            lastGroup = c.group;
            return (
              <div key={c.id}>
                {showGroup && (
                  <p className="px-4 pt-3 pb-1 text-[10px] uppercase tracking-[2px] text-muted-foreground font-body font-semibold">{c.group}</p>
                )}
                <button
                  onMouseEnter={() => setActive(i)}
                  onClick={() => c.run()}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm font-body transition-colors ${
                    i === active ? 'bg-primary/10 text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span className={`${i === active ? 'text-primary' : ''}`}>{c.icon}</span>
                  <span className="flex-1">{c.label}</span>
                  {c.hint && <span className="text-[10px] text-muted-foreground">{c.hint}</span>}
                </button>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-between px-4 py-2 border-t border-border text-[10px] text-muted-foreground font-body">
          <span>↑↓ navigate · ↵ select</span>
          <span>⌘K to toggle</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
