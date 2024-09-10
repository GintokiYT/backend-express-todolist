import { taskScheme } from '../models/task.js';

export const validationTaskScheme = (req, res, next) => {
  const { id: userId } = req.user;
  const { name, state } = req.body;

  const validated = taskScheme.safeParse({ name, state, userId });

  if(!validated.success) {
    return res.status(404).json({ error: validated.error.errors[0].message })
  }

  next();
}