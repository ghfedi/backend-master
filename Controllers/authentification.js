const express=require('express')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')
const  Mongoose = require('mongoose')
const { promises } = require('nodemailer/lib/xoauth2')
var url = 'mongodb://localhost:27017/projet';  
var privatekey="mysecret" 
 exports.register =(phone,name,email,password) => {
    
    return new Promise ((resolve,reject)=>
    {
        Mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
            console.log('cv!!!')
            return User.findOne({ email:email })
        }).then((user)=>{
            console.log(user)
            if (user)
            {
                console.log('trouver')
                Mongoose.disconnect()
                reject('email exist')
            }
            else 

            {console.log('c bn')
                 bcrypt.hash(password,10).then((hashedPassword)=> {
                let user= new User ({
                  contact :phone,
                   name:name ,
                   email: email,
                  password :hashedPassword ,
                role:"user" }) 
                console.log(user)
        user.save().then((user)=>{
            console.log('saved')
           Mongoose.disconnect()
           resolve(user) }).catch((err)=>{
                                  Mongoose.disconnect()
                                  reject(err)})

                 }).catch((err)=> {
                Mongoose.disconnect()
                reject(err) })    }  }) } 
    )} 


exports.Login=(email,password)=>{
    return new Promise ((resolve,reject)=>{ 
        Mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
            console.log(email)

            return User.findOne({ email:email }).then((user)=>{
       if (!user) {
            Mongoose.disconnect()
           reject('email  not exist in our database')
        }
        else {
            bcrypt.compare(password,user.password).then((same)=>{
                if(same) {

                    let payload = { subject: user._id, email: user.email ,name:user.name }
                    let token = jwt.sign(payload, privatekey, {expiresIn: "24h" })
                    Mongoose.disconnect()
                   resolve(token)

               }
                
                else {
                    Mongoose.disconnect()
                    reject('invalid email and  password ')
                }
            })
        }
    }).catch((err)=> {
        Mongoose.disconnect()
        reject(err) })
    })
})
}

  exports.ChangePassword=(email,Oldpassword,newPassword)=>{
      return new Promise ((resolve,reject)=> {
      Mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
        return User.findOne({ email :email }).then((user)=>{
            console.log(user) 
            console.log(Oldpassword)
            console.log(newPassword)
            console.log(user.password)
            if(user){
            bcrypt.compare(Oldpassword,user.password).then((same) =>{
                console.log(same)
                if(!same) { Mongoose.disconnect()
                    console.log('not')
                    reject('password incorrect')
                    console.log("correct old password"); }
                      
                else 
                {
                var p = User.hashPassword(newPassword)
                    User.updateOne({ email: email },{ password: p }).then(()=>
                    {Mongoose.disconnect()
                        console.log('okkk')
                         resolve(user)}).catch((err)=> {
                            Mongoose.disconnect()
                            reject(err) }) 
                      }  
                      
                    }) 
          }
          else {
              Mongoose.disconnect()
              reject('user not found')
          }
          
        }).catch((err)=> {
            Mongoose.disconnect()
            reject(err) }) 
        })
         
               
            })
     } 
    
    
    