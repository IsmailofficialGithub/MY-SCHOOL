import express from 'express'
import { adminAllController, allUserController } from '../controller/adminController.js';

const router=express.Router();
// adminLength info
router.get("/adminAll",adminAllController)
// user detail
router.get("/allUser",allUserController)


export default router;