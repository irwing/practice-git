const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const env = require("dotenv");

env.config();

const optionsCors = { origin: "*" };

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(optionsCors));
app.use(express.json());

// routes
app.get("/", (req, res) => res.send("Api is running"));

// listen
app.listen(port, () =>
  console.log(`server listening on port ${process.env.PORT_API}!`)
);

// export
module.exports = app;
