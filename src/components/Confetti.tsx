import { useEffect, useRef } from 'react';

// Lightweight canvas confetti — no dependencies. Triggers a single burst on mount.
const Confetti = ({ duration = 2400 }: { duration?: number }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#FF5F1F', '#FFFFFF', '#FFB36B', '#FF8A3D', '#FFD9BD'];
    const w = window.innerWidth;
    const h = window.innerHeight;
    type P = { x: number; y: number; vx: number; vy: number; size: number; color: string; rot: number; vr: number; shape: 'rect' | 'circle' };
    const particles: P[] = [];
    const launch = (originX: number) => {
      for (let i = 0; i < 90; i++) {
        const angle = (Math.random() * Math.PI) - Math.PI / 2;
        const speed = 6 + Math.random() * 8;
        particles.push({
          x: originX, y: h * 0.45,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 4,
          size: 4 + Math.random() * 6,
          color: colors[Math.floor(Math.random() * colors.length)],
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.3,
          shape: Math.random() > 0.5 ? 'rect' : 'circle',
        });
      }
    };
    launch(w * 0.25);
    launch(w * 0.5);
    launch(w * 0.75);

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.vy += 0.22;
        p.vx *= 0.995;
        p.x += p.vx; p.y += p.vy; p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        if (p.shape === 'rect') ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.5);
        else { ctx.beginPath(); ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2); ctx.fill(); }
        ctx.restore();
      });
      if (now - start < duration) raf = requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, w, h);
    };
    raf = requestAnimationFrame(tick);

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [duration]);

  return <canvas ref={ref} className="fixed inset-0 pointer-events-none z-[9996]" />;
};

export default Confetti;
