const db = require("./db/connection");

const displayCategories = () => {
  return db.query(`SELECT * FROM categories;`);
};

const displayReviews = () => {
  return db.query(`
  SELECT reviews.owner,reviews.title,reviews.review_id,reviews.category,reviews.review_img_url, reviews.created_at,reviews.votes,reviews.designer,
  COUNT(comments.review_id) AS comment_count
  FROM reviews
  LEFT JOIN comments ON reviews.review_id = comments.review_id
  GROUP BY reviews.review_id
  ORDER BY reviews.created_at::date DESC
  `);
};

module.exports = { displayCategories, displayReviews };
const displayReviewId = (reviewId) => {
  return db.query(`SELECT * FROM reviews
                   WHERE review_id = ${reviewId}`);
};

module.exports = { displayCategories, displayReviewId };
