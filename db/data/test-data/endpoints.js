const endpoints = {
  categories: {
    method: "GET",
    description: "Retrieves all categories",
    url: "/api/categories",
  },
  reviews: {
    method: "GET",
    description: "Retrieves all reviews",
    url: "/api/reviews",
  },
  reviewsReviewsId: {
    method: "GET",
    description: "Retrieves review by reviewId",
    url: "/api/reviews/:review_id",
  },
  reviewsReviedIdComments: {
    method: "GET",
    description: "Retrieves comments by reviewId",
    url: "/api/reviews/:review_id/comments",
  },
  users: {
    method: "GET",
    description: "Retrieves all users",
    url: "/api/users",
  },
  postComment: {
    method: "POST",
    description: "Insert a comment  ",
    url: "/api/reviews/:review_id/comments",
  },
  updateReviewByReviewId: {
    method: "PATCH",
    description: "update a review by reviewId",
    url: "/api/reviews/:review_id",
  },
  deleteComment: {
    method: "DELETE",
    description: "delete a comment by commentId",
    url: "/api/comments/:comment_id",
  },
};
module.exports = endpoints;
