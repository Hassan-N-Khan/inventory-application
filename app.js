const express = require("express");
const app = express();
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
const newRouter = require("./routes/newRouter");
const editRouter = require("./routes/editRouter");
const searchRouter = require("./routes/searchRouter");

app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//styles
const styleSheets = path.join(__dirname, "styles");
app.use(express.static(styleSheets));

//routers
app.use("/", indexRouter);
app.use("/new", newRouter);
app.use("/edit", editRouter);
app.use("/search", searchRouter);



const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`My first Express app - listening on port ${PORT}!`);
});

const pool = require('./db/pool');

async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS movies (
      pk SERIAL PRIMARY KEY,
      moviename VARCHAR(255),
      genre VARCHAR(50),
      director VARCHAR(255),
      price DECIMAL(4,2)
    );
  `);

  const { rows } = await pool.query('SELECT COUNT(*) FROM movies');
  if (rows[0].count === "0") {
    await pool.query(`
      INSERT INTO movies (moviename, genre, director, price)
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
      ('Spirited Away', 'Animation', 'Hayao Miyazaki', 8.75);
    `);
  }
}

initDB().catch(err => console.error(err));



app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
});