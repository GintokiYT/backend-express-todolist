import express from 'express';
import { corsMiddleware } from './middlewares/cors.js';
import { router } from './routes/index.js';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(corsMiddleware());
app.use(express.json());

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});