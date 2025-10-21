const db = require("../db/queries");

async function editItem(req, res) {
  const id = req.params.id;
  const { moviename, genre, director, price } = req.body;

  try {
    await db.updateMovie(id, { moviename, genre, director, price });
    res.redirect("/");
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function getMovieById(id) {
  return await db.fetchMovieById(id);
};


module.exports = {
  editItem,
  getMovieById
};