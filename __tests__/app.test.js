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
