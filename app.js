const {
  getCategories,
  getReviewsById,
  getReviews,
  getCommentByReviewId,
} = require("./controller");

const express = require("express");
const app = express();

app.get("/api/categories", getCategories);
app.get("/api/reviews", getReviews);
app.get("/api/reviews/:review_id", getReviewsById);
app.get("/api/reviews/:review_id/comments", getCommentByReviewId);

module.exports = { app };
