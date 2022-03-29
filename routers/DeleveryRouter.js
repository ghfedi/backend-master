var express = require('express')
var router = express.Router()
const DeleveryController = require('../Controllers/DeleveryController')
router.get('/getOrders',DeleveryController.getorderofnow)
router.put('/updatePayment',DeleveryController.paymentCash)
router.put('/updatePaymentStatus',DeleveryController.updatePaymentstatus)
module.exports = router
