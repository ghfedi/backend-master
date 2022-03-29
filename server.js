const express = require('express')
const app = express()
var router = express.Router()
var bodyParser = require('body-parser')
var cors = require('cors')
const multer = require('multer')
const adminRoutes = require('./routers/AdminRoute')
const UserRoute=require('./routers/routeUser')
const DeleveryRouter=require('./routers/DeleveryRouter')
const authRoutes = require('./routers/authRoute')
const PORT = process.env.PORT || 3000
// image
app.use('/backend/uploads',express.static('uploads'))
 
// some dependency
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors({origin: '*'}))

//image google cloud cloud
const multerMid = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  })
  app.use(multerMid.single('file'))
//database connection
 require('./database/db');
 // socket connection
var server = require('http').Server(app);
var io = require('socket.io')(server,
    
    
    {
    cors: {
      origin:'*',
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  }
  
  ); 
app.set('io',io);
io.on('connection', socket => {
    console.log("new  sockeet connection...");
    socket.emit("test event","hey utsav");
});
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// for debugging
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
app.use('/',authRoutes)
app.use('/',adminRoutes)
app.use('/',UserRoute)
app.use('/',DeleveryRouter)
