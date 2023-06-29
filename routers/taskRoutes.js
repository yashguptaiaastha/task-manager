const express = require("express");
const {getTask ,createTask , updateTask ,deleteTask, getTaskStatus } = require("../controllers/taskController");
const auth = require("../middlewares/auth");
const Taskrouter = express.Router()

Taskrouter.get("/", auth, getTask);

Taskrouter.post("/", auth, createTask);

Taskrouter.patch("/:taskID", auth, updateTask);

Taskrouter.delete("/:taskID", auth, deleteTask);

Taskrouter.get("/getTaskStatus ", auth, getTaskStatus);

module.exports = Taskrouter;