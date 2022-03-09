const axios = require("axios");

describe("api", () => {
  // test api https://swapi.dev/api/people/1/
  it("Api swapi.dev should return a 200 response", async () => {
    const response = await axios.get("https://swapi.dev/api/people/1");
    expect(response.status).toBe(200);
    expect(response.data.name).toBe("Luke Skywalker");
  });
});
