// app/StoreProvider.tsx

'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { useEffect } from 'react';
import { store, persistor } from '@/lib/store';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { authApi } from '@/lib/store/api/authApi';
import { store as storeRef } from '@/lib/store';

/**
 * Fires /auth/me exactly once on app mount. The endpoint is the single
 * source of truth for "is the user still logged in?". If the cookies
 * are valid, the backend returns the user. If they've expired, the
 * backend returns 401 and RTK Query's matchRejected flips the state.
 */
function SessionVerifier() {
  // Fires GET /auth/me with credentials. Runs once on mount.
  useEffect(() => {
    storeRef.dispatch(
      authApi.endpoints.me.initiate(undefined, { forceRefetch: true })
    );
  }, []);

  return null;
}

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <SessionVerifier />
          {children}
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}