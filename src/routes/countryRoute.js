const express = require('express');
const country_route = express.Router();

const country_controller = require('../controller/countryController.js');

country_route.post("/register-country", country_controller.registerCountry);

country_route.put("/update-country/:countryId", country_controller.updateCountry);

module.exports = country_route;
