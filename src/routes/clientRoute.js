const express = require('express');
const client_route = express.Router();

client_route.use(express.static("public"));

const uploadClientImage = require('../middleware/multer.js')



const client_controller = require('../controller/clientController.js');

client_route.post("/signup", uploadClientImage , client_controller.registerClient);

client_route.post("/signin", client_controller.LoginClient);

client_route.post("/forget-password", client_controller.forgetPassword);

client_route.post("/reset-password", client_controller.resetPassword);


module.exports = client_route;
