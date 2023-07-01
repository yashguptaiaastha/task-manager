const express = require("express");
const app = express();
const auth = require("./middlewares/auth");
const noteRouter = require("./routers/noteRoutes");
const userRouter = require("./routers/userRoutes");
const categoryRouter = require("./routers/categoryRoutes");
const taskRouter = require("./routers/taskRoutes");
const multer = require("multer");
const schedule = require('node-schedule');
const uploadRouter = require('./routers/fileRoutes');
const Filemodel = require('./Models/Filemodel')
let rateLimit = require("express-rate-limit");
const Taskmodel = require("./Models/Taskmodel");

//const date = new Date(2023, 6, 24, 15, 50, 25);

const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname,"./uploads"))
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname +".jpg")
            console.log(file.originalname)
            // console.log(filename)
        }

    });

const upload = multer({
    storage: storage,

})


app.post("/upload", auth,upload.single("image"), async (req, res) => {
    const path = req.body.path
    try {
        let uploadFile = new Filemodel({
        filename: req.file.filename,
        logicalPath: `${req.file.destination}/${path}`,
        // userId: req.userId,
        virtualPath: path

        });

        await uploadFile.save();
        res.status(201).json({uploadFile});
    }
    catch (error) {
        res.status(400).json({ error: 'cannot save file' });
    }
});
app.get("/search", async (req, res) =>{
    const path = req.query.path
    // console.log(path);
    try {
        const folder = await Filemodel.find({ virtualPath: path});
        res.status(200).json({folder});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: "something went wrong"});   
    }
})


rateLimit = require("express-rate-limit");

const createTaskLimiter = rateLimit({
    windowMs: 1*60*1000,
    max: 10,
    message: "don't create tasks and come after one minute"

});

app.use("/task", createTaskLimiter);

const users = async (req, res) => {
    console.log(req.body)
  
    try {
        const createTaskLimiter = await rateLimit({
            windowMs: 1*60*1000,
            max: 10,
            message: "don't create tasks and come after one minute"

        })
      
        res.status(201).json(createTaskLimiter);
    }
    catch (error){
        console.log(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
}


app.use("/task/users",auth, users, createTaskLimiter);
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         return cb(null, './uploads');
//     },
//     filename: function(req, file, cb) {
//         return cb(null, `${req.user._id}-${file.originalname}`);
//     },
// });
// let upload = multer({ storage});
//upload = multer({ dest: "uploads/" });

 app.use(express.json())
 app.use(express.urlencoded({extended:true}))
//  app.use(uploadRouter)

 //app.use("/uploadFiles", uploadRouter);
//  function uploadFiles(req, res) {
//     console.log(req.body);
//     console.log(req.file);

//     res.sendStatys(200);
//  }

const mongoose = require("mongoose");
const fileRouter = require("./routers/fileRoutes");
const { file } = require("googleapis/build/src/apis/file");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use((req, res, next)=>{
    console.log("HTTP Method - " + req.method + " , URL - " + req.url);
    next();
    
});

app.use("/users", userRouter);
app.use("/note", noteRouter);
app.use("/category", categoryRouter);
app.use("/task", taskRouter);
//app.use("/", fileRouter);



mongoose.connect('mongodb+srv://yashnakwal1:SibJq3N9_qxSJ58@cluster0.lj4wpeh.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    app.listen(5005, ()=>{
        console.log("Server started on port no.  5005");
        });

})
.catch((error)=>{
    console.log(error);
})








