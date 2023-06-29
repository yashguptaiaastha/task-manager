// const multer = require('multer')
// const Filemodel = require('../Models/Filemodel');
// const path = require('path')

// const storage= multer.diskStorage({
//     destination: path.join(__dirname,"../uploads"),
//     })
// const uploads = multer({
//     storage : storage, })
//     // app.post('/upload' , auth , upload.single("fileName"), async(req, res) =>{
//     //     const path = new Filemodel({
//     // })   
    

// const uploadFiles = async (req, res, next) =>{
//     try {
//     const file = new Filemodel({
//         fileName: req.file.filename,
//         logicalPath: req.file.destination,
//         userId: req.userId,
//     });
//     await file.save();
//     res.status(201).json({file});
// }
// catch (error) {
//     res.status(400).json({ error: 'cannot save file' });
// }
// }

// module.exports ={uploads, uploadFiles};

