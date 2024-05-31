import userRepo from "../data/userRepo";
import type { iUser } from "../common/types";

export default Object.freeze({
    createNewUser: async function (username: string, password: string) {
        return await userRepo.addNewUser(username, password)
    },
    getUserDetail: async function (userId: string) {
        return await userRepo.searchById(userId);
    },
    updateUser: async function (
        userId: string,
        userUpdate: Partial<iUser>
    ) {
        return await userRepo.updateUser(userId, userUpdate);
    },
    deleteUser: async function (userId: string) {
        return await userRepo.deleteUser(userId)
    }
})
