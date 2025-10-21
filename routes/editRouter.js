const { Router } = require("express");
const editRouter = Router();
const { getMovieById } = require("../controllers/editController");
const { editItem } = require("../controllers/editController");

editRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const movie = await getMovieById(id);
  res.render("edit", { movie });
});

editRouter.post("/:id", async (req, res) => {
    await editItem(req, res);
});




module.exports = editRouter;