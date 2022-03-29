const { now } = require('mongoose')
var Order= require('../models/order')
exports.getorderofnow=(req,res)=>{
    var today = new Date();
    var date = today.toJSON().slice(0, 10);
    Order.find({orderdate :date},{status:"unplaced"},(err,orders)=>{
        if(err){
            res.send(err)
        }
        else{
            //console.log(req.params.date)
            res.json({orders})
        }
    })
}
exports.paymentCash = (req, res) => {
    Order.updateOne({ _id: req.body.id }, { paymentstatus: "paid" }, (err, done) => {
        if (err) {
            console.log("error in paytm gateway by user");
            return res.json({ errormsg: 'Somthing went wrong' });
        }
        else {
            console.log("order payment status updated by paytm gateway");
            res.json({ msg: "successfully updated payment status!" });
        }
    })
}
exports.updatePaymentstatus = (req, res) => {
    Order.updateOne({ _id: req.body.id }, { status: "placed" }, (err, done) => {
        if (err) {
            console.log("error in update payment status of order by admin");
            return res.json({ errormsg: 'Somthing went wrong' });
        }
        else {
            console.log("order  payment status updated");
            res.json({ msg: "successfully updated order payment status!" });
        }
    })
}
