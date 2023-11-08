import { Router , Request, Response } from "express";
import userController from "../controllers/userController"
const router = Router();

 

router.get('/get-user',userController.getUser)

router.post('/login',userController.postLogIn)

router.post('/signup',userController.postSignUp)

router.put('/update',userController.postEdit)

router.post('/delete',userController.postDelete)

// router.post('/getData',userController.getData)

export default router;