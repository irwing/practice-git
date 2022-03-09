const axios = require("axios");
const env = require("dotenv");

env.config();

const urlApi = process.env.URL_API;
const portApi = process.env.PORT_API;
const urlSwapi = process.env.URL_SWAPI;

describe("swapi", () => {
  // test api https://swapi.dev/api/people/1/
  it("Api swapi.dev should return a 200 response", async () => {
    const response = await axios.get(`${urlSwapi}/people/1/`);
    // const response = await axios.get("https://swapi.dev/api/people/1/");
    expect(response.status).toBe(200);
    expect(response.data.name).toBe("Luke Skywalker");
  });
});

describe("api", () => {
  // test api http://localhost:3000/api
  it("get person should return a 200 response", async () => {
    const response = await axios.get(`${urlApi}:${portApi}/api/person/1`);
    expect(response.status).toBe(200);
    expect(response.data).toContain("Api Star Wars");
  });

  // test api http://localhost:3000/api/person/1
  it("get person should return a 200 response", async () => {
    const response = await axios.get(`${urlApi}:${portApi}/api/person/1`);
    expect(response.status).toBe(200);
    expect(response.data.name).toContain("Luke Skywalker");
  });

  // test api http://localhost:3000/api/docs
  it("get person should return a 200 response", async () => {
    const response = await axios.get(`${urlApi}:${portApi}/api/docs`);
    expect(response.status).toBe(200);
  });

  // test api http://localhost:3000/api/person/inavalidtext
  it("any route not defined should return a 200 response", async () => {
    const search = Math.random().toString(36).substring(2, 15);

    const response = await axios.get(
      `${urlApi}:${portApi}/api/person/${search}`
    );
    expect(response.status).toBe(404);
  });

  // test api http://localhost:3000/api/inavalidendpoint
  it("any route not defined should return a 200 response", async () => {
    const response = await axios.get(`${urlApi}:${portApi}/api/hello/world`);
    expect(response.status).toBe(404);
  });
});
