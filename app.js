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


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
});