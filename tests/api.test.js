const axios = require("axios");
const app = require("../index.js");
const request = require("supertest");

const env = require("dotenv");

env.config();

const urlSwapi = process.env.URL_SWAPI;

describe("swapi", () => {
  // test api https://swapi.dev/api/people/1/
  it("Api swapi.dev should return a 200 response", async () => {
    const response = await axios.get(`${urlSwapi}/people/1`);
    expect(response.status).toBe(200);
    expect(response.data.name).toBe("Luke Skywalker");
  });
});

describe("api", () => {
  // test api http://localhost:3000/api
  it("should return a 200 response when api is active", async () => {
    const response = await request(app).get(`/api`);
    expect(response.status).toBe(200);
    expect(response.text).toContain("Api Star Wars");
  });

  // test api http://localhost:3000/api/person/1
  it("should return a 200 response when find a person", async () => {
    const response = await request(app).get(`/api/persons/1`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Luke Skywalker");
  });

  // test api http://localhost:3000/api/docs
  it("should return a 200 response if the documentatin is active", async () => {
    const response = await request(app).get(`/api/docs`);
    expect(response.status).toBe(200);
  });

  // test api http://localhost:3000/api/person/inavalidtext
  it("should 404 if person no is found", async () => {
    const search = Math.random().toString(36).substring(2, 15);
    const response = await request(app).get(`/api/persons/${search}`).send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Person not found");
  });

  // test api http://localhost:3000/api/inavalidendpoint
  it("should 404 if no route is found", async () => {
    const response = await request(app).get(`/api/inavalidendpoint`).send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Route not found");
  });
});
