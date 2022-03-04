var mongoose = require('mongoose')
var orderSchema = mongoose.Schema({
    user : {
       name : String,
       email:String ,
        id : {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    } ,
    food :[ {
        foodname : String,
        id : {
            type: Schema.Types.ObjectId,
            ref: 'food'
        }
    } ],
    
    total: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: "placed"
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

