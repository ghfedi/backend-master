var mongoose = require('mongoose')
var orderSchema = mongoose.Schema({
    userId :String,
    userName:String,
    userEmail:String,
    food :[ {

        foodname  : String,
        foodqty:Number,
        foodprice:Number,     
           id : {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'food'
        }
    } ],
    
    total: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: "unplaced"
    },
    paymentstatus: {
        type: String,
        default: "unpaid"
    },
    contact: {
        type: String,
        required: true,
    },
    orderdate: { type: String }
})
module.exports = mongoose.model('order', orderSchema)

