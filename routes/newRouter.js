const {Router} = require("express");
const newRouter = Router();
const { addNewItem } = require("../controllers/newController");

newRouter.get("/", (req, res) => {
  res.render("new");
});

newRouter.post("/", (req, res) => {
  addNewItem(req, res);
});


module.exports = newRouter;