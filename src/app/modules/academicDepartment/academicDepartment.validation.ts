import { z } from 'zod';

const createAcademicDepartmentSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Academic Department must be a string',
      required_error: 'name ts required',
    }),
  academicFaculty: z.string({
    invalid_type_error: 'academic_faculty must be a string',
    required_error: 'Faculty is required',
  }),
});

const updateAcademicDepartmentSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Academic Department must be a string',
      required_error: 'name ts required',
    })
    // .max(20, {
    //   message: 'academic_faculty must be at least 20 characters',
    // })
    .optional(),
  academicFaculty: z
    .string({
      invalid_type_error: 'academic_faculty must be a string',
      required_error: 'Faculty is required',
    })
    .optional(),
});

export const AcademicDepartmentValidation = {
  createAcademicDepartmentSchema,
  updateAcademicDepartmentSchema,
};
