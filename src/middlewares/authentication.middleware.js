import UserAccount from '../models/userAccount.model.js';
import bcrypt from "bcrypt";

const authentication = async (req, res, next) => {
    if (req.path != '/account/register' && !req.path.startsWith('/forum/posts') ) {
        let token = req.headers.authorization
        if (!token || !token.startsWith('Basic '))
            return res.status(401).json({message: 'Authentification token is missing'});

        token = Buffer.from(token.split(' ')[1], 'base64').toString('ascii')
        const [username, password] = token.split(':')

        const userAccount = await UserAccount.findOne({'_id': username});
        if (!userAccount || !(await userAccount.comparePassword(password)))
            return res.status(401).json({message: 'Invalid credentials'});

    req.headers.authorization = '';
    req.principal = {
        userName: username,
        roles: userAccount.roles
    }
    }
    return next();
}

export default authentication;