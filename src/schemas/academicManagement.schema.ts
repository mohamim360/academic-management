import { z } from 'zod';

export const academicSemesterSchema = z.object({
  name: z.string({ required_error: 'Please select a Name' }),
  year: z.string({ required_error: 'Please select a Year' }),
  startMonth: z.string({ required_error: 'Please select a Start Month' }),
  endMonth: z.string({ required_error: 'Please select a End Month' }),
});


export const academicFacultySchema = z.object({
  name: z.string({
    required_error: 'Please enter the Faculty Name',
  }).min(1, 'Faculty Name cannot be empty'),
});


export const academicDepartmentSchema = z.object({
  name: z.string({
    required_error: 'Please enter the Department Name',
  }).min(1, 'Department Name cannot be empty'),
  academicFaculty: z.string({
    required_error: 'Please select a Faculty',
  }).min(1, 'Faculty selection cannot be empty'),
});