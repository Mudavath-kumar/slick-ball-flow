import { ShoppingCart, User } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-6">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full border-2 border-foreground flex items-center justify-center">
          <div className="text-center leading-none font-display">
            <span className="block text-[8px] tracking-wider">SLAM</span>
            <span className="block text-[8px] tracking-wider">DUNK</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-10">
        <button className="text-primary text-sm font-body font-medium tracking-wide">Products</button>
        <button className="text-muted-foreground text-sm font-body font-medium tracking-wide hover:text-foreground transition-colors">Customize</button>
        <button className="text-muted-foreground text-sm font-body font-medium tracking-wide hover:text-foreground transition-colors">Contacts</button>
      </div>

      <div className="flex items-center gap-5">
        <button className="text-foreground hover:text-primary transition-colors">
          <User size={20} />
        </button>
        <button className="text-foreground hover:text-primary transition-colors">
          <ShoppingCart size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
