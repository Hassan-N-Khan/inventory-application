const pool = require("./pool");

async function fetchAllMovies() {
    const {rows} = await pool.query("SELECT * FROM movies ORDER BY pk ASC");
    return rows;
};

async function fetchMovieById(id) {
    const query = `SELECT * FROM movies WHERE PK = $1;`;
    const values = [id];
    const { rows } = await pool.query(query, values);
    console.log("Fetched movie by ID:", rows[0]);
    return rows[0];
};

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

async function updateMovie(id, { moviename, genre, director, price }) {
    const query = `
      UPDATE movies
      SET moviename = $1, genre = $2, director = $3, price = $4
      WHERE PK = $5;
    `;
    const values = [moviename, genre, director, price, id];
    await pool.query(query, values);
    console.log("Movie updated successfully");
};

async function resetMoviesTable() {
    const query = `TRUNCATE TABLE movies RESTART IDENTITY;`;
    await pool.query(query);
    console.log("Movies table reset successfully");

    const addInitialDataQuery = `INSERT INTO public.movies (moviename, genre, director, price)
    VALUES 
    ('Inception', 'Sci-Fi', 'Christopher Nolan', 12.99),
    ('The Godfather', 'Crime', 'Francis Ford Coppola', 9.99),
    ('Pulp Fiction', 'Crime', 'Quentin Tarantino', 8.49),
    ('Interstellar', 'Sci-Fi', 'Christopher Nolan', 13.50),
    ('The Shawshank Redemption', 'Drama', 'Frank Darabont', 7.99),
    ('The Dark Knight', 'Action', 'Christopher Nolan', 11.99),
    ('Parasite', 'Thriller', 'Bong Joon-ho', 10.75),
    ('Forrest Gump', 'Drama', 'Robert Zemeckis', 9.50),
    ('Avengers: Endgame', 'Action', 'Anthony and Joe Russo', 14.25),
    ('Spirited Away', 'Animation', 'Hayao Miyazaki', 8.75);`;
    await pool.query(addInitialDataQuery);
    console.log("Initial data added to movies table");
}

async function searchMoviesByTitle(title) {
    const query = `SELECT * FROM movies WHERE moviename ILIKE $1;`;
    const values = [`%${title}%`];
    const { rows } = await pool.query(query, values);
    return rows;
};


module.exports = {
    fetchAllMovies,
    addMovie,
    deleteMovie,
    updateMovie,
    fetchMovieById,
    resetMoviesTable,
    searchMoviesByTitle
};
