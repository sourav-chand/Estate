import type { Banner } from '../types';

export const banners: Banner[] = [
  {
    id: 'ban1',
    title: 'Wedding Season Collection',
    subtitle: 'Discover handcrafted bridal jewellery that tells your love story. Up to 40% off on all wedding sets.',
    image: 'https://images.unsplash.com/photo-1515562141589-67f0d727b750?w=1400&h=600&fit=crop',
    ctaText: 'Shop Wedding Jewellery',
    ctaLink: '/collection/wedding-season',
  },
  {
    id: 'ban2',
    title: 'Rose Gold Romance',
    subtitle: 'The warmth of rose gold meets timeless elegance. New arrivals starting at ₹499.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1400&h=600&fit=crop',
    ctaText: 'Explore Rose Gold',
    ctaLink: '/collection/rose-gold',
  },
  {
    id: 'ban3',
    title: 'Crystal Blooms',
    subtitle: 'Sparkling crystals inspired by nature\'s finest blooms. Flat 35% off on the entire collection.',
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=1400&h=600&fit=crop',
    ctaText: 'Shop Crystal Blooms',
    ctaLink: '/collection/crystal-blooms',
  },
];
