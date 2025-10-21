const {Router} = require("express");
const indexRouter = Router();
const { showAllMovies, deleteItem, resetMoviesTable } = require("../controllers/indexController");

indexRouter.get("/", (req, res) => {
  showAllMovies(req, res);
});

indexRouter.post("/", deleteItem);
indexRouter.post("/reset", resetMoviesTable);

module.exports = indexRouter;