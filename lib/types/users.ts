// lib/types/user.ts

import { BaseResponse } from './auth';

export interface UserProfile {
  id: string;
  credential_id: string;
  first_name: string;
  last_name: string;
  avatar_media_id?: string | null;
  avatar_url?: string; // Included in enriched reads
  created_at: string;
  updated_at: string;
}

export interface UpdateProfileRequest {
  first_name: string;
  last_name: string;
}

export type UserProfileResponse = BaseResponse<UserProfile>;