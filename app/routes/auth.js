import { Router } from 'express';
import { createUser, authUser } from '../controllers/user.js';
import { validationUserScheme } from '../middlewares/user.js';

const router = Router();

router.post('/', validationUserScheme, async (req, res) => {
  const { username, email, password } = req.body;

  const user = await createUser({
    username,
    email,
    password
  });

  if(!user) {
    return res.status(400).json({ error: 'Error al crear un nuevo usuario' });
  } 

  return res.status(200).json(user);
});

router.get('/', async (req, res) => {
  const { email, password } = req.body;

  const foundUser = await authUser({ 
    email,
    password
  });

  console.log(foundUser);

  if(!foundUser) {
    return res.status(400).json({ error: 'Error al autenticarse' });
  }

  res.json(foundUser);
});

export { router as AuthRouter }