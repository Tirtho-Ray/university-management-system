import { z } from 'zod';
const loginValidationSchema = z.object({
  id: z.string({ required_error: 'is is requered' }),
  password: z.string({ required_error: 'password is requered' }),
});

export const AuthLoginValidation = {
  loginValidationSchema,
};
