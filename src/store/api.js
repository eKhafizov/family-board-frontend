import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_ROOT = process.env.REACT_APP_API_URL || '';
const USERS_ROOT = `${API_ROOT}/users/users`;  // двойной users

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
      baseUrl: USERS_ROOT,
      prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) headers.set('Authorization', `Bearer ${token}`);
        return headers;
      },
    }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: '/token',
        method: 'POST',
        body: { username: email, password },
      }),
    }),
    register: builder.mutation({
      query: (user) => ({
        url: '/register',
        method: 'POST',
        body: user,
      }),
    }),
    topUp: builder.mutation({
      query: ({ familyId, amount }) => ({
        url: `/families/${familyId}/top-up`,
        method: 'POST',
        body: { amount },
      }),
      invalidatesTags: ['Family'],  // чтобы после топ-апа подтянулся обновлённый баланс
    }),
    getMe: builder.query({ query: () => '/users/me' }),
    getTasks: builder.query({ query: () => '/tasks' }),
    createTask: builder.mutation({
      query: (task) => ({ url: '/tasks', method: 'POST', body: task }),
    }),
    markDoneByChild: builder.mutation({
      query: (id) => ({ url: `/tasks/${id}/done-by-child`, method: 'PATCH' }),
    }),
    markDoneByParent: builder.mutation({
      query: (id) => ({ url: `/tasks/${id}/done-by-parent`, method: 'PATCH' }),
    }),
  }),
});

export const {
  useTopUpMutation,
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useGetTasksQuery,
  useCreateTaskMutation,
  useMarkDoneByChildMutation,
  useMarkDoneByParentMutation,
} = api;
