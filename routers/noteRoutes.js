const express = require("express");
const{ get, create,del,update} = require("../controllers/noteController");
const noteRouter = express.Router();
const auth = require("../middlewares/auth");

noteRouter.get("/", auth, get);

noteRouter.post("/", auth, create);

noteRouter.delete("/:id", auth, del);

noteRouter.put("/:id",auth, update);

module.exports = noteRouter;