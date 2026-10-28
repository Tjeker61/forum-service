import * as userAccountRepository from "../repository/userAccount.repository.js";
import bcrypt from "bcrypt";

export const register = async (user) => {
    try {
        const salt = await bcrypt.genSalt(12);
        user.password = await bcrypt.hash(user.password, salt);
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
    const salt = await bcrypt.genSalt(12);
    newPassword = await bcrypt.hash(newPassword, salt);
    const result = await userAccountRepository.changePassword(login, newPassword);
    if (!result) {
        throw new Error(`User with login ${login} not found`);
    }
    return result;
}

export const getUser = async (login) => {
    const user = await userAccountRepository.getUser(login);
    if (!user) {
        throw new Error(`User with login ${login} not found`);
    }
    return user;
}