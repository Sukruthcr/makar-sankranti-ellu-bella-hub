import { SweetItem } from './types';

export const SANKRANTI_ITEMS: SweetItem[] = [
  {
    id: 'ellu-bella',
    name: 'Home-Made Ellu Bella',
    kannadaName: 'ಮನೆಯಲ್ಲೇ ತಯಾರಿಸಿದ ಎಳ್ಳು ಬೆಲ್ಲ',
    description: 'Our signature traditional mix. Hand-cleaned sesame, premium jaggery, and perfectly roasted nuts. Prepared with love in our family kitchen following decades-old recipes.',
    imageUrl: '/helu.jpeg',
    gallery: ['/helu2.jpeg', '/helu.jpeg'],
    category: 'traditional',
    availableQuantities: ['250g (Pouch)', '500g (1/2 KG)', '1kg (Full KG)', 'Bulk (Custom Order)']
  },
  {
    id: 'sakre-achu',
    name: 'Traditional Sakre Achu',
    kannadaName: 'ಸಕ್ಕರೆ ಅಚ್ಚು (ಸಾಂಪ್ರದಾಯಿಕ)',
    description: 'Artistically crafted sugar molds in various shapes. We use age-old wooden molds to ensure the perfect texture and traditional look. Freshly made in our home kitchen.',
    imageUrl: '/sakre1.jpeg',
    gallery: ['/sakre1.jpeg', '/sakre2.jpeg'],
    category: 'sweet',
    availableQuantities: ['Pairs', 'Set of 5', 'Set of 10', 'Bulk Pack']
  },
  {
    id: 'cutted-bella',
    name: 'Cutted Bella (Premium Jaggery)',
    kannadaName: 'ಕತ್ತರಿಸಿದ ಬೆಲ್ಲ',
    description: 'Pure, organic jaggery cut into perfect bite-sized cubes. Known for its rich dark color and deep sweetness, essential for the festive spirit.',
    imageUrl: 'public/bella.jpeg',
    category: 'sweet',
    availableQuantities: ['250g', '500g', '1kg', '5kg Bucket']
  },
  {
    id: 'jeerige-peppermint',
    name: 'Jeerige Peppermint',
    kannadaName: 'ಜೀರಿಗೆ ಪೆಪ್ಪರ್‌ಮೆಂಟ್',
    description: 'Refreshing sugar-boiled confectionery infused with the cooling essence of cumin (Jeerige). A nostalgic treat that balances the sweetness of the festive platter.',
    imageUrl: 'public/jerge.jpeg',
    category: 'sweet',
    availableQuantities: ['100g', '250g', '500g']
  },
  {
    id: 'bili-ellu',
    name: 'Bili Ellu (White Sesame)',
    kannadaName: 'ಬಿಳಿ ಎಳ್ಳು',
    description: 'Triple-cleaned, high-quality white sesame seeds. Harvested fresh and perfectly cleaned to form the essential base of your home-made Sankranti treats.',
    imageUrl: 'public/white helu.jpeg',

    category: 'nut',
    availableQuantities: ['250g', '500g', '1kg', 'Bulk']
  },
  {
    id: 'kusuri',
    name: 'Handcrafted Kusuri',
    kannadaName: 'ಕೈಯಿಂದ ಮಾಡಿದ ಕುಸರಿ',
    description: 'Intricate sugar-coated treats that add vibrant colors to your festive platter. A favorite among children and elders alike.',
    imageUrl: 'https://mangalorestore-in.b-cdn.net/wp-content/uploads/2023/12/sankranti-special-kusri-1024x1024.jpg',
    category: 'sweet',
    availableQuantities: ['100g', '250g', '500g']
  },
  {
    id: 'kadle-bejja',
    name: 'Premium Roasted Nuts',
    kannadaName: 'ಹುರಿದ ಕಡಲೆ ಬೀಜ',
    description: 'Only the finest quality groundnuts, slow-roasted to perfection to give that essential crunch to our Ellu-Bella mix.',
    imageUrl: 'public/kadle.jpeg',
    category: 'nut',
    availableQuantities: ['250g', '500g', '1kg']
  },
  {
    id: 'sugar-crystals',
    name: 'Misri / Diamond Sugar',
    kannadaName: 'ಕಲ್ಲು ಸಕ್ಕರೆ / ವಜ್ರದ ಸಕ್ಕರೆ',
    description: 'Sparkling sugar crystals that represent the purity of the harvest festival. Picked for their clarity and sweetness.',
    imageUrl: 'https://m.media-amazon.com/images/I/61Ep81ZchAL._AC_UF894,1000_QL80_.jpg',
    category: 'sweet',
    availableQuantities: ['250g', '500g', '1kg']
  }
];