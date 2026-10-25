import {Router} from "express";
import {
    addRole,
    deleteRole,
    deleteUser,
    login,
    register,
    changePassword,
    getUser,
    updateUser
} from "../controllers/userAccount.controller.js";
import validate from '../middlewares/validation.middleware.js';


const router = Router();

router.post('/register', validate('userRegister'), register);
router.post('/login', login);
router.delete('/user/:login', deleteUser);
router.patch('/user/:login', validate('userUpdate'), updateUser);
router.patch('/user/:login/role/:role', validate('userUpdateRole', 'params'), addRole);
router.delete('/user/:login/role/:role', validate('userUpdateRole', 'params'), deleteRole);
router.patch('/password', validate('userUpdatePassword'), changePassword);
router.get('/user/:login', getUser);

export default router;
