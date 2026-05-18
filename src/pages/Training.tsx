import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import {
  Dumbbell, Target, Flame, Timer, Play, Check, Trophy, ArrowRight, Zap, Award
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import BackToTop from '@/components/BackToTop';
import PageTransition from '@/components/PageTransition';

type Drill = {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Pro';
  duration: number; // minutes
  focus: string;
  description: string;
  steps: string[];
  reps: string;
  icon: typeof Dumbbell;
};

const drills: Drill[] = [
  { id: 'd1', title: 'Mikan Series', level: 'Beginner', duration: 8, focus: 'Finishing', icon: Target,
    description: 'Classic ambidextrous layup drill to build touch around the rim.',
    steps: ['Start under the basket', 'Right-hand layup', 'Rebound, no dribble', 'Switch to left-hand', 'Repeat in rhythm'],
    reps: '4 sets · 20 makes' },
  { id: 'd2', title: 'Form Shooting Ladder', level: 'Beginner', duration: 10, focus: 'Shooting', icon: Flame,
    description: 'Build perfect mechanics from 3ft to 15ft. Make 5 in a row before stepping back.',
    steps: ['3ft directly in front of rim', 'Make 5 in a row', 'Step back 2ft', 'Repeat to 15ft', 'Cool down with free throws'],
    reps: '6 distances · ~50 shots' },
  { id: 'd3', title: 'Two-Ball Tight Pound', level: 'Intermediate', duration: 6, focus: 'Handles', icon: Zap,
    description: 'Develop fingertip control, weak hand strength, and synchronized rhythm.',
    steps: ['Two balls at the same time', 'Pound below the knee', 'Alternate L/R every 30s', 'Eyes up at all times'],
    reps: '4 rounds · 45s on / 15s off' },
  { id: 'd4', title: 'Closeout Catch & Shoot', level: 'Intermediate', duration: 12, focus: 'Shooting',
    icon: Target,
    description: 'Simulate a live closeout — sprint, plant, square, fire.',
    steps: ['Start at baseline', 'Sprint to wing', 'Plant outside foot', 'Square shoulders, release', 'Sprint back, reset'],
    reps: '5 spots · 5 makes each' },
  { id: 'd5', title: '3-Spot Pull-Up Series', level: 'Pro', duration: 15, focus: 'Scoring', icon: Flame,
    description: 'Live-dribble pull-up jumpers from elbows and the top of the key.',
    steps: ['Cone at 3-pt line', 'Hard 1-dribble pull-up', 'Stepback variation', 'Switch hands', 'Game-speed every rep'],
    reps: '3 spots · 10 makes each' },
  { id: 'd6', title: 'Defensive Slide Suicides', level: 'Pro', duration: 5, focus: 'Conditioning', icon: Timer,
    description: 'Burnout for lateral quickness, low stance discipline, and lungs.',
    steps: ['Defensive stance baseline', 'Slide to FT line, back', 'Slide to half court, back', 'Slide to far FT, back', 'No standing up'],
    reps: '4 reps · 60s rest' },
];

const programs = [
  { id: 'p1', name: 'ROOKIE 7', tag: '7-day starter', drills: 12, focus: 'Form · Touch · Handles', color: 'from-blue-500/20' },
  { id: 'p2', name: 'SCORER 21', tag: '3-week scoring system', drills: 36, focus: 'Pull-ups · Finishing · Range', color: 'from-orange-500/20' },
  { id: 'p3', name: 'PRO FORGE 6', tag: '6-week pro program', drills: 84, focus: 'Game-speed everything', color: 'from-red-500/20' },
];

const TrainingHub = () => {
  const [level, setLevel] = useState<'All' | Drill['level']>('All');
  const [completed, setCompleted] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('sd-completed-drills') || '[]'); } catch { return []; }
  });
  const [active, setActive] = useState<Drill | null>(null);
  const [timer, setTimer] = useState<number>(0);
  const [running, setRunning] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => { localStorage.setItem('sd-completed-drills', JSON.stringify(completed)); }, [completed]);

  useEffect(() => {
    if (titleRef.current) gsap.fromTo(titleRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' });
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const tiles = gridRef.current.querySelectorAll('[data-card]');
    gsap.fromTo(tiles, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: 'power3.out' });
  }, [level]);

  useEffect(() => {
    if (!running) return;
    const i = setInterval(() => setTimer(t => {
      if (t <= 1) { setRunning(false); return 0; }
      return t - 1;
    }), 1000);
    return () => clearInterval(i);
  }, [running]);

  const visible = useMemo(() => level === 'All' ? drills : drills.filter(d => d.level === level), [level]);

  const toggleComplete = (id: string) =>
    setCompleted(c => c.includes(id) ? c.filter(x => x !== id) : [...c, id]);

  const totalMin = drills.reduce((sum, d) => sum + (completed.includes(d.id) ? d.duration : 0), 0);
  const pct = Math.round((completed.length / drills.length) * 100);

  const start = (d: Drill) => { setActive(d); setTimer(d.duration * 60); setRunning(false); };
  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <PageTransition>
      <div className="relative bg-background min-h-screen">
        <div className="noise-overlay" />
        <CustomCursor />
        <Navigation />

        <div className="pt-40 pb-24 px-8 lg:px-16 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <Dumbbell size={14} className="text-primary" />
            <span className="text-primary text-[10px] uppercase tracking-[4px] font-body font-semibold">Training Hub</span>
          </div>
          <h1 ref={titleRef} className="font-display text-foreground text-7xl lg:text-9xl leading-[0.9]">
            GET<br /><span className="italic text-primary">BUCKETS</span>
          </h1>
          <p className="text-muted-foreground text-sm font-body mt-6 max-w-md">
            Drills designed by trainers — built to be done with the ball in your hand.
          </p>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Drills Completed', value: completed.length, icon: Check },
              { label: 'Minutes Trained', value: totalMin, icon: Timer },
              { label: 'Progress', value: `${pct}%`, icon: Trophy },
              { label: 'Streak', value: completed.length > 0 ? '🔥 1d' : '—', icon: Flame },
            ].map((s, i) => (
              <div key={i} className="p-5 rounded-2xl bg-card border border-border">
                <s.icon size={16} className="text-primary mb-2" />
                <p className="font-display text-foreground text-3xl">{s.value}</p>
                <p className="text-muted-foreground text-[10px] uppercase tracking-[2px] font-body mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Programs */}
          <h2 className="font-display text-foreground text-4xl mt-20 mb-6">PROGRAMS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {programs.map(p => (
              <div key={p.id} className={`relative overflow-hidden p-7 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all group`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${p.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative">
                  <Award size={18} className="text-primary mb-3" />
                  <p className="font-display text-foreground text-3xl">{p.name}</p>
                  <p className="text-muted-foreground text-xs font-body mt-1">{p.tag}</p>
                  <div className="my-4 h-px bg-border" />
                  <p className="text-foreground text-sm font-body">{p.focus}</p>
                  <p className="text-muted-foreground text-[10px] font-body mt-1">{p.drills} drills</p>
                  <button className="mt-5 inline-flex items-center gap-2 text-primary text-xs font-body font-semibold tracking-wide hover:gap-3 transition-all">
                    START PROGRAM <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Drills */}
          <div className="flex items-end justify-between mt-20 mb-6 flex-wrap gap-4">
            <h2 className="font-display text-foreground text-4xl">DRILL LIBRARY</h2>
            <div className="flex gap-2 flex-wrap">
              {(['All', 'Beginner', 'Intermediate', 'Pro'] as const).map(l => (
                <button key={l} onClick={() => setLevel(l)}
                  className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-[2px] font-body font-semibold transition-all ${
                    level === l ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'
                  }`}>{l}</button>
              ))}
            </div>
          </div>

          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map(d => {
              const done = completed.includes(d.id);
              return (
                <div key={d.id} data-card className={`relative p-6 rounded-2xl bg-card border transition-all group ${done ? 'border-green-500/40' : 'border-border hover:border-primary/40'}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <d.icon size={18} />
                    </div>
                    <span className={`text-[9px] uppercase tracking-[2px] font-body font-semibold px-2 py-1 rounded-full ${
                      d.level === 'Beginner' ? 'bg-blue-500/10 text-blue-400' :
                      d.level === 'Intermediate' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-red-500/10 text-red-400'
                    }`}>{d.level}</span>
                  </div>
                  <p className="font-display text-foreground text-2xl">{d.title}</p>
                  <p className="text-muted-foreground text-xs font-body mt-1">{d.focus} · {d.duration} min · {d.reps}</p>
                  <p className="text-foreground/80 text-sm font-body mt-3 line-clamp-2">{d.description}</p>
                  <div className="mt-5 flex items-center gap-2">
                    <button onClick={() => start(d)} className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-lg text-xs font-body font-semibold tracking-wide hover:brightness-110 transition-all">
                      <Play size={12} /> START
                    </button>
                    <button onClick={() => toggleComplete(d.id)} title={done ? 'Mark incomplete' : 'Mark complete'}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                        done ? 'bg-green-500 text-white' : 'bg-secondary text-muted-foreground hover:text-foreground'
                      }`}>
                      <Check size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <Link to="/products" className="mt-16 inline-flex items-center gap-2 text-primary text-sm font-body font-semibold hover:gap-3 transition-all">
            Grab a ball <ArrowRight size={16} />
          </Link>
        </div>

        {/* Drill modal w/ timer */}
        {active && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6" onClick={() => { setActive(null); setRunning(false); }}>
            <div className="absolute inset-0 bg-background/90 backdrop-blur-lg" />
            <div className="relative w-full max-w-lg rounded-2xl border border-border bg-card p-8 animate-scale-in" onClick={e => e.stopPropagation()}>
              <p className="text-primary text-[10px] uppercase tracking-[3px] font-body font-semibold mb-1">{active.level} · {active.focus}</p>
              <p className="font-display text-foreground text-4xl">{active.title}</p>
              <p className="text-muted-foreground text-sm font-body mt-2">{active.description}</p>

              <div className="my-6 p-6 rounded-2xl bg-secondary border border-border flex flex-col items-center">
                <p className="font-display text-foreground text-6xl tabular-nums">{fmt(timer)}</p>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => setRunning(r => !r)} className="bg-primary text-primary-foreground px-5 py-2 rounded-lg text-xs font-body font-semibold">
                    {running ? 'PAUSE' : 'START'}
                  </button>
                  <button onClick={() => { setTimer(active.duration * 60); setRunning(false); }} className="border border-border text-foreground px-5 py-2 rounded-lg text-xs font-body font-semibold">
                    RESET
                  </button>
                </div>
              </div>

              <p className="text-foreground text-xs uppercase tracking-[2px] font-body font-semibold mb-3">Steps</p>
              <ol className="space-y-2">
                {active.steps.map((s, i) => (
                  <li key={i} className="flex gap-3 text-sm text-foreground/80 font-body">
                    <span className="text-primary font-display">{i + 1}.</span> {s}
                  </li>
                ))}
              </ol>

              <div className="mt-6 flex gap-2">
                <button onClick={() => { toggleComplete(active.id); setActive(null); setRunning(false); }}
                  className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg text-xs font-body font-semibold tracking-wide">
                  MARK COMPLETE
                </button>
                <button onClick={() => { setActive(null); setRunning(false); }}
                  className="border border-border text-foreground px-5 py-3 rounded-lg text-xs font-body font-semibold">
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        )}

        <BackToTop />
      </div>
    </PageTransition>
  );
};

export default TrainingHub;
