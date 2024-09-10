import { userScheme } from '../models/user.js';

export const validationUserScheme = (req, res, next) => {
  const { username, email, password } = req.body;

  const validated = userScheme.safeParse({ username, email, password });
  
  if(!validated.success) {
    return res.status(400).json({ error: validated.error.errors[0].message });
  }

  next();
}