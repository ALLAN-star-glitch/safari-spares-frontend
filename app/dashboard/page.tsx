/* eslint-disable react/no-unescaped-entities */
// app/dashboard/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { Package, TrendingUp, DollarSign, CalendarCheck, Plus, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { DashboardSkeleton } from '@/components/dashboard/DashboardSkeleton';

export default function DashboardOverviewPage() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading for now — remove when real data is wired up
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  const stats = [
    { label: 'Active Listings', value: '12', icon: Package, trend: '+2 this week', color: 'text-primary' },
    { label: 'Reservations', value: '5', icon: CalendarCheck, trend: '3 pending', color: 'text-secondary' },
    { label: 'Total Views', value: '1,240', icon: TrendingUp, trend: '+18% vs last week', color: 'text-blue-400' },
    { label: 'Revenue (Est.)', value: 'KES 45,000', icon: DollarSign, trend: 'From completed', color: 'text-green-400' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Overview</h1>
        <p className="text-sm text-text-secondary mt-1">Welcome back. Here's what's happening with your shop.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="p-5 rounded-2xl border border-border-subtle bg-charcoal-elevated">
              <div className="h-10 w-10 rounded-full bg-charcoal flex items-center justify-center mb-4">
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <p className="text-sm font-medium text-text-secondary">{stat.label}</p>
              <h2 className="text-2xl font-bold text-text-primary mt-1">{stat.value}</h2>
              <p className="text-xs text-text-muted mt-2">{stat.trend}</p>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-border-subtle bg-gradient-to-br from-charcoal-elevated to-charcoal p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-1">Ready to list a new part?</h3>
          <p className="text-sm text-text-secondary max-w-md">
            Take a photo, add a price, and your part is live on the marketplace. It takes less than 60 seconds.
          </p>
        </div>
        <Link
          href="/dashboard/inventory/new"
          className="shrink-0 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Create Listing
        </Link>
      </div>

      <div className="rounded-2xl border border-border-subtle bg-charcoal-elevated p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Recent Reservations</h3>
          <Link href="/dashboard/reservations" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="text-center py-12 text-text-muted">
          <CalendarCheck className="h-10 w-10 mx-auto mb-2 opacity-20" />
          <p className="text-sm">No recent reservations yet.</p>
          <p className="text-xs">When buyers reserve your parts, they&apos;ll appear here.</p>
        </div>
      </div>
    </div>
  );
}