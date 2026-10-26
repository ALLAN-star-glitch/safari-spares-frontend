/* eslint-disable react/no-unescaped-entities */
// components/layout/LogoutDialog.tsx

'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { LogOut } from 'lucide-react';

interface LogoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function LogoutDialog({ open, onOpenChange, onConfirm, isLoading }: LogoutDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-charcoal-elevated border-border-subtle text-text-primary">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
              <LogOut className="h-5 w-5 text-red-500" />
            </div>
            <AlertDialogTitle className="text-lg font-bold text-text-primary">
              Log out?
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-sm text-text-secondary">
            You'll need to sign in again to access your dashboard, reservations, and messages.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel className="bg-transparent border-border-subtle text-text-secondary hover:bg-charcoal-higher hover:text-text-primary">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
          >
            {isLoading ? 'Logging out...' : 'Log out'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}