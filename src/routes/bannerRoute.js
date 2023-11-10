const express = require("express");
const banner_route = express.Router();

const uploadImage = require("../middleware/multer.js");

const banner_controller = require("../controller/bannerController");

banner_route.use(express.static("public"));
banner_route.post(
  "/banner-create",
  uploadImage.single("bannerImage"),
  banner_controller.registerBanner
);

banner_route.put("/banner-update/:bannerId", banner_controller.updateBanner);

banner_route.put("/banner-delete/:bannerId", banner_controller.deleteBanner);

module.exports = banner_route;
