const axios = require("axios");

const urlWeb = "https://irwing.github.io/practice-git";

describe("web", () => {
  it("should return a 200 response", async () => {
    const response = await axios.get(urlWeb);
    expect(response.status).toBe(200);
  });
});
