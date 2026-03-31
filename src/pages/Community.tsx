import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import BackToTop from '@/components/BackToTop';
import { Users, MapPin, Trophy, MessageSquare, Heart, Share2, Camera, Star, ArrowRight } from 'lucide-react';

const courtSpots = [
  { city: 'Los Angeles', courts: 24, players: 1280, lat: '34°N' },
  { city: 'New York', courts: 31, players: 2100, lat: '40°N' },
  { city: 'Chicago', courts: 18, players: 940, lat: '41°N' },
  { city: 'Miami', courts: 15, players: 720, lat: '25°N' },
  { city: 'Houston', courts: 12, players: 560, lat: '29°N' },
];

const feedPosts = [
  { user: 'Mike_Hoops23', avatar: '🏀', content: 'Just copped the TF-1000 Legacy. The grip on indoor courts is insane. Best ball I\'ve ever played with.', likes: 47, comments: 12, time: '2h ago' },
  { user: 'CourtQueen', avatar: '👑', content: 'Hit 50 straight free throws at Venice Beach today with my Street Phantom. New personal best! 🔥', likes: 128, comments: 34, time: '4h ago' },
  { user: 'BallIsLife_99', avatar: '⚡', content: 'Custom marble ball just arrived. The colorway is even better in person. Check the engraving detail 🎨', likes: 89, comments: 21, time: '6h ago' },
  { user: 'HoopDreams', avatar: '🌟', content: 'Pickup game last night was wild. NeverFlat Max survived 3 hours of outdoor play without losing pressure 💪', likes: 63, comments: 8, time: '8h ago' },
];

const leaderboard = [
  { rank: 1, name: 'Marcus "Flash" Williams', points: 12400, badge: '🥇' },
  { rank: 2, name: 'Sarah Chen', points: 11200, badge: '🥈' },
  { rank: 3, name: 'James Rivera', points: 9800, badge: '🥉' },
  { rank: 4, name: 'Alex Kim', points: 8500, badge: '' },
  { rank: 5, name: 'Jordan Taylor', points: 7200, badge: '' },
];

const Community = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
    }
  }, []);

  const toggleLike = (i: number) => {
    setLikedPosts(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  };

  return (
    <div className="relative bg-background min-h-screen">
      <div className="noise-overlay" />
      <CustomCursor />
      <Navigation />

      <div className="pt-40 pb-24 px-8 lg:px-16 max-w-6xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="mb-16">
          <span className="text-primary text-[10px] uppercase tracking-[4px] font-body font-semibold">Join the Movement</span>
          <h1 className="font-display text-foreground text-7xl lg:text-9xl leading-none mt-2">COMMUNITY</h1>
          <p className="text-muted-foreground text-sm font-body mt-4 max-w-lg">
            Connect with ballers worldwide. Share your game, find courts, and climb the ranks.
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { label: 'Active Players', value: '12.4K', icon: Users },
            { label: 'Courts Listed', value: '340+', icon: MapPin },
            { label: 'Weekly Games', value: '1.8K', icon: Trophy },
            { label: 'Posts Today', value: '247', icon: MessageSquare },
          ].map(stat => (
            <div key={stat.label} className="p-5 rounded-xl bg-card border border-border text-center">
              <stat.icon size={20} className="text-primary mx-auto mb-2" />
              <p className="text-foreground font-display text-3xl">{stat.value}</p>
              <p className="text-muted-foreground text-xs font-body">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Feed */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-display text-foreground text-3xl mb-4">COURT FEED</h2>
            {feedPosts.map((post, i) => (
              <div key={i} className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-lg">{post.avatar}</div>
                  <div>
                    <p className="text-foreground text-sm font-body font-semibold">{post.user}</p>
                    <p className="text-muted-foreground text-[10px] font-body">{post.time}</p>
                  </div>
                </div>
                <p className="text-foreground text-sm font-body leading-relaxed mb-4">{post.content}</p>
                <div className="flex items-center gap-6">
                  <button onClick={() => toggleLike(i)} className={`flex items-center gap-1.5 text-xs font-body transition-colors ${likedPosts.includes(i) ? 'text-red-400' : 'text-muted-foreground hover:text-foreground'}`}>
                    <Heart size={14} fill={likedPosts.includes(i) ? 'currentColor' : 'none'} /> {post.likes + (likedPosts.includes(i) ? 1 : 0)}
                  </button>
                  <span className="flex items-center gap-1.5 text-muted-foreground text-xs font-body">
                    <MessageSquare size={14} /> {post.comments}
                  </span>
                  <button className="text-muted-foreground hover:text-foreground transition-colors"><Share2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <div className="p-5 rounded-xl bg-card border border-border">
              <h3 className="font-display text-foreground text-xl mb-4 flex items-center gap-2"><Trophy size={16} className="text-primary" /> LEADERBOARD</h3>
              <div className="space-y-3">
                {leaderboard.map(player => (
                  <div key={player.rank} className="flex items-center gap-3">
                    <span className="text-muted-foreground font-display text-lg w-6">#{player.rank}</span>
                    <span className="text-lg">{player.badge}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-foreground text-xs font-body font-medium truncate">{player.name}</p>
                      <p className="text-primary text-[10px] font-body">{player.points.toLocaleString()} pts</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Court finder */}
            <div className="p-5 rounded-xl bg-card border border-border">
              <h3 className="font-display text-foreground text-xl mb-4 flex items-center gap-2"><MapPin size={16} className="text-primary" /> POPULAR COURTS</h3>
              <div className="space-y-3">
                {courtSpots.map(spot => (
                  <div key={spot.city} className="flex items-center justify-between">
                    <div>
                      <p className="text-foreground text-sm font-body font-medium">{spot.city}</p>
                      <p className="text-muted-foreground text-[10px] font-body">{spot.courts} courts · {spot.players.toLocaleString()} players</p>
                    </div>
                    <span className="text-muted-foreground text-[10px] font-body">{spot.lat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 text-center">
              <Camera size={24} className="text-primary mx-auto mb-3" />
              <h3 className="font-display text-foreground text-lg mb-1">SHARE YOUR GAME</h3>
              <p className="text-muted-foreground text-xs font-body mb-4">Post your highlights & earn points</p>
              <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-body font-semibold text-xs tracking-wide hover:brightness-110 transition-all">
                CREATE POST
              </button>
            </div>
          </div>
        </div>

        {/* Cross-sell */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/products" className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all flex items-center justify-between">
            <div>
              <h3 className="font-display text-foreground text-2xl mb-1">GEAR UP</h3>
              <p className="text-muted-foreground text-sm font-body">Shop the collection</p>
            </div>
            <ArrowRight size={20} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </Link>
          <Link to="/customize" className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all flex items-center justify-between">
            <div>
              <h3 className="font-display text-foreground text-2xl mb-1">BUILD YOUR BALL</h3>
              <p className="text-muted-foreground text-sm font-body">Customize everything</p>
            </div>
            <ArrowRight size={20} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>
      <BackToTop />
    </div>
  );
};

export default Community;
