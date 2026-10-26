/* eslint-disable react-hooks/set-state-in-effect */
// app/(app)/search/page.tsx

'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  SlidersHorizontal, MapPin, CheckCircle2, ChevronDown, 
  Heart, Search, X, ArrowUpDown, ArrowLeft 
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { PART_CATEGORIES } from '@/lib/constants';
import { CategoryStrip } from '@/components/layout/CategoryStrip';

// --- Mock Data ---
const MOCK_PARTS = [
  // ENGINE
  { id: '1', title: 'Full Engine 1KD-FTV', category: 'engine-drivetrain', type: 'Full Engines', fitment: 'Toyota Hilux 2005-2015', price: 250000, make: 'Toyota', condition: 'Used', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=400', verified: true },
  { id: '2', title: 'Full Engine 2JZ-GTE', category: 'engine-drivetrain', type: 'Full Engines', fitment: 'Toyota Supra 1993-1998', price: 450000, make: 'Toyota', condition: 'Used', location: 'Mombasa', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=400', verified: true },
  { id: '3', title: 'Engine Block 1KD', category: 'engine-drivetrain', type: 'Engine Blocks', fitment: 'Toyota Hilux 2005-2015', price: 65000, make: 'Toyota', condition: 'Used', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=400', verified: true },
  { id: '4', title: 'Engine Block 2E', category: 'engine-drivetrain', type: 'Engine Blocks', fitment: 'Toyota Corolla 1992-1998', price: 35000, make: 'Toyota', condition: 'Refurbished', location: 'Nakuru', image: 'https://images.unsplash.com/photo-1589143686997-3c6b065e3a6e?auto=format&fit=crop&q=80&w=400', verified: true },
  { id: '5', title: 'Piston Set (Std)', category: 'engine-drivetrain', type: 'Pistons & Rings', fitment: 'Toyota Premio 2007-2012', price: 22000, make: 'Toyota', condition: 'New', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1555626906-fcf10d6851b4?auto=format&fit=crop&q=80&w=400', verified: true },
  { id: '6', title: 'Piston Rings (0.5mm)', category: 'engine-drivetrain', type: 'Pistons & Rings', fitment: 'Nissan Note 2010-2014', price: 8500, make: 'Nissan', condition: 'New', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1555626906-fcf10d6851b4?auto=format&fit=crop&q=80&w=400', verified: true },
  { id: '7', title: 'Cylinder Head 1NZ', category: 'engine-drivetrain', type: 'Cylinder Heads', fitment: 'Toyota Allion 2007-2011', price: 38500, make: 'Toyota', condition: 'Refurbished', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1589143686997-3c6b065e3a6e?auto=format&fit=crop&q=80&w=400', verified: true },
  { id: '8', title: 'Cylinder Head 2JZ', category: 'engine-drivetrain', type: 'Cylinder Heads', fitment: 'Toyota Supra 1993-1998', price: 120000, make: 'Toyota', condition: 'Used', location: 'Mombasa', image: 'https://images.unsplash.com/photo-1589143686997-3c6b065e3a6e?auto=format&fit=crop&q=80&w=400', verified: true },
  { id: '9', title: 'Turbocharger CT9', category: 'engine-drivetrain', type: 'Turbochargers', fitment: 'Toyota Fielder 2012-2018', price: 45000, make: 'Toyota', condition: 'Used', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=400', verified: true },
  { id: '10', title: 'Turbocharger VF34', category: 'engine-drivetrain', type: 'Turbochargers', fitment: 'Subaru Impreza 2001-2007', price: 55000, make: 'Subaru', condition: 'Used', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=400', verified: true },

  // BRAKES
  { id: '11', title: 'Brake Pads (Front)', category: 'brakes-suspension', type: 'Brake Pads', fitment: 'Nissan Note 2010-2014', price: 8500, make: 'Nissan', condition: 'New', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=400', verified: true },
  { id: '12', title: 'Brake Disc Rotors', category: 'brakes-suspension', type: 'Brake Discs', fitment: 'Toyota Fielder 2012-2018', price: 18500, make: 'Toyota', condition: 'New', location: 'Mombasa', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=400', verified: true },
  { id: '13', title: 'Shock Absorber (Front)', category: 'brakes-suspension', type: 'Shock Absorbers', fitment: 'Subaru Forester 2008-2012', price: 22000, make: 'Subaru', condition: 'Used', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1589143686997-3c6b065e3a6e?auto=format&fit=crop&q=80&w=400', verified: true },
  { id: '14', title: 'Suspension Springs', category: 'brakes-suspension', type: 'Suspension', fitment: 'Mazda Demio 2010-2014', price: 15000, make: 'Mazda', condition: 'New', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1589143686997-3c6b065e3a6e?auto=format&fit=crop&q=80&w=400', verified: true },

  // BODY
  { id: '15', title: 'Side Mirror Assembly', category: 'body-exterior', type: 'Mirrors', fitment: 'Subaru Impreza 2010-2015', price: 12000, make: 'Subaru', condition: 'Used', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=400', verified: true },
  { id: '16', title: 'Headlight Pair', category: 'body-exterior', type: 'Headlights', fitment: 'Toyota Fielder 2012-2018', price: 25000, make: 'Toyota', condition: 'Used', location: 'Mombasa', image: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=400', verified: true },
  { id: '17', title: 'Front Bumper', category: 'body-exterior', type: 'Bumpers', fitment: 'Nissan Note 2010-2014', price: 18500, make: 'Nissan', condition: 'New', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=400', verified: true },
  
  // ELECTRICAL
  { id: '18', title: 'Alternator 12V', category: 'electrical-lighting', type: 'Alternators', fitment: 'Toyota Corolla 2008-2013', price: 8500, make: 'Toyota', condition: 'Used', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=400', verified: true },
  { id: '19', title: 'Starter Motor', category: 'electrical-lighting', type: 'Starters', fitment: 'Nissan Note 2010-2014', price: 12000, make: 'Nissan', condition: 'Used', location: 'Mombasa', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=400', verified: true },
];

// --- Dynamic Sub-Categories per main category ---
const SUBCATEGORIES_MAP: Record<string, string[]> = {
  'engine-drivetrain': ['All Engine', 'Full Engines', 'Engine Blocks', 'Pistons & Rings', 'Cylinder Heads', 'Turbochargers'],
  'brakes-suspension': ['All Brakes', 'Brake Pads', 'Brake Discs', 'Shock Absorbers', 'Suspension'],
  'body-exterior': ['All Body', 'Mirrors', 'Headlights', 'Bumpers', 'Doors'],
  'electrical-lighting': ['All Electrical', 'Alternators', 'Starters', 'Batteries', 'Lighting'],
  'filters-fluids': ['All Filters', 'Oil Filters', 'Air Filters', 'Fuel Filters'],
  'tyres-wheels': ['All Tyres', 'Tyres', 'Rims', 'Wheel Covers'],
  'interior-accessories': ['All Interior', 'Seats', 'Steering Wheels', 'Dashboards'],
  'tools-equipment': ['All Tools', 'Hand Tools', 'Power Tools', 'Diagnostics'],
  'all': ['All Parts'],
};

const MAKES = ['Toyota', 'Nissan', 'Subaru', 'Mazda', 'Mitsubishi'];
const CONDITIONS = ['New', 'Used', 'Refurbished'];
const LOCATIONS = ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru'];
const PRICE_RANGES = ['Under 10k', '10k - 50k', 'Over 50k'];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') ?? 'all';
  
  // Dynamic sub-categories based on the active category
  const SUB_CATEGORIES = SUBCATEGORIES_MAP[activeCategory] ?? ['All Parts'];
  
  // --- State ---
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [activeSubCategory, setActiveSubCategory] = useState(SUB_CATEGORIES[0]);
  
  const [selectedMakes, setSelectedMakes] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  
  // --- Sticky Header Scroll State ---
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset subcategory when main category changes
  useEffect(() => {
    setActiveSubCategory(SUB_CATEGORIES[0]);
  }, [activeCategory]);

  const categoryLabel = activeCategory === 'all' 
    ? 'All Parts' 
    : PART_CATEGORIES.find(c => c.value === activeCategory)?.label ?? 'Search Results';

  const toggleFilter = (value: string, list: string[], setList: (l: string[]) => void) => {
    setList(list.includes(value) ? list.filter(item => item !== value) : [...list, value]);
  };

  const resetFilters = () => {
    setSelectedMakes([]);
    setSelectedConditions([]);
    setSelectedLocations([]);
    setSelectedPriceRange(null);
  };

  // --- Filtering Logic ---
  const filteredAndSortedParts = useMemo(() => {
    let result = [...MOCK_PARTS];

    // 1. Main Category
    if (activeCategory !== 'all') {
      result = result.filter(part => part.category === activeCategory);
    }

    // 2. Sub-Category (only apply if not "All [X]")
    const isAllSubcategory = activeSubCategory.toLowerCase().startsWith('all');
    if (!isAllSubcategory) {
      result = result.filter(part => part.type === activeSubCategory);
    }

    // 3. Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(part => part.title.toLowerCase().includes(q) || part.fitment.toLowerCase().includes(q));
    }

    // 4. Sidebar Filters
    if (selectedMakes.length > 0) result = result.filter(part => selectedMakes.includes(part.make));
    if (selectedConditions.length > 0) result = result.filter(part => selectedConditions.includes(part.condition));
    if (selectedLocations.length > 0) result = result.filter(part => selectedLocations.includes(part.location));
    
    if (selectedPriceRange) {
      if (selectedPriceRange === 'Under 10k') result = result.filter(p => p.price < 10000);
      if (selectedPriceRange === '10k - 50k') result = result.filter(p => p.price >= 10000 && p.price <= 50000);
      if (selectedPriceRange === 'Over 50k') result = result.filter(p => p.price > 50000);
    }

    // 5. Sort
    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'newest') result.sort((a, b) => b.id.localeCompare(a.id));

    return result;
  }, [activeCategory, searchQuery, selectedMakes, selectedConditions, selectedLocations, selectedPriceRange, sortBy, activeSubCategory]);

  const getSortLabel = () => {
    switch (sortBy) {
      case 'price-low': return 'Price: Low';
      case 'price-high': return 'Price: High';
      case 'newest': return 'Newest';
      default: return 'Relevance';
    }
  };

  const hasActiveFilters = selectedMakes.length > 0 || selectedConditions.length > 0 || selectedLocations.length > 0 || selectedPriceRange !== null;

  return (
    <div className="bg-charcoal min-h-screen pb-32 lg:pb-20">
      
      {/* ====================================================================== */}
      {/* DESKTOP VIEW */}
      {/* ====================================================================== */}
      <div className="hidden lg:block">
        
        {/* STICKY DESKTOP HEADER */}
        <div className="sticky top-0 z-40 bg-charcoal border-b border-border-subtle/50 shadow-sm">
          
          {/* Category Strip */}
          <div className="category-strip-wrapper">
            <CategoryStrip />
          </div>

          <div className="container mx-auto px-4">
            
            {/* Page Title (Hides smoothly when scrolling) */}
            <div 
              className={cn(
                "flex items-center gap-4 transition-all duration-300 ease-in-out overflow-hidden",
                isScrolled ? "max-h-0 opacity-0 mt-0 mb-0 pt-0 pb-0" : "max-h-32 opacity-100 pt-6 pb-2"
              )}
            >
               <Link href="/" className="p-2 bg-charcoal-elevated rounded-full hover:bg-charcoal-higher transition-colors">
                  <ArrowLeft className="h-5 w-5 text-text-primary" />
               </Link>
               <div>
                 <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">{categoryLabel}</h1>
                 <p className="text-sm text-text-secondary mt-1">Showing {filteredAndSortedParts.length} parts</p>
               </div>
            </div>

            {/* Subcategories & Sort (Always visible in sticky header) */}
            <div className={cn(
              "flex items-center justify-between transition-all duration-300",
              isScrolled ? "py-3" : "py-4"
            )}>
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {SUB_CATEGORIES.map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => setActiveSubCategory(cat)} 
                    className={cn(
                      "whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-semibold transition-colors",
                      activeSubCategory === cat 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-charcoal-elevated text-text-secondary border border-border-subtle hover:border-primary/30"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative shrink-0 ml-4">
                <button onClick={() => setIsSortOpen(!isSortOpen)} className="flex items-center gap-2 h-10 px-4 bg-charcoal-elevated border border-border-subtle rounded-xl text-sm font-medium text-text-primary transition-colors">
                  Sort by: {getSortLabel()}
                  <ChevronDown className={cn("h-3.5 w-3.5 opacity-60 transition-transform", isSortOpen && "rotate-180")} />
                </button>
                {isSortOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsSortOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-48 bg-charcoal-elevated border border-border-subtle rounded-xl shadow-xl py-1 z-20">
                      {['relevance', 'newest', 'price-low', 'price-high'].map(val => (
                        <button key={val} onClick={() => { setSortBy(val); setIsSortOpen(false); }} className={cn("w-full text-left px-4 py-2 text-sm", sortBy === val ? "text-primary font-bold" : "text-text-secondary")}>
                          {val === 'relevance' ? 'Relevance' : val === 'newest' ? 'Newest Arrivals' : val === 'price-low' ? 'Price: Low to High' : 'Price: High to Low'}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* DESKTOP CONTENT (Grid & Sidebar) */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8 pb-12">
            <aside className="w-64 shrink-0 space-y-6">
              <div className={cn(
                "p-5 rounded-2xl border border-border-subtle bg-charcoal-elevated sticky transition-all duration-300",
                isScrolled ? "top-[100px]" : "top-[220px]"
              )}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-text-primary text-sm uppercase tracking-wider">Filters</h3>
                  {hasActiveFilters && (
                    <button onClick={resetFilters} className="text-xs text-primary font-semibold hover:underline">Reset</button>
                  )}
                </div>

                <h4 className="font-medium text-text-primary mb-3 text-sm">Vehicle Make</h4>
                <div className="space-y-2.5 mb-6">
                  {MAKES.map(make => (
                    <label key={make} className="flex items-center gap-2.5 text-sm text-text-secondary hover:text-text-primary cursor-pointer">
                      <input type="checkbox" checked={selectedMakes.includes(make)} onChange={() => toggleFilter(make, selectedMakes, setSelectedMakes)} className="rounded border-border-subtle accent-primary" />
                      {make}
                    </label>
                  ))}
                </div>

                <hr className="my-5 border-border-subtle" />

                <h4 className="font-medium text-text-primary mb-3 text-sm">Condition</h4>
                <div className="space-y-2.5">
                  {CONDITIONS.map(cond => (
                    <label key={cond} className="flex items-center gap-2.5 text-sm text-text-secondary hover:text-text-primary cursor-pointer">
                      <input type="checkbox" checked={selectedConditions.includes(cond)} onChange={() => toggleFilter(cond, selectedConditions, setSelectedConditions)} className="rounded border-border-subtle accent-primary" />
                      {cond}
                    </label>
                  ))}
                </div>
              </div>
            </aside>

            <div className="flex-1">
              {filteredAndSortedParts.length === 0 ? (
                <div className="py-20 text-center"><p className="text-text-primary font-medium text-lg">No parts found</p></div>
              ) : (
                <div className="grid grid-cols-3 gap-5">
                  {filteredAndSortedParts.map((part) => <PartCard key={part.id} part={part} isMobile={false} />)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================== */}
      {/* MOBILE VIEW */}
      {/* ====================================================================== */}
      <div className="lg:hidden">
        <div className="px-4 py-3 bg-charcoal sticky top-0 z-40 border-b border-border-subtle/30">
          <div className="flex items-center gap-2">
            <Link href="/" className="p-2 -ml-2 text-text-primary">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex-1 flex items-center gap-2 h-11 px-4 bg-charcoal-elevated rounded-full border border-border-subtle">
              <Search className="h-4 w-4 text-text-muted" />
              <input type="text" placeholder="Search parts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted" />
              {searchQuery.length > 0 && <button onClick={() => setSearchQuery('')}><X className="h-4 w-4 text-text-muted" /></button>}
            </div>
            <button onClick={() => setIsFilterDrawerOpen(true)} className="relative p-2 text-text-secondary hover:text-text-primary">
              <SlidersHorizontal className="h-5 w-5" />
              {hasActiveFilters && <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-primary border-2 border-charcoal" />}
            </button>
          </div>
        </div>

        <div className="px-4 py-3 overflow-x-auto no-scrollbar bg-charcoal sticky top-[68px] z-30 border-b border-border-subtle/30">
          <div className="flex gap-2">
            {SUB_CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveSubCategory(cat)} className={cn("whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold", activeSubCategory === cat ? "bg-primary text-primary-foreground" : "bg-charcoal-elevated text-text-secondary border border-border-subtle")}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 pt-4 pb-6">
          {filteredAndSortedParts.length === 0 ? (
            <div className="py-20 text-center"><p className="text-text-primary font-medium text-lg">No parts found</p></div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {filteredAndSortedParts.map((part) => <PartCard key={part.id} part={part} isMobile={true} />)}
            </div>
          )}
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-charcoal border-t border-border-subtle/50">
          <div className="flex items-center justify-between bg-charcoal-elevated rounded-full p-2 pl-4 pr-2 border border-border-subtle shadow-lg">
            <span className="text-sm font-semibold text-text-primary">Showing {filteredAndSortedParts.length} parts</span>
            <div className="relative">
              <button onClick={() => setIsSortOpen(!isSortOpen)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-charcoal text-primary text-sm font-bold">
                <ArrowUpDown className="h-3.5 w-3.5" />
                Sort: {getSortLabel()}
                <ChevronDown className={cn("h-3.5 w-3.5 opacity-60", isSortOpen && "rotate-180")} />
              </button>
              {isSortOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsSortOpen(false)} />
                  <div className="absolute right-0 bottom-full mb-2 w-48 bg-charcoal-elevated border border-border-subtle rounded-xl shadow-xl py-1 z-50">
                    {['relevance', 'newest', 'price-low', 'price-high'].map(val => (
                      <button key={val} onClick={() => { setSortBy(val); setIsSortOpen(false); }} className={cn("w-full text-left px-4 py-2 text-sm", sortBy === val ? "text-primary font-bold" : "text-text-secondary")}>
                        {val === 'relevance' ? 'Relevance' : val === 'newest' ? 'Newest Arrivals' : val === 'price-low' ? 'Price: Low to High' : 'Price: High to Low'}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {isFilterDrawerOpen && (
          <div className="fixed inset-0 z-[100] flex flex-col justify-end">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in" onClick={() => setIsFilterDrawerOpen(false)} />
            <div className="relative bg-charcoal w-full rounded-t-3xl border-t border-border-subtle shadow-2xl flex flex-col max-h-[85vh] animate-in slide-in-from-bottom duration-300">
              <div className="flex items-center justify-between p-4 border-b border-border-subtle/50 shrink-0">
                <h2 className="text-lg font-bold text-text-primary">Filters</h2>
                <div className="flex items-center gap-4">
                  <button onClick={resetFilters} className="text-sm font-semibold text-primary">Reset</button>
                  <button onClick={() => setIsFilterDrawerOpen(false)} className="p-1 bg-charcoal-elevated rounded-full text-text-muted">
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="overflow-y-auto p-4 space-y-6 flex-1">
                <div>
                  <h3 className="font-semibold text-text-primary mb-3">Vehicle Make</h3>
                  <div className="flex flex-wrap gap-2">
                    {MAKES.map(make => (
                      <button key={make} onClick={() => toggleFilter(make, selectedMakes, setSelectedMakes)} className={cn("px-4 py-2 rounded-xl text-sm font-medium border transition-colors", selectedMakes.includes(make) ? "bg-primary/10 border-primary text-primary" : "bg-charcoal-elevated border-border-subtle text-text-secondary")}>
                        {make}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-3">Condition</h3>
                  <div className="flex flex-wrap gap-2">
                    {CONDITIONS.map(cond => (
                      <button key={cond} onClick={() => toggleFilter(cond, selectedConditions, setSelectedConditions)} className={cn("px-4 py-2 rounded-xl text-sm font-medium border transition-colors", selectedConditions.includes(cond) ? "bg-primary/10 border-primary text-primary" : "bg-charcoal-elevated border-border-subtle text-text-secondary")}>
                        {cond}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-3">Location</h3>
                  <div className="flex flex-wrap gap-2">
                    {LOCATIONS.map(loc => (
                      <button key={loc} onClick={() => toggleFilter(loc, selectedLocations, setSelectedLocations)} className={cn("px-4 py-2 rounded-xl text-sm font-medium border transition-colors", selectedLocations.includes(loc) ? "bg-primary/10 border-primary text-primary" : "bg-charcoal-elevated border-border-subtle text-text-secondary")}>
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-3">Price Range</h3>
                  <div className="flex flex-col gap-2">
                    {PRICE_RANGES.map(range => (
                      <button key={range} onClick={() => setSelectedPriceRange(selectedPriceRange === range ? null : range)} className={cn("text-left px-4 py-3 rounded-xl text-sm font-medium border transition-colors", selectedPriceRange === range ? "bg-primary/10 border-primary text-primary" : "bg-charcoal-elevated border-border-subtle text-text-secondary")}>
                        {range}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-border-subtle/50 shrink-0 pb-8">
                <button onClick={() => setIsFilterDrawerOpen(false)} className="w-full h-12 bg-primary text-primary-foreground rounded-xl font-bold text-base shadow-lg shadow-primary/20 transition-transform active:scale-95">
                  Show {filteredAndSortedParts.length} results
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PartCard({ part, isMobile }: { part: typeof MOCK_PARTS[0], isMobile: boolean }) {
  return (
    <Link href={`/listings/${part.id}`} className="group relative flex flex-col rounded-2xl border border-border-subtle bg-charcoal-elevated overflow-hidden transition-all duration-300 hover:-translate-y-1">
      <div className={cn("relative bg-charcoal w-full shrink-0 overflow-hidden block", isMobile ? "aspect-square" : "aspect-square")}>
        <img src={part.image} alt={part.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className={cn("absolute flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-sm z-10", isMobile ? "top-2 left-2 px-2 py-0.5" : "top-3 left-3 px-2.5 py-1 border border-primary/30")}>
          <CheckCircle2 className={cn("text-primary", isMobile ? "h-3 w-3" : "h-3.5 w-3.5")} />
          <span className={cn("font-bold text-primary uppercase", isMobile ? "text-[9px]" : "text-[10px]")}>Verified</span>
        </div>
        {isMobile && (
          <button className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 text-white/70 z-10">
            <Heart className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className={cn("flex flex-col flex-1 relative z-10 bg-charcoal-elevated", isMobile ? "p-3" : "p-4")}>
        <h3 className={cn("font-bold text-text-primary line-clamp-1", isMobile ? "text-sm" : "text-base")}>{part.title}</h3>
        <p className={cn("text-text-muted line-clamp-1", isMobile ? "text-[11px] mt-0.5" : "text-xs mt-1")}>{part.fitment}</p>
        <div className={cn("mt-auto flex flex-col", isMobile ? "pt-2 gap-1" : "pt-4 gap-2")}>
          <p className={cn("font-bold text-secondary", isMobile ? "text-sm" : "text-lg")}>KES {part.price.toLocaleString()}</p>
          <div className={cn("flex items-center text-text-muted", isMobile ? "gap-1 text-[10px]" : "gap-1.5 text-xs")}>
            <MapPin className={cn("shrink-0", isMobile ? "h-2.5 w-2.5" : "h-3 w-3")} />
            <span className="truncate">{part.location}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}