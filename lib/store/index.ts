// lib/store/index.ts

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { api } from './api/baseApi';
import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';

// ============================================================
// SIDE-EFFECT IMPORTS (Register endpoints)
// ============================================================
import './api/authApi';
import './api/userApi';
import './api/accountApi';

// ============================================================
// PERSISTENCE
//
// Only the theme is persisted. Auth is NEVER persisted — the
// session lives in HttpOnly cookies and is verified via /auth/me
// on every app load.
// ============================================================

const themePersistConfig = {
  key: 'theme',
  storage,
};

const persistedThemeReducer = persistReducer(themePersistConfig, themeReducer);

// ============================================================
// ROOT REDUCER
// ============================================================

const rootReducer = combineReducers({
  auth: authReducer, // NOT persisted
  theme: persistedThemeReducer,
  [api.reducerPath]: api.reducer,
});

// ============================================================
// STORE
// ============================================================

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

// ============================================================
// TYPES
// ============================================================

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;