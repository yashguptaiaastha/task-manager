const Taskmodel = require('../Models/Taskmodel');
const getTaskStatus = async (req, res) => {

  try {
    const counts = await TaskModel.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const result = {};
    counts.forEach((item) => {
      result[item._id] = item.count;
    });
    res.json(result);
  } catch (error) {
    console.error('Error retrieving task counts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


const getTask = async (req, res) => {
  try {

    const task = await Taskmodel.find({ user: req.user });
    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong " });
  }
}
const createTask = async (req, res) => {
  console.log(req.user)
  const { title, desc, status, duration, start } = req.body;
  try {
    const CreateNewTask = await Taskmodel.create({
      title: title,
      desc: desc,
      status: status,
      start: new Date(start),
      userId: req.userId,
      categoryId: req.body.categoryId
    });
    

    res.status(201).json(CreateNewTask);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => err.message);
      res.status(400).json({ errors });
    } else {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
  // console.log(error);
  // res.status(500).json({ message: 'Something went wrong' });
};

//try {

//     await CreateNewTask.save();
//     res.status(201).json(CreateNewTask);


// } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "something went wrong " });


// }



const updateTask = async (req, res) => {
  const { id: taskID } = req.params;

  try {
    const task = await Taskmodel.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true
    })

    res.json({ task })
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


const deleteTask = async (req, res) => {
  const { id: taskID } = req.params;

  try {
    const task = await Taskmodel.findOneAndDelete({ _id: taskID });

    res.json({ task })
  } catch {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { createTask, updateTask, deleteTask, getTask, getTaskStatus };

