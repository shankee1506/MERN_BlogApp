import Router from "express";
import { getAllUser, loginUser, signupUser } from "../controller/userController";

export const userRouter = Router();

userRouter.get('/', getAllUser);
userRouter.post('/signUp', signupUser)
userRouter.post('/login',loginUser)
