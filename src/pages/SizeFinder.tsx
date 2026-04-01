import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import BackToTop from '@/components/BackToTop';
import { ArrowRight, ArrowLeft, Check, RotateCcw } from 'lucide-react';

interface QuizStep {
  question: string;
  options: { label: string; value: string; emoji: string }[];
}

const steps: QuizStep[] = [
  {
    question: "Who's playing?",
    options: [
      { label: 'Adult Male', value: 'adult-m', emoji: '🏀' },
      { label: 'Adult Female', value: 'adult-f', emoji: '🏀' },
      { label: 'Youth (12-14)', value: 'youth', emoji: '🏀' },
      { label: 'Kids (Under 12)', value: 'kids', emoji: '🏀' },
    ],
  },
  {
    question: 'Where do you play most?',
    options: [
      { label: 'Indoor Court', value: 'indoor', emoji: '🏟️' },
      { label: 'Outdoor / Street', value: 'outdoor', emoji: '🌆' },
      { label: 'Both', value: 'both', emoji: '🔄' },
    ],
  },
  {
    question: 'What level are you?',
    options: [
      { label: 'Casual / Rec', value: 'casual', emoji: '😎' },
      { label: 'Competitive / League', value: 'competitive', emoji: '🔥' },
      { label: 'Professional / College', value: 'pro', emoji: '🏆' },
    ],
  },
  {
    question: "What's your budget?",
    options: [
      { label: 'Under $35', value: 'budget', emoji: '💵' },
      { label: '$35 – $50', value: 'mid', emoji: '💰' },
      { label: '$50+', value: 'premium', emoji: '💎' },
    ],
  },
];

const getRecommendation = (answers: string[]) => {
  const [player, surface, level, budget] = answers;

  if (level === 'pro' || budget === 'premium') {
    return {
      size: '29.5"',
      id: 'spalding-tf-1000',
      name: 'TF-1000 LEGACY',
      reason: 'Top-tier ZK Microfiber composite for elite play. NFHS approved.',
      sizeNote: player === 'adult-f' ? 'Consider 28.5" for official women\'s size' : 'Official men\'s size',
    };
  }
  if (surface === 'outdoor') {
    return {
      size: player === 'kids' ? '27.5"' : player === 'youth' || player === 'adult-f' ? '28.5"' : '29.5"',
      id: 'spalding-street',
      name: 'STREET PHANTOM',
      reason: 'Dura-Grip rubber built to withstand rough outdoor surfaces.',
      sizeNote: player === 'kids' ? 'Youth size for younger players' : 'Standard size for your category',
    };
  }
  if (surface === 'both') {
    return {
      size: player === 'kids' ? '27.5"' : player === 'youth' || player === 'adult-f' ? '28.5"' : '29.5"',
      id: 'spalding-neverflat',
      name: 'NEVERFLAT MAX',
      reason: 'All-court versatility with revolutionary air retention tech.',
      sizeNote: 'Works great on both surfaces',
    };
  }
  if (budget === 'budget') {
    return {
      size: player === 'kids' ? '27.5"' : player === 'youth' || player === 'adult-f' ? '28.5"' : '29.5"',
      id: 'spalding-street',
      name: 'STREET PHANTOM',
      reason: 'Great performance at an accessible price point.',
      sizeNote: 'Best value in the lineup',
    };
  }
  return {
    size: player === 'kids' ? '27.5"' : player === 'youth' || player === 'adult-f' ? '28.5"' : '29.5"',
    id: 'spalding-precision',
    name: 'PRECISION',
    reason: 'Premium composite leather with consistent bounce and feel.',
    sizeNote: 'Perfect all-around choice',
  };
};

