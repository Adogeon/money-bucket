import userRepo from "../data/userRepo";

export default Object.freeze({
    createNewUser: function (username: string, password: string) {
        return userRepo.addNewUser(username, password)
    },
    getUserDetail: function (userId: string) {
        return userRepo.searchById(userId);
    },
    updateUser: function (
        userId: string,
        userUpdate: Partial<iUser>
    ) {
        return userRepo.updateUser(userId, userUpdate);
    },
    deleteUser: function (userId: string) {
        return userRepo.deleteUser(userId)
    }
})
