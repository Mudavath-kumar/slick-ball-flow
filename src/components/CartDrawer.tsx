import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[60] bg-background/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

      {/* Drawer */}
      <div className="fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-card border-l border-border flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-primary" />
            <h2 className="font-display text-foreground text-2xl">CART ({totalItems})</h2>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={48} className="text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground font-body text-sm">Your cart is empty</p>
              <Link
                to="/products"
                onClick={() => setIsOpen(false)}
                className="mt-4 text-primary text-sm font-body font-medium hover:underline"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            items.map(item => (
              <div key={item.product.id} className="flex gap-4 p-4 rounded-xl bg-secondary/30 border border-border">
                <div className="w-20 h-20 rounded-lg bg-secondary/50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-display text-foreground text-lg leading-tight">{item.product.name}</h4>
                  <p className="text-muted-foreground text-xs font-body">{item.product.subtitle} · {item.size}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-7 h-7 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors">
                        <Minus size={12} />
                      </button>
                      <span className="text-foreground text-sm font-body font-medium w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-7 h-7 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors">
                        <Plus size={12} />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-primary font-display text-lg">${(item.product.price * item.quantity).toFixed(2)}</span>
                      <button onClick={() => removeItem(item.product.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-border space-y-4">
            <div className="flex items-center justify-between">
              <button onClick={clearCart} className="text-muted-foreground text-xs font-body hover:text-destructive transition-colors">
                Clear Cart
              </button>
              <div className="text-right">
                <p className="text-muted-foreground text-xs font-body">Subtotal</p>
                <p className="text-foreground font-display text-3xl">${totalPrice.toFixed(2)}</p>
              </div>
            </div>
            <button className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-body font-semibold text-sm tracking-wide hover:brightness-110 transition-all">
              CHECKOUT
            </button>
            <p className="text-center text-muted-foreground text-[10px] font-body">Free shipping on orders over $50</p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
