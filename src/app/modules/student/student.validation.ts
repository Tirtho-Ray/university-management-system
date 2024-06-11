import { z } from 'zod';

export const studentValidationSchema = z.object({
  password: z.string().min(6, 'Password should be at least 6 characters long'),
  studentData: z.object({
    name: z.object({
      firstName: z.string(),
      middleName: z.string().optional(),
      lastName: z.string(),
    }),
    gender: z.enum(['male', 'female', 'other']),
    dateOfBirth: z.string().optional(),
    email: z.string().email(),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    guardian: z.object({
      fatherName: z.string(),
      fatherOccupation: z.string(),
      fatherContactNo: z.string(),
      motherName: z.string(),
      motherOccupation: z.string(),
      motherContactNo: z.string(),
    }),
    localGuardian: z.object({
      name: z.string(),
      occupation: z.string(),
      contactNo: z.string(),
      address: z.string(),
    }),
    admissionSemester:z.string(),
    academicDepartment:z.string(),
    profileImg: z.string().optional(),
  }),
});

export const studentValidation = {
  studentValidationSchema
};
