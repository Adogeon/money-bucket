import userRepo from "../../data/userRepo";

const verifyUserLogin = async (username: string, password: string) => {
  try {
    const userDoc = await userRepo.searchByUsername(username);
    if (userDoc === null)
      throw new Error(`Can'f find user with username: ${username}`);
    const isMatch = await userDoc.comparePassword(password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

const createNewUser = async (username: string, password: string) => {
  try {
    const userDoc = await userRepo.addNewUser(username, password)
    return userDoc._id;
  } catch (error) {
    throw error;
  }
};

const getUserDetail = async (userId: string) => {
  const userDoc = await userRepo.searchById(userId);
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

const updateUser = async (
  userId: string,
  userUpdate: Partial<iUser>
) => {
  const userDoc = await userRepo.updateUser(userId, userUpdate);
  if (userDoc === null) throw new Error(`Can't update user with id: ${userId}`);
  return userDoc;
};

const deleteUser = async (userId: string) => {
  return await userRepo.deleteUser(userId)
};

export default Object.freeze({
  verifyUserLogin,
  createNewUser,
  getUserDetail,
  updateUser,
  deleteUser,
})