// lib/store/api/accountApi.ts

import { api } from './baseApi';
import type {
  AccountResponse,
  GrantRoleRequest,
  SetStatusRequest,
} from '@/lib/types/account';

export const accountApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyAccount: builder.query<AccountResponse, void>({
      query: () => '/accounts/me',
      providesTags: ['Account'],
    }),

    getAccountById: builder.query<AccountResponse, string>({
      query: (id) => `/accounts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Account', id }],
    }),

    grantRole: builder.mutation<AccountResponse, { id: string; body: GrantRoleRequest }>({
      query: ({ id, body }) => ({
        url: `/accounts/${id}/roles`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Account', id }, 'Account'],
    }),

    revokeRole: builder.mutation<AccountResponse, { id: string; body: GrantRoleRequest }>({
      query: ({ id, body }) => ({
        url: `/accounts/${id}/roles`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Account', id }, 'Account'],
    }),

    setStatus: builder.mutation<AccountResponse, { id: string; body: SetStatusRequest }>({
      query: ({ id, body }) => ({
        url: `/accounts/${id}/status`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Account', id }, 'Account'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMyAccountQuery,
  useGetAccountByIdQuery,
  useGrantRoleMutation,
  useRevokeRoleMutation,
  useSetStatusMutation,
} = accountApi;