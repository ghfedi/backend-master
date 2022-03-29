var mongoose = require('mongoose')
var cartSchema = mongoose.Schema({
    userid: {
        type: String,
    },
    useremail: {
        type: String,
    },
    food :[ {
foodname  : String,
foodqty:Number,
foodprice:Number,
        id : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'food'
        }
    } ],
    total:{
        type:Number,
        default:0
    },
    createdAt: {type: Date, default: Date.now}
})
module.exports = mongoose.model('cart',cartSchema)

