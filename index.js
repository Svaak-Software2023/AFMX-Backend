const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

// Define all the routes
const client_route = require("./src/routes/clientRoute.js");
const banner_route = require("./src/routes/bannerRoute.js");
const country_route = require("./src/routes/countryRoute.js");
const state_route = require("./src/routes/stateRoute.js");
const city_route = require("./src/routes/cityRoute.js");
const join_route = require("./src/routes/joinRoute.js");

const url = process.env.DB_URL;
const port = process.env.PORT;

// for http request
app.use(morgan("dev"));
// for communicate with cors platform
app.use(cors());
// To handle the incoming request
app.use(express.json());

// To pass and handle the routes
app.use("/api", client_route);
app.use("/api", banner_route);
app.use("/api", country_route);
app.use("/api", state_route);
app.use("/api", city_route);
app.use("/api", join_route);

// mongoDB Connection
mongoose
  .connect(url)
  .then(() => {
    app.listen(port, () => console.log(`Server runing on the port ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
