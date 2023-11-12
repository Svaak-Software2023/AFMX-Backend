const express = require("express");
const contact_route = express.Router();

const contact_controller = require("../controller/contactController");

contact_route.post("/contact-page", contact_controller.contactUsPage);

module.exports = contact_route;
