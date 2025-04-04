import express from 'express';
import { getUserById, userSignIn, userSignUp } from '../controller/user.js';
import { upload } from '../utils/multer.js';
import userAuth from '../middleware/userAuth.js';

const userRoutes = express.Router();

userRoutes.get('/', userAuth, getUserById);
userRoutes.post('/register', upload.single('profileImage'), userSignUp);
userRoutes.post('/sign-in', userSignIn);

export default userRoutes;
