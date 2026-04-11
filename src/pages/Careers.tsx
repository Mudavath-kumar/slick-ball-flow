import { useState } from 'react';
import Navigation from '@/components/Navigation';
import FooterSection from '@/components/sections/FooterSection';
import { MapPin, Clock, ArrowRight, Zap, Heart, Globe, TrendingUp } from 'lucide-react';

const perks = [
  { icon: Zap, title: 'Innovation First', desc: 'Work on cutting-edge sports technology that impacts millions of athletes.' },
  { icon: Heart, title: 'Wellness Benefits', desc: 'Full health, dental, vision. Plus a $500/year personal fitness stipend.' },
  { icon: Globe, title: 'Flexible Work', desc: 'Hybrid-remote culture. Work from anywhere 2 days a week.' },
  { icon: TrendingUp, title: 'Growth Path', desc: 'Clear career progression with mentorship and professional development budgets.' },
];

const openings = [
  { title: 'Senior Product Designer', dept: 'Design', location: 'Chicago, IL', type: 'Full-Time', desc: 'Lead the design of our next-generation basketball performance products.' },
  { title: 'Materials Engineer', dept: 'R&D', location: 'Springfield, MA', type: 'Full-Time', desc: 'Research and develop advanced composite materials for our premium basketball line.' },
  { title: 'E-Commerce Manager', dept: 'Digital', location: 'Remote', type: 'Full-Time', desc: 'Drive online growth, optimize conversion funnels, and manage our direct-to-consumer channel.' },
  { title: 'Brand Marketing Coordinator', dept: 'Marketing', location: 'Chicago, IL', type: 'Full-Time', desc: 'Execute campaigns across social, email, and partnerships to grow our global brand presence.' },
  { title: 'Quality Assurance Technician', dept: 'Manufacturing', location: 'Springfield, MA', type: 'Full-Time', desc: 'Ensure every basketball meets our championship-level quality standards through testing and inspection.' },
  { title: 'Community Manager', dept: 'Marketing', location: 'Remote', type: 'Part-Time', desc: 'Build and nurture our community of basketball enthusiasts across social platforms and events.' },
  { title: 'Supply Chain Analyst', dept: 'Operations', location: 'Chicago, IL', type: 'Full-Time', desc: 'Optimize our global supply chain for speed, cost efficiency, and sustainability.' },
  { title: 'UX/UI Developer', dept: 'Digital', location: 'Remote', type: 'Full-Time', desc: 'Build stunning, performant web experiences that bring our brand to life online.' },
];

const Careers = () => {
  const [filter, setFilter] = useState('All');
  const departments = ['All', ...new Set(openings.map(o => o.dept))];
  const filtered = filter === 'All' ? openings : openings.filter(o => o.dept === filter);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-28 pb-20 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-20">
            <span className="text-primary text-[10px] uppercase tracking-[4px] font-body font-semibold">
              Join the Team
            </span>
            <h1 className="font-display text-foreground text-7xl lg:text-8xl mt-2">CAREERS</h1>
            <p className="text-muted-foreground text-sm font-body mt-4 max-w-lg mx-auto leading-relaxed">
              We're building the future of basketball. Come shape the game with us.
            </p>
          </div>

          {/* Culture banner */}
          <div className="mb-20 p-10 rounded-3xl bg-gradient-to-br from-primary/10 to-card border border-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="font-display text-foreground text-5xl mb-4">OUR MISSION</h2>
              <p className="text-muted-foreground text-base font-body leading-relaxed max-w-2xl">
                For over 127 years, we've crafted the world's finest basketballs. Every seam, every pebble, every bounce represents our obsession with perfection. We're looking for people who share that obsession.
              </p>
            </div>
          </div>

          {/* Perks */}
          <div className="mb-20">
            <h2 className="font-display text-foreground text-4xl mb-8">WHY WORK WITH US</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {perks.map(perk => (
                <div key={perk.title} className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <perk.icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-display text-foreground text-xl">{perk.title.toUpperCase()}</h4>
                      <p className="text-muted-foreground text-xs font-body mt-1 leading-relaxed">{perk.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Open Positions */}
          <div>
            <h2 className="font-display text-foreground text-4xl mb-6">OPEN POSITIONS</h2>
            <div className="flex flex-wrap gap-2 mb-8">
              {departments.map(dept => (
                <button
                  key={dept}
                  onClick={() => setFilter(dept)}
                  className={`px-4 py-2 rounded-full text-xs font-body font-medium transition-all ${
                    filter === dept
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-muted-foreground hover:text-foreground border border-border'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {filtered.map((job, i) => (
                <div key={i} className="p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all group cursor-pointer">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-foreground font-display text-xl">{job.title.toUpperCase()}</h3>
                        <span className="text-[10px] uppercase tracking-[2px] font-body text-primary bg-primary/10 px-2 py-0.5 rounded-full">{job.dept}</span>
                      </div>
                      <p className="text-muted-foreground text-xs font-body leading-relaxed mb-3">{job.desc}</p>
                      <div className="flex items-center gap-4 text-muted-foreground text-xs font-body">
                        <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {job.type}</span>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all flex-shrink-0">
                      <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* General application */}
          <div className="mt-16 p-8 rounded-2xl bg-card border border-border text-center">
            <h3 className="font-display text-foreground text-3xl mb-2">DON'T SEE YOUR ROLE?</h3>
            <p className="text-muted-foreground text-sm font-body mb-6 max-w-md mx-auto">
              We're always looking for exceptional talent. Send us your resume and tell us how you'd make an impact.
            </p>
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-body font-semibold text-sm tracking-wide hover:brightness-110 transition-all">
              GENERAL APPLICATION
            </button>
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default Careers;
