
import {
  TAcademicDepartment,
  TAcademicFaculty,
  TAcademicSemester,
  TQueryParam,
  TResponseRedux,
} from '../../../types';
import { baseApi } from '../../api/baseApi';



const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: '/academic-semesters',
          method: 'GET',
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({ type: 'semester', id: _id })),
              { type: 'semester', id: 'LIST' },
            ]
          : [{ type: 'semester', id: 'LIST' }],
    }),
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: '/academic-semesters/create-academic-semester',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'semester', id: 'LIST' }],
    }),
    getAcademicFaculties: builder.query({
      query: () => ({
        url: '/academic-faculties',
        method: 'GET',
      }),
      transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({ type: 'academicFaculties', id: _id })),
              { type: 'academicFaculties', id: 'LIST' },
            ]
          : [{ type: 'academicFaculties', id: 'LIST' }],
    }),
    addAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: '/academic-faculties/create-academic-faculty',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'academicFaculties', id: 'LIST' }, { type: 'academicDepartments', id: 'LIST' }],
    }),
    getAcademicDepartments: builder.query({
      query: () => ({
        url: '/academic-departments',
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({ type: 'academicDepartments', id: _id })),
              { type: 'academicDepartments', id: 'LIST' },
            ]
          : [{ type: 'academicDepartments', id: 'LIST' }],
      transformResponse: (response: TResponseRedux<TAcademicDepartment[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addAcademicDepartment: builder.mutation({
      query: (data) => ({
        url: '/academic-departments/create-academic-department',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'academicDepartments', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetAllSemestersQuery,
  useAddAcademicSemesterMutation,
  useGetAcademicDepartmentsQuery,
  useGetAcademicFacultiesQuery,
  useAddAcademicFacultyMutation,
  useAddAcademicDepartmentMutation,
} = academicManagementApi;
