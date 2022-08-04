const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data");
const { convertTimestampToDate } = require("../db/seeds/utils");
require("jest-sorted");

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
          expect(categories.length).toBe(4);
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
          expect(users.length).toBe(4);
          users.forEach((user) => {
            expect(user).toHaveProperty("username", expect.any(String));
            expect(user).toHaveProperty("name", expect.any(String));
            expect(user).toHaveProperty("avatar_url", expect.any(String));
          });
        });
    });
  });
});

describe("/api/reviews/:review_id", () => {
  describe("GET", () => {
    test("status 200: should add comment count to review object", () => {
      return request(app)
        .get("/api/reviews/2") //seeded with 3 comments
        .expect(200)
        .then(({ body }) => {
          expect(body).toHaveProperty("review");
          const { review } = body;
          expect(review).toHaveProperty("review_id", 2);
          expect(review).toHaveProperty("comment_count", 3);
        });
    });
    test("status 200: should add comment count to review object(0 comments check)", () => {
      return request(app)
        .get("/api/reviews/1") //seeded with 0 comments
        .expect(200)
        .then(({ body }) => {
          expect(body).toHaveProperty("review");
          const { review } = body;
          expect(review).toHaveProperty("review_id", 1);
          expect(review).toHaveProperty("comment_count", 0);
        });
    });
  });
});

describe("/api/reviews", () => {
  describe("GET", () => {
    test("status 200: should return an array of review objects (reviews data)", () => {
      return request(app)
        .get("/api/reviews")
        .expect(200)
        .then(({ body }) => {
          expect(body).toHaveProperty("reviews");
          const { reviews } = body;
          expect(reviews).toBeInstanceOf(Array);
          expect(reviews.length).toBe(13);
          reviews.forEach((review) => {
            expect(review).toHaveProperty("owner", expect.any(String));
            expect(review).toHaveProperty("title", expect.any(String));
            expect(review).toHaveProperty("review_id", expect.any(Number));
            expect(review).toHaveProperty("category", expect.any(String));
            expect(review).toHaveProperty("review_img_url", expect.any(String));
            expect(review).toHaveProperty("votes", expect.any(Number));
            expect(review).toHaveProperty("designer", expect.any(String));
            expect(review).toHaveProperty("created_at", expect.any(String));
            expect(isNaN(Date.parse(review.created_at))).toBe(false); //expect string to be in date format
          });
        });
    });
    test("status 200: should include comment_count in review objects and include reviews with 0 comments (comments data)", () => {
      return request(app)
        .get("/api/reviews")
        .expect(200)
        .then(({ body: { reviews } }) => {
          expect(reviews).toBeInstanceOf(Array);
          expect(reviews.length).toBe(13); //all test reviews inc. some with zero comments
          reviews.forEach((review) => {
            expect(review).toHaveProperty("comment_count", expect.any(Number));
          });
        });
    });

    test("status 200: should be sorted in descending date order", () => {
      return request(app)
        .get("/api/reviews")
        .expect(200)
        .then(({ body: { reviews } }) => {
          expect(reviews).toBeSortedBy("created_at", { descending: true });
        });
    });
  });
});

describe("/api/reviews/:review_id/comments", () => {
  describe("GET", () => {
    test("status 200: should return an array of comments for the given review id", () => {
      return request(app)
        .get("/api/reviews/2/comments") //seeded with 3 comments
        .expect(200)
        .then(({ body }) => {
          expect(body).toHaveProperty("comments");
          const { comments } = body;
          expect(comments).toBeInstanceOf(Array);
          expect(comments.length).toBe(3);
          comments.forEach((comment) => {
            expect(comment).toHaveProperty("comment_id", expect.any(Number));
            expect(comment).toHaveProperty("votes", expect.any(Number));
            expect(comment).toHaveProperty("created_at", expect.any(String));
            expect(isNaN(Date.parse(comment.created_at))).toBe(false); //expect string to be in date format
            expect(comment).toHaveProperty("body", expect.any(String));
            expect(comment).toHaveProperty("review_id", 2);
            expect(comment).toHaveProperty("author", expect.any(String));
          });
        });
    });
    test("status 200: 0 comments on review ID should return empty array", () => {
      return request(app)
        .get("/api/reviews/1/comments") //seeded with 0 comments
        .expect(200)
        .then(({ body }) => {
          expect(body).toHaveProperty("comments");
          const { comments } = body;
          expect(comments).toBeInstanceOf(Array);
          expect(comments.length).toBe(0);
        });
    });
    test("status 400: invalid review_id should return 400 Bad Request ", () => {
      return request(app)
        .get("/api/reviews/not_an_id/comments")
        .expect(400)
        .then(({ body }) => {
          expect(body).toHaveProperty("msg");
          expect(body.msg).toBe("Bad Request");
        });
    });
    test("status 404: review_id valid but no data available shoud return 404 Not Found ", () => {
      return request(app)
        .get("/api/reviews/9999999/comments")
        .expect(404)
        .then(({ body }) => {
          expect(body).toHaveProperty("msg");
          expect(body.msg).toBe("Review_ID Not Found");
        });
    });
  });
});

describe("/api/reviews/:review_id/comments", () => {
  describe("POST", () => {
    test("status 200: should return the posted comment", () => {
      const testComment = { username: "philippaclaire9", body: "test comment" };

      return request(app)
        .post("/api/reviews/1/comments")
        .send(testComment)
        .expect(201)
        .then(({ body }) => {
          expect(body).toHaveProperty("postedComment");
          const { postedComment } = body;
          expect(postedComment).toHaveProperty("review_id", 1);
          expect(postedComment).toHaveProperty("author", "philippaclaire9");
          expect(postedComment).toHaveProperty("body", "test comment");
          expect(postedComment).toHaveProperty("comment_id", 7); //6 in seed data
          expect(postedComment).toHaveProperty("votes", 0);
          expect(postedComment).toHaveProperty(
            "created_at",
            expect.any(String)
          );
          expect(isNaN(Date.parse(postedComment.created_at))).toBe(false); //expect string to be in date format
        });
    });
    test("status 400: malformed body should reject with 400 Bad Request", () => {
      const testComment = {
        username: "philippaclaire9",
        notAbody: "test comment",
      };

      return request(app)
        .post("/api/reviews/1/comments")
        .send(testComment)
        .expect(400)
        .then(({ body }) => {
          expect(body).toHaveProperty("msg");
          expect(body.msg).toBe("Bad Request");
        });
    });
    test("status 400: wrong data type should reject with 400 Bad Request", () => {
      const testComment = {
        username: "philippaclaire9",
        body: null,
      };

      return request(app)
        .post("/api/reviews/1/comments")
        .send(testComment)
        .expect(400)
        .then(({ body }) => {
          expect(body).toHaveProperty("msg");
          expect(body.msg).toBe("Bad Request");
        });
    });
    test("status 400: invalid review_id should return 400 Bad Request", () => {
      const testComment = {
        username: "philippaclaire9",
        body: "test comment",
      };
      return request(app)
        .post("/api/reviews/not_an_id/comments")
        .send(testComment)
        .expect(400)
        .then(({ body }) => {
          expect(body).toHaveProperty("msg");
          expect(body.msg).toBe("Bad Request");
        });
    });
  });
});
