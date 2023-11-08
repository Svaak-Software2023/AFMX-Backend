const express = require("express");
const banner_route = express.Router();

const uploadImage = require("../middleware/multer.js");

const banner_controller = require("../controller/bannerController");

banner_route.post(
  "/banner-create",
  uploadImage.single("bannerImage"),
  banner_controller.bannerHandleImage
);

banner_route.put("/banner-update/:bannerId", banner_controller.bannerUpdate);

banner_route.put("/banner-delete/:bannerId", banner_controller.bannerDelete);

module.exports = banner_route;