const SizeFinder = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const progress = ((step + 1) / steps.length) * 100;

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
    }
  }, [step, showResult]);

  const selectOption = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[step] = value;
    setAnswers(newAnswers);

    if (step < steps.length - 1) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      setTimeout(() => setShowResult(true), 300);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setShowResult(false);
  };

  const result = showResult ? getRecommendation(answers) : null;

  return (
    <div className="relative bg-background min-h-screen">
      <div className="noise-overlay" />
      <CustomCursor />
      <Navigation />

      <div className="pt-40 pb-24 px-8 lg:px-16 max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-primary text-[10px] uppercase tracking-[4px] font-body font-semibold">
            Interactive Guide
          </span>
          <h1 className="font-display text-foreground text-6xl lg:text-8xl leading-none mt-2">
            SIZE FINDER
          </h1>
          <p className="text-muted-foreground text-sm font-body mt-4">
            Answer 4 quick questions. We'll match you with your perfect ball.
          </p>
        </div>

        {!showResult ? (
          <>
            {/* Progress bar */}
            <div className="w-full h-1 bg-border rounded-full mb-10 overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Step indicator */}
            <p className="text-muted-foreground text-xs font-body mb-6">
              STEP {step + 1} OF {steps.length}
            </p>

            {/* Question */}
            <div ref={containerRef} key={step}>
              <h2 className="font-display text-foreground text-4xl lg:text-5xl mb-8">
                {steps[step].question}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {steps[step].options.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => selectOption(opt.value)}
                    className={`group p-6 rounded-2xl border text-left transition-all duration-300 ${
                      answers[step] === opt.value
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card hover:border-primary/40'
                    }`}
                  >
                    <span className="text-2xl mb-3 block">{opt.emoji}</span>
                    <p className="text-foreground font-body font-semibold text-sm">{opt.label}</p>
                  </button>
                ))}
              </div>

              {/* Back button */}
              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="mt-8 flex items-center gap-2 text-muted-foreground text-sm font-body hover:text-primary transition-colors"
                >
                  <ArrowLeft size={14} /> Back
                </button>
              )}
            </div>
          </>
        ) : result ? (
          /* Result */
          <div ref={containerRef} className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-body font-semibold mb-8">
              <Check size={14} /> Perfect Match Found
            </div>

            <div className="p-10 rounded-3xl bg-card border border-border mb-8">
              <p className="text-primary text-6xl font-display mb-2">{result.size}</p>
              <p className="text-muted-foreground text-xs font-body mb-6">{result.sizeNote}</p>

              <h3 className="font-display text-foreground text-4xl mb-3">{result.name}</h3>
              <p className="text-muted-foreground text-sm font-body leading-relaxed max-w-md mx-auto mb-8">
                {result.reason}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to={`/products/${result.id}`}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-body font-semibold text-sm tracking-wide hover:brightness-110 transition-all magnetic-btn"
                >
                  VIEW THIS BALL <ArrowRight size={16} />
                </Link>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-lg border border-border text-foreground text-sm font-body font-medium hover:border-primary transition-colors"
                >
                  <RotateCcw size={14} /> Start Over
                </button>
              </div>
            </div>

            {/* Size chart */}
            <div className="p-8 rounded-2xl bg-secondary/30 border border-border text-left">
              <h4 className="font-display text-foreground text-xl mb-4">SIZE REFERENCE CHART</h4>
              <div className="space-y-3">
                {[
                  { size: '29.5"', who: 'Men (15+)', circ: '74.9 cm' },
                  { size: '28.5"', who: 'Women / Youth 12-14', circ: '72.4 cm' },
                  { size: '27.5"', who: 'Kids 9-11', circ: '69.8 cm' },
                  { size: '25.5"', who: 'Kids 5-8', circ: '64.8 cm' },
                ].map(row => (
                  <div key={row.size} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                    <div className="flex items-center gap-3">
                      <span className="text-primary font-display text-lg">{row.size}</span>
                      <span className="text-foreground text-sm font-body">{row.who}</span>
                    </div>
                    <span className="text-muted-foreground text-xs font-body">{row.circ}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <BackToTop />
    </div>
  );
};

export default SizeFinder;
