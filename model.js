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

const displayReviewId = (reviewId) => {
  return db.query(
    `SELECT * FROM reviews
     WHERE review_id = $1;`,
    [reviewId]
  );
};

const displayCommentByReviewId = (reviewId) => {
  return db.query(
    `SELECT comment_id,votes,created_at,author,body,review_id 
     FROM comments 
     WHERE review_id = $1
     ORDER BY comments.created_at::date DESC
     `,
    [reviewId]
  );
};

const insertComment = (reviewId, { username, body }) => {
  return db
    .query(`SELECT * FROM reviews WHERE review_id = $1`, [reviewId])
    .then((review) => {
      if (!review.rows[0]) {
        return Promise.reject({ status: 404, msg: "reviewId not found" });
      }
      return db.query(
        `INSERT INTO comments (review_id,author,body) VALUES ($1,$2,$3) RETURNING *`,
        [reviewId, username, body]
      );
    })
    .then((newComment) => {
      return newComment.rows[0];
    });
};

module.exports = {
  displayCategories,
  displayReviewId,
  displayReviews,
  displayCommentByReviewId,
  insertComment,
};
