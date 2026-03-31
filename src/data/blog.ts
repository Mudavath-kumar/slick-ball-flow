export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
}

export const blogArticles: BlogArticle[] = [
  {
    id: 'choosing-right-ball',
    title: 'How to Choose the Right Basketball for Your Game',
    excerpt: 'Indoor vs outdoor, leather vs composite — our complete guide to finding your perfect match.',
    content: `Choosing the right basketball can dramatically impact your performance. The first decision is surface type: indoor courts demand soft composite or genuine leather covers that grip polished wood, while outdoor play requires durable rubber compounds that withstand asphalt.\n\nSize matters too. Official men's balls measure 29.5" in circumference (Size 7), women's at 28.5" (Size 6), and youth at 27.5" (Size 5). Playing with the wrong size affects your shooting mechanics and ball handling.\n\nConstruction quality shows in the channels — deep, wide channels give better finger placement and control. Premium balls use wound nylon cores for consistent bounce, while budget options use rubber bladders.\n\nOur recommendation? If you play primarily indoors, the TF-1000 Legacy offers professional-grade grip. For outdoor warriors, the Street Phantom's Dura-Grip rubber handles any surface. And if you switch between courts, the NeverFlat Max bridges both worlds.`,
    author: 'Marcus Thompson',
    authorRole: 'Head of Product',
    date: '2024-03-15',
    readTime: '5 min',
    category: 'Guide',
    tags: ['guide', 'equipment', 'indoor', 'outdoor'],
    image: '🏀',
  },
  {
    id: 'spalding-tf1000-review',
    title: 'TF-1000 Legacy Review: Is It Worth the Hype?',
    excerpt: 'We put the best-selling indoor ball through 200 hours of court testing. Here\'s the verdict.',
    content: `After 200+ hours of testing across three indoor facilities, the TF-1000 Legacy lives up to its reputation. The ZK Microfiber composite cover develops an exceptional grip within the first few sessions — it actually improves with use.\n\nThe deep channel design provides confident ball handling, and the cushion core technology delivers a consistent bounce that doesn't degrade over months of play. NFHS approved, this ball meets tournament standards.\n\nThe only drawback? It's strictly an indoor ball. Take it outside and the composite cover will wear rapidly. But for its intended purpose — competitive indoor play — it's hard to beat at the $89.99 price point.\n\nVerdict: 9.2/10 — The gold standard for indoor composite basketballs.`,
    author: 'James Rivera',
    authorRole: 'Equipment Reviewer',
    date: '2024-03-08',
    readTime: '7 min',
    category: 'Review',
    tags: ['review', 'indoor', 'tf-1000'],
    image: '⭐',
  },
  {
    id: 'basketball-maintenance',
    title: '5 Tips to Make Your Basketball Last Twice as Long',
    excerpt: 'Simple maintenance habits that protect your investment and keep your ball game-ready.',
    content: `A quality basketball is an investment. Here's how to protect it:\n\n1. **Store at Room Temperature** — Extreme heat or cold warps the cover and affects air retention. Never leave your ball in a hot car trunk.\n\n2. **Clean After Use** — Wipe down with a damp cloth after outdoor sessions. Dirt and grit act like sandpaper on the cover.\n\n3. **Maintain Proper Pressure** — Over-inflation stresses seams, under-inflation causes uneven wear. Check pressure before every game (7-9 PSI is standard).\n\n4. **Use on Correct Surfaces** — Indoor balls on outdoor courts is the #1 cause of premature wear. Match your ball to your court.\n\n5. **Rotate Your Ball** — If you practice daily, rotating between two balls extends both their lifespans significantly.`,
    author: 'Sarah Chen',
    authorRole: 'Community Manager',
    date: '2024-02-28',
    readTime: '4 min',
    category: 'Tips',
    tags: ['maintenance', 'tips', 'care'],
    image: '🛠️',
  },
  {
    id: 'street-basketball-culture',
    title: 'The Rise of Street Basketball Culture',
    excerpt: 'From Rucker Park to global phenomenon — how streetball shaped modern basketball.',
    content: `Street basketball isn't just a game — it's a movement. Born on the asphalt courts of New York City, streetball culture has influenced everything from NBA playing styles to sneaker design and hip-hop music.\n\nThe legendary Rucker Park in Harlem became the proving ground where playground legends like Earl "The Goat" Manigault and Pee Wee Kirkland showcased moves that wouldn't appear in the NBA for decades.\n\nToday, street basketball is a global phenomenon. From the cages of Venice Beach to the courts of Manila, players express creativity and style that organized basketball often suppresses.\n\nThis culture demands equipment that can handle rough surfaces while still performing. That's why we developed the Street Phantom — a ball built for the concrete jungle with the grip and feel of an indoor premium.`,
    author: 'Marcus Thompson',
    authorRole: 'Head of Product',
    date: '2024-02-20',
    readTime: '6 min',
    category: 'Culture',
    tags: ['culture', 'streetball', 'history'],
    image: '🌆',
  },
  {
    id: 'custom-basketball-guide',
    title: 'Design Your Dream Ball: Customization Guide',
    excerpt: 'Everything you need to know about creating a one-of-a-kind basketball.',
    content: `Our customization platform lets you build a basketball that's uniquely yours. Here's what you can personalize:\n\n**Materials**: Choose from premium leather (indoor only), composite leather (versatile), or dura-grip rubber (outdoor tough).\n\n**Colors**: Select from 12 panel colors, 6 channel colors, and custom text colors. Our color-matching system ensures vibrant, fade-resistant results.\n\n**Engraving**: Add up to 15 characters of laser-engraved text — perfect for team names, player numbers, or personal mottos.\n\n**Graphics**: Upload a logo or choose from our gallery of designs for panel printing.\n\nCustom balls make incredible gifts for players, coaches, and basketball fans. Team orders of 10+ receive a 15% discount.\n\nTurnaround time is 5-7 business days, with rush options available for 2-3 day delivery.`,
    author: 'Alex Kim',
    authorRole: 'Design Lead',
    date: '2024-02-10',
    readTime: '5 min',
    category: 'Guide',
    tags: ['customization', 'guide', 'design'],
    image: '🎨',
  },
  {
    id: 'nba-ball-evolution',
    title: 'The Evolution of the NBA Game Ball',
    excerpt: 'From leather to microfiber — 75 years of basketball technology evolution.',
    content: `The NBA game ball has undergone a fascinating evolution since the league's founding in 1946.\n\nFor decades, genuine leather was king. The iconic orange Spalding Official Game Ball, made from Horween leather, was the standard from 1983 to 2006. Each ball was hand-selected and required a break-in period of several games.\n\nIn 2006, the NBA controversially switched to a synthetic microfiber ball. Players revolted — the new ball cut their hands and behaved unpredictably. The league reversed course within months, returning to leather.\n\nThe current Wilson Official Game Ball (since 2021) uses a composite leather that bridges the gap — consistent grip from day one with the premium feel players demand.\n\nThis evolution mirrors consumer basketball development. Our TF-1000 Legacy and Precision lines incorporate lessons from decades of professional ball engineering, delivering pro-level performance at accessible prices.`,
    author: 'James Rivera',
    authorRole: 'Equipment Reviewer',
    date: '2024-01-30',
    readTime: '8 min',
    category: 'History',
    tags: ['history', 'nba', 'technology'],
    image: '📜',
  },
];
