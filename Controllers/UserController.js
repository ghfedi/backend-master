var User = require('../models/user')
var Food = require('../models/food')
var Feedback = require('../models/feedback')
var Cart = require('../models/cart')
var Order=require('../models/order')
/*
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
*/
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
exports.getallFoodItem = (req, res) => {
    Food.find({ foodavail: true }, (err, items) => {
        if (err) {
            console.log("some error while fethcing food userhome")
            res.status(500).json({ errormsg: 'Somthing went wrong' })
        }
        res.status(200).json({ msg: items })
    })
}
function secondtimecart(req, res, oldcart, newFood,fooddqty) {
    var oldavail = false;
    var fooddqty=Number(fooddqty)
    var newtotal = oldcart.total + ((newFood.foodprice )* (fooddqty)) ;
    var tot;

    var olditemsjsonarray = oldcart['food']
 
    for (var i = 0; i < olditemsjsonarray.length; i++) {
        if ((olditemsjsonarray[i]._id).equals(newFood._id)) {
            olditemsjsonarray[i].foodqty = olditemsjsonarray[i].foodqty + fooddqty;
            oldcart.total =  oldcart.total + (olditemsjsonarray[i].foodprice *fooddqty)
            tot = oldcart.total
            oldavail = true;
            console.log(oldavail)

            break;
        } }
    
        Cart.updateOne({ _id: oldcart._id }, {
            food: olditemsjsonarray, 
            total: tot
        }, async function (err, ct) {

            if (err) {
                console.log("Somthing went wrong in add to cart")
                res.json({ errormsg: 'Somthing went wrong' })
            }
           else{
               console.log("updated")
           }
        })
    if(!oldavail) {
        console.log("not in cart");
        newFood.foodqty=fooddqty
        olditemsjsonarray.push(newFood);
        Cart.updateOne({ _id: oldcart._id }, {
            food: olditemsjsonarray,
            total:newtotal
        }, async function (err, ct) {

            if (err) {
                console.log("Somthing went wrong in add to cart")
               // res.json({ errormsg: err })
            }
            else {
               
                    console.log("updated");
                   
                }})}
            }
 exports.addtocart = (req, res) => {
Food.findOne({foodname :req.body.foodname },(err,newfood)=>{
      if(newfood) {
                        
            Cart.findOne({ useremail: req.body.email }, (error, cart) => {
                    if (error) {
                        console.log("Somthing went wrong in add to cart")
                        res.json({ errormsg: 'Somthing went wrong1' })
                    }
                    else { if (!cart) {
                                console.log("firsttime");
                                let tot=(newfood.foodprice) * (req.body.fooddqty)
                                    var cart = new Cart({
                                        userid: req.body.userid,
                                        useremail: req.body.email,
                                        food: {
                                            _id :newfood._id,
                                           foodname  : newfood.foodname,
                                           foodqty:req.body.fooddqty,  
                                           foodprice:newfood.foodprice 
                                       } ,
                                        total: tot
                                    });
                                    cart.save(async (error, ct) => {
                                        if (error) {
                                            console.log(error)
                                            res.json({ errormsg: 'Somthing went wrong2' })
                                        }
                                        else {
                                            console.log(ct);}
                                    }) 
                                
                                }
                               
                            else {
                                console.log("secondtime");
                               
                                secondtimecart(req, res, cart, newfood,req.body.fooddqty);
                                res.json({ msg: "successfully added your item" })
                            }
                    } } )
                }
                    
                        
                    
            
                }) 
            }


