const express = require('express');
const { signup, signin } = require("../controllers/userController");
const auth = require('../middlewares/auth');
const userRouter = express.Router();

userRouter.post("/signup", auth,signup);

userRouter.post("/signin", auth,  signin);

module.exports = userRouter;