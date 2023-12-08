import { iUser } from "src/models/user";
import {
  createModelDoc,
  updateModelDoc,
  getModelDoc,
  deleteModelDoc,
} from "../data/data";
import mongoose from "mongoose";

export const verifyUserLogin = async (username: string, password: string) => {
  try {
    const userDoc = await getModelDoc("User", { username });
    if (userDoc === null)
      throw new Error(`Can'f find user with username: ${username}`);
    const isMatch = await userDoc.comparePassword(password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

export const createNewUser = async (username: string, password: string) => {
  try {
    const userDoc = await createModelDoc("User", {
      username,
      password,
      currency: "USD",
    });
    return userDoc._id;
  } catch (error) {
    throw error;
  }
};

export const getUserDetail = async (userId: mongoose.Types.ObjectId) => {
  const userDoc = await getModelDoc("User", { _id: userId });
  if (userDoc === null) {
    throw new Error(`Can't find user with id: ${userId}`);
  }
  return userDoc.toObject({
    transform: (doc, ret) => {
      delete ret.password;
      return ret;
    },
  });
};

export const updateUser = async (
  userId: mongoose.Types.ObjectId,
  userUpdate: Partial<iUser>
) => {
  const userDoc = await updateModelDoc("User", { _id: userId }, userUpdate);
  if (userDoc === null) throw new Error(`Can't update user with id: ${userId}`);
  return userDoc;
};

export const deleteUser = async (userId: mongoose.Types.ObjectId) => {
  const userDoc = await deleteModelDoc("User", { _id: userId });
  if (userDoc === null) throw new Error(`Can't delete user with id: ${userId}`);
  return userDoc._id === userId ? true : false;
};
