import {z} from 'zod';
import { SemesterRegistrationStatus } from './semesterRegistration.constant';

const createSemesterRegistrationVAlidationSchema = z.object({
    academySemester:z.string(),
    status:z.enum([...SemesterRegistrationStatus as[ string,...string[] ]]),
    startDate:z.string().datetime(),
    endDate:z.string().datetime(),
    minCreated:z.number(),
    maxCreated:z.number(),
})
const updateSemesterRegistrationVAlidationSchema = z.object({
    academySemester:z.string().optional(),
    status:z.enum([...SemesterRegistrationStatus as[ string,...string[] ]]).optional(),
    startDate:z.string().datetime().optional(),
    endDate:z.string().datetime().optional(),
    minCreated:z.number().optional(),
    maxCreated:z.number().optional(),
})

export const SemesterRegistrationValidation ={
    createSemesterRegistrationVAlidationSchema,
    updateSemesterRegistrationVAlidationSchema
}