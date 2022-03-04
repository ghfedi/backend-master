require('dotenv').config()

var User = require('../models/user')
var Food = require('../models/food')
var Feedback= require('../models/feedback')
const fileUploadmiddleware = require('../middelware/fileUpload')

exports.getallUser = (req, res) => {
   
    User.find({ role: "user" } ,(err, usr) => {
        if (err) {
            console.log("error in get all user by admin");
            return res.json({ errormsg: 'Somthing went wrong' });
        }
        else {
            res.json({ user: usr });
        }
    }).select("-password").select("-role") 

} 
exports.block = (req, res) => {
    var id = req.params.id
    User.updateOne({ _id: id }, { blocked: true }, (err, user) => {
        if (err) {
            console.log("error in block user by admin");
            return res.json({ errormsg: 'Somthing went wrong' });
        }
        else {
            console.log("blocked user");
            res.status(201).json({ msg: "blocked user!" });
        }
    })

}
exports.unblock = (req, res) => {
    var id = req.params.id
    User.updateOne({ _id: id }, { blocked: false }, (err, user) => {
        if (err) {
            console.log("error in unblock user by admin");
            return res.json({ errormsg: 'Somthing went wrong' });
        }
        else {
            console.log("unblocked user");
            res.status(201).json({ msg: "unblocked user!" });
        }
    })
}

exports.getalldeliveryMan = (req, res) => {
   
    User.find({ role: "delivery" } ,(err, usr) => {
        if (err) {
            console.log("error in get all user by admin");
            return res.json({ errormsg: 'Somthing went wrong' });
        }
        else {

            res.json({ user: usr });
        }
    }).select("-password").select("-role")  }

    /*
exports.getallFeedback = (req, res) => {
    Feedback.find({}, (err, feedbacks) => {
        if (err) {
            console.log("error in get all feedback by admin");
            return res.json({ errormsg: 'Somthing went wrong' });
        }
        else {
            feedbacks = feedbacks.reverse() 
            res.json({ msg: feedbacks });
        }
    })
}


exports.deleteFeedback = (req, res) => {
    Feedback.deleteOne({ _id: req.params.id }, (error) => {
        if (error) {
            console.log("error in delete feedback by admin");
            return res.json({ errormsg: 'Somthing went wrong' });
        }
    })
    return res.json({ msg: 'successfully feedback deleted' });
}*/
//manque photo
exports.addFood = async (req, res) => {
   //var file = req.file
    let avail;
    let qty;
    let limit;
    

        if (req.body.foodqty <= 0) {
            avail = false;
            qty = 0;
            limit = false;
        }
        else {
            avail = true;
            qty = req.body.foodqty;
            limit = false;
        }
        if (req.body.foodqty == -1) {
            avail = true;
            qty = -1;
            limit = true;
        }
        // **********************
        try {
            const image = req.file
            const imageUrl = await fileUploadmiddleware.uploadImage(image)
            var food = new Food({
                foodname: req.body.foodname,
                foodqty: qty,
                foodprice: req.body.foodprice,
                 //foodimage: file.filename,
               foodimage: imageUrl,
                foodavail: avail,
                unlimited: limit
            })
            try {
                doc = food.save();
                console.log("food added by admin");
                const io = req.app.get('io');
                io.emit("foodcrudbyadmin", " food crud operation done by admin!");
                return res.json({ msg: 'Food added' });
            }
            catch (err) {
                console.log("some error while adding food by admin")
                return res.json({ errormsg: 'Somthing went wrong' });
            }
        }
        catch (err) {
            console.log("some error while adding food by admin2")
            return res.json({ errormsg: 'Somthing went wrong' });
        }
        // **********************

    }
   

exports.getallFood = (req, res) => {

    Food.find({}, (err, items) => {
        if (err) {
            console.log("some error while fetching all food by admin")
            res.status(500).json({ errormsg: 'Somthing went wrong' })
        }
        res.json({ msg: items })
    })
}



exports.editFood = (req, res) => {
    let avail;
   
    if (!isNaN(req.body.foodqty)) {
        if (req.body.foodqty <= 0) {
            avail = false;
            qty = 0;
        }
        else {
            avail = true;
            qty = req.body.foodqty
        }
    
        Food.updateOne({ _id: req.body._id }, {
            foodname: req.body.foodname,
            foodprice: req.body.foodprice,
            foodqty: req.body.foodqty,
            foodavail: avail
        }, function (err, item) {

            if (err) {
                console.log("some error in edit food without image")
                return res.json({ errormsg: 'Somthing went wrong' });
            }
            else {
                console.log("Edited food without image");
                return res.json({ msg: 'Edited food without image' });
            }
        })
    }
    else {
        console.log("Invalid Quantity!");
        return res.json({ errormsg: 'Invalid Quantity!' });
    }


}

exports.deleteFood = (req, res) => {

    Food.findOne({ _id: req.params.id }, async (err, data) => {
        if (err) {
            console.log("error in delete food by admin");
            return res.json({ errormsg: 'Somthing went wrong' });
        }
        else {
            if (!data) {
                console.log("error in delete food by admin");
                return res.json({ errormsg: 'Somthing went wrong' });
            }
            else {
                try {
                  //  var x = await fileUploadmiddleware.deleteImage(data.foodimage);
                    Food.deleteOne({ _id: req.params.id }, (error) => {
                        if (error) {
                            console.log("error in delete food by admin");
                            return res.json({ errormsg: 'Somthing went wrong' });
                        }
                    })
                   
                    return res.json({ msg: 'food deleted by admin' });
                } catch (error) {
                    console.log("error in delete food by admin");
                    return res.json({ errormsg: 'Somthing went wrong' });
                }

            }

        }

    })
}
exports.getallFeedback = (req, res) => {
    Feedback.find({}, (err, feedbacks) => {
        if (err) {
            console.log("error in get all feedback by admin");
            return res.json({ errormsg: 'Somthing went wrong' });
        }
        else {
            feedbacks = feedbacks.reverse() 
            res.json({ msg: feedbacks });
        }
    })
}

exports.deleteFeedback = (req, res) => {
    Feedback.deleteOne({ _id: req.params.id }, (error) => {
        if (error) {
            console.log("error in delete feedback by admin");
            return res.json({ errormsg: 'Somthing went wrong' });
        }
    })
    return res.json({ msg: 'successfully feedback deleted' });
}