// app/dashboard/inventory/page.tsx

'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  Plus,
  MoreVertical,
  Edit2,
  Trash2,
  Eye,
  Package,
  CheckCircle2,
  Clock,
  XCircle,
  ChevronDown,
  Filter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// ============================================================
// MOCK DATA (replace with listingApi when ready)
// ============================================================

interface Listing {
  id: string;
  title: string;
  category: string;
  priceKes: number;
  stockStatus: 'in_stock' | 'reserved' | 'out_of_stock';
  views: number;
  imageUrl: string;
  createdAt: string;
}

const MOCK_LISTINGS: Listing[] = [
  { id: '1', title: 'Headlights (Pair)', category: 'Body & Exterior', priceKes: 12500, stockStatus: 'in_stock', views: 342, imageUrl: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=400&auto=format&fit=crop', createdAt: '2026-10-20' },
  { id: '2', title: 'Brake Discs & Pads (Front)', category: 'Brakes & Suspension', priceKes: 9800, stockStatus: 'reserved', views: 218, imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=400&auto=format&fit=crop', createdAt: '2026-10-18' },
  { id: '3', title: 'Side Mirror Assembly', category: 'Body & Exterior', priceKes: 4500, stockStatus: 'in_stock', views: 156, imageUrl: 'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?q=80&w=400&auto=format&fit=crop', createdAt: '2026-10-15' },
  { id: '4', title: 'Alternator 12V', category: 'Electrical & Lighting', priceKes: 18500, stockStatus: 'out_of_stock', views: 89, imageUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=400&auto=format&fit=crop', createdAt: '2026-10-12' },
  { id: '5', title: 'Radiator Fan Assembly', category: 'Engine & Drivetrain', priceKes: 7600, stockStatus: 'in_stock', views: 412, imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=400&auto=format&fit=crop', createdAt: '2026-10-10' },
  { id: '6', title: 'Gear Shift Knob', category: 'Interior & Accessories', priceKes: 1200, stockStatus: 'in_stock', views: 88, imageUrl: 'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?q=80&w=400&auto=format&fit=crop', createdAt: '2026-10-08' },
];

const STATUS_CONFIG = {
  in_stock: { label: 'In Stock', icon: CheckCircle2, color: 'text-primary', bg: 'bg-primary/10 border-primary/20' },
  reserved: { label: 'Reserved', icon: Clock, color: 'text-secondary', bg: 'bg-secondary/10 border-secondary/20' },
  out_of_stock: { label: 'Out of Stock', icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
};

const FILTER_TABS = [
  { label: 'All', value: 'all' },
  { label: 'In Stock', value: 'in_stock' },
  { label: 'Reserved', value: 'reserved' },
  { label: 'Out of Stock', value: 'out_of_stock' },
];

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Filtering
  const filteredListings = useMemo(() => {
    return MOCK_LISTINGS.filter((listing) => {
      const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === 'all' || listing.stockStatus === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredListings.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredListings.map((l) => l.id));
    }
  };

  const handleDelete = (id: string) => {
    toast.success('Listing deleted', { description: 'The listing has been removed from the marketplace.' });
    setOpenMenuId(null);
  };

  const handleBulkDelete = () => {
    toast.success(`${selectedIds.length} listings deleted`);
    setSelectedIds([]);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Inventory</h1>
          <p className="text-sm text-text-secondary mt-1">
            Manage your parts and track their availability.
          </p>
        </div>
        <Link
          href="/dashboard/inventory/new"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-600 transition-colors shrink-0"
        >
          <Plus className="h-4 w-4" />
          Add Listing
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search listings by title or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-11 pr-4 bg-charcoal-elevated border border-border-subtle rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:border-primary outline-none transition-colors"
            />
          </div>
          <button className="inline-flex items-center gap-2 h-11 px-4 bg-charcoal-elevated border border-border-subtle rounded-xl text-sm font-medium text-text-secondary hover:text-text-primary hover:border-primary/30 transition-colors">
            <Filter className="h-4 w-4" />
            Filters
            <ChevronDown className="h-3.5 w-3.5 opacity-60" />
          </button>
        </div>

        {/* Status Tabs */}
        <div className="flex gap-1 p-1 bg-charcoal-elevated rounded-xl border border-border-subtle overflow-x-auto no-scrollbar">
          {FILTER_TABS.map((tab) => {
            const count = tab.value === 'all'
              ? MOCK_LISTINGS.length
              : MOCK_LISTINGS.filter((l) => l.stockStatus === tab.value).length;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={cn(
                  'whitespace-nowrap flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2',
                  activeFilter === tab.value
                    ? 'bg-charcoal text-text-primary shadow-sm'
                    : 'text-text-muted hover:text-text-primary'
                )}
              >
                {tab.label}
                <span className={cn(
                  'text-xs px-1.5 py-0.5 rounded-full',
                  activeFilter === tab.value
                    ? 'bg-primary/15 text-primary'
                    : 'bg-charcoal-higher text-text-muted'
                )}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between p-3 bg-primary/10 border border-primary/20 rounded-xl animate-in fade-in slide-in-from-top-2">
          <p className="text-sm font-medium text-primary">
            {selectedIds.length} selected
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedIds([])}
              className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors px-3 py-1.5 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-1.5 text-sm font-medium text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 transition-colors px-3 py-1.5 rounded-lg"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete Selected
            </button>
          </div>
        </div>
      )}

      {/* Listings Table */}
      <div className="rounded-2xl border border-border-subtle bg-charcoal-elevated overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[auto_1fr_140px_130px_100px_40px] gap-4 items-center px-4 py-3 border-b border-border-subtle bg-charcoal-higher/50">
          <input
            type="checkbox"
            checked={selectedIds.length === filteredListings.length && filteredListings.length > 0}
            onChange={toggleSelectAll}
            className="h-4 w-4 rounded border-border-subtle accent-primary cursor-pointer"
          />
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Listing</span>
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Price</span>
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Status</span>
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Views</span>
          <span></span>
        </div>

        {/* Rows */}
        {filteredListings.length === 0 ? (
          <div className="py-16 text-center text-text-muted">
            <Package className="h-10 w-10 mx-auto mb-3 opacity-20" />
            <p className="text-sm font-medium text-text-primary mb-1">No listings found</p>
            <p className="text-xs">
              {searchQuery || activeFilter !== 'all'
                ? 'Try adjusting your search or filters.'
                : 'Add your first listing to get started.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border-subtle/50">
            {filteredListings.map((listing) => {
              const Status = STATUS_CONFIG[listing.stockStatus];
              const StatusIcon = Status.icon;
              const isSelected = selectedIds.includes(listing.id);

              return (
                <div
                  key={listing.id}
                  className={cn(
                    'group grid grid-cols-[auto_1fr_40px] md:grid-cols-[auto_1fr_140px_130px_100px_40px] gap-4 items-center px-4 py-3 transition-colors relative',
                    isSelected ? 'bg-primary/5' : 'hover:bg-charcoal-higher/50'
                  )}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelect(listing.id)}
                    className="h-4 w-4 rounded border-border-subtle accent-primary cursor-pointer"
                  />

                  {/* Product Info */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-14 w-14 rounded-lg overflow-hidden border border-border-subtle shrink-0 bg-charcoal">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={listing.imageUrl} alt={listing.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-text-primary truncate">{listing.title}</p>
                      <p className="text-xs text-text-muted truncate">{listing.category}</p>
                      {/* Mobile-only status */}
                      <div className="md:hidden flex items-center gap-2 mt-1">
                        <span className={cn('inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold border', Status.bg, Status.color)}>
                          <StatusIcon className="h-2.5 w-2.5" />
                          {Status.label}
                        </span>
                        <span className="text-xs font-bold text-secondary">KES {listing.priceKes.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price (desktop) */}
                  <span className="hidden md:block text-sm font-bold text-secondary tabular-nums">
                    KES {listing.priceKes.toLocaleString()}
                  </span>

                  {/* Status (desktop) */}
                  <div className="hidden md:block">
                    <span className={cn('inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold border', Status.bg, Status.color)}>
                      <StatusIcon className="h-3 w-3" />
                      {Status.label}
                    </span>
                  </div>

                  {/* Views */}
                  <span className="hidden md:flex items-center gap-1 text-sm text-text-muted tabular-nums">
                    <Eye className="h-3.5 w-3.5" />
                    {listing.views}
                  </span>

                  {/* Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === listing.id ? null : listing.id)}
                      className="h-8 w-8 flex items-center justify-center rounded-lg text-text-muted hover:text-text-primary hover:bg-charcoal-higher transition-colors"
                      aria-label="Open menu"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>

                    {openMenuId === listing.id && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setOpenMenuId(null)}
                          aria-hidden="true"
                        />
                        <div className="absolute right-0 top-full mt-1 z-20 w-44 bg-charcoal-elevated border border-border-subtle rounded-xl shadow-[0_10px_24px_rgba(0,0,0,0.6)] py-1 animate-in fade-in zoom-in-95">
                          <Link
                            href={`/listings/${listing.id}`}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-charcoal-higher transition-colors"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            View public page
                          </Link>
                          <Link
                            href={`/dashboard/inventory/${listing.id}/edit`}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-charcoal-higher transition-colors"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                            Edit listing
                          </Link>
                          <button
                            onClick={() => handleDelete(listing.id)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer info */}
      {filteredListings.length > 0 && (
        <div className="flex items-center justify-between text-xs text-text-muted">
          <p>Showing {filteredListings.length} of {MOCK_LISTINGS.length} listings</p>
          <p>Click on a listing to edit</p>
        </div>
      )}
    </div>
  );
}