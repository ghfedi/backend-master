require('dotenv').config()
const mongoose = require('mongoose')

//connection  avec la base  
  //  mongoose.Promise = global.Promise
    var url = 'mongodb://localhost:27017/projet';   
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true ,useCreateIndex: true}).then(()=>{

        console.log("database connected in mongo ");
    })
   // mongoose.disconnect().then(()=> console.log("Error! while connecting database ")
   // )


//module.exports = db 

