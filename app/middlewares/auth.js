import jwt from 'jsonwebtoken';
import 'dotenv/config'

const SECRET_KEY = process.env.AUTH_SECRET;

export const signToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email
  };
  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: '24h'
  })

  return {
    ...payload,
    token: token
  };
}

export const validatedToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(403).json({ error: 'Token no válido' });
    }
  } else {
    return res.status(401).json({ error: 'Acceso denegado, token no proporcionado' });
  }
}