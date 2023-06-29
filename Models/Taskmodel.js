const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

    title : {type : String , required: true},
    status : {type : String , required: true},
    desc : {type : String , required: true},
    
    start: { type: Date, default: Date.now },

     
    userId : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'User'
     },
    
    categoryId : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'Category'
     }

},{timestamps : true});

const title = mongoose.model('title', taskSchema);
module.exports = mongoose.model("Task", taskSchema);