const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data");

afterAll(() => db.end());

beforeEach(() => seed(data));

describe("*", () => {
  describe("ALL", () => {
    test("status 404: uncreated route returns Not Found message ", () => {
      return request(app)
        .get("/api/not_a_route")
        .expect(404)
        .then(({ body }) => {
          expect(body).toHaveProperty("msg");
          expect(body.msg).toBe("Route Not Found");
        });
    });
  });
});

describe("/api/categories", () => {
  describe("GET", () => {
    test("status 200: should return array of category objects ", () => {
      return request(app)
        .get("/api/categories")
        .expect(200)
        .then(({ body }) => {
          expect(body).toHaveProperty("categories");
          const { categories } = body;
          expect(categories).toBeInstanceOf(Array);
          expect(categories.length).not.toBe(0);
          categories.forEach((category) => {
            expect(category).toHaveProperty("slug");
            expect(category).toHaveProperty("description");
          });
        });
    });
  });
});

describe("/api/reviews/:review_id", () => {
  describe("GET", () => {
    test("status 200: should return single review by review_id ", () => {
      return request(app)
        .get("/api/reviews/1")
        .expect(200)
        .then(({ body }) => {
          expect(body).toHaveProperty("review");
          const { review } = body;
          expect(review).toHaveProperty("review_id", 1);
          expect(review).toHaveProperty("title");
          expect(review).toHaveProperty("review_body");
          expect(review).toHaveProperty("designer");
          expect(review).toHaveProperty("review_img_url");
          expect(review).toHaveProperty("votes");
          expect(review).toHaveProperty("category");
          expect(review).toHaveProperty("owner");
          expect(review).toHaveProperty("created_at");
        });
    });
    test("status 400: invalid review_id should return 400 Bad Request ", () => {
      return request(app)
        .get("/api/reviews/not_an_id")
        .expect(400)
        .then(({ body }) => {
          expect(body).toHaveProperty("msg");
          expect(body.msg).toBe("Bad Request");
        });
    });
    test("status 404: review_id valid but no data available shoud return 404 Not Found ", () => {
      return request(app)
        .get("/api/reviews/9999999")
        .expect(404)
        .then(({ body }) => {
          expect(body).toHaveProperty("msg");
          expect(body.msg).toBe("Review_ID Not Found");
        });
    });
  });

  describe("PATCH", () => {
    test("status 200: should increment votes by 1 according to request and return updated review", () => {
      const voteUpdate = { inc_votes: 1 };
      return request(app)
        .patch("/api/reviews/1") // seeded at 1 vote
        .send(voteUpdate)
        .expect(200)
        .then(({ body }) => {
          expect(body).toHaveProperty("updatedReview");
          const { updatedReview } = body;
          expect(updatedReview).toHaveProperty("review_id", 1); //known value
          expect(updatedReview).toHaveProperty("votes", 2); //known value
          expect(updatedReview).toHaveProperty("title");
          expect(updatedReview).toHaveProperty("review_body");
          expect(updatedReview).toHaveProperty("designer");
          expect(updatedReview).toHaveProperty("review_img_url");
          expect(updatedReview).toHaveProperty("category");
          expect(updatedReview).toHaveProperty("owner");
          expect(updatedReview).toHaveProperty("created_at");
        });
    });
    test("status 200: should increment votes by other numbers according to request", () => {
      const voteUpdate = { inc_votes: -5 };
      return request(app)
        .patch("/api/reviews/1") // seeded at 1 vote
        .send(voteUpdate)
        .expect(200)
        .then(({ body }) => {
          expect(body).toHaveProperty("updatedReview");
          const { updatedReview } = body;
          expect(updatedReview).toHaveProperty("votes", -4);
        });
    });
    test("status 400: malformed body should reject with 400 Bad Request", () => {
      const voteUpdate = { incorrect_key: 1 };
      return request(app)
        .patch("/api/reviews/1") // seeded at 1 vote
        .send(voteUpdate)
        .expect(400)
        .then(({ body }) => {
          expect(body).toHaveProperty("msg");
          expect(body.msg).toBe("Bad Request");
        });
    });
    test("status 400: incorrect data type in body", () => {
      const voteUpdate = { inc_votes: "not a numbers" };
      return request(app)
        .patch("/api/reviews/1") // seeded at 1 vote
        .send(voteUpdate)
        .expect(400)
        .then(({ body }) => {
          expect(body).toHaveProperty("msg");
          expect(body.msg).toBe("Bad Request");
        });
    });
    test("status 400: invalid review_id should return 400 Bad Request ", () => {
      const voteUpdate = { inc_votes: -5 };
      return request(app)
        .patch("/api/reviews/not_an_id")
        .send(voteUpdate)
        .expect(400)
        .then(({ body }) => {
          expect(body).toHaveProperty("msg");
          expect(body.msg).toBe("Bad Request");
        });
    });
    test("status 404: review_id valid but no data available shoud return 404 Not Found ", () => {
      const voteUpdate = { inc_votes: -5 };
      return request(app)
        .patch("/api/reviews/9999999")
        .send(voteUpdate)
        .expect(404)
        .then(({ body }) => {
          expect(body).toHaveProperty("msg");
          expect(body.msg).toBe("Review_ID Not Found");
        });
    });
  });
});

describe("/api/users", () => {
  describe("GET", () => {
    test("status 200: should return array of user objects  ", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          expect(body).toHaveProperty("users");
          const { users } = body;
          expect(users).toBeInstanceOf(Array);
          expect(users.length).not.toBe(0);
          users.forEach((user) => {
            expect(user).toHaveProperty("username", expect.any(String));
            expect(user).toHaveProperty("name", expect.any(String));
            expect(user).toHaveProperty("avatar_url", expect.any(String));
          });
        });
    });
  });
});
