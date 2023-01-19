const {
  getCategories,
  getReviewsById,
  getReviews,
  getCommentByReviewId,
  postComment,
  patchReviewById,
  getUsers,
} = require("./controller");

const express = require("express");
const app = express();
app.use(express.json());

app.get("/api/categories", getCategories);
app.get("/api/reviews", getReviews);
app.get("/api/reviews/:review_id", getReviewsById);
app.get("/api/reviews/:review_id/comments", getCommentByReviewId);
app.get("/api/users", getUsers);
app.post("/api/reviews/:review_id/comments", postComment);
app.patch("/api/reviews/:review_id", patchReviewById);

//CUSTOM ERROR HANDLER
app.use((err, request, response, next) => {
  if (err.status) {
    response.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

//PSQL ERROR HANDLER
app.use((err, request, response, next) => {
  if (err.code === "22P02") {
    response.status(400).send({ msg: "Bad request" });
  } else {
    next(err);
  }
});

//INTERNAL SERVER ERROR
app.use((err, request, response, next) => {
  response.status(500).send({ msg: "Internal server error" });
});
module.exports = { app };
