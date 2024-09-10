import { prisma } from '../utils/db.js';
import bcrypt from 'bcryptjs';
import { signToken } from '../middlewares/auth.js';

export const createUser = async (user) => {
  const { username, email, password } = user;

  try {
    const newUser = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: await bcrypt.hash(password, 10)
      }
    });
    return signToken(newUser);
  } catch (error) {
    return null;
  }
}

export const authUser = async (user) => {
  
  try {
    const foundUser = await prisma.user.findFirst({
      where: {
        email: user.email
      }
    });

    if(!foundUser) {
      return null;
    }

    const decryptedPassword = await bcrypt.compare(user.password, foundUser.password);

    if(!decryptedPassword) {
      return null;
    } 

    return signToken(foundUser);

  } catch (error) {
    return null;
  }
}

export const getUser = async (id) => {
  try {
    const foundUser = await prisma.user.findFirst({
      where: {
        id: id
      }
    });
    return foundUser
  } catch (error) {
    return null;
  }
}