import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const messages = [
  '🏀 FREE SHIPPING on orders over $50',
  '🔥 NEW DROP — Street Phantom now available',
  '✨ CUSTOMIZE your ball — Build it your way',
  '⚡ SALE — ZI/O Excel now $49.99 (was $59.99)',
];

const AnnouncementBar = () => {
  const [visible, setVisible] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[55] bg-primary text-primary-foreground h-9 flex items-center justify-center overflow-hidden">
      <p className="text-[11px] font-body font-medium tracking-wide text-center animate-fade-in" key={index}>
        {messages[index]}
      </p>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default AnnouncementBar;
