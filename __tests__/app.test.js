const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const { app } = require("../app");
const endpointsData = require("../db/data/test-data/endpoints");

beforeEach(() => {
  return seed(testData);
});
afterAll(() => {
  db.end();
});

describe("app ", () => {
  describe("GET/api", () => {
    test("GET /api should return all available endpoints on the API", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then((endPoints) => {
          expect(endPoints.body).toEqual(endpointsData);
        });
    });
  });
  describe("GET/api/categories", () => {
    test("respond with a status of 200", () => {
      return request(app).get("/api/categories").expect(200);
    });
    test("respond with a status of 200 and display an array of category objects ", () => {
      return request(app)
        .get("/api/categories")
        .expect(200)
        .then((categories) => {
          expect(Array.isArray(categories.body)).toBe(true);
          expect(categories.body).toHaveLength(4);
        });
    });
    test("the object must contain slug and description properties", () => {
      return request(app)
        .get("/api/categories")
        .expect(200)
        .then((categories) => {
          categories.body.forEach((category) => {
            expect(category).toHaveProperty("slug", expect.any(String));
            expect(category).toHaveProperty("description", expect.any(String));
          });
        });
    });
  });
  describe("GET/api/reviews", () => {
    test("respond with a status of 200 and display an array of review objects sorted by date in descending order ", () => {
      return request(app)
        .get("/api/reviews")
        .expect(200)
        .then((reviews) => {
          const dateOrderToTest = reviews.body.map((review) => {
            return review.created_at.split("T")[0];
          });

          expect(dateOrderToTest).toBeSorted({ descending: true });
        });
    });
    test("reviews is an array of object with a length of 13 ", () => {
      return request(app)
        .get("/api/reviews")
        .expect(200)
        .then((reviews) => {
          expect(reviews.body).toHaveLength(13);
        });
    });
    test("each review must contain owner,title,review_id,category,review_img_url, created_at,votes,designer, and comment_count properties ", () => {
      return request(app)
        .get("/api/reviews")
        .expect(200)
        .then((reviews) => {
          reviews.body.forEach((review) => {
            expect(review).toHaveProperty("owner", expect.any(String));
            expect(review).toHaveProperty("title", expect.any(String));
            expect(review).toHaveProperty("category", expect.any(String));
            expect(review).toHaveProperty("designer", expect.any(String));
            expect(review).toHaveProperty("review_img_url", expect.any(String));
            expect(review).toHaveProperty("created_at", expect.any(String));
            expect(review).toHaveProperty("votes", expect.any(Number));
            expect(review).toHaveProperty("comment_count");
          });
        });
    });
    describe("queries", () => {
      test('respond with a status of 200, and display an array of review object filtered by category "dexterity"', () => {
        return request(app)
          .get("/api/reviews?category=dexterity")
          .expect(200)
          .then((response) => {
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body[0]).toHaveProperty("category", "dexterity");
          });
      });
      test('return status of 200 and display a review object filtered by category and by votes in ascending order, "', () => {
        return request(app)
          .get("/api/reviews?category=social deduction&sort_by=votes&order=ASC")
          .expect(200)
          .then((response) => {
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body).toBeSortedBy("votes", { ascending: true });
          });
      });
      test("return with a status of 200 and display an array of review object filtered by votes in descending order which is the default behaviour", () => {
        return request(app)
          .get("/api/reviews?sort_by=votes")
          .expect(200)
          .then((response) => {
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body).toBeSortedBy("votes", { descending: true });
          });
      });
      test("return with a status of 200 and display an array of review object filtered by votes in ascending order", () => {
        return request(app)
          .get("/api/reviews?sort_by=votes&order=ASC")
          .expect(200)
          .then((response) => {
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body).toBeSortedBy("votes", { ascending: true });
          });
      });
      test("return status 400 respond with a message invalid query", () => {
        return request(app)
          .get("/api/reviews?category=invalidQuery")
          .expect(400)
          .then((response) => {
            expect(response.status).toBe(400);
            expect(response.body.msg).toBe("invalid query");
          });
      });
    });
  });
  describe("GET/api/reviews/:review_id", () => {
    test("respond with a status of 200 and display a review object that match with ID endpoint", () => {
      return request(app)
        .get("/api/reviews/1")
        .expect(200)
        .then((review) => {
          expect(review.body[0].title).toBe(testData.reviewData[0].title);
          expect(review.body[0].owner).toBe(testData.reviewData[0].owner);
          //prettier-ignore
          expect(review.body[0].review_body).toBe(testData.reviewData[0].review_body);
          expect(review.body[0].designer).toBe(testData.reviewData[0].designer);
          expect(review.body[0].category).toBe(testData.reviewData[0].category);
          expect(review.body[0].votes).toBe(testData.reviewData[0].votes);
          //prettier-ignore
          expect(review.body[0].review_img_url).toBe(testData.reviewData[0].review_img_url);
        });
    });
    test("a review object must have, review_id,title,review_body,designer,review_img_url,votes,category,owner,created_at,comment_count - property", () => {
      return request(app)
        .get("/api/reviews/1")
        .expect(200)
        .then((review) => {
          review.body.forEach((review) => {
            expect(review).toHaveProperty("review_id", expect.any(Number));
            expect(review).toHaveProperty("title", expect.any(String));
            expect(review).toHaveProperty("category", expect.any(String));
            expect(review).toHaveProperty("designer", expect.any(String));
            expect(review).toHaveProperty("owner", expect.any(String));
            expect(review).toHaveProperty("review_body", expect.any(String));
            expect(review).toHaveProperty("review_img_url", expect.any(String));
            expect(review).toHaveProperty("created_at", expect.any(String));
            expect(review).toHaveProperty("votes", expect.any(Number));
            expect(review).toHaveProperty("comment_count", expect.any(String));
          });
        });
    });
  });
  describe("GET/api/reviews/:review_id/comments", () => {
    test("respond with a status of 200, and display an array of comments for the given review_id", () => {
      return request(app)
        .get("/api/reviews/2/comments")
        .expect(200)
        .then((commentsByReviewId) => {
          expect(Array.isArray(commentsByReviewId.body)).toBe(true);
          expect(commentsByReviewId.body).toHaveLength(3);
        });
    });
    test("each comment must have comment_id,votes,created_at,author,body and review_id properties", () => {
      return request(app)
        .get("/api/reviews/2/comments")
        .expect(200)
        .then((commentsByReviewId) => {
          commentsByReviewId.body.forEach((comment) => {
            expect(comment).toHaveProperty("comment_id");
            expect(comment).toHaveProperty("votes");
            expect(comment).toHaveProperty("created_at");
            expect(comment).toHaveProperty("author");
            expect(comment).toHaveProperty("body");
            expect(comment).toHaveProperty("review_id");
          });
        });
    });
    test("comments are displayed with the most recent comment first ", () => {
      return request(app)
        .get("/api/reviews/2/comments")
        .expect(200)
        .then((commentsByReviewId) => {
          //prettier-ignore
          expect(commentsByReviewId.body).toBeSortedBy("created_at", { descending: true,});
        });
    });
    test(`return empty [] if given review_id doesn't match with any comments`, () => {
      return request(app)
        .get("/api/reviews/1/comments")
        .expect(200)
        .then((commentsByReviewId) => {
          expect(Array.isArray(commentsByReviewId.body)).toBe(true);
          expect(commentsByReviewId.body).toHaveLength(0);
        });
    });
  });
  describe("GET/api/users", () => {
    test("respond with a status of 200 and display an array of user objects with a length of 4 ", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then((users) => {
          expect(Array.isArray(users.body)).toBe(true);
          expect(users.body).toHaveLength(4);
        });
    });
    test("each user must contain username,name,avatar_url  properties ", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then((users) => {
          users.body.forEach((user) => {
            expect(user).toHaveProperty("username", expect.any(String));
            expect(user).toHaveProperty("name", expect.any(String));
            expect(user).toHaveProperty("avatar_url", expect.any(String));
          });
        });
    });
  });
  describe("POST /api/reviews/:review_id/comments ", () => {
    test("respond with 201 when a valid comment is posted", () => {
      return request(app)
        .post("/api/reviews/2/comments")
        .send({ username: "philippaclaire9", body: "test comment" })
        .expect(201);
    });
    test("return status 201, responds with an object for the given review_id ", () => {
      return request(app)
        .post("/api/reviews/2/comments")
        .send({ username: "philippaclaire9", body: "test comment" })
        .expect(201)
        .then((comment) => {
          expect(comment.body).toHaveProperty("comment_id", expect.any(Number));
          expect(comment.body).toHaveProperty("body", expect.any(String));
          expect(comment.body).toHaveProperty("review_id", expect.any(Number));
          expect(comment.body).toHaveProperty("author", expect.any(String));
          expect(comment.body).toHaveProperty("votes", expect.any(Number));
          expect(comment.body).toHaveProperty("created_at", expect.any(String));
        });
    });
    test(`return status 404 when given review_id doesn't exist`, () => {
      return request(app)
        .post("/api/reviews/9999/comments")
        .send({ username: "philippaclaire9", body: "test comment" })
        .expect(404);
    });
    test("return status 400 when given review_id is invalid", () => {
      return request(app)
        .post("/api/reviews/invalid_reviewId/comments")
        .send({ username: "philippaclaire9", body: "test comment" })
        .expect(400);
    });
  });
  describe("PATCH /api/reviews/:review_id", () => {
    test("increment votes by 1 responds with the update review ", () => {
      return request(app)
        .patch("/api/reviews/1")
        .send({ inc_votes: 1 })
        .expect(200)
        .then((updatedReview) => {
          const reviewData1 = testData.reviewData[0].votes;
          expect(reviewData1).not.toBe(updatedReview.body.votes);
          expect(updatedReview.body.votes).toBeGreaterThan(reviewData1);
          expect(updatedReview.body.votes).toBe(2);
        });
    });
    test("decrement votes by 1 responds with the update review ", () => {
      return request(app)
        .patch("/api/reviews/1")
        .send({ inc_votes: -1 })
        .expect(200)
        .then((updatedReview) => {
          const reviewData1 = testData.reviewData[0].votes;
          expect(reviewData1).not.toBe(updatedReview.body.votes);
          expect(updatedReview.body.votes).toBeLessThan(reviewData1);
          expect(updatedReview.body.votes).toBe(0);
        });
    });
    test("return status 404 when given review_id doesn't exist", () => {
      return request(app)
        .patch("/api/reviews/9999")
        .send({ inc_votes: 1 })
        .expect(404);
    });
    test("return status 400 when given  review_id is invalid", () => {
      return request(app)
        .patch("/api/reviews/invalidId")
        .send({ inc_votes: 1 })
        .expect(400);
    });
  });
  describe("DELETE /api/comments/:comment_id", () => {
    test("return status 204, delete the given comment by comment_id and respond with no content", () => {
      return request(app)
        .delete("/api/comments/1")
        .expect(204)
        .then((deletedComment) => {
          expect(deletedComment.body).toEqual({});
        });
    });
    test(`return status 404 when comment_id provided doesn't exist`, () => {
      return request(app).delete("/api/comments/999").expect(404);
    });
    test("return status 400 when comment_id provided is invalid", () => {
      return request(app).delete("/api/comments/invalidId").expect(400);
    });
  });
});
