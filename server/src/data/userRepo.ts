import models from "../models";

import type { iUser } from "src/common/types";
const UserDB = models.User;

export default Object.freeze({
    searchById: async function (id: string) {
        return await UserDB.findById(id);
    },
    searchByUsername: async function (username: string) {
        return await UserDB.findOne({ username })
    },
    addNewUser: async function (username: string, password: string) {
        const newUser = new UserDB({ username, password, currency: "USD" });
        await newUser.save();
        return newUser;
    },
    updateUser: async function (id: string, update: Partial<iUser>) {
        const updatedUser = await UserDB.findByIdAndUpdate(id, update, { new: true })
        return updatedUser
    },
    deleteUser: async function (id: string) {
        const deletedUser = await UserDB.findByIdAndDelete(id);
        return deletedUser?._id === id ?? false;
    },
    verifyUserPassword: async function (username: string, password: string) {
        const userDoc = await this.searchByUsername(username);
        if (userDoc === null) {
            throw new Error(`Can't find user ${username}`);
        }
        return await userDoc.comparePassword(password);
    }
})