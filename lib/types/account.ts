// lib/types/account.ts

import { BaseResponse } from './auth';

export type AccountType = 'personal' | 'business';
export type AccountStatus = 'active' | 'suspended' | 'banned' | 'deactivated';
export type AccountRole = 'buyer' | 'mechanic' | 'seller' | 'admin' | 'moderator';

export interface Account {
  id: string;
  user_id: string;
  account_type: AccountType;
  roles: AccountRole[];
  onboarding_completed: boolean;
  status: AccountStatus;
  created_at: string;
  updated_at: string;
}

export interface GrantRoleRequest {
  role: AccountRole;
}

export interface SetStatusRequest {
  status: AccountStatus;
}

export type AccountResponse = BaseResponse<Account>;