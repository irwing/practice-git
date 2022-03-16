const app = require("../index.js");
const request = require("supertest");

describe("web", () => {
  // test api http://localhost:3000
  it("should return a 200 response when web is active", async () => {
    const response = await request(app).get(`/`);
    expect(response.status).toBe(200);
    expect(response.text).toContain("Practice");
  });
});
