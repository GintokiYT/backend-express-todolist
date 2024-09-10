import { Router } from 'express';
import { AuthRouter } from './auth.js';
import { TaskRouter } from './task.js';

const router = Router();

router.use('/v1/auth', AuthRouter);
router.use('/v1/task', TaskRouter);

export { router };