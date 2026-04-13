import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, Shield, Check, Lock, Package } from 'lucide-react';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import { useCart } from '@/contexts/CartContext';

const shippingOptions = [
  { id: 'standard', label: 'Standard Shipping', desc: '5-7 business days', price: 0, badge: 'FREE' },
  { id: 'express', label: 'Express Shipping', desc: '2-3 business days', price: 9.99, badge: '' },
  { id: 'overnight', label: 'Overnight', desc: 'Next business day', price: 19.99, badge: '' },
];

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirm'>('shipping');
  const [shipping, setShipping] = useState('standard');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '', country: 'US',
    cardName: '', cardNumber: '', expiry: '', cvv: '',
  });

  const shippingCost = shippingOptions.find(s => s.id === shipping)?.price || 0;
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + shippingCost + tax;

  const updateForm = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }));

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="relative bg-background min-h-screen">
        <div className="noise-overlay" />
        <CustomCursor />
        <Navigation />
        <div className="pt-40 pb-24 px-8 flex flex-col items-center justify-center min-h-[60vh] text-center">
          <Package size={64} className="text-muted-foreground/20 mb-6" />
          <h1 className="font-display text-foreground text-5xl mb-4">CART IS EMPTY</h1>
          <p className="text-muted-foreground font-body text-sm mb-8">Add some balls to your cart first.</p>
          <Link to="/products" className="bg-primary text-primary-foreground px-10 py-4 rounded-lg font-body font-semibold text-sm tracking-wide hover:brightness-110 transition-all">
            SHOP NOW
          </Link>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="relative bg-background min-h-screen">
        <div className="noise-overlay" />
        <CustomCursor />
        <Navigation />
        <div className="pt-40 pb-24 px-8 flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6 animate-bounce">
            <Check size={40} className="text-green-400" />
          </div>
          <h1 className="font-display text-foreground text-6xl mb-4">ORDER CONFIRMED</h1>
          <p className="text-muted-foreground font-body text-sm mb-2">Order #{`ORD-${Math.floor(Math.random() * 9000 + 1000)}`}</p>
          <p className="text-muted-foreground font-body text-sm mb-8 max-w-md">
            Thank you for your purchase! You'll receive a confirmation email shortly with tracking details.
          </p>
          <div className="flex gap-4">
            <Link to="/products" className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-body font-semibold text-sm tracking-wide hover:brightness-110 transition-all">
              CONTINUE SHOPPING
            </Link>
            <Link to="/account" className="border border-border text-foreground px-8 py-4 rounded-lg font-body font-semibold text-sm tracking-wide hover:border-primary transition-all">
              VIEW ORDERS
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const steps = [
    { key: 'shipping', label: 'Shipping', num: 1 },
    { key: 'payment', label: 'Payment', num: 2 },
    { key: 'confirm', label: 'Confirm', num: 3 },
  ];

  return (
    <div className="relative bg-background min-h-screen">
      <div className="noise-overlay" />
      <CustomCursor />
      <Navigation />

      <div className="pt-40 pb-24 px-8 lg:px-16 max-w-6xl mx-auto">
        {/* Back */}
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-muted-foreground text-sm font-body hover:text-primary transition-colors mb-8">
          <ArrowLeft size={16} /> Back
        </button>

        <h1 className="font-display text-foreground text-6xl lg:text-8xl leading-none mb-10">CHECKOUT</h1>

        {/* Progress */}
        <div className="flex items-center gap-0 mb-12">
          {steps.map((s, i) => (
            <div key={s.key} className="flex items-center">
              <button
                onClick={() => {
                  if (s.key === 'shipping') setStep('shipping');
                  if (s.key === 'payment' && form.firstName) setStep('payment');
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-body font-semibold tracking-wide transition-all ${
                  step === s.key ? 'bg-primary text-primary-foreground' :
                  steps.findIndex(x => x.key === step) > i ? 'bg-green-500/20 text-green-400' :
                  'bg-secondary text-muted-foreground'
                }`}
              >
                {steps.findIndex(x => x.key === step) > i ? <Check size={12} /> : <span>{s.num}</span>}
                {s.label}
              </button>
              {i < steps.length - 1 && <div className="w-12 h-px bg-border mx-2" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main form area */}
          <div className="lg:col-span-2 space-y-8">
            {step === 'shipping' && (
              <>
                <div>
                  <h2 className="font-display text-foreground text-3xl mb-6">SHIPPING INFO</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { key: 'firstName', label: 'First Name', ph: 'John', half: true },
                      { key: 'lastName', label: 'Last Name', ph: 'Doe', half: true },
                      { key: 'email', label: 'Email', ph: 'john@example.com', type: 'email' },
                      { key: 'phone', label: 'Phone', ph: '+1 555-0123', type: 'tel' },
                      { key: 'address', label: 'Address', ph: '123 Main St', full: true },
                      { key: 'city', label: 'City', ph: 'Los Angeles', half: true },
                      { key: 'state', label: 'State', ph: 'CA', half: true },
                      { key: 'zip', label: 'ZIP Code', ph: '90001', half: true },
                    ].map(f => (
                      <div key={f.key} className={f.full ? 'col-span-2' : ''}>
                        <label className="text-foreground text-xs uppercase tracking-[2px] font-body font-medium mb-2 block">{f.label}</label>
                        <input
                          type={f.type || 'text'}
                          value={form[f.key as keyof typeof form]}
                          onChange={e => updateForm(f.key, e.target.value)}
                          placeholder={f.ph}
                          className="w-full bg-secondary border border-border rounded-lg px-4 py-3.5 text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-foreground text-2xl mb-4">SHIPPING METHOD</h3>
                  <div className="space-y-3">
                    {shippingOptions.map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => setShipping(opt.id)}
                        className={`w-full flex items-center justify-between p-5 rounded-xl border transition-all ${
                          shipping === opt.id ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            shipping === opt.id ? 'border-primary' : 'border-muted-foreground'
                          }`}>
                            {shipping === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                          </div>
                          <div className="text-left">
                            <p className="text-foreground text-sm font-body font-semibold flex items-center gap-2">
                              {opt.label}
                              {opt.badge && <span className="text-[10px] uppercase tracking-[1px] text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">{opt.badge}</span>}
                            </p>
                            <p className="text-muted-foreground text-xs font-body">{opt.desc}</p>
                          </div>
                        </div>
                        <span className="text-foreground font-display text-lg">
                          {opt.price === 0 ? 'FREE' : `$${opt.price.toFixed(2)}`}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setStep('payment')}
                  className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-body font-semibold text-sm tracking-wide hover:brightness-110 transition-all"
                >
                  CONTINUE TO PAYMENT
                </button>
              </>
            )}

            {step === 'payment' && (
              <>
                <h2 className="font-display text-foreground text-3xl mb-6">PAYMENT</h2>
                <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <CreditCard size={20} className="text-primary" />
                    <p className="text-foreground font-body font-semibold text-sm">Credit / Debit Card</p>
                    <div className="ml-auto flex gap-2">
                      {['VISA', 'MC', 'AMEX'].map(c => (
                        <span key={c} className="text-[9px] font-body font-semibold px-2 py-1 rounded bg-secondary text-muted-foreground">{c}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-foreground text-xs uppercase tracking-[2px] font-body font-medium mb-2 block">Name on Card</label>
                    <input
                      type="text"
                      value={form.cardName}
                      onChange={e => updateForm('cardName', e.target.value)}
                      placeholder="John Doe"
                      className="w-full bg-secondary border border-border rounded-lg px-4 py-3.5 text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-foreground text-xs uppercase tracking-[2px] font-body font-medium mb-2 block">Card Number</label>
                    <input
                      type="text"
                      value={form.cardNumber}
                      onChange={e => updateForm('cardNumber', e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim())}
                      placeholder="4242 4242 4242 4242"
                      className="w-full bg-secondary border border-border rounded-lg px-4 py-3.5 text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-foreground text-xs uppercase tracking-[2px] font-body font-medium mb-2 block">Expiry</label>
                      <input
                        type="text"
                        value={form.expiry}
                        onChange={e => {
                          let val = e.target.value.replace(/\D/g, '').slice(0, 4);
                          if (val.length > 2) val = val.slice(0, 2) + '/' + val.slice(2);
                          updateForm('expiry', val);
                        }}
                        placeholder="MM/YY"
                        className="w-full bg-secondary border border-border rounded-lg px-4 py-3.5 text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-foreground text-xs uppercase tracking-[2px] font-body font-medium mb-2 block">CVV</label>
                      <input
                        type="text"
                        value={form.cvv}
                        onChange={e => updateForm('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                        placeholder="123"
                        className="w-full bg-secondary border border-border rounded-lg px-4 py-3.5 text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground text-xs font-body">
                  <Lock size={12} /> Your payment information is encrypted and secure
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setStep('shipping')} className="px-8 py-4 rounded-xl border border-border text-foreground font-body font-semibold text-sm hover:border-primary transition-all">
                    BACK
                  </button>
                  <button
                    onClick={() => setStep('confirm')}
                    className="flex-1 bg-primary text-primary-foreground py-4 rounded-xl font-body font-semibold text-sm tracking-wide hover:brightness-110 transition-all"
                  >
                    REVIEW ORDER
                  </button>
                </div>
              </>
            )}

            {step === 'confirm' && (
              <>
                <h2 className="font-display text-foreground text-3xl mb-6">REVIEW ORDER</h2>

                {/* Shipping summary */}
                <div className="p-6 rounded-2xl bg-card border border-border mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-foreground font-body font-semibold text-sm flex items-center gap-2"><Truck size={16} className="text-primary" /> Shipping To</h3>
                    <button onClick={() => setStep('shipping')} className="text-primary text-xs font-body font-medium hover:underline">Edit</button>
                  </div>
                  <p className="text-muted-foreground text-sm font-body">
                    {form.firstName} {form.lastName}<br />
                    {form.address}<br />
                    {form.city}, {form.state} {form.zip}
                  </p>
                </div>

                {/* Payment summary */}
                <div className="p-6 rounded-2xl bg-card border border-border mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-foreground font-body font-semibold text-sm flex items-center gap-2"><CreditCard size={16} className="text-primary" /> Payment</h3>
                    <button onClick={() => setStep('payment')} className="text-primary text-xs font-body font-medium hover:underline">Edit</button>
                  </div>
                  <p className="text-muted-foreground text-sm font-body">
                    •••• •••• •••• {form.cardNumber.replace(/\s/g, '').slice(-4) || '0000'}
                  </p>
                </div>

                {/* Items */}
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h3 className="text-foreground font-body font-semibold text-sm mb-4">Items ({items.length})</h3>
                  <div className="space-y-3">
                    {items.map(item => (
                      <div key={item.product.id} className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-lg bg-secondary/50 flex items-center justify-center">
                          {item.product.image && <img src={item.product.image} alt={item.product.name} className="w-10 h-10 object-contain" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-foreground text-sm font-body font-medium">{item.product.name}</p>
                          <p className="text-muted-foreground text-xs font-body">Qty: {item.quantity} · {item.size}</p>
                        </div>
                        <span className="text-primary font-display text-lg">${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button onClick={() => setStep('payment')} className="px-8 py-4 rounded-xl border border-border text-foreground font-body font-semibold text-sm hover:border-primary transition-all">
                    BACK
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="flex-1 bg-primary text-primary-foreground py-4 rounded-xl font-body font-semibold text-sm tracking-wide hover:brightness-110 transition-all flex items-center justify-center gap-2"
                  >
                    <Shield size={16} /> PLACE ORDER — ${grandTotal.toFixed(2)}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <div className="sticky top-32 p-6 rounded-2xl bg-card border border-border space-y-4">
              <h3 className="font-display text-foreground text-xl">ORDER SUMMARY</h3>

              <div className="space-y-3 pb-4 border-b border-border">
                {items.map(item => (
                  <div key={item.product.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center flex-shrink-0">
                        {item.product.image && <img src={item.product.image} alt="" className="w-7 h-7 object-contain" />}
                      </div>
                      <div>
                        <p className="text-foreground text-xs font-body font-medium">{item.product.name}</p>
                        <p className="text-muted-foreground text-[10px] font-body">×{item.quantity}</p>
                      </div>
                    </div>
                    <span className="text-foreground text-sm font-body">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm font-body">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="text-foreground">${totalPrice.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="text-foreground">{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Tax (est.)</span><span className="text-foreground">${tax.toFixed(2)}</span></div>
              </div>

              <div className="flex justify-between pt-4 border-t border-border">
                <span className="text-foreground font-body font-semibold">Total</span>
                <span className="text-primary font-display text-3xl">${grandTotal.toFixed(2)}</span>
              </div>

              {/* Promo code */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code"
                  className="flex-1 bg-secondary border border-border rounded-lg px-3 py-2.5 text-foreground text-xs font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
                <button className="px-4 py-2.5 rounded-lg border border-border text-foreground text-xs font-body font-medium hover:border-primary transition-colors">
                  APPLY
                </button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-2 pt-4">
                {[
                  { icon: Shield, label: 'Secure' },
                  { icon: Truck, label: 'Fast Ship' },
                  { icon: Package, label: '30-Day Return' },
                ].map(b => (
                  <div key={b.label} className="text-center p-2 rounded-lg bg-secondary/30">
                    <b.icon size={14} className="text-primary mx-auto mb-1" />
                    <p className="text-muted-foreground text-[9px] font-body">{b.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
