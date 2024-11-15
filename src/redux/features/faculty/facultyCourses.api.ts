import { TQueryParam, TResponseRedux } from '../../../types';
import { baseApi } from '../../api/baseApi';

const facultyCourseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Existing endpoint to get all faculty courses
    getAllFacultyCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: '/enrolled-courses',
          method: 'GET',
          params: params,
        };
      },
      providesTags: ['offeredCourse'],
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    // New endpoint to get faculty data by their ID (or from authenticated user)
    getFacultyData: builder.query({
      query: () => ({
        url: '/users/me', // Assuming '/users/me' returns the currently logged-in faculty's data
        method: 'GET',
      }),
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data, // Assuming 'data' contains the faculty details
        };
      },
    }),

    // Existing endpoint for adding marks
    addMark: builder.mutation({
      query: (data) => ({
        url: '/enrolled-courses/update-enrolled-course-marks',
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
});

export const { useGetAllFacultyCoursesQuery, useGetFacultyDataQuery, useAddMarkMutation } = facultyCourseApi;
