const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const env = require("dotenv");
const axios = require("axios");

env.config();

const optionsCors = { origin: "*" };

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(optionsCors));
app.use(express.json());

// routes
app.get("/api", (req, res) => res.send("Api Star Wars"));
app.get("/api/docs", (req, res) => res.send("Docs Star Wars"));

// route with parameters
app.get("/api/persons/:id", async (req, res) => {
  const personId = req.params.id;

  try {
    const response = await axios.get(
      `${process.env.URL_SWAPI}/people/${personId}/`
    );
    res.json(response.data);
  } catch (error) {
    res.status(404).send({ error: "Person not found" });
  }
});

// route index html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/home.html");
});

// return 404 if no route is found
app.use((req, res) => {
  res.status(404).send({ error: "Route not found" });
});

// listen
if (process.env.NODE_ENV !== "test") {
  app.listen(process.env.PORT_API, () =>
    console.log(`server listening on port ${process.env.PORT_API}!`)
  );
}

// export
module.exports = app;
