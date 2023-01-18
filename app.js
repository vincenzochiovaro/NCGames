const {
  getCategories,
  getReviewsById,
  getReviews,
  getCommentByReviewId,
  postComment,
} = require("./controller");

const express = require("express");
const app = express();
app.use(express.json());

app.get("/api/categories", getCategories);
app.get("/api/reviews", getReviews);
app.get("/api/reviews/:review_id", getReviewsById);
app.get("/api/reviews/:review_id/comments", getCommentByReviewId);
app.post("/api/reviews/:review_id/comments", postComment);

module.exports = { app };
