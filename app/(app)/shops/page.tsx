// app/(app)/shops/page.tsx

'use client';

import { useState, useMemo } from 'react';
import { 
  MapPin, Star, CheckCircle2, Search, X, ChevronDown, 
  Map, ArrowLeft, ArrowUpDown
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// --- Mock Data ---
const MOCK_SHOPS = [
  { id: '1', name: 'Kings Auto Parts', subtitle: 'Genuine & Aftermarket', rating: 4.8, reviews: 120, distance: 2.3, location: 'Kirinyaga Rd, Nairobi', image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=600', verified: true, open: true, city: 'Nairobi' },
  { id: '2', name: 'Motor City Spares', subtitle: 'Genuine & Aftermarket', rating: 4.8, reviews: 95, distance: 4.1, location: 'Ngong Rd, Nairobi', image: 'https://images.unsplash.com/photo-1590496793907-4e6a1e5b3b6f?auto=format&fit=crop&q=80&w=600', verified: true, open: true, city: 'Nairobi' },
  { id: '3', name: 'Japan Spares', subtitle: 'Genuine & Aftermarket', rating: 4.8, reviews: 210, distance: 5.6, location: 'Mombasa Rd, Nairobi', image: 'https://images.unsplash.com/photo-1550132855-4b2c2c6e0e6a?auto=format&fit=crop&q=80&w=600', verified: true, open: false, city: 'Nairobi' },
  { id: '4', name: 'Autoxperts', subtitle: 'Genuine & Aftermarket', rating: 4.8, reviews: 88, distance: 6.8, location: 'Lusaka Rd, Nairobi', image: 'https://images.unsplash.com/photo-1504222490345-c075b6008014?auto=format&fit=crop&q=80&w=600', verified: true, open: true, city: 'Nairobi' },
  { id: '5', name: 'Premier Auto Spares', subtitle: 'Genuine & Aftermarket', rating: 4.7, reviews: 156, distance: 8.2, location: 'Thika Rd, Nairobi', image: 'https://images.unsplash.com/photo-1549468057-5b7fa1a41d7a?auto=format&fit=crop&q=80&w=600', verified: true, open: true, city: 'Nairobi' },
  { id: '6', name: 'Value Spares', subtitle: 'Genuine & Aftermarket', rating: 4.6, reviews: 72, distance: 9.4, location: 'Kiambu Rd, Nairobi', image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&q=80&w=600', verified: true, open: false, city: 'Nairobi' },
];

const FILTERS = ['Verified Only', 'Open Now', 'Top Rated', 'Nearest'];
const LOCATIONS = ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru'];

export default function ShopsPage() {
  // --- State ---
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('nearest'); // default for shops
  const [isSortOpen, setIsSortOpen] = useState(false);
  
  // Mobile Drawer State
  const [isLocationSheetOpen, setIsLocationSheetOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Nairobi');

  // --- Toggles ---
  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  // --- Filtering Logic ---
  const filteredAndSortedShops = useMemo(() => {
    let result = [...MOCK_SHOPS];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(shop => shop.name.toLowerCase().includes(q) || shop.location.toLowerCase().includes(q));
    }

    // Filters
    if (activeFilters.includes('Verified Only')) result = result.filter(s => s.verified);
    if (activeFilters.includes('Open Now')) result = result.filter(s => s.open);
    if (activeFilters.includes('Top Rated')) result = result.filter(s => s.rating >= 4.7);

    // Sort
    if (sortBy === 'nearest' || activeFilters.includes('Nearest')) {
      result.sort((a, b) => a.distance - b.distance);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [searchQuery, activeFilters, sortBy]);

  const getSortLabel = () => {
    switch (sortBy) {
      case 'rating': return 'Top Rated';
      case 'nearest':
      default: return 'Nearest';
    }
  };

  return (
    <div className="bg-charcoal min-h-screen pb-32 lg:pb-20">
      
      {/* ====================================================================== */}
      {/* DESKTOP VIEW */}
      {/* ====================================================================== */}
      <div className="hidden lg:block">
        
        {/* STICKY DESKTOP HEADER (Always visible) */}
        <div className="sticky top-0 z-40 bg-charcoal border-b border-border-subtle/50 shadow-sm">
          <div className="container mx-auto px-4 pt-8 pb-4">
            
            {/* Page Title */}
            <div className="flex items-center gap-4 mb-6">
               <Link href="/" className="p-2 bg-charcoal-elevated rounded-full hover:bg-charcoal-higher transition-colors">
                  <ArrowLeft className="h-5 w-5 text-text-primary" />
               </Link>
               <div>
                 <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Verified Shops</h1>
                 <p className="text-sm text-text-secondary mt-1">Showing {filteredAndSortedShops.length} shops</p>
               </div>
            </div>

            {/* Desktop Search & Filter Bar */}
            <div className="flex items-center justify-between">
              
              <div className="flex items-center gap-2 flex-1 max-w-xl">
                <div className="flex-1 flex items-center gap-2 h-11 px-4 bg-charcoal-elevated rounded-full border border-border-subtle focus-within:border-primary/50 transition-colors">
                  <Search className="h-4 w-4 text-text-muted" />
                  <input 
                    type="text" 
                    placeholder="Search shop names or locations..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    className="flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted" 
                  />
                  {searchQuery.length > 0 && (
                    <button onClick={() => setSearchQuery('')} className="text-text-muted hover:text-text-primary">
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Desktop Filters */}
              <div className="flex items-center gap-2 ml-4">
                {FILTERS.map(f => (
                  <button 
                    key={f} 
                    onClick={() => toggleFilter(f)}
                    className={cn(
                      "px-4 py-2 rounded-full text-xs font-semibold border transition-colors",
                      activeFilters.includes(f) ? "bg-primary/10 border-primary text-primary" : "bg-charcoal-elevated border-border-subtle text-text-secondary hover:text-text-primary"
                    )}
                  >
                    {f}
                  </button>
                ))}
                
                <div className="relative ml-2">
                  <button onClick={() => setIsSortOpen(!isSortOpen)} className="flex items-center gap-2 h-10 px-4 bg-charcoal-elevated border border-border-subtle rounded-xl text-sm font-medium text-text-primary transition-colors">
                    Sort by: {getSortLabel()}
                    <ChevronDown className={cn("h-3.5 w-3.5 opacity-60 transition-transform", isSortOpen && "rotate-180")} />
                  </button>
                  {isSortOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setIsSortOpen(false)} />
                      <div className="absolute right-0 top-full mt-2 w-48 bg-charcoal-elevated border border-border-subtle rounded-xl shadow-xl py-1 z-20">
                        {['nearest', 'rating'].map(val => (
                          <button key={val} onClick={() => { setSortBy(val); setIsSortOpen(false); }} className={cn("w-full text-left px-4 py-2 text-sm", sortBy === val ? "text-primary font-bold" : "text-text-secondary")}>
                            {val === 'nearest' ? 'Nearest First' : 'Top Rated'}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP GRID */}
        <div className="container mx-auto px-4 py-8">
          {filteredAndSortedShops.length === 0 ? (
            <div className="py-20 text-center"><p className="text-text-primary font-medium text-lg">No shops found</p></div>
          ) : (
            <div className="grid grid-cols-3 gap-6">
              {filteredAndSortedShops.map((shop) => (
                <ShopCard key={shop.id} shop={shop} isMobile={false} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ====================================================================== */}
      {/* MOBILE VIEW */}
      {/* ====================================================================== */}
      <div className="lg:hidden">
        
        {/* Mobile Header */}
        <div className="px-4 py-3 bg-charcoal sticky top-0 z-40 border-b border-border-subtle/30">
          <div className="flex items-center gap-2">
            <Link href="/" className="p-2 -ml-2 text-text-primary">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex-1 flex items-center gap-2 h-11 px-4 bg-charcoal-elevated rounded-full border border-border-subtle">
              <Search className="h-4 w-4 text-text-muted" />
              <input type="text" placeholder="Auto Parts Shops" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted" />
              {searchQuery.length > 0 && <button onClick={() => setSearchQuery('')}><X className="h-4 w-4 text-text-muted" /></button>}
            </div>
            <button className="p-2 text-text-secondary hover:text-text-primary">
              <Map className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Filter Pills (Sticky) */}
        <div className="px-4 py-3 overflow-x-auto no-scrollbar bg-charcoal sticky top-[68px] z-30 border-b border-border-subtle/30">
          <div className="flex gap-2">
            {/* Location Pill */}
            <button 
              onClick={() => setIsLocationSheetOpen(true)}
              className="whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold bg-primary text-primary-foreground flex items-center gap-1.5"
            >
              <MapPin className="h-3.5 w-3.5" />
              {selectedCity}
            </button>
            
            {/* Other Filters */}
            {FILTERS.map(f => (
              <button 
                key={f} 
                onClick={() => toggleFilter(f)}
                className={cn(
                  "whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors flex items-center gap-1.5",
                  activeFilters.includes(f) 
                    ? "bg-primary text-primary-foreground border-transparent" 
                    : "bg-charcoal-elevated text-text-secondary border-border-subtle"
                )}
              >
                {f === 'Verified Only' && <CheckCircle2 className="h-3.5 w-3.5" />}
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Grid (2-Column) */}
        <div className="px-4 pt-4 pb-6">
          {filteredAndSortedShops.length === 0 ? (
            <div className="py-20 text-center"><p className="text-text-primary font-medium text-lg">No shops found</p></div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {filteredAndSortedShops.map((shop) => (
                <ShopCard key={shop.id} shop={shop} isMobile={true} />
              ))}
            </div>
          )}
        </div>

        {/* Floating Mobile Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-charcoal border-t border-border-subtle/50">
          <div className="flex items-center justify-between bg-charcoal-elevated rounded-full p-2 pl-4 pr-2 border border-border-subtle shadow-lg">
            <span className="text-sm font-semibold text-text-primary">
              Showing {filteredAndSortedShops.length} shops
            </span>
            
            <div className="relative">
              <button onClick={() => setIsSortOpen(!isSortOpen)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-charcoal text-primary text-sm font-bold">
                <ArrowUpDown className="h-3.5 w-3.5" />
                Sort by: {getSortLabel()}
                <ChevronDown className={cn("h-3.5 w-3.5 opacity-60", isSortOpen && "rotate-180")} />
              </button>
              
              {isSortOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsSortOpen(false)} />
                  <div className="absolute right-0 bottom-full mb-2 w-48 bg-charcoal-elevated border border-border-subtle rounded-xl shadow-xl py-1 z-50">
                    {['nearest', 'rating'].map(val => (
                      <button key={val} onClick={() => { setSortBy(val); setIsSortOpen(false); }} className={cn("w-full text-left px-4 py-2 text-sm", sortBy === val ? "text-primary font-bold" : "text-text-secondary")}>
                        {val === 'nearest' ? 'Nearest First' : 'Top Rated'}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Location Bottom Sheet */}
        {isLocationSheetOpen && (
          <div className="fixed inset-0 z-[100] flex flex-col justify-end">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in" onClick={() => setIsLocationSheetOpen(false)} />
            
            <div className="relative bg-charcoal w-full rounded-t-3xl border-t border-border-subtle shadow-2xl flex flex-col animate-in slide-in-from-bottom duration-300 pb-8">
              <div className="flex items-center justify-between p-4 border-b border-border-subtle/50 shrink-0">
                <h2 className="text-lg font-bold text-text-primary">Select Location</h2>
                <button onClick={() => setIsLocationSheetOpen(false)} className="p-1 bg-charcoal-elevated rounded-full text-text-muted">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-4 space-y-2">
                {LOCATIONS.map(loc => (
                  <button 
                    key={loc} 
                    onClick={() => { setSelectedCity(loc); setIsLocationSheetOpen(false); }}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-xl text-sm font-medium border transition-colors",
                      selectedCity === loc ? "bg-primary/10 border-primary text-primary" : "bg-charcoal-elevated border-border-subtle text-text-secondary"
                    )}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Shop Card Component ---
function ShopCard({ shop, isMobile }: { shop: typeof MOCK_SHOPS[0], isMobile: boolean }) {
  return (
    <Link href={`/shops/${shop.id}`} className="group relative flex flex-col rounded-2xl border border-border-subtle bg-charcoal-elevated overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/30">
      
      {/* Image Area */}
      <div className={cn("relative bg-charcoal w-full shrink-0 overflow-hidden block", isMobile ? "aspect-[4/3]" : "aspect-[4/3]")}>
        <img 
          src={shop.image} 
          alt={shop.name} 
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        
        {/* Verified Badge */}
        <div className={cn(
          "absolute flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-sm z-10",
          isMobile ? "top-2 left-2 px-2 py-0.5 border-none" : "top-3 left-3 px-2.5 py-1 border border-primary/30"
        )}>
          <CheckCircle2 className={cn("text-primary", isMobile ? "h-3 w-3" : "h-3.5 w-3.5")} />
          <span className={cn("font-bold text-primary uppercase tracking-wider", isMobile ? "text-[9px]" : "text-[10px]")}>Verified</span>
        </div>

        {/* Rating Badge */}
        <div className={cn(
          "absolute flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-sm z-10",
          isMobile ? "top-2 right-2 px-2 py-0.5" : "top-3 right-3 px-2.5 py-1"
        )}>
          <Star className={cn("text-secondary fill-secondary", isMobile ? "h-3 w-3" : "h-3.5 w-3.5")} />
          <span className={cn("font-bold text-white", isMobile ? "text-[10px]" : "text-xs")}>{shop.rating}</span>
        </div>
      </div>

      {/* Content Area */}
      <div className={cn("flex flex-col flex-1 relative z-10 bg-charcoal-elevated", isMobile ? "p-3" : "p-4")}>
        <h3 className={cn("font-bold text-text-primary line-clamp-1", isMobile ? "text-sm" : "text-base")}>
          {shop.name}
        </h3>
        <p className={cn("text-text-muted line-clamp-1", isMobile ? "text-[11px] mt-0.5" : "text-xs mt-1")}>
          {shop.subtitle}
        </p>
        
        <div className={cn("mt-auto flex items-center justify-between", isMobile ? "pt-2 mt-2" : "pt-4")}>
          <div className={cn("flex items-center text-text-muted truncate", isMobile ? "gap-1 text-[10px] w-2/3" : "gap-1.5 text-xs w-3/4")}>
            <MapPin className={cn("shrink-0", isMobile ? "h-2.5 w-2.5" : "h-3 w-3")} />
            <span className="truncate">{shop.location}</span>
          </div>
          <span className={cn("font-bold text-primary", isMobile ? "text-[11px]" : "text-sm")}>
            {shop.distance} km
          </span>
        </div>
      </div>
    </Link>
  );
}