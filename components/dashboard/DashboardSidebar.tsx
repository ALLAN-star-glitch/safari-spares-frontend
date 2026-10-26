// components/dashboard/DashboardSidebar.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  CalendarCheck,
  Settings,
  LogOut,
  UserCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppDispatch } from '@/lib/store/hooks';
import { useLogoutMutation } from '@/lib/store/api/authApi';
import { clearAuth } from '@/lib/store/slices/authSlice';
import { LogoutDialog } from '@/components/layout/LogoutDialog';

/* Fine grain */
const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .9 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")";

const ENGRAVE = '0 -1px 0 rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.05)';

const NAV_ITEMS = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Inventory', href: '/dashboard/inventory', icon: Package },
  { label: 'Reservations', href: '/dashboard/reservations', icon: CalendarCheck },
  { label: 'Profile', href: '/dashboard/profile', icon: UserCircle },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

const KEY_BASE =
  'group relative flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-sm font-medium select-none outline-none ' +
  'transition-[transform,box-shadow,filter,color] duration-150 ease-out ' +
  'focus-visible:ring-2 focus-visible:ring-white/40 motion-reduce:transition-none';

const KEY_IDLE =
  'text-text-secondary ' +
  'bg-[linear-gradient(180deg,#32373C_0%,#24282C_50%,#1A1D20_100%)] ' +
  'shadow-[inset_0_1px_0_rgba(255,255,255,0.14),inset_0_-2px_3px_rgba(0,0,0,0.45),0_0_0_1px_rgba(0,0,0,0.75),0_3px_0_#07080A,0_7px_10px_rgba(0,0,0,0.4)] ' +
  'hover:-translate-y-px hover:text-text-primary hover:brightness-110 ' +
  'hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-2px_3px_rgba(0,0,0,0.45),0_0_0_1px_rgba(0,0,0,0.75),0_4px_0_#07080A,0_10px_14px_rgba(0,0,0,0.45)] ' +
  'active:translate-y-[2px] ' +
  'active:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-2px_3px_rgba(0,0,0,0.5),0_0_0_1px_rgba(0,0,0,0.75),0_1px_0_#07080A,0_3px_5px_rgba(0,0,0,0.4)]';

const KEY_ACTIVE =
  'translate-y-[2px] text-primary ' +
  'bg-[linear-gradient(180deg,#07090A_0%,#0F1412_100%)] ' +
  'shadow-[inset_0_3px_6px_rgba(0,0,0,0.9),inset_0_-1px_0_rgba(20,184,122,0.3),0_0_0_1px_rgba(20,184,122,0.35),0_1px_0_rgba(255,255,255,0.05)]';

const KEY_DANGER =
  'text-red-400 ' +
  'bg-[linear-gradient(180deg,#4A2020_0%,#2D1313_50%,#1E0B0B_100%)] ' +
  'shadow-[inset_0_1px_0_rgba(255,170,170,0.16),inset_0_-2px_3px_rgba(0,0,0,0.5),0_0_0_1px_rgba(0,0,0,0.8),0_3px_0_#0C0303,0_7px_10px_rgba(0,0,0,0.4)] ' +
  'hover:-translate-y-px hover:text-red-300 hover:brightness-125 ' +
  'hover:shadow-[inset_0_1px_0_rgba(255,170,170,0.22),inset_0_-2px_3px_rgba(0,0,0,0.5),0_0_0_1px_rgba(0,0,0,0.8),0_4px_0_#0C0303,0_10px_16px_rgba(120,20,20,0.35)] ' +
  'active:translate-y-[2px] ' +
  'active:shadow-[inset_0_1px_0_rgba(255,170,170,0.1),inset_0_-2px_3px_rgba(0,0,0,0.55),0_0_0_1px_rgba(0,0,0,0.8),0_1px_0_#0C0303,0_3px_5px_rgba(0,0,0,0.4)]';

function Screw({ angle }: { angle: number }) {
  return (
    <span
      aria-hidden="true"
      className="relative block h-[9px] w-[9px] shrink-0 rounded-full"
      style={{
        background: 'radial-gradient(circle at 35% 28%, #8a9097 0%, #4a4f55 38%, #17191c 100%)',
        boxShadow: '0 0 0 1px rgba(0,0,0,.85), 0 1px 0 1px rgba(255,255,255,.08), inset 0 1px 1px rgba(255,255,255,.35), inset 0 -1px 2px rgba(0,0,0,.7)',
      }}
    >
      <span
        className="absolute left-1/2 top-1/2 block h-[1.5px] w-[7px] bg-black/80"
        style={{ transform: `translate(-50%,-50%) rotate(${angle}deg)` }}
      />
    </span>
  );
}

function IconSocket({
  active,
  tone = 'primary',
  children,
}: {
  active?: boolean;
  tone?: 'primary' | 'danger';
  children: React.ReactNode;
}) {
  const glow = tone === 'danger' ? 'rgba(248,113,113,0.35)' : 'rgba(20,184,122,0.5)';
  return (
    <span
      className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-[box-shadow] duration-200"
      style={{
        background: active
          ? 'radial-gradient(circle at 50% 60%, rgba(20,184,122,0.18), #070909 75%)'
          : 'radial-gradient(circle at 35% 25%, #2d3237 0%, #131618 80%)',
        boxShadow: active
          ? `inset 0 2px 4px rgba(0,0,0,0.9), inset 0 -1px 0 rgba(20,184,122,0.25), 0 0 12px ${glow}`
          : 'inset 0 2px 3px rgba(0,0,0,0.8), inset 0 -1px 0 rgba(255,255,255,0.1), 0 0 0 1px rgba(0,0,0,0.5)',
      }}
    >
      {children}
    </span>
  );
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const confirmLogout = async () => {
    try {
      await logout().unwrap();
    } finally {
      dispatch(clearAuth());
      setShowLogoutDialog(false);
      router.push('/');
    }
  };

  return (
    <>
      <aside
        className={cn(
          'hidden lg:flex flex-col w-64 shrink-0 overflow-hidden',
          'bg-[linear-gradient(180deg,#1E2226_0%,#15181A_55%,#0D0F11_100%)]',
          'shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_-1px_0_0_rgba(255,255,255,0.05),inset_-2px_0_0_rgba(0,0,0,0.85),8px_0_18px_rgba(0,0,0,0.35)]'
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.09] mix-blend-overlay"
          style={{ backgroundImage: NOISE, backgroundSize: '140px 140px' }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(20,184,122,0.45) 30%, rgba(232,163,61,0.25) 70%, transparent)',
          }}
          aria-hidden="true"
        />

        <div className="relative flex-1 overflow-y-auto px-3 pb-6 pt-8">
          <div className="mb-3 flex items-center justify-between px-1 pt-1">
            <Screw angle={35} />
            <span
              className="text-[10px] font-bold uppercase tracking-[0.28em] text-text-muted"
              style={{ textShadow: ENGRAVE }}
            >
              Dashboard
            </span>
            <Screw angle={-60} />
          </div>

          <nav className="space-y-2.5" aria-label="Dashboard">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(KEY_BASE, isActive ? KEY_ACTIVE : KEY_IDLE)}
                >
                  {!isActive && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-[2px] top-[1px] h-1/2 rounded-t-[10px] bg-gradient-to-b from-white/[0.07] to-transparent"
                    />
                  )}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full"
                      style={{
                        background: 'rgba(20,184,122,0.95)',
                        boxShadow: '0 0 10px 2px rgba(20,184,122,0.55)',
                      }}
                    />
                  )}
                  <IconSocket active={isActive}>
                    <Icon
                      className="h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-110"
                      strokeWidth={isActive ? 2.5 : 2}
                      style={{
                        filter: isActive
                          ? 'drop-shadow(0 0 4px rgba(20,184,122,0.7))'
                          : 'drop-shadow(0 1px 0 rgba(0,0,0,0.6))',
                      }}
                    />
                  </IconSocket>
                  <span className="relative z-10" style={{ textShadow: ENGRAVE }}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div
            className="mx-1 my-5 h-px bg-black/80"
            style={{ boxShadow: '0 1px 0 rgba(255,255,255,0.07)' }}
            aria-hidden="true"
          />

          <button
            type="button"
            onClick={() => setShowLogoutDialog(true)}
            className={cn(KEY_BASE, KEY_DANGER)}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[2px] top-[1px] h-1/2 rounded-t-[10px] bg-gradient-to-b from-white/[0.06] to-transparent"
            />
            <IconSocket tone="danger">
              <LogOut
                className="h-[18px] w-[18px]"
                strokeWidth={2}
                style={{ filter: 'drop-shadow(0 0 4px rgba(248,113,113,0.4))' }}
              />
            </IconSocket>
            <span className="relative z-10" style={{ textShadow: ENGRAVE }}>
              Log Out
            </span>
          </button>
        </div>
      </aside>

      <LogoutDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        onConfirm={confirmLogout}
      />
    </>
  );
}