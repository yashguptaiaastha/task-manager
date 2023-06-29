const noteModel = require('../Models/note');

const create = async (req, res) =>{
    
    const {title, description} = req.body;

    const newNote = new noteModel({
        title: title,
        description : description,
        userId : req.userId
    });

    try {

        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "something went wrong"});

    }
}

const get = async (req, res) =>{
    try {

        const notes = await noteModel.find({userId : req.userId});
        res.status(200).json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "something went wrong"});
    }
}

const update = (req, res) =>{

}

const del = (req, res) =>{

}
module.exports ={
    create,
    get,
    update,
    del
}