const CategoryModel = require("../Models/Categorymodel");
const TaskModel = require('../Models/Taskmodel')

const createCategory = async (req, res) => {
    try {
    const {name} = req.body;

        const taskCategory = new categories({
            name : name ,
            userId : req.userId ,

    });

    await taskCategory.save()
    res.status(201).json({taskCategory});

    //await taskCategory.validate();
      
}  catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the category.' });
  }
};

const getTaskCategory =  async (req, res) => {
    try {
      const taskCountCategory = await TaskModel.aggregate([
        { $group: { _id: '$categoryId', TaskCount: { $sum: 1 } } },
      ]);
    
      //res.status(200).json(taskCountCategory);
      res.json({taskCountCategory});
      
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving task count.' });
  }
  }

const getCategory = async (req , res) => {
    try {
    const reIdsCat = await CategoryModel.find({categoryId : req.categoryId})
    res.status(200).json(reIdsCat);
} catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the category.' });
}
};

module.exports = {createCategory , getCategory , getTaskCategory};
