import UserAccount from '../models/userAccount.model.js';

export const register = async user => {
    const userAccount = new UserAccount(user);
    return userAccount.save();
}

export const removeUser = async login => await UserAccount.findOneAndDelete({ '_id': login });

export const updateUser = async (login, updatedData) => await UserAccount.findOneAndUpdate({'_id': login }, updatedData, {returnDocument: 'after'});

export const getUser = async login => await UserAccount.findOne({ '_id': login });

export const addRole = async (login, role) => await UserAccount.findOneAndUpdate({'_id': login }, { $addToSet: { roles: role } }, {returnDocument: 'after', projection: { roles: 1 }});

export const removeRole = async (login, role) => await UserAccount.findOneAndUpdate({'_id': login }, { $pull: { roles: role } }, {returnDocument: 'after', projection: { roles: 1 }});

export const changePassword = async (login, newPassword) => await UserAccount.findOneAndUpdate({'_id': login }, { password: newPassword });

