export interface Product {
  id: string;
  name: string;
  price: string;
  cat: string;
  image: string;
  origin: string;
  finishes: string[];
  usages: string[];
  desc?: string;
}

export const products: Product[] = [
  // Italian Classico
  { 
    id: 'ic1', 
    name: 'Carrara Pure White', 
    price: '₹9,800 / sqft', 
    cat: 'Italian Classico', 
    image: '/assets/marbles/italian-classic-1.jpg',
    origin: 'Italy',
    finishes: ['Polished', 'Honed'],
    usages: ['Flooring', 'Wall Panels', 'Countertops']
  },
  { 
    id: 'ic2', 
    name: 'Statuario Venato', 
    price: '₹17,500 / sqft', 
    cat: 'Italian Classico', 
    image: '/assets/marbles/italian-classic-2.jpg',
    origin: 'Italy',
    finishes: ['Polished'],
    usages: ['Wall Panels', 'Countertops', 'Decorative Art']
  },
  { 
    id: 'ic3', 
    name: 'Calacatta Borghini', 
    price: '₹21,000 / sqft', 
    cat: 'Italian Classico', 
    image: '/assets/marbles/italian-classic-3.jpg',
    origin: 'Italy',
    finishes: ['Polished', 'Honed'],
    usages: ['Flooring', 'Wall Panels', 'Countertops']
  },
  { 
    id: 'ic4', 
    name: 'Bianco Lasa', 
    price: '₹14,900 / sqft', 
    cat: 'Italian Classico', 
    image: '/assets/marbles/italian-classic-4.jpg',
    origin: 'Italy',
    finishes: ['Honed', 'Brushed'],
    usages: ['Flooring', 'Wall Panels']
  },
  { 
    id: 'ic5', 
    name: 'Arabescato Corchia', 
    price: '₹16,200 / sqft', 
    cat: 'Italian Classico', 
    image: '/assets/marbles/italian-classic-5.jpg',
    origin: 'Italy',
    finishes: ['Polished', 'Leathered'],
    usages: ['Wall Panels', 'Countertops']
  },

  // Brazilian Exotic
  { 
    id: 'be1', 
    name: 'Azul Macaubas', 
    price: '₹26,500 / sqft', 
    cat: 'Brazilian Exotic', 
    image: '/assets/marbles/brazilian-exotic-1.jpg',
    origin: 'Brazil',
    finishes: ['Polished', 'Backlit'],
    usages: ['Wall Panels', 'Decorative Art']
  },
  { 
    id: 'be2', 
    name: 'Fusion Wow', 
    price: '₹23,200 / sqft', 
    cat: 'Brazilian Exotic', 
    image: '/assets/marbles/brazilian-exotic-2.jpg',
    origin: 'Brazil',
    finishes: ['Polished', 'Leathered'],
    usages: ['Wall Panels', 'Countertops']
  },
  { 
    id: 'be3', 
    name: 'Amazonite Crystal', 
    price: '₹29,500 / sqft', 
    cat: 'Brazilian Exotic', 
    image: '/assets/marbles/brazilian-exotic-3.jpg',
    origin: 'Brazil',
    finishes: ['Polished', 'Backlit'],
    usages: ['Wall Panels', 'Decorative Art']
  },
  { 
    id: 'be4', 
    name: 'Luminoso Gold', 
    price: '₹19,800 / sqft', 
    cat: 'Brazilian Exotic', 
    image: '/assets/marbles/brazilian-exotic-4.jpg',
    origin: 'Brazil',
    finishes: ['Polished', 'Honed'],
    usages: ['Flooring', 'Countertops']
  },
  { 
    id: 'be5', 
    name: 'Tropical Storm', 
    price: '₹17,500 / sqft', 
    cat: 'Brazilian Exotic', 
    image: '/assets/marbles/brazilian-exotic-5.jpg',
    origin: 'Brazil',
    finishes: ['Leathered', 'Brushed'],
    usages: ['Wall Panels', 'Flooring']
  },

  // Modern Onyx
  { 
    id: 'mo1', 
    name: 'Honey Onyx', 
    price: '₹37,500 / sqft', 
    cat: 'Modern Onyx', 
    image: '/assets/marbles/onyx-translucent-1.jpg',
    origin: 'Iran',
    finishes: ['Polished', 'Backlit'],
    usages: ['Wall Panels', 'Decorative Art']
  },
  { 
    id: 'mo2', 
    name: 'Tiger Eye Onyx', 
    price: '₹39,900 / sqft', 
    cat: 'Modern Onyx', 
    image: '/assets/marbles/onyx-translucent-2.jpg',
    origin: 'Turkey',
    finishes: ['Polished', 'Backlit'],
    usages: ['Wall Panels']
  },
  { 
    id: 'mo3', 
    name: 'Emerald Onyx', 
    price: '₹43,500 / sqft', 
    cat: 'Modern Onyx', 
    image: '/assets/marbles/onyx-translucent-3.jpg',
    origin: 'Mexico',
    finishes: ['Polished', 'Backlit'],
    usages: ['Wall Panels', 'Decorative Art']
  },
  { 
    id: 'mo4', 
    name: 'Pink Cloud Translucent', 
    price: '₹34,800 / sqft', 
    cat: 'Modern Onyx', 
    image: '/assets/marbles/onyx-translucent-4.jpg',
    origin: 'Iran',
    finishes: ['Polished', 'Backlit'],
    usages: ['Decorative Art']
  },
  { 
    id: 'mo5', 
    name: 'Backlit Crystal', 
    price: '₹52,000 / sqft', 
    cat: 'Modern Onyx', 
    image: '/assets/marbles/onyx-translucent-5.jpg',
    origin: 'Brazil',
    finishes: ['Polished', 'Backlit'],
    usages: ['Wall Panels', 'Decorative Art']
  },

  // Earth & Rust
  { 
    id: 'er1', 
    name: 'Travertine Silver', 
    price: '₹8,500 / sqft', 
    cat: 'Earth & Rust', 
    image: '/assets/marbles/earthy-tone-1.jpg',
    origin: 'Turkey',
    finishes: ['Honed', 'Brushed'],
    usages: ['Flooring', 'Wall Panels']
  },
  { 
    id: 'er2', 
    name: 'Bronze Amani', 
    price: '₹11,200 / sqft', 
    cat: 'Earth & Rust', 
    image: '/assets/marbles/earthy-tone-2.jpg',
    origin: 'Spain',
    finishes: ['Polished', 'Leathered'],
    usages: ['Flooring', 'Countertops']
  },
  { 
    id: 'er3', 
    name: 'Crema Marfil', 
    price: '₹9,200 / sqft', 
    cat: 'Earth & Rust', 
    image: '/assets/marbles/earthy-tone-3.jpg',
    origin: 'Spain',
    finishes: ['Polished', 'Honed'],
    usages: ['Flooring', 'Wall Panels']
  },
  { 
    id: 'er4', 
    name: 'Sahara Sand', 
    price: '₹10,500 / sqft', 
    cat: 'Earth & Rust', 
    image: '/assets/marbles/earthy-tone-4.jpg',
    origin: 'Egypt',
    finishes: ['Brushed', 'Honed'],
    usages: ['Flooring']
  },
  { 
    id: 'er5', 
    name: 'Rustic Sienna', 
    price: '₹12,000 / sqft', 
    cat: 'Earth & Rust', 
    image: '/assets/marbles/earthy-tone-5.jpg',
    origin: 'India',
    finishes: ['Leathered', 'Polished'],
    usages: ['Wall Panels', 'Countertops']
  },

  // Luxe Noir
  { 
    id: 'ln1', 
    name: 'Nero Marquina', 
    price: '₹14,900 / sqft', 
    cat: 'Luxe Noir', 
    image: '/assets/marbles/dark-luxury-1.jpg',
    origin: 'Spain',
    finishes: ['Polished', 'Honed'],
    usages: ['Flooring', 'Countertops']
  },
  { 
    id: 'ln2', 
    name: 'Portoro Gold', 
    price: '₹24,200 / sqft', 
    cat: 'Luxe Noir', 
    image: '/assets/marbles/dark-luxury-2.jpg',
    origin: 'Italy',
    finishes: ['Polished'],
    usages: ['Wall Panels', 'Decorative Art']
  },
  { 
    id: 'ln3', 
    name: 'Midnight Galaxy', 
    price: '₹13,800 / sqft', 
    cat: 'Luxe Noir', 
    image: '/assets/marbles/dark-luxury-3.jpg',
    origin: 'India',
    finishes: ['Polished', 'Leathered'],
    usages: ['Flooring', 'Wall Panels']
  },
  { 
    id: 'ln4', 
    name: 'Obsidian Shadow', 
    price: '₹15,800 / sqft', 
    cat: 'Luxe Noir', 
    image: '/assets/marbles/dark-luxury-4.jpg',
    origin: 'India',
    finishes: ['Honed', 'Brushed'],
    usages: ['Wall Panels']
  },
  { 
    id: 'ln5', 
    name: 'Black Ice', 
    price: '₹17,500 / sqft', 
    cat: 'Luxe Noir', 
    image: '/assets/marbles/dark-luxury-5.jpg',
    origin: 'Brazil',
    finishes: ['Polished', 'Leathered'],
    usages: ['Flooring', 'Countertops']
  },

  // Verde Green
  { 
    id: 'vg1', 
    name: 'Rainforest Green', 
    price: '₹10,800 / sqft', 
    cat: 'Verde Green', 
    image: '/assets/marbles/verde-green-1.jpg',
    origin: 'India',
    finishes: ['Leathered', 'Polished'],
    usages: ['Wall Panels', 'Countertops']
  },
  { 
    id: 'vg2', 
    name: 'Emerald Forest', 
    price: '₹18,500 / sqft', 
    cat: 'Verde Green', 
    image: '/assets/marbles/verde-green-2.jpg',
    origin: 'India',
    finishes: ['Polished', 'Honed'],
    usages: ['Flooring', 'Wall Panels']
  },
  { 
    id: 'vg3', 
    name: 'Sea Foam Green', 
    price: '₹15,400 / sqft', 
    cat: 'Verde Green', 
    image: '/assets/marbles/verde-green-3.jpg',
    origin: 'India',
    finishes: ['Polished', 'Brushed'],
    usages: ['Flooring', 'Decorative Art']
  },
];
