import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api`, // или без /api, в зависимости от вашего роутинга
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: '/users/token',
        method: 'POST',
        body: { username: email, password },
      }),
    }),
    register: builder.mutation({
      query: (user) => ({
        url: '/users/register',
        method: 'POST',
        body: user,
      }),
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
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useGetTasksQuery,
  useCreateTaskMutation,
  useMarkDoneByChildMutation,
  useMarkDoneByParentMutation,
} = api;
