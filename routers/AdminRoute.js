var express = require('express')
var router = express.Router()
const adminController = require('../Controllers/AdminController')
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
router.post('/addDileveryMan',adminController.adddeleveryMan)
router.get('/getOneUser/:id',adminController.getOneuser)
router.get('/getOrders',adminController.getAllOrders)
router.get('/getorderbyuser/:id',adminController.getoneOrder)
router.get('/getOrderDate/:date',adminController.getorderofdate)
/*
router.get('/getallfeedback',adminController.getallFeedback)
router.delete('/deletefeedback/:id',adminController.deleteFeedback)
*/
module.exports = router
