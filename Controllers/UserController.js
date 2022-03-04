var User = require('../models/user')
var Food = require('../models/food')
var Feedback = require('../models/feedback')

exports.myProfile = (req, res) => {
    User.findById({ _id: req.userId }, (error, user) => {
        if (error) {
            console.log("something went wrong!!")
            res.json({ errormsg: "something went wrong!!" });
        }
        else {
            res.status(200).json({ user: user, msg: "all ok from myprofile" })
        }
    }).select("-password").select("-blocked").select("-role")
}

exports.sendFeedback = (req, res) => {
    var today = new Date();
    var date = today.toJSON().slice(0, 10);
    

   
        var fb = new Feedback({
       user:req.body.userId,
      name:req.body.name,
        feedback: req.body.feedback,
        date: date
    })
    fb.save(async (error, a) => {
        if (error) {
            console.log("something went wrong while sending feedback!!")
            res.json({ errormsg: "something went wrong!!" });
        }
        else {
            console.log("successfully send your feedback");
            res.json({ msg: "successfully send your feedback" });
        }
    })
}