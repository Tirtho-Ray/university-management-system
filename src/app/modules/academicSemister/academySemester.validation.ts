import { z } from 'zod';
import {
  Months,
  academySemesterCode,
  academySemesterName,
} from './academySemisterConstant';

const createAcademySemesterValidationSchema = z.object({
  name: z.enum([...academySemesterName] as [string, ...string[]]),
  code: z.enum([...academySemesterCode] as [string, ...string[]]),
  year: z.string(),
  startMonth: z.enum([...Months] as [string, ...string[]]),
  endMonth:  z.enum([...Months] as [string, ...string[]]),
});

export const AcademySemesterValidation = {
  createAcademySemesterValidationSchema,
};
