import UserAccount from '../models/userAccount.model.js'
import { USER, MODERATOR, ADMIN } from './constants.js'

export const createAdmin = async () => {
    let admin = await UserAccount.findById('admin').exec()
    if (!admin) {
        admin = new UserAccount({
            login: 'admin',
            password: 'admin',
            firstName: 'Admin',
            lastName: 'Admin',
            roles: [USER, MODERATOR, ADMIN]
        })
        await admin.save()
    }
}