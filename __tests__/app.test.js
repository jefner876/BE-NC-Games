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
          expect(review).toHaveProperty("review_id");
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
  });
});
