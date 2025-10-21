const {Router} = require('express');
const searchRouter = Router();
const {searchMoviesByTitle} = require('../controllers/searchController');

searchRouter.get("/", async (req, res) => {
  const title = req.query.search || "";
  console.log("Search query received:", title);
  let movies = []; 

  if (title) {
    try {
      movies = await searchMoviesByTitle(title);
    } catch (err) {
      console.error("Error searching movies:", err);
      return res.status(500).send("Internal Server Error");
    }
  }
  res.render("search", { movies, title });
});


module.exports = searchRouter;