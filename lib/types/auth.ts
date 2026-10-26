// lib/types/auth.ts

// ============================================================
// 1. REQUESTS (Exact match to Go DTOs)
// ============================================================

export interface RequestOTPRequest {
  phone: string;
}

export interface VerifyOTPRequest {
  phone: string;
  code: string;
}

export interface CompleteOnboardingRequest {
  registration_token: string;
  first_name: string;
  last_name: string;
  roles: string[]; // 'buyer', 'mechanic', 'seller'
  shop_name?: string;
  shop_location?: string;
  shop_kra_pin?: string;
}

// ============================================================
// 2. RESPONSES (Exact match to Go DTOs)
// ============================================================

export interface BaseResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  code?: string;
}

export interface VerifyOTPResponse {
  requires_onboarding: boolean;
  registration_token?: string;
  access_token?: string;
  refresh_token?: string;
  user_id: string;
  account_id: string;
}

export interface AuthTokensResponse {
  access_token: string;
  refresh_token: string;
  user_id: string;
  account_id: string;
}

export interface MeResponse {
  user_id: string;
  account_id: string;
  roles: string[];
}

// ============================================================
// 3. INTERNAL STATE SHAPES
// ============================================================

export interface AuthUser {
  id: string;
  accountId: string;
  roles: string[];
}

// ============================================================
// 4. TYPE GUARDS
// ============================================================

export function isOnboardingRequired(data: VerifyOTPResponse | AuthTokensResponse): data is VerifyOTPResponse {
  return 'requires_onboarding' in data && data.requires_onboarding === true;
}