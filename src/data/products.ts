import ballTf1000 from '@/assets/ball-tf1000.png';
import ballPrecision from '@/assets/ball-precision.png';
import ballStreet from '@/assets/ball-street.png';
import ballNeverflat from '@/assets/ball-neverflat.png';
import ballMarble from '@/assets/ball-marble.png';
import ballZio from '@/assets/ball-zio.png';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  category: 'indoor' | 'outdoor' | 'all-court' | 'limited';
  size: string;
  image: string;
  badge?: string;
  description: string;
  features: string[];
  specs: {
    weight: string;
    circumference: string;
    material: string;
    construction: string;
  };
  colors: string[];
}

export const products: Product[] = [
  {
    id: 'spalding-tf-1000',
    name: 'TF-1000 LEGACY',
    subtitle: 'Indoor Game Ball',
    price: 89.99,
    category: 'indoor',
    size: '29.5"',
    image: ballTf1000,
    badge: 'BEST SELLER',
    description: 'The TF-1000 Legacy features ZK Microfiber composite cover that delivers exceptional feel and grip consistency throughout the life of the ball.',
    features: ['ZK Microfiber Composite', 'NFHS Approved', 'Deep Channel Design', 'Cushion Core Technology'],
    specs: { weight: '22 oz', circumference: '29.5"', material: 'ZK Microfiber', construction: 'Wound Nylon' },
    colors: ['#E8601C', '#1a1a1a', '#8B4513'],
  },
  {
    id: 'spalding-precision',
    name: 'PRECISION',
    subtitle: 'Elite Indoor Ball',
    price: 34.99,
    category: 'indoor',
    size: '29.5"',
    image: ballPrecision,
    description: 'Official game ball designed for indoor courts. Premium leather composite provides superior grip and consistent bounce.',
    features: ['Premium Composite Leather', 'Symmetrical Design', 'Butyl Bladder', 'Full Ball Pebbling'],
    specs: { weight: '22 oz', circumference: '29.5"', material: 'Composite Leather', construction: 'Wound' },
    colors: ['#E8601C', '#2d1810'],
  },
  {
    id: 'spalding-street',
    name: 'STREET PHANTOM',
    subtitle: 'Outdoor Performance',
    price: 29.99,
    category: 'outdoor',
    size: '29.5"',
    image: ballStreet,
    badge: 'NEW',
    description: 'Built tough for outdoor play. Enhanced rubber cover withstands rough surfaces while maintaining excellent grip.',
    features: ['Dura-Grip Rubber', 'High-Visibility Graphics', 'All-Surface Durability', 'Deep Channel Design'],
    specs: { weight: '22 oz', circumference: '29.5"', material: 'Performance Rubber', construction: 'Nylon Wound' },
    colors: ['#E8601C', '#000000', '#333333'],
  },
  {
    id: 'spalding-neverflat',
    name: 'NEVERFLAT MAX',
    subtitle: 'All-Court Innovation',
    price: 44.99,
    category: 'all-court',
    size: '29.5"',
    image: ballNeverflat,
    description: 'Revolutionary NeverFlat technology keeps the ball at proper pressure 10x longer than standard balls.',
    features: ['NeverFlat Technology', 'Hexagrip Exterior', 'Indoor/Outdoor Use', 'Maximum Air Retention'],
    specs: { weight: '22 oz', circumference: '29.5"', material: 'Composite', construction: 'NeverFlat Core' },
    colors: ['#E8601C', '#1C1C1C'],
  },
  {
    id: 'spalding-marble',
    name: 'MARBLE SERIES',
    subtitle: 'Limited Edition',
    price: 39.99,
    category: 'limited',
    size: '29.5"',
    image: ballMarble,
    badge: 'LIMITED',
    description: 'Striking marble-pattern design combined with premium outdoor rubber for style and performance on any court.',
    features: ['Unique Marble Pattern', 'Premium Rubber Cover', 'Outdoor Optimized', 'Collector Edition'],
    specs: { weight: '22 oz', circumference: '29.5"', material: 'Premium Rubber', construction: 'Wound Nylon' },
    colors: ['#E8601C', '#4a90d9', '#c0c0c0'],
  },
  {
    id: 'spalding-zi-o',
    name: 'ZI/O EXCEL',
    subtitle: 'All-Court Composite',
    price: 49.99,
    originalPrice: 59.99,
    category: 'all-court',
    size: '29.5"',
    image: ballZio,
    badge: 'SALE',
    description: 'Designed for the versatile player. Composite leather cover provides indoor feel with outdoor durability.',
    features: ['ZI/O Composite Leather', 'Foam-Backed Cover', 'Indoor/Outdoor Versatility', 'Pro Seam Design'],
    specs: { weight: '22 oz', circumference: '29.5"', material: 'ZI/O Composite', construction: 'Cushion Core' },
    colors: ['#E8601C', '#2F4F4F'],
  },
];
