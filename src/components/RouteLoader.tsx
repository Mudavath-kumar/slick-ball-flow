import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const RouteLoader = () => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    setProgress(15);
    const t1 = setTimeout(() => setProgress(65), 80);
    const t2 = setTimeout(() => setProgress(95), 240);
    const t3 = setTimeout(() => setProgress(100), 420);
    const t4 = setTimeout(() => setVisible(false), 700);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [location.pathname]);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9998] h-[3px] pointer-events-none transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        className="h-full bg-gradient-to-r from-primary via-primary to-primary/70 shadow-[0_0_12px_hsl(var(--primary))] transition-[width] duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default RouteLoader;
