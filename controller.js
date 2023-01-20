const { sort } = require("./db/data/test-data/categories");
const {
  displayCategories,
  displayReviews,
  displayReviewId,
  displayCommentByReviewId,
  insertComment,
  updateReview,
  displayUsers,
  deleteComment,
} = require("./model");

const getCategories = (request, response) => {
  displayCategories().then((categoriesObject) => {
    const categories = categoriesObject.rows;
    response.status(200).send(categories);
  });
};

const getReviews = (request, response, next) => {
  const { category, sort_by, order } = request.query;

  displayReviews(category, sort_by, order)
    .then((reviewToSend) => {
      response.status(200).send(reviewToSend);
    })
    .catch((err) => {
      next(err);
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

const getUsers = (request, response) => {
  displayUsers().then((usersArrayToSend) => {
    response.status(200).send(usersArrayToSend);
  });
};

const postComment = (request, response, next) => {
  const { review_id } = request.params;
  const { username, body } = request.body;

  insertComment(review_id, { username, body })
    .then((commentToSend) => {
      response.status(201).send(commentToSend);
    })
    .catch(next);
};

const patchReviewById = (request, response, next) => {
  const { review_id } = request.params;
  const { inc_votes } = request.body;
  updateReview(inc_votes, review_id)
    .then((updatedReview) => {
      response.status(200).send(updatedReview);
    })
    .catch(next);
};

const deleteCommentById = (request, response, next) => {
  const { comment_id } = request.params;
  deleteComment(comment_id)
    .then(() => {
      response.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getCategories,
  getReviewsById,
  getReviews,
  getCommentByReviewId,
  postComment,
  patchReviewById,
  getUsers,
  deleteCommentById,
};
