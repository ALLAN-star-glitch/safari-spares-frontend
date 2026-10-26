// lib/store/api/userApi.ts

import { UpdateProfileRequest, UserProfileResponse } from '@/lib/types/users';
import { api } from './baseApi';


export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query<UserProfileResponse, void>({
      query: () => '/users/me',
      providesTags: ['User'],
    }),

    getUserById: builder.query<UserProfileResponse, string>({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),

    updateProfile: builder.mutation<UserProfileResponse, UpdateProfileRequest>({
      query: (body) => ({
        url: '/users/me',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    uploadAvatar: builder.mutation<UserProfileResponse, FormData>({
      query: (formData) => ({
        url: '/users/me/avatar',
        method: 'PATCH',
        body: formData,
        // Content-Type is handled automatically by baseQuery for FormData
      }),
      invalidatesTags: ['User'],
    }),

    deleteAvatar: builder.mutation<UserProfileResponse, void>({
      query: () => ({
        url: '/users/me/avatar',
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMyProfileQuery,
  useGetUserByIdQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useDeleteAvatarMutation,
} = userApi;