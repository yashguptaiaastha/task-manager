const express = require("express");
const {createCategory , getCategory ,getTaskCategory} = require("../controllers/categoryController");
const auth = require("../middlewares/auth");
const CategoryRouter = express.Router()

CategoryRouter.post("/", auth, createCategory);

CategoryRouter.get("/:id", auth, getCategory);

CategoryRouter.get("/taskCategory/count", auth, getTaskCategory);

module.exports = CategoryRouter;