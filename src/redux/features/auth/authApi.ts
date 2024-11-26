import { baseApi } from '../../api/baseApi';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: '/auth/login',
        method: 'POST',
        body: userInfo,
      }),
    }),
    forgetPassword: builder.mutation({
      query: (data) => ({
        url: '/auth/forget-password',
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ data, token }) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: data,
        headers: {
          Authorization: token,
        },
      }),
    }),
    getUserIdByEmail: builder.query<string, string>({
      query: (email) => ({
        url: '/auth/get-user-id',
        method: 'POST',
        body: { email },
      }),
    
    }),
  }),
});

export const { useLoginMutation,useForgetPasswordMutation,useGetUserIdByEmailQuery,useResetPasswordMutation } = authApi;
