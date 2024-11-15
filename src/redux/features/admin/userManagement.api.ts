import { TQueryParam, TResponseRedux, TStudent } from '../../../types';
import { baseApi } from '../../api/baseApi';

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: (args) => {
        console.log(args);
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: '/students',
          method: 'GET',
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getAllFaculties: builder.query({
      query: (args) => {
        console.log(args);
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: '/faculties',
          method: 'GET',
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addStudent: builder.mutation({
      query: (data) => ({
        url: '/users/create-student',
        method: 'POST',
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: '/auth/change-password',
        method: 'POST',
        body: data,
      }),
    }),
    getSingleStudent: builder.query<TStudent, string>({
      query: (id) => ({
        url: `/students/${id}`,
        method: 'GET',
      }),
    }),
    // Define the updateStudent mutation
    updateStudent: builder.mutation<TStudent, { id: string; student: Partial<TStudent> }>({
      query: ({ id, student }) => ({
        url: `/students/${id}`,
        method: 'PATCH',
        body: { student }, // Ensure the body is wrapped in an object with the key 'student'
      }),
      async onQueryStarted({ id, student }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(userManagementApi.util.invalidateTags([{ type: 'Student', id }]));
        } catch (error) {
          console.error('Error updating student:', error);
        }
      },
    }),
    
  }),
  overrideExisting: false,
});

export const {
  useAddStudentMutation,
  useGetAllStudentsQuery,
  useGetAllFacultiesQuery,
  useChangePasswordMutation,
  useUpdateStudentMutation, // Export the custom hook
  useGetSingleStudentQuery,
} = userManagementApi;
