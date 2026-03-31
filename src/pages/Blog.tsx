import { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import BackToTop from '@/components/BackToTop';
import { blogArticles, type BlogArticle } from '@/data/blog';
import { Search, ArrowLeft, Bookmark, BookmarkCheck, Share2, Clock, User, Tag } from 'lucide-react';

const ArticleCard = ({ article, saved, onToggleSave }: { article: BlogArticle; saved: boolean; onToggleSave: (id: string) => void }) => (
  <div className="group bg-card rounded-2xl border border-border hover:border-primary/40 transition-all duration-500 overflow-hidden">
    <div className="h-48 bg-secondary/30 flex items-center justify-center text-6xl">
      {article.image}
    </div>
    <div className="p-6">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-primary text-[10px] uppercase tracking-[2px] font-body font-semibold px-2 py-0.5 rounded-full bg-primary/10">
          {article.category}
        </span>
        <span className="text-muted-foreground text-xs font-body flex items-center gap-1">
          <Clock size={12} /> {article.readTime}
        </span>
      </div>
      <Link to={`/blog/${article.id}`}>
        <h3 className="font-display text-foreground text-2xl mb-2 group-hover:text-primary transition-colors">
          {article.title}
        </h3>
      </Link>
      <p className="text-muted-foreground text-sm font-body leading-relaxed mb-4 line-clamp-2">
        {article.excerpt}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center">
            <User size={12} className="text-muted-foreground" />
          </div>
          <div>
            <p className="text-foreground text-xs font-body font-medium">{article.author}</p>
            <p className="text-muted-foreground text-[10px] font-body">{article.date}</p>
          </div>
        </div>
        <button onClick={() => onToggleSave(article.id)} className="text-muted-foreground hover:text-primary transition-colors">
          {saved ? <BookmarkCheck size={18} className="text-primary" /> : <Bookmark size={18} />}
        </button>
      </div>
    </div>
  </div>
);

const ArticleDetail = ({ article }: { article: BlogArticle }) => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="relative bg-background min-h-screen">
      <div className="noise-overlay" />
      <CustomCursor />
      <Navigation />

      {/* Reading progress */}
      <div className="fixed top-[36px] left-0 right-0 z-50 h-1 bg-secondary">
        <div className="h-full bg-primary transition-all duration-100" style={{ width: `${progress}%` }} />
      </div>

      <div className="pt-40 pb-24 px-8 lg:px-16 max-w-3xl mx-auto">
        <button onClick={() => navigate('/blog')} className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm font-body mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Blog
        </button>

        <span className="text-primary text-[10px] uppercase tracking-[3px] font-body font-semibold">{article.category}</span>
        <h1 className="font-display text-foreground text-5xl lg:text-7xl leading-none mt-2 mb-6">{article.title}</h1>

        <div className="flex items-center gap-6 mb-10 pb-8 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <User size={16} className="text-muted-foreground" />
            </div>
            <div>
              <p className="text-foreground text-sm font-body font-medium">{article.author}</p>
              <p className="text-muted-foreground text-xs font-body">{article.authorRole}</p>
            </div>
          </div>
          <span className="text-muted-foreground text-xs font-body">{article.date}</span>
          <span className="text-muted-foreground text-xs font-body flex items-center gap-1"><Clock size={12} /> {article.readTime}</span>
          <button className="ml-auto text-muted-foreground hover:text-primary transition-colors"><Share2 size={18} /></button>
        </div>

        <div className="text-7xl text-center mb-10">{article.image}</div>

        <div className="prose prose-invert max-w-none font-body text-muted-foreground leading-relaxed space-y-4">
          {article.content.split('\n\n').map((p, i) => (
            <p key={i} className="text-sm leading-7" dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-border">
          {article.tags.map(tag => (
            <span key={tag} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-secondary text-muted-foreground text-xs font-body">
              <Tag size={10} /> {tag}
            </span>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 text-center">
          <h3 className="font-display text-foreground text-3xl mb-2">Ready to play?</h3>
          <p className="text-muted-foreground text-sm font-body mb-6">Check out our collection of premium basketballs.</p>
          <Link to="/products" className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-body font-semibold text-sm tracking-wide hover:brightness-110 transition-all">
            SHOP NOW
          </Link>
        </div>
      </div>
      <BackToTop />
    </div>
  );
};

const Blog = () => {
  const { articleId } = useParams();
  const [search, setSearch] = useState('');
  const [savedArticles, setSavedArticles] = useState<string[]>([]);
  const [newsletterDone, setNewsletterDone] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
    }
  }, []);

  // Article detail view
  if (articleId) {
    const article = blogArticles.find(a => a.id === articleId);
    if (!article) return <div className="min-h-screen bg-background flex items-center justify-center text-foreground font-display text-4xl">Article not found</div>;
    return <ArticleDetail article={article} />;
  }

  const toggleSave = (id: string) => {
    setSavedArticles(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleNewsletter = () => {
    setNewsletterDone(true);
    setTimeout(() => setNewsletterDone(false), 5000);
  };

  const q = search.toLowerCase();
  const filtered = blogArticles.filter(a =>
    a.title.toLowerCase().includes(q) ||
    a.excerpt.toLowerCase().includes(q) ||
    a.author.toLowerCase().includes(q) ||
    a.category.toLowerCase().includes(q)
  );

  return (
    <div className="relative bg-background min-h-screen">
      <div className="noise-overlay" />
      <CustomCursor />
      <Navigation />

      <div className="pt-40 pb-24 px-8 lg:px-16 max-w-6xl mx-auto">
        <div ref={titleRef} className="mb-12">
          <span className="text-primary text-[10px] uppercase tracking-[4px] font-body font-semibold">Stories & Insights</span>
          <h1 className="font-display text-foreground text-7xl lg:text-9xl leading-none mt-2">BLOG</h1>
        </div>

        {/* Search */}
        <div className="relative mb-12 max-w-md">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Articles */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-6xl mb-4">🏀</p>
            <p className="text-muted-foreground font-body">No articles found. Try a different search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(article => (
              <ArticleCard key={article.id} article={article} saved={savedArticles.includes(article.id)} onToggleSave={toggleSave} />
            ))}
          </div>
        )}

        {/* Newsletter */}
        <div className="mt-24 p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/5 border border-primary/20 text-center">
          <h3 className="font-display text-foreground text-4xl mb-2">STAY IN THE GAME</h3>
          <p className="text-muted-foreground text-sm font-body mb-6 max-w-md mx-auto">
            Get the latest articles, product drops, and exclusive offers delivered to your inbox.
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
            <button
              onClick={handleNewsletter}
              className={`px-6 py-3 rounded-lg font-body font-semibold text-sm tracking-wide transition-all ${
                newsletterDone
                  ? 'bg-green-600 text-white'
                  : 'bg-primary text-primary-foreground hover:brightness-110'
              }`}
            >
              {newsletterDone ? '✓ SUBSCRIBED' : 'SUBSCRIBE'}
            </button>
          </div>
        </div>
      </div>
      <BackToTop />
    </div>
  );
};

export default Blog;
