const db = require("../db/queries");

async function addNewItem(req, res) {
    const { moviename, genre, director, price } = req.body;
    console.log("Adding new item:", moviename, genre, director, price);
    await db.addMovie({ moviename, genre, director, price });
    res.redirect("/");
}

module.exports = { addNewItem };