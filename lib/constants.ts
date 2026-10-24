// lib/constants.ts

import {
  Home,
  Search,
  Store,
  BookOpen,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

export const SITE_NAME = 'Safari Spares';
export const SITE_DESCRIPTION =
  'Verified Parts. Secure Escrow. Fast Delivery.';
export const SITE_TAGLINE = 'Pata Part. Pata Pap. Pata Sasa.';
export const SITE_URL = 'https://safarispares.com';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Browse Parts', href: '/search', icon: Search },
  { label: 'Shops', href: '/shops', icon: Store },
  { label: 'How It Works', href: '/how-it-works', icon: BookOpen },
  { label: 'For Sellers', href: '/for-sellers', icon: Wrench },
];

export const FOOTER_LINKS = {
  marketplace: [
    { label: 'Browse Parts', href: '/search' },
    { label: 'Verified Shops', href: '/shops' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'For Sellers', href: '/for-sellers' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Careers', href: '/careers' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Use', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
};

export const SOCIAL_LINKS = [
  { label: 'Instagram', href: '#' },
  { label: 'Twitter', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'WhatsApp', href: '#' },
];

// Categories for the marketplace — used by search filters and home feed
export const PART_CATEGORIES = [
  { label: 'Engine & Drivetrain', value: 'engine-drivetrain' },
  { label: 'Brakes & Suspension', value: 'brakes-suspension' },
  { label: 'Body & Exterior', value: 'body-exterior' },
  { label: 'Electrical & Lighting', value: 'electrical-lighting' },
  { label: 'Filters & Fluids', value: 'filters-fluids' },
  { label: 'Tyres & Wheels', value: 'tyres-wheels' },
  { label: 'Interior & Accessories', value: 'interior-accessories' },
  { label: 'Tools & Equipment', value: 'tools-equipment' },
];

// Common vehicle makes in Kenya — for fitment filter
export const VEHICLE_MAKES = [
  'Toyota',
  'Nissan',
  'Subaru',
  'Mazda',
  'Mitsubishi',
  'Honda',
  'Suzuki',
  'Isuzu',
  'Ford',
  'Volkswagen',
  'Mercedes-Benz',
  'BMW',
];

// Common counties for location filter
export const KENYA_COUNTIES = [
  'Nairobi',
  'Mombasa',
  'Kisumu',
  'Nakuru',
  'Eldoret',
  'Thika',
  'Machakos',
  'Nyeri',
  'Meru',
];