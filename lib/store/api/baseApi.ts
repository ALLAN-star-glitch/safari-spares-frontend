// lib/store/api/baseApi.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/query/react';
import type { Action } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';
import { baseQueryWithReauth } from './baseQueryWithReauth';

function isHydrateAction(action: Action): action is Action<typeof REHYDRATE> & {
  key: string;
  payload: any;
  err: unknown;
} {
  return action.type === REHYDRATE;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      if (action.payload && action.payload[reducerPath]) {
        return action.payload[reducerPath];
      }
      if (action.key === 'api') {
        return action.payload;
      }
    }
    return undefined;
  },
  tagTypes: [
    'Auth',
    'User',
    'Account',
    // Add future tags here as you build out the app:
    // 'Shop', 'Listing', 'Reservation', 'Chat'
  ],
  endpoints: () => ({}),
});