// lib/store/slices/authSlice.ts

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';
import type { AuthUser, AuthTokensResponse } from '@/lib/types/auth';

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  /** True while we are checking cookies via /auth/me on app load */
  checkingSession: boolean;
  /** Holds the token while user is on the onboarding screen */
  registrationToken: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  checkingSession: true, // Starts true. Set to false after /auth/me returns.
  registrationToken: null,
};

function applyAuthTokens(state: AuthState, data: AuthTokensResponse) {
  state.user = {
    id: data.user_id,
    accountId: data.account_id,
    roles: ['buyer'], // Refined by /auth/me
  };
  state.isAuthenticated = true;
  state.checkingSession = false;
  state.registrationToken = null;
}

function resetAuthState(state: AuthState) {
  state.user = null;
  state.isAuthenticated = false;
  state.checkingSession = false;
  state.registrationToken = null;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.checkingSession = false;
    },
    setRegistrationToken(state, action: PayloadAction<string | null>) {
      state.registrationToken = action.payload;
    },
    setCheckingSession(state, action: PayloadAction<boolean>) {
      state.checkingSession = action.payload;
    },
    clearAuth(state) {
      resetAuthState(state);
    },
  },
  extraReducers: (builder) => {
    builder
      // 1. Verify OTP
      .addMatcher(
        authApi.endpoints.verifyOTP.matchFulfilled,
        (state, { payload }) => {
          const data = payload.data;
          if (!data) return;

          if (data.requires_onboarding && data.registration_token) {
            state.registrationToken = data.registration_token;
            state.isAuthenticated = false;
          } else if (data.access_token) {
            applyAuthTokens(state, {
              access_token: data.access_token,
              refresh_token: data.refresh_token!,
              user_id: data.user_id,
              account_id: data.account_id,
            });
          }
        }
      )

      // 2. Complete Onboarding
      .addMatcher(
        authApi.endpoints.completeOnboarding.matchFulfilled,
        (state, { payload }) => {
          if (payload.data) {
            applyAuthTokens(state, payload.data);
          }
        }
      )

      // 3. /auth/me — Source of truth for session on app load
      .addMatcher(authApi.endpoints.me.matchFulfilled, (state, { payload }) => {
        if (payload.data) {
          state.user = {
            id: payload.data.user_id,
            accountId: payload.data.account_id,
            roles: payload.data.roles,
          };
          state.isAuthenticated = true;
        }
        state.checkingSession = false;
      })
      .addMatcher(authApi.endpoints.me.matchRejected, (state) => {
        resetAuthState(state);
      })

      // 4. Logout
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        resetAuthState(state);
      })
      .addMatcher(authApi.endpoints.logout.matchRejected, (state) => {
        resetAuthState(state);
      });
  },
});

export const {
  setUser,
  setRegistrationToken,
  setCheckingSession,
  clearAuth,
} = authSlice.actions;

export default authSlice.reducer;