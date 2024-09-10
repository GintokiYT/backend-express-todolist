import z from 'zod';

export const taskScheme = z.object({
  name: z.string(),
  state: z.boolean().optional().default(false),
  userId: z.number()
});