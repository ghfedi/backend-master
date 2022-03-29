var express = require('express')
var router = express.Router()
const userController = require('../Controllers/UserController')
// verifyTokenmiddleware = require('../middleware/verifyToken') 
router.post('/sendFeedback',userController.sendFeedback)
router.post('/addtocard',userController.addtocart)
router.get('/getcount',userController.getCount)
router.get('/getcart',userController.getCart)
router.delete('/deleteFromcart',userController.deleteFromCart)
router.post('/saveOrder',userController.placeOrder)
router.get('/getallorders',userController.getAllUserOrders)
router.put('/getPaid',userController.paymentDone)

module.exports=router