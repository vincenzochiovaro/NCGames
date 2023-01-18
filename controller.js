const {
  displayCategories,
  displayReviews,
  displayReviewId,
  displayCommentByReviewId,
} = require("./model");

const getCategories = (request, response) => {
  displayCategories().then((categoriesObject) => {
    const categories = categoriesObject.rows;
    response.status(200).send(categories);
  });
};

const getReviews = (request, response) => {
  displayReviews().then((reviews) => {
    const reviewData = reviews.rows;
    response.status(200).send(reviewData);
  });
};

const getReviewsById = (request, response) => {
  const { review_id } = request.params;
  displayReviewId(review_id).then((reviewById) => {
    const reviewByIdToSend = reviewById.rows;
    response.status(200).send(reviewByIdToSend);
  });
};

const getCommentByReviewId = (request, response) => {
  const { review_id } = request.params;
  displayCommentByReviewId(review_id).then((commentToSend) => {
    response.status(200).send(commentToSend.rows);
  });
};

module.exports = {
  getCategories,
  getReviewsById,
  getReviews,
  getCommentByReviewId,
};
