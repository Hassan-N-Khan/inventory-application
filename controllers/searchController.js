const db = require('../db/queries');

async function searchMoviesByTitle(title) {
    return await db.searchMoviesByTitle(title);
}

module.exports = {
    searchMoviesByTitle
};