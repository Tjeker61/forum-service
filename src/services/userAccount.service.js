import * as userAccountRepository from "../repository/userAccount.repository.js";

export const register = async (user) => {
    try {
        return await userAccountRepository.register(user);
    } catch (error) {
        throw new Error(`Failed to register. User with login ${user.login} already exists`);
    }
}

export const removeUser = async (login) => {
    const result = await userAccountRepository.removeUser(login);
    if (!result) {
        throw new Error(`User with login ${login} not found`);
    }
    return result;
}

export const updateUser = async (login, updateData) => {
    const result = await userAccountRepository.updateUser(login, updateData);
    if (!result) {
        throw new Error(`User with login ${login} not found`);
    }
    return result;
}

export const changeRoles = async (login, role, isAddRole) => {
    role = role.toUpperCase();
    const result = isAddRole ? await userAccountRepository.addRole(login, role) : await userAccountRepository.removeRole(login, role);
    if (!result) {
        throw new Error(`User with login ${login} not found`);
    }
    return result;
}

export const changePassword = async (login, newPassword) => {
    // TODO: Implement user password change logic
}

export const getUser = async (login) => {
    const user = await userAccountRepository.getUser(login);
    if (!user) {
        throw new Error(`User with login ${login} not found`);
    }
    return user;
}