const { getCategories, getReviews } = require("./controller");

const express = require("express");
const app = express();

app.get("/api/categories", getCategories);
app.get("/api/reviews", getReviews);

module.exports = { app };
