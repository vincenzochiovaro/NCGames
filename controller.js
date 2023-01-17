const { end } = require("./db/connection");
const { displayCategories, displayReviewId } = require("./model");

const getCategories = (request, response) => {
  displayCategories()
    .then((categoriesObject) => {
      const categories = categoriesObject.rows;
      response.status(200).send(categories);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getReviewsById = (request, response) => {
  const { review_id } = request.params;
  displayReviewId(review_id).then((reviewById) => {
    const reviewByIdToSend = reviewById.rows;
    response.status(200).send(reviewByIdToSend);
  });
};
module.exports = { getCategories, getReviewsById };
