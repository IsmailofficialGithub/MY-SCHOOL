import express from 'express'
import formidable from 'express-formidable'
import { addReportController, checkingAvilabilityController, deleteReportController, getAllReportsController, getSingleReportController, gettingPhotoController, updateReportController } from '../controller/reportController.js'

const router=express.Router()

// create report
router.post('/addReport',formidable(),addReportController)
// get report
router.get('/getReport/:sId',getSingleReportController)
//get all reports
router.get('/getAllReports',getAllReportsController)
//delete reports
router.delete('/deleteReport/:sId',deleteReportController)
// update report
router.put('/updateReport/:sId',formidable(),updateReportController)
// is add already 
router.get('/checkingAvalible/:sId',checkingAvilabilityController)
// getting photo
router.get('/gettingPhoto/:sId',gettingPhotoController)
export default router;