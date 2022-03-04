const bodyParser = require('body-parser').urlencoded({ extended: true })
var express = require('express')
const verifyTokenmiddleware = require('../middelware/verifyToken') 
var router = express.Router()
const authController = require('../Controllers/authentification.js')
 //const verifyTokenmiddleware = require('../middleware/verifyToken') 
require('dotenv').config()



router.post('/register',(req,res,next) =>{
    authController.register(req.body.phone,req.body.name,req.body.email,req.body.password).then((user)=>res.json({user:user}))
    .catch((err)=>res.send(err))
}) 
router.put('/editPassword/:email',(req,res,next)=>
{authController.ChangePassword(req.params.email,req.body.Oldpassword,req.body.newPassword).then((user)=>res.json({user:user}))
.catch((err)=>res.send(err)) 

})
router.get('/login',(req,res,next)=>
{authController.Login(req.body.email,req.body.password).then((user)=>res.json({user:user}))
.catch((err)=>res.send(err)) })
module.exports = router
