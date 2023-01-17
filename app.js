const { getCategories, getReviewsById } = require("./controller");

const express = require("express");
const app = express();

app.get("/api/categories", getCategories);

app.get("/api/reviews/:review_id", getReviewsById);
module.exports = { app };
