import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const API_ROOT =
  process.env.REACT_APP_API_URL?.trim().replace(/\/$/, '') ||
  'https://family-board.onrender.com'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_ROOT,                // ← вот сюда ставим домен бэка
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) headers.set('Authorization', `Bearer ${token}`)
      return headers
    }, // абсолютные URL в endpoints
  }),
  tagTypes: ['User', 'Tasks', 'Family'],
  endpoints: (builder) => ({
    // Регистрация пользователя
    register: builder.mutation({
      query: ({ email, password }) => ({
        url: 'https://family-board.onrender.com/users/users/register',
        method: 'POST',
        body: { email, password },
      }),
    }),
    // Логин
    fetchLogin: builder.mutation({
      query: ({ username, password }) => ({
        url: 'https://family-board.onrender.com/users/users/token',
        method: 'POST',
        body: { username, password },
      }),
      async onQueryStarted({ username, password }, { dispatch, queryFulfilled }) {
        const { data: { access_token } } = await queryFulfilled;
        localStorage.setItem('token', access_token);
        dispatch(api.endpoints.fetchMe.initiate());
      },
      invalidatesTags: ['User'],
    }),
    // Профиль текущего пользователя
    fetchMe: builder.query({
      query: () => 'https://family-board.onrender.com/users/users/me',
      providesTags: ['User'],
    }),
    // Получить все задачи
    createTask: builder.mutation({
      query: (task) => ({
        url: '/tasks',
        method: 'POST',
        body: task,
      }),
      invalidatesTags: ['Tasks'],
    }),
    fetchTasks: builder.query({
      query: () => '/tasks',
      providesTags: ['Tasks'],
    }),
    updateTask: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/tasks/${id}`,
        method: 'PUT',      // или PATCH, если вы так настроите бэкенд
        body: patch,
      }),
      // После обновления заново подгружаем список
      invalidatesTags: ['Tasks'],
    }),
    fetchFamilies: builder.query({
     query: () => '/families',
      providesTags: ['Family'],
    }),  
    createFamily: builder.mutation({
      query: fam => ({
        url: '/families',
        method: 'POST',
        body: fam,
      }),
      invalidatesTags: ['Family'],
    }),
    topUpFamily: builder.mutation({
      query: ({ family_id, amount }) => ({
        url: `/families/${family_id}/topup`,
        method: 'POST',
        body: { amount },
      }),
      invalidatesTags: ['Family'],
    }),
    confirmTask: builder.mutation({
      query: ({ id }) => ({
        url: `/tasks/${id}/confirm`,
        method: 'POST',
      }),
      invalidatesTags: ['Tasks', 'Family'],
    }),
  }),
})

export const {
  useRegisterMutation,
  useFetchLoginMutation,
  useFetchMeQuery,
  useFetchTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useCreateFamilyMutation,
  useFetchFamiliesQuery,
  useTopUpFamilyMutation,
  useConfirmTaskMutation,
} = api;


// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const API_ROOT = process.env.REACT_APP_API_URL || '';
// const USERS_ROOT = `${API_ROOT}/users/users`;  // двойной users

// export const api = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({
//       baseUrl: USERS_ROOT,
//       prepareHeaders: (headers) => {
//         const token = localStorage.getItem('token');
//         if (token) headers.set('Authorization', `Bearer ${token}`);
//         return headers;
//       },
//     }),
//   tagTypes: ['User'],
//   endpoints: (builder) => ({
//     login: builder.mutation({
//       query: ({ email, password }) => ({
//         url: '/token',
//         method: 'POST',
//         body: { username: email, password : password },
//       }),
//     }),
//     fetchLogin: builder.mutation({
//     			query: ({username, password} ) => ({
//       				url: '/token',
//        				method: 'POST',
//        				body: {username, password}
//     			}),
//      			async onQueryStarted({username, password}, {dispatch, queryFulfilled}) {
//        				const { data: { access_token } } = await queryFulfilled
//               localStorage.setItem('token', access_token)
//               // и сразу дергаем getMe
//               dispatch(api.endpoints.fetchMe.initiate())
//           },
//           invalidatesTags: ['User'],
//    		}),
//      fetchMe: builder.query({
//       query: () => ({
//         url: 'https://family-board.onrender.com/users/users/me',
//       }),
//       providesTags: ['User'],
//     }),
//     register: builder.mutation({
//       query: ( {email, password, full_name }) => ({
//         url: '/register',
//         method: 'POST',
//         body: { email, password, full_name },
//       }),
//     }),
//     topUp: builder.mutation({
//       query: ({ familyId, amount }) => ({
//         url: `/families/${familyId}/top-up`,
//         method: 'POST',
//         body: { amount },
//       }),
//       invalidatesTags: ['Family'],  // чтобы после топ-апа подтянулся обновлённый баланс
//     }),
//     getMe: builder.query({ query: () => '/users/me' }),
//     getTasks: builder.query({ query: () => '/tasks' }),
//     createTask: builder.mutation({
//       query: (task) => ({ url: '/tasks', method: 'POST', body: task }),
//     }),
//     markDoneByChild: builder.mutation({
//       query: (id) => ({ url: `/tasks/${id}/done-by-child`, method: 'PATCH' }),
//     }),
//     markDoneByParent: builder.mutation({
//       query: (id) => ({ url: `/tasks/${id}/done-by-parent`, method: 'PATCH' }),
//     }),
//   }),
// });

// export const {
//   useFetchLoginMutation,
//   useFetchMeQuery,
//   useTopUpMutation,
//   useLoginMutation,
//   useRegisterMutation,
//   useGetMeQuery,
//   useGetTasksQuery,
//   useCreateTaskMutation,
//   useMarkDoneByChildMutation,
//   useMarkDoneByParentMutation,
// } = api;
