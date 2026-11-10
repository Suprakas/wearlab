/**
 * WearLab Product Configuration Data
 * Central source of truth for all product options, pricing rules, and defaults.
 */

export const PRODUCT_INFO = {
  id: 'everyday-cotton-tee',
  name: 'Everyday Cotton Tee',
  tagline: 'Make it yours.',
  description:
    'Crafted from 100% premium combed organic cotton. Tailored for daily comfort with double-stitched seams and a pre-shrunk finish.',
  basePrice: 699,
  giftPackagingPrice: 79,
};

export const COLORS = [
  {
    id: 'cloud-white',
    name: 'Cloud White',
    hex: '#F5F2EA',
    border: '#D9D5CC',
    printContrast: 'dark',
  },
  {
    id: 'midnight',
    name: 'Midnight',
    hex: '#252733',
    border: '#1B1D27',
    printContrast: 'light',
  },
  {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    hex: '#426FA8',
    border: '#325785',
    printContrast: 'light',
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    hex: '#38634B',
    border: '#294B38',
    printContrast: 'light',
  },
  {
    id: 'rose',
    name: 'Rose',
    hex: '#C98191',
    border: '#A86675',
    printContrast: 'dark',
  },
  {
    id: 'lavender',
    name: 'Lavender',
    hex: '#9B8BC2',
    border: '#7E6EA7',
    printContrast: 'dark',
  },
];

export const SIZES = [
  { id: 'S', label: 'S', surcharge: 0 },
  { id: 'M', label: 'M', surcharge: 0 },
  { id: 'L', label: 'L', surcharge: 0 },
  { id: 'XL', label: 'XL', surcharge: 0 },
  { id: 'XXL', label: 'XXL', surcharge: 100, note: '+₹100 surcharge' },
];

export const PRINTS = [
  {
    id: 'plain',
    name: 'Plain',
    price: 0,
    description: 'Clean look, no chest graphic',
  },
  {
    id: 'react',
    name: 'React',
    price: 150,
    description: 'Atomic symbol chest print',
  },
  {
    id: 'developer',
    name: 'Developer',
    price: 100,
    description: '</> code tag chest print',
  },
];

export const DEFAULT_CUSTOMIZATION = {
  color: 'cloud-white',
  size: 'M',
  print: 'plain',
  giftPackaging: false,
};
