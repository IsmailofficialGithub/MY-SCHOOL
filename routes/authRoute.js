import express from 'express'
import { loginController, registerController } from '../controller/authController.js';

const router =express.Router();
//register
router.post('/register',registerController)
//login
router.put('/login',loginController);


export default router;