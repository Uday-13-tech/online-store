import { Product, Order, User } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Wireless Noise-Canceling Headphones',
    category: 'Electronics',
    price: 29.99,
    originalPrice: 59.99,
    isOnSale: true,
    discountPercent: 50,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    shortDescription: 'Premium wireless headphones with active noise cancellation and 30-hour battery life.',
    fullDescription: 'This section provides a detailed description of the product, including its features, specifications, and why it stands out. Engineered with custom 40mm dynamic drivers and smart acoustic tuning, these headphones provide crystal-clear highs and deep, punchy bass for all audio genres. Perfect for travel, work, and everyday listening.',
    features: [
      'Active Noise Cancellation (ANC) up to 35dB',
      'Ultra-fast Bluetooth 5.3 connectivity with multipoint pairing',
      'Up to 30 hours of continuous playback with quick-charge support',
      'Ergonomic memory-foam earcups with breathable protein leather',
      'Integrated beamforming microphones for crystal-clear phone calls'
    ],
    specifications: {
      'Battery Life': '30 Hours (ANC On), 40 Hours (ANC Off)',
      'Connectivity': 'Bluetooth 5.3 & 3.5mm AUX',
      'Driver Size': '40mm Neodymium',
      'Weight': '245g',
      'Charging Port': 'USB Type-C (10 min charge = 3 hrs play)'
    },
    rating: 4.8,
    stock: 24
  },
  {
    id: 2,
    name: 'Organic Cotton Crewneck T-Shirt',
    category: 'Clothing',
    price: 19.99,
    originalPrice: 29.99,
    isOnSale: true,
    discountPercent: 33,
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
    shortDescription: 'Super-soft 100% GOTS certified organic ring-spun cotton everyday essential tee.',
    fullDescription: 'Crafted from 100% certified organic cotton, this classic crewneck t-shirt offers unparalleled comfort and durable everyday wear. Pre-shrunk fabric ensures a consistent tailored fit wash after wash, while reinforced collar stitching prevents stretching or sagging over time.',
    features: [
      '100% GOTS certified organic ring-spun combed cotton',
      'Modern classic relaxed unisex fit with clean finish hem',
      'Breathable, hypoallergenic, and gentle on sensitive skin',
      'Tagless interior neckline for itch-free comfort',
      'Dyed with non-toxic, eco-friendly low-impact pigments'
    ],
    specifications: {
      'Material': '100% Organic Cotton (180 GSM)',
      'Fit': 'Regular Fit',
      'Care': 'Machine wash cold, tumble dry low',
      'Origin': 'Sustainably Manufactured'
    },
    rating: 4.6,
    stock: 50
  },
  {
    id: 3,
    name: 'Stainless Steel Pour-Over Coffee Maker',
    category: 'Home & Kitchen',
    price: 49.99,
    originalPrice: 69.99,
    isOnSale: true,
    discountPercent: 28,
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
    shortDescription: 'Barista-grade heat-resistant borosilicate glass with reusable dual-layer stainless steel micro-mesh filter.',
    fullDescription: 'Elevate your morning coffee ritual with this pour-over coffee maker. Designed for slow-drip extraction, the laser-cut micro-filter unlocks subtle tasting notes and rich aromatics without requiring disposable paper filters. Includes a heat-resistant silicone thermal grip.',
    features: [
      'Dual-layer food-grade 304 stainless steel permanent filter',
      'Hand-blown heat-resistant borosilicate glass carafe (800ml capacity)',
      'Precision measurement markings in milliliters and ounces',
      'Cool-touch silicone collar with ergonomic grip design',
      'Dishwasher safe and 100% BPA and lead-free'
    ],
    specifications: {
      'Capacity': '800 ml (approx. 5-6 cups)',
      'Carafe Material': 'Borosilicate Glass (thermal shock resistant to 300°F)',
      'Filter': 'Laser-etched Micro-mesh 304 Stainless Steel',
      'Cleaning': 'Dishwasher safe'
    },
    rating: 4.9,
    stock: 18
  },
  {
    id: 4,
    name: 'Professional Pro-Grip Yoga & Fitness Mat',
    category: 'Sports',
    price: 34.99,
    originalPrice: 49.99,
    isOnSale: false,
    discountPercent: 0,
    imageUrl: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=600&auto=format&fit=crop&q=80',
    shortDescription: 'High-density eco-friendly non-slip exercise mat with alignment guide lines and carry strap.',
    fullDescription: 'Engineered for high-intensity training, yoga, and pilates. The non-slip polyurethane top surface wicks moisture during heavy sweat sessions, providing maximum grip and stability. 6mm dual-layer cushioning protects joints without compromising balance.',
    features: [
      'Laser-etched body alignment lines to assist posture precision',
      'Eco-friendly natural rubber base with sweat-wicking PU surface',
      '6mm optimum thickness for joint comfort and ground stability',
      'Includes complimentary durable nylon shoulder carrying strap',
      'Anti-tear grid matrix preventing stretching under load'
    ],
    specifications: {
      'Dimensions': '72" L x 26" W x 6mm thick',
      'Weight': '2.1 kg',
      'Material': 'Natural Tree Rubber + PU',
      'Color': 'Deep Slate'
    },
    rating: 4.7,
    stock: 35
  },
  {
    id: 5,
    name: 'Ultra-HD Smart Fitness Watch with GPS',
    category: 'Electronics',
    price: 89.99,
    originalPrice: 129.99,
    isOnSale: true,
    discountPercent: 30,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    shortDescription: 'All-day health tracker with AMOLED display, built-in GPS, heart rate, and 7-day battery.',
    fullDescription: 'Stay on top of your fitness metrics, notifications, and sleep patterns with this sleek smartwatch. Equipped with optical PPG heart rate and SpO2 sensors, 5ATM water resistance, and over 100 dedicated workout modes.',
    features: [
      '1.43" Vivid AMOLED Always-On Display with 466x466 resolution',
      'Built-in Dual-band GPS for accurate route tracking',
      'Continuous 24/7 Heart Rate, SpO2, and Sleep Stage Monitoring',
      'Water resistant up to 50 meters (5ATM)',
      'Up to 7 days battery on typical use / 14 days standby'
    ],
    specifications: {
      'Display': '1.43 inch AMOLED Touchscreen',
      'Waterproof': '5 ATM (50m)',
      'Sensors': 'Optical Heart Rate, Accelerometer, Gyroscope, SpO2, Barometer',
      'Compatibility': 'Android 8.0+ & iOS 12.0+'
    },
    rating: 4.8,
    stock: 20
  },
  {
    id: 6,
    name: 'Weather-Proof Commuter Backpack',
    category: 'Clothing',
    price: 45.00,
    originalPrice: 65.00,
    isOnSale: false,
    discountPercent: 0,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
    shortDescription: 'Sleek minimalist 25L water-repellent pack with padded 16" laptop sleeve and hidden anti-theft pocket.',
    fullDescription: 'Designed for modern commuters and weekend travelers. Featuring durable 900D water-repellent coated fabric, waterproof YKK zippers, dedicated padded compartment for laptops up to 16 inches, and ergonomic breathable mesh shoulder straps.',
    features: [
      'Padded sleeve fits laptops up to 16 inches + tablet sleeve',
      '900D recycled Oxford fabric with polyurethane weather coating',
      'Concealed anti-theft passport pocket on rear panel',
      'Expandable side bottle pocket and luggage handle pass-through',
      'Reflective safety accents for nighttime visibility'
    ],
    specifications: {
      'Volume': '25 Liters',
      'Weight': '780g',
      'Dimensions': '18.5" x 12" x 6.5"',
      'Material': 'Water-resistant Recycled Polyester'
    },
    rating: 4.7,
    stock: 40
  },
  {
    id: 7,
    name: 'Cast Iron Enameled Dutch Oven (5.5 Qt)',
    category: 'Home & Kitchen',
    price: 64.99,
    originalPrice: 99.99,
    isOnSale: true,
    discountPercent: 35,
    imageUrl: 'https://images.unsplash.com/photo-1584990347449-399a6176510d?w=600&auto=format&fit=crop&q=80',
    shortDescription: 'Heavy-duty enameled cast iron dutch oven for braising, baking, roasting, and slow cooking.',
    fullDescription: 'A kitchen cornerstone for serious cooks. Heavy-duty cast iron construction provides superior heat retention and uniform distribution. The chip-resistant porcelain enamel interior requires no seasoning and cleans effortlessly.',
    features: [
      'Superior heat retention and even cooking temperature',
      'Smooth non-reactive porcelain enamel finish',
      'Self-basting condensation bumps under lid circulate moisture',
      'Oven safe up to 500°F (260°C); suitable for all stovetops including induction',
      'Wide loop side handles for secure grip with oven mitts'
    ],
    specifications: {
      'Capacity': '5.5 Quarts (5.2 Liters)',
      'Weight': '5.2 kg',
      'Finish': 'Triple-layer Porcelain Enamel',
      'Oven Safe': 'Up to 500°F'
    },
    rating: 4.9,
    stock: 14
  },
  {
    id: 8,
    name: 'Adjustable Quick-Select Dumbbell Set',
    category: 'Sports',
    price: 119.99,
    originalPrice: 179.99,
    isOnSale: true,
    discountPercent: 33,
    imageUrl: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop&q=80',
    shortDescription: 'Compact rapid weight selection system adjustable from 5 to 52.5 lbs per dumbbell.',
    fullDescription: 'Replace 15 pairs of traditional weights with a single space-saving dumbbell system. Smooth dial-turn mechanism enables rapid weight adjustments between sets for progressive overload and versatile full-body workouts.',
    features: [
      'Fast dial mechanism adjusts weight from 5 to 52.5 lbs in 2.5 lb increments',
      'Durable molding around steel plates provides smooth, quiet lifts',
      'Contoured knurled steel grip for maximum hand security',
      'Heavy-duty storage tray protects floor surfaces',
      'Ideal for strength training, circuits, and rehabilitation'
    ],
    specifications: {
      'Weight Range': '5 - 52.5 lbs (2.3 - 24 kg)',
      'Plates Material': 'Silicon-coated Steel',
      'Included': '1 Adjustable Dumbbell + 1 Storage Base'
    },
    rating: 4.9,
    stock: 12
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'ORD-2026-9841',
    orderDate: '01/18/2026',
    status: 'Delivered',
    totalAmount: 59.98,
    shippingAddress: {
      fullName: 'Alex Johnson',
      street: '742 Evergreen Terrace',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62704'
    },
    items: [
      {
        productId: 1,
        productName: 'Wireless Noise-Canceling Headphones',
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
        price: 29.99,
        quantity: 1
      },
      {
        productId: 2,
        productName: 'Organic Cotton Crewneck T-Shirt',
        imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
        price: 19.99,
        quantity: 1
      }
    ]
  },
  {
    id: 'ord-1002',
    orderNumber: 'ORD-2026-9902',
    orderDate: '02/10/2026',
    status: 'Shipped',
    totalAmount: 49.99,
    shippingAddress: {
      fullName: 'Alex Johnson',
      street: '742 Evergreen Terrace',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62704'
    },
    items: [
      {
        productId: 3,
        productName: 'Stainless Steel Pour-Over Coffee Maker',
        imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
        price: 49.99,
        quantity: 1
      }
    ]
  }
];

export const DEFAULT_USER: User = {
  id: 1,
  username: 'alex_shopper',
  email: 'alex.shopper@example.com',
  fullName: 'Alex Johnson',
  token: 'mock-jwt-token-eyJuYW1lIjoiQWxleCBKb2huc29uIn0'
};
