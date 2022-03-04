var express = require('express')
var router = express.Router()
const userController = require('../Controllers/UserController')
// verifyTokenmiddleware = require('../middleware/verifyToken') 
router.post('/sendFeedback',userController.sendFeedback)
module.exports=router