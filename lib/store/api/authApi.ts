// lib/store/api/authApi.ts

import { api } from './baseApi';
import type {
  RequestOTPRequest,
  VerifyOTPRequest,
  CompleteOnboardingRequest,
  BaseResponse,
  VerifyOTPResponse,
  AuthTokensResponse,
  MeResponse,
} from '@/lib/types/auth';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    requestOTP: builder.mutation<BaseResponse<null>, RequestOTPRequest>({
      query: (body) => ({
        url: '/auth/request-otp',
        method: 'POST',
        body,
      }),
    }),

    verifyOTP: builder.mutation<BaseResponse<VerifyOTPResponse>, VerifyOTPRequest>({
      query: (body) => ({
        url: '/auth/verify-otp',
        method: 'POST',
        body,
      }),
    }),

    completeOnboarding: builder.mutation<BaseResponse<AuthTokensResponse>, CompleteOnboardingRequest>({
      query: (body) => ({
        url: '/auth/complete-onboarding',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth', 'User'],
    }),

    me: builder.query<BaseResponse<MeResponse>, void>({
      query: () => '/auth/me',
      providesTags: ['User'],
    }),

    logout: builder.mutation<BaseResponse<null>, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth', 'User'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useRequestOTPMutation,
  useVerifyOTPMutation,
  useCompleteOnboardingMutation,
  useMeQuery,
  useLogoutMutation,
} = authApi;