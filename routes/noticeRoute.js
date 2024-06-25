import express from 'express';
import { addNoticeController, deleteNoticeController, getNoticeController, updateNoticeController } from '../controller/noticeController.js';
import formidable from 'express-formidable';
import { setupCronJob } from "../helper/time.js";

setupCronJob();
const router=express.Router();

// add notice
router.post('/addNotice',formidable(),addNoticeController)
// get notice
router.get('/getNotice',getNoticeController)
//delete notice
router.delete('/deleteNotice/:id',deleteNoticeController)
//update notice
router.post('/updateNotice/:id',formidable(),updateNoticeController)


export default router;