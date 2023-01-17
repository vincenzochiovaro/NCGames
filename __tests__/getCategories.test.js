const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const { app } = require("../app");

beforeEach(() => {
  return seed(testData);
});
afterAll(() => {
  db.end();
});

describe("app ", () => {
  describe("/api/categories", () => {
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
  describe("/api/reviews", () => {
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
  });
});
