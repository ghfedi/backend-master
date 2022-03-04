const jwt = require('jsonwebtoken')
var privatekey="mysecret" 

exports.verifyToken = (req, res, next) => {
   if (!req.headers.authorization) {
        return res.status(401).send("unauthorized req1")
    }
    let token = req.headers.authorization.split(' ')[1]
    // console.log(token);
    if (token == 'null') {
        return res.status(401).send("unauthorized req2")
    }
      let payload = jwt.verify(token, privatekey)
    if (!payload) {
        return res.status(401).send("unauthorized req3") 
        next()
    } }