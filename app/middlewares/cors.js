import cors from 'cors';

const ACCEPTED_ORIGINS = [
  'http://localhost:3000/',
];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, cb) => {
    if (acceptedOrigins.includes(origin)) {
      return cb(null, true)
    }
    if (!origin) {
      return cb(null, true)
    }
    return cb(new Error('Not allowed by CORS'))
  }
})