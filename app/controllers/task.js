import { prisma } from '../utils/db.js';

export const getAllTasks = async (id) => {
  const allTask = await prisma.task.findMany({
    where: {
      userId: id
    }
  });

  return allTask;
}

export const getTask = async (id) => {
  try {
    const foundTask = await prisma.task.findFirst({
      where: {
        id: id
      }
    })
    return foundTask;
  } catch (error) {
    return null;
  }
}

export const createTask = async (task, userId) => {

  const { name, state } = task;

  try {
    const newTask = await prisma.task.create({
      data: {
        name: name,
        state: state ?? false,
        userId: userId
      }
    });
    return newTask;
  } catch (error) {
    return null;
  }
}

export const updateTask = async (task,) => {
  try {
    const updateTaskFound = await prisma.task.update({
      data: {
        ...task
      },
      where: {
        id: task.id
      }
    });
    return updateTaskFound;
  } catch (error) {
    return null;
  }
}

export const deleteTask = async (idTask) => {
  try {
    const deleteTaskFound = await prisma.task.delete({
      where: {
        id: idTask
      }
    })
    return deleteTaskFound;
  } catch (error) {
    return null;
  }
}