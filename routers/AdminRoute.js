var express = require('express')
var router = express.Router()
const fileUploadmiddleware = require('../middelware/fileUpload') 
const adminController = require('../Controllers/AdminController')
const FileController = require('../Controllers/FileController')

require('dotenv').config()
router.get('/getalluser',adminController.getallUser)
router.delete('/blockuser/:id',adminController.block)
router.delete('/unblockuser/:id',adminController.unblock)
router.get('/getalldeliveryMan',adminController.getalldeliveryMan)
router.post('/addfood',adminController.addFood)
router.get('/getallFood',adminController.getallFood)
router.put('/EditFood',adminController.editFood)
router.delete('/deleteFood/:id',adminController.deleteFood)
router.get('/getAllFeedback',adminController.getallFeedback)
router.delete('/deleteFeedback/:id',adminController.deleteFeedback)
router.get("/files", FileController.getListFiles);
/*
router.get('/getallfeedback',adminController.getallFeedback)
router.delete('/deletefeedback/:id',adminController.deleteFeedback)
*/
module.exports = router
