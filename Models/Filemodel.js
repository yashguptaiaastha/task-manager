const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({

    filename : {type : String , required: true},
    logicalPath : {type : String , required: true},
    // userId : {
    //     type :mongoose.Schema.Types.ObjectId, 
    //     ref : 'user',
    //     required : false,
    // },
    virtualPath : {
        type : String , required : true
    }
    
},{timestamps : true});

// const title = mongoose.model('title', taskSchema);
module.exports = mongoose.model("File", fileSchema);