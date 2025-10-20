const {Router} = require("express");
const indexRouter = Router();
const { showAllMovies, deleteItem } = require("../controllers/indexController");

indexRouter.get("/", (req, res) => {
  showAllMovies(req, res);
});

indexRouter.post("/", deleteItem);

module.exports = indexRouter;