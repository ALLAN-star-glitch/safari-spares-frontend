// app/dashboard/layout.tsx

'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { Header } from '@/components/layout/Header';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-charcoal flex flex-col">
        
        {/* Main header stays on ALL dashboard pages */}
        <Header />

        {/* 
          Content offset:
          - Mobile: 64px header + 64px bottom nav = 128px
          - Desktop: 72px header + ~36px strip = 108px
        */}
        <div className="flex-1 pt-16 sm:pt-[72px] lg:pt-[112px] pb-16 lg:pb-0">
          <div className="min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-72px)] lg:h-[calc(100vh-112px)] flex">
            
            {/* Sidebar — pinned on the left, only scrolls if its own content overflows */}
            <DashboardSidebar />

            {/* Content — this is the scrollable column */}
            <main className="flex-1 min-w-0 overflow-y-auto">
              <div className="container mx-auto px-4 sm:px-6 py-6">
                {children}
              </div>
            </main>
          </div>
        </div>

        {/* Mobile Bottom Nav */}
        <MobileBottomNav />
      </div>
    </ProtectedRoute>
  );
}