exports.getCount = (req, res) => {
    Cart.findOne({ userid: req.body.userid }, (error, cart) => {
        if (error) {
            console.log("something went wrong!!")
            res.json({ errormsg: "something went wrong!!" });
        }
        else {
            var c;
            if (cart) {
                c = cart.food.length +1;
            }
            else {
                c = 0
            }
            res.json({ count: c })
        }
    })
}
exports.getCart = (req, res) => {
    Cart.find({ useremail: req.body.email }, (err, items) => {
        if (err) {
            console.log("something went wrong!!")
            res.json({ errormsg: "something went wrong!!" });
        }
        res.send(items)
    })
}
exports.deleteFromCart = (req, res) => {
    Cart.findOne({ useremail: req.body.email }, (error, cart) => {
        if (error) {
            console.log("something went wrong1!!")
            res.json({ errormsg: "something went wrong!!" });
        }
        else {
            if (!cart) {
                console.log("something went wrong2!!")
                res.json({ errormsg: "something went wrong!!" });
            }
            else {
                var temp = [];
                var total;
                var olditemjsonarray = cart['food']

                for (var i = 0; i < olditemjsonarray.length; i++) {
                    if ((olditemjsonarray[i]._id).equals(req.body._id)) {
                        if (olditemjsonarray[i].foodqty > 1){
                            console.log(olditemjsonarray[i].foodqty)
                            console.log('2')
                            olditemjsonarray[i].foodqty= olditemjsonarray[i].foodqty - req.body.fooddqty
                            console.log(cart.total)
                            cart.total = cart.total -(olditemjsonarray[i].foodprice * req.body.fooddqty);
                            total = cart.total;
                            console.log(total)
                            temp = olditemjsonarray.slice()
                          
                         }
                       else 
                       { cart.total=cart.total - olditemjsonarray[i].foodprice
                        total=cart.total
                           for (var j= 0; j < olditemjsonarray.length; j++) {
                        if ((olditemjsonarray[j]._id)!=(req.body._id)) {
                        temp.push(olditemjsonarray[j])
                   }} } } }
                if (total == 0) {
                    Cart.deleteOne({ _id: cart._id }, (err) => {
                        if (err) {
                            console.log("something went wrong3!!")
                            res.json({ errormsg: "something went wrong!!" });
                        }
                        else {
                            console.log('deleted')
                        }
                    }) }
                else {
                    console.log(temp)
                    Cart.updateOne({ _id: cart._id }, {
                        food: temp,
                        total: total
                    }, function (err, ct) {
                        if (err) {
                            console.log("something went wrong4!!")
                            res.json({ errormsg: "something went wrong!!" });
                        }
                        else {
                            
                                console.log("update ");
                            }
 }) }}}}) }
                

 async function SaveinOrder(req, res, cart) {
    var today = new Date();
    var date = today.toJSON().slice(0, 10);
    var errormessage = "";
    const allitems = cart['food'];
console.log(cart['food'])
    for (let i = 0; i < allitems.length; i++) {
        const oneitemid = allitems[i]._id;
        const oneitemqty = allitems[i].foodqty;
        await Food.findById(oneitemid, (err, orignalitem) => {
            if (err) {
                console.log("something went wrong1!!")
                res.json({ errormsg: "something went wrong!!" });
            }
            else {
                console.log(orignalitem +"cc")
             if (!orignalitem.foodavail) {

                    errormessage += " " + orignalitem.foodname
                }   
                else {
                    decrimentQty(req,res,orignalitem,allitems[i].foodqty)
                }
            }
        }); }
    if (errormessage != "") {
        errormessage += " currently not available";
        res.json({ errormsg: errormessage });
    } 
else  {
    User.findOne({ _id: req.body.userId }, async (error, user) => {
        if (error) {
            console.log("something went wrong2!!")
            res.json({ errormsg: "something went wrong!!" });
        }
        else {
            var order = new Order({
                userId :user._id,
                userName:user.name,
                userEmail:user.email,
                food: cart.food,
                total: cart.total,
                orderdate: date,
                contact: user.contact
            })
            order.save(async (err, a) => {
                if (err) {
                    console.log("something went wrong3!!")
                    res.json({ errormsg: "something went wrong!!" });
                }
                else {
                    console.log("order saved in order table");
               // res.json({ errormsg: "order saved" });
                }
            })
            var y = await Place(req, res)
            console.log('ok')
        }
    })

}
}
async function Place(req, res) {
    await Cart.deleteOne({ userid: req.body.userId }, (err) => {
        if (err) {
            console.log("something went wrong4!!")
            res.json({ errormsg: "something went wrong!!" });
        }
    })
    console.log("order placed so deleted from cart");
    
}
exports.placeOrder = (req, res) => {
    Cart.findOne({ userid: req.body.userId }, async (err, cart) => {
        if (err) {
            console.log("something went wrong5!!")
            res.json({ errormsg: "something went wrong!!" });
        }
        var x = await SaveinOrder(req, res, cart)
    })
}
exports.getAllUserOrders = (req, res) => {
    var today = new Date();
    var date = today.toJSON().slice(0, 10);
    Order.find({ orderdate: date, userid: req.userId }, async (err, orders) => {
        if (err) {
            console.log("something went wrong!!")
            res.json({ errormsg: "something went wrong!!" });
        }
        orders = orders.reverse()
        res.send(orders);
    })
}
exports.paymentDone = (req, res) => {
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
async function decrimentQty(req,res,item,qty){
    var qqty=item.foodqty-qty
    if(qqty <= 0){
        var avail=false
    Food.updateOne({_id:item._id},{foodqty:0,foodavail:avail},(err,item)=>{
    if(err){
        console.log('error in food exist')

    }
    else{
     res.send('updated and qty=0') } 
}) }
else {
    Food.updateOne({_id:item._id},{foodqty:qqty},(err,item)=>{
        if(err){
            console.log('error in food exist')
    
        }
        else{
         res.send('updated ') } 
    }) }

}

