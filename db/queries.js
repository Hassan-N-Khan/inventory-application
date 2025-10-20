const pool = require("./pool");

async function fetchAllMovies() {
    const {rows} = await pool.query("SELECT * FROM movies");
    return rows;
}

async function addMovie({ moviename, genre, director, price }) {
    const query = `INSERT INTO movies (moviename, genre, director, price) VALUES ('${moviename}', '${genre}', '${director}', ${price});`;
    await pool.query(query);
    console.log("Movie added successfully");
};

async function deleteMovie(id) {
  const query = `DELETE FROM movies WHERE PK = $1;`;
  const result = await pool.query(query, [id]);
  console.log('Deleted rows:', result.rowCount);
}


module.exports = {
  fetchAllMovies,
  addMovie,
  deleteMovie
};
