const db = require("../db/queries");

async function showAllMovies(req, res) {
    const movies = await db.fetchAllMovies();
    res.render("index", {movies});
}

async function deleteItem(req, res) {
    const id = req.body.deleteId;
    console.log("Deleting item with ID:", id);
    await db.deleteMovie(id);
    res.redirect("/");
}


module.exports = { showAllMovies, deleteItem };