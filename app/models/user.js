import z from 'zod';

export const userScheme = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must have at least one uppercase letter')
    .regex(/[0-9]/, 'The password must have at least one number.')
    .regex(/[^A-Za-z0-9]/, 'The password must have at least one special character.')
});