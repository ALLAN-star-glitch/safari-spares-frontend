// app/dashboard/layout.tsx

'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { Header } from '@/components/layout/Header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-charcoal flex flex-col">
        
        {/* Main header stays on ALL dashboard pages */}
        <Header />

        {/* 
          Fixed height container that fills the viewport below the header.
          Content scrolls inside; sidebar stays pinned.
          - Mobile: 64px header + category strip hidden = 64px
          - Desktop: 72px header + ~36px strip = 112px
        */}
        <div className="flex-1 pt-16 sm:pt-[72px] lg:pt-[112px]">
          <div className="h-[calc(100vh-64px)] sm:h-[calc(100vh-72px)] lg:h-[calc(100vh-120px)] flex">
            
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
      </div>
    </ProtectedRoute>
  );
}