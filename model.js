const db = require("./db/connection");

const displayCategories = () => {
  return db.query(`SELECT * FROM categories;`);
};

const displayReviewId = (reviewId) => {
  return db.query(`SELECT * FROM reviews
                   WHERE review_id = ${reviewId}`);
};

module.exports = { displayCategories, displayReviewId };
