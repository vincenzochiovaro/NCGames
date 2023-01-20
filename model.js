const db = require("./db/connection");

const displayCategories = () => {
  return db.query(`SELECT * FROM categories;`);
};

const displayReviews = (category, sort_by, order) => {
  let queryStr = `
  SELECT reviews.owner,reviews.title,reviews.review_id,reviews.category,reviews.review_img_url, reviews.created_at,reviews.votes,reviews.designer,
  COUNT(comments.review_id) AS comment_count
  FROM reviews
  LEFT JOIN comments ON reviews.review_id = comments.review_id
  `;

  //Params to pass to avoid any SQL injection
  let queryParams = [];

  if (category) {
    queryStr += `WHERE reviews.category = $1 `;
    queryParams.push(category);
  }

  queryStr += `GROUP BY reviews.review_id `;

  if (sort_by) {
    queryStr += `ORDER BY reviews.${sort_by} `;
  } else {
    queryStr += `ORDER BY reviews.created_at::date `;
  }

  if (order) {
    queryStr += `${order} `;
  } else {
    queryStr += `DESC `;
  }

  return db.query(queryStr, queryParams).then((reviewToSend) => {
    if (!reviewToSend.rows.length) {
      return Promise.reject({ status: 400, msg: "invalid query" });
    } else {
      return reviewToSend.rows;
    }
  });
};

const displayReviewId = (reviewId) => {
  return db.query(
    `SELECT reviews.*, COUNT(comments.review_id) 
     AS comment_count
     FROM reviews
     LEFT JOIN comments 
     ON reviews.review_id = comments.review_id
     WHERE reviews.review_id = $1
     GROUP BY reviews.review_id;`,
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

const displayUsers = () => {
  return db.query(` SELECT * FROM users `).then((usersArrayToSend) => {
    return usersArrayToSend.rows;
  });
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

const updateReview = (vote, reviewId) => {
  return db
    .query(
      `UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *`,
      [vote, reviewId]
    )
    .then((updatedReview) => {
      if (!updatedReview.rows[0]) {
        return Promise.reject({ status: 404, msg: "reviewId not found" });
      } else {
        return updatedReview.rows[0];
      }
    });
};

const deleteComment = (comment_id) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`, [
      comment_id,
    ])
    .then((deletedComment) => {
      if (!deletedComment.rows.length) {
        return Promise.reject({ status: 404, msg: "comment not found" });
      }
      return deletedComment;
    });
};

module.exports = {
  displayCategories,
  displayReviewId,
  displayReviews,
  displayCommentByReviewId,
  insertComment,
  updateReview,
  displayUsers,
  deleteComment,
};
