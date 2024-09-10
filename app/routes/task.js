import { Router } from 'express';
import { validatedToken } from '../middlewares/auth.js';
import { getAllTasks, createTask, getTask, updateTask, deleteTask } from '../controllers/task.js';
import { validationTaskScheme } from '../middlewares/task.js';
import { getUser } from '../controllers/user.js';

const router = Router();

router.get('/', validatedToken, async (req, res) => {
  const { id } = req.user;
  const tasks = await getAllTasks(id);
  return res.status(200).json({ tasks: tasks })
});

router.post('/', validatedToken, validationTaskScheme, async (req, res) => {
  const { id: userId } = req.user;
  const { name, state } = req.body;

  const foundUser = await getUser(userId);

  if (!foundUser) {
    return res.status(400).json({ error: 'User no found!' });
  }

  const newTask = await createTask({ name, state }, userId);
  
  if (!newTask) {
    return res.status(400).json({ error: 'Error creating task' })
  }

  return res.json(newTask);
});

router.post('/:id', validatedToken, async (req, res) => {
  const { id: userId } = req.user;
  const idTask = req.params.id;
  const { name, state } = req.body;
  const foundTask = await getTask(Number(idTask));

  if (!foundTask) {
    return res.status(400).json({ error: 'Task not found' });
  }

  if (foundTask.userId !== userId) {
    return res.status(400).json({ error: 'The user is not the creator' });
  }

  if (name !== undefined) foundTask.name = name;
  if (state !== undefined) foundTask.state = state;

  const modifiedTask = await updateTask(foundTask);

  if (!modifiedTask) {
    return res.status(400).json({ error: 'Error al actualizar la tarea' });
  }

  return res.status(200).json(modifiedTask);
})

router.delete('/:id', validatedToken, async (req, res) => {
  const { id: userId } = req.user;
  const idTask = req.params.id;

  const foundTask = await getTask(Number(idTask));

  if (!foundTask) {
    return res.status(400).json({ error: 'Task not found' });
  }

  if (foundTask.userId !== userId) {
    return res.status(400).json({ error: 'The user is not the creator' });
  }

  const deleteTaskFound = await deleteTask(Number(idTask));

  if (!deleteTaskFound) {
    return res.status(400).json({ error: 'Error deleting task' });
  }

  return res.status(200).json(deleteTaskFound);
})

export { router as TaskRouter }