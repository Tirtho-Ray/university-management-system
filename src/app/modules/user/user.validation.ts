import { z } from 'zod';
const userValidationSchema = z.object({
//   id: z.string(),

  password: z
    .string({
        invalid_type_error:'password need string'
    })
    .max(20, { message: 'password can not be up to 20 cher' })
    .min(3, { message: 'password must need at least 3 characters' })
    .optional(),

//   needPasswordChange: z.boolean().optional().default(true),
//   role: z.enum(['student', 'faculty', 'admin']),
//   status: z.enum(['in-progress', 'blocked']).default('in-progress'),
//   inDeleted: z.boolean().optional().default(false),
});

export const userValidation ={
    userValidationSchema
}