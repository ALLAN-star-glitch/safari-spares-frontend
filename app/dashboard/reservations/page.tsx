/* eslint-disable @typescript-eslint/no-explicit-any */
// app/dashboard/reservations/page.tsx

'use client';

import { useState, useMemo } from 'react';
import {
  Search,
  CalendarCheck,
  CheckCircle2,
  Clock,
  XCircle,
  Package,
  MapPin,
  ChevronDown,
  Eye,
  Check,
  X,
  Truck,
  MoreVertical,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// ============================================================
// MOCK DATA (replace with useGetReservationsQuery later)
// ============================================================

type ReservationStatus = 'requested' | 'confirmed' | 'picked_up' | 'cancelled' | 'expired';

interface Reservation {
  id: string;
  code: string;
  status: ReservationStatus;
  buyerName: string;
  buyerPhone: string;
  listingTitle: string;
  listingImage: string;
  priceKes: number;
  expiresAt: string;
  createdAt: string;
  clientRef?: string;
}

const MOCK_RESERVATIONS: Reservation[] = [
  {
    id: '1',
    code: 'A7K9M2',
    status: 'requested',
    buyerName: 'Jane Wanjiku',
    buyerPhone: '+254 712 000 111',
    listingTitle: 'Brake Discs & Pads (Front)',
    listingImage: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=400&auto=format&fit=crop',
    priceKes: 9800,
    expiresAt: '2026-10-27T14:00:00Z',
    createdAt: '2026-10-26T14:00:00Z',
    clientRef: 'James Motors - Probox',
  },
  {
    id: '2',
    code: 'B3N7P1',
    status: 'confirmed',
    buyerName: 'John Kamau',
    buyerPhone: '+254 722 333 444',
    listingTitle: 'Headlights (Pair)',
    listingImage: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=400&auto=format&fit=crop',
    priceKes: 12500,
    expiresAt: '2026-10-27T18:00:00Z',
    createdAt: '2026-10-26T12:00:00Z',
  },
  {
    id: '3',
    code: 'C5R2T8',
    status: 'picked_up',
    buyerName: 'Mary Akinyi',
    buyerPhone: '+254 733 555 666',
    listingTitle: 'Side Mirror Assembly',
    listingImage: 'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?q=80&w=400&auto=format&fit=crop',
    priceKes: 4500,
    expiresAt: '2026-10-26T10:00:00Z',
    createdAt: '2026-10-25T10:00:00Z',
  },
  {
    id: '4',
    code: 'D1W6Y4',
    status: 'expired',
    buyerName: 'Peter Otieno',
    buyerPhone: '+254 744 777 888',
    listingTitle: 'Alternator 12V',
    listingImage: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=400&auto=format&fit=crop',
    priceKes: 18500,
    expiresAt: '2026-10-25T18:00:00Z',
    createdAt: '2026-10-24T18:00:00Z',
  },
  {
    id: '5',
    code: 'E9F3H7',
    status: 'cancelled',
    buyerName: 'Sarah Njoki',
    buyerPhone: '+254 755 999 000',
    listingTitle: 'Radiator Fan Assembly',
    listingImage: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=400&auto=format&fit=crop',
    priceKes: 7600,
    expiresAt: '2026-10-26T09:00:00Z',
    createdAt: '2026-10-25T09:00:00Z',
  },
];

const STATUS_CONFIG: Record<ReservationStatus, { label: string; color: string; bg: string; icon: any }> = {
  requested: { label: 'Pending', color: 'text-secondary', bg: 'bg-secondary/10 border-secondary/20', icon: Clock },
  confirmed: { label: 'Confirmed', color: 'text-primary', bg: 'bg-primary/10 border-primary/20', icon: CheckCircle2 },
  picked_up: { label: 'Picked Up', color: 'text-text-secondary', bg: 'bg-charcoal-higher border-border-subtle', icon: Package },
  cancelled: { label: 'Cancelled', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20', icon: XCircle },
  expired: { label: 'Expired', color: 'text-text-muted', bg: 'bg-charcoal-higher border-border-subtle', icon: Clock },
};

const FILTER_TABS: { label: string; value: ReservationStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'requested' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Picked Up', value: 'picked_up' },
  { label: 'Expired', value: 'expired' },
  { label: 'Cancelled', value: 'cancelled' },
];

// ============================================================
// HELPERS
// ============================================================

function timeUntil(dateStr: string): string {
  const diff = new Date(dateStr).getTime() - Date.now();
  if (diff < 0) return 'Expired';
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) {
    const mins = Math.floor(diff / (1000 * 60));
    return `${mins}m left`;
  }
  return `${hours}h left`;
}

// ============================================================
// PAGE
// ============================================================

export default function ReservationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<ReservationStatus | 'all'>('all');
  const [reservations, setReservations] = useState(MOCK_RESERVATIONS);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const filteredReservations = useMemo(() => {
    return reservations.filter((r) => {
      const matchesSearch =
        r.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.listingTitle.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === 'all' || r.status === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [reservations, searchQuery, activeFilter]);

  const updateStatus = (id: string, status: ReservationStatus) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    setOpenMenuId(null);
    const labels: Record<ReservationStatus, string> = {
      requested: 'reset to pending',
      confirmed: 'confirmed',
      picked_up: 'marked as picked up',
      cancelled: 'cancelled',
      expired: 'marked as expired',
    };
    toast.success(`Reservation ${labels[status]}`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Reservations</h1>
        <p className="text-sm text-text-secondary mt-1">
          Manage buyer pickups and track reservation codes.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search by buyer name, code, or part..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-11 pr-4 bg-charcoal-elevated border border-border-subtle rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:border-primary outline-none transition-colors"
          />
        </div>

        {/* Status Tabs */}
        <div className="flex gap-1 p-1 bg-charcoal-elevated rounded-xl border border-border-subtle overflow-x-auto no-scrollbar">
          {FILTER_TABS.map((tab) => {
            const count =
              tab.value === 'all'
                ? reservations.length
                : reservations.filter((r) => r.status === tab.value).length;
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
                <span
                  className={cn(
                    'text-xs px-1.5 py-0.5 rounded-full',
                    activeFilter === tab.value
                      ? 'bg-primary/15 text-primary'
                      : 'bg-charcoal-higher text-text-muted'
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Reservations Table */}
      <div className="rounded-2xl border border-border-subtle bg-charcoal-elevated overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[90px_1fr_180px_140px_100px_40px] gap-4 items-center px-4 py-3 border-b border-border-subtle bg-charcoal-higher/50">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Code</span>
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Listing</span>
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Buyer</span>
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Status</span>
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Time left</span>
          <span></span>
        </div>

        {/* Rows */}
        {filteredReservations.length === 0 ? (
          <div className="py-16 text-center text-text-muted">
            <CalendarCheck className="h-10 w-10 mx-auto mb-3 opacity-20" />
            <p className="text-sm font-medium text-text-primary mb-1">No reservations found</p>
            <p className="text-xs">
              {searchQuery || activeFilter !== 'all'
                ? 'Try adjusting your search or filters.'
                : 'When buyers reserve your parts, they will appear here.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border-subtle/50">
            {filteredReservations.map((reservation) => {
              const Status = STATUS_CONFIG[reservation.status];
              const StatusIcon = Status.icon;
              const timeLeft = timeUntil(reservation.expiresAt);
              const isExpiring =
                reservation.status === 'requested' && timeLeft !== 'Expired' && timeLeft.startsWith('0') === false && parseInt(timeLeft) < 6;

              return (
                <div
                  key={reservation.id}
                  className="group grid grid-cols-[1fr_40px] md:grid-cols-[90px_1fr_180px_140px_100px_40px] gap-4 items-center px-4 py-3 hover:bg-charcoal-higher/50 transition-colors relative"
                >
                  {/* Code */}
                  <div className="hidden md:block">
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-charcoal border border-border-subtle text-xs font-mono font-bold text-text-primary">
                      {reservation.code}
                    </span>
                  </div>

                  {/* Listing + Buyer (stacked on mobile) */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-14 w-14 rounded-lg overflow-hidden border border-border-subtle shrink-0 bg-charcoal">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={reservation.listingImage}
                        alt={reservation.listingTitle}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-text-primary truncate">
                        {reservation.listingTitle}
                      </p>
                      <p className="text-xs text-text-muted truncate">
                        KES {reservation.priceKes.toLocaleString()}
                      </p>

                      {/* Mobile-only: buyer + code + status */}
                      <div className="md:hidden flex flex-wrap items-center gap-2 mt-1">
                        <span className="text-[10px] font-mono font-bold text-text-secondary bg-charcoal px-1.5 py-0.5 rounded border border-border-subtle">
                          {reservation.code}
                        </span>
                        <span className={cn('inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold border', Status.bg, Status.color)}>
                          <StatusIcon className="h-2.5 w-2.5" />
                          {Status.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Buyer */}
                  <div className="hidden md:block min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {reservation.buyerName}
                    </p>
                    <p className="text-xs text-text-muted truncate">{reservation.buyerPhone}</p>
                    {reservation.clientRef && (
                      <p className="text-[10px] text-secondary truncate mt-0.5">
                        Ref: {reservation.clientRef}
                      </p>
                    )}
                  </div>

                  {/* Status */}
                  <div className="hidden md:block">
                    <span
                      className={cn(
                        'inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold border',
                        Status.bg,
                        Status.color
                      )}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {Status.label}
                    </span>
                  </div>

                  {/* Time left */}
                  <span
                    className={cn(
                      'hidden md:inline-flex text-xs font-medium tabular-nums',
                      reservation.status === 'requested'
                        ? 'text-secondary'
                        : 'text-text-muted'
                    )}
                  >
                    {reservation.status === 'requested' || reservation.status === 'confirmed'
                      ? timeLeft
                      : '—'}
                  </span>

                  {/* Menu */}
                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === reservation.id ? null : reservation.id)
                      }
                      className="h-8 w-8 flex items-center justify-center rounded-lg text-text-muted hover:text-text-primary hover:bg-charcoal-higher transition-colors"
                      aria-label="Open menu"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>

                    {openMenuId === reservation.id && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setOpenMenuId(null)}
                          aria-hidden="true"
                        />
                        <div className="absolute right-0 top-full mt-1 z-20 w-52 bg-charcoal-elevated border border-border-subtle rounded-xl shadow-[0_10px_24px_rgba(0,0,0,0.6)] py-1 animate-in fade-in zoom-in-95">
                          {reservation.status === 'requested' && (
                            <button
                              onClick={() => updateStatus(reservation.id, 'confirmed')}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-primary hover:bg-primary/10 transition-colors"
                            >
                              <Check className="h-3.5 w-3.5" />
                              Confirm reservation
                            </button>
                          )}

                          {(reservation.status === 'requested' ||
                            reservation.status === 'confirmed') && (
                            <>
                              <button
                                onClick={() => updateStatus(reservation.id, 'picked_up')}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-charcoal-higher transition-colors"
                              >
                                <Truck className="h-3.5 w-3.5" />
                                Mark picked up
                              </button>
                              <button
                                onClick={() => updateStatus(reservation.id, 'cancelled')}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                              >
                                <X className="h-3.5 w-3.5" />
                                Cancel reservation
                              </button>
                            </>
                          )}

                          <button
                            onClick={() => setOpenMenuId(null)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-charcoal-higher transition-colors"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            View details
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

      {/* Footer summary */}
      {filteredReservations.length > 0 && (
        <div className="flex items-center justify-between text-xs text-text-muted">
          <p>
            Showing {filteredReservations.length} of {reservations.length} reservations
          </p>
          <p>Codes are valid for the time shown</p>
        </div>
      )}
    </div>
  );
}