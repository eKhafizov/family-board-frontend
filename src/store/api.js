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
  tagTypes: ['User'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: '/token',
        method: 'POST',
        body: { username: email, password : password },
      }),
    }),
    fetchLogin: builder.mutation({
    			query: ({username, password} ) => ({
      				url: '/token',
       				method: 'POST',
       				body: {username, password}
    			}),
     			async onQueryStarted({username, password}, {dispatch, queryFulfilled}) {
       				const { data: { access_token } } = await queryFulfilled
              localStorage.setItem('token', access_token)
              // и сразу дергаем getMe
              dispatch(api.endpoints.fetchMe.initiate())
          },
          invalidatesTags: ['User'],
   		}),
     fetchMe: builder.query({
      query: () => ({
        url: 'https://family-board.onrender.com/users/users/me',
      }),
      providesTags: ['User'],
    }),
    register: builder.mutation({
      query: ( {email, password, full_name }) => ({
        url: '/register',
        method: 'POST',
        body: { email, password, full_name },
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
  useFetchLoginMutation,
  useFetchMeQuery,
  useTopUpMutation,
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useGetTasksQuery,
  useCreateTaskMutation,
  useMarkDoneByChildMutation,
  useMarkDoneByParentMutation,
} = api;
