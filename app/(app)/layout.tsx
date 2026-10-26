// app/(app)/layout.tsx

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-charcoal">
      {/* 
        This layout intentionally has no Header or Footer.
        Pages in this folder render as standalone screens.
      */}
      {children}
    </div>
  );
}