// components/dashboard/ProfileSkeleton.tsx

import { Skeleton } from '@/components/ui/skeleton';

export function ProfileSkeleton() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-72" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="p-6 rounded-2xl border border-border-subtle bg-charcoal-elevated flex flex-col items-center">
            <Skeleton className="h-4 w-24 mb-4" />
            <Skeleton className="h-32 w-32 rounded-full mb-4" />
            <Skeleton className="h-10 w-full mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl border border-border-subtle bg-charcoal-elevated space-y-4">
            <Skeleton className="h-6 w-48 mb-4" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
            <div className="flex justify-end">
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}