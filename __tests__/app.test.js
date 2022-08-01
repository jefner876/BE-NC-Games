const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data");

afterAll(() => db.end());

beforeEach(() => seed(data));

describe("/api/categories", () => {
  describe("GET", () => {
    test("status 200: should return array of category objects ", () => {
      return request(app)
        .get("/api/categories")
        .expect(200)
        .then(({ body }) => {
          expect(body).toHaveProperty("categories");
          expect(body.categories).toBeInstanceOf(Array);
          expect(body.categories[0]).toHaveProperty("slug");
          expect(body.categories[0]).toHaveProperty("description");
        });
    });
  });
});
