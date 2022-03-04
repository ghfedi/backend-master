var mongoose = require('mongoose')
var feedbackSchema = mongoose.Schema({
    user : { type:String
     } ,
    name: {
        type: String,
    },
    feedback: {
        type: String,
    },
    date: { type: String }
})
module.exports = mongoose.model('feedback', feedbackSchema)

