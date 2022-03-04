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
        id : {
            type: Schema.Types.ObjectId,
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

