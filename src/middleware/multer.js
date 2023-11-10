const multer = require("multer");
const path = require("path");

const destinationPathClientImage = path.join(
  __dirname,
  "../public/clientImages"
);
const destinationPathbannerImage = path.join(
  __dirname,
  "../public/bannerImages"
);
const destinationPathJoinImage = path.join(
  __dirname,
  "../public/joinImages"
);


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let destinationPath;

    // check the fieldname to determine the destination path
    if (file.fieldname === "clientProfileImage") {
      destinationPath = destinationPathClientImage;
    } else if (file.fieldname === "bannerImage") {
      destinationPath = destinationPathbannerImage;
    } else if (file.fieldname === "afmxJoinImageVideo") {
      destinationPath = destinationPathJoinImage;
    }

    if (destinationPath) {
      cb(null, destinationPath, function (error, success) {
        if (error) throw error;
      });
    } else {
      cb(new Error("Invalid fieldname"), null);
    }
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name, function (error1, success1) {
      if (error1) throw error1;
    });
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50000000,
  },
});

module.exports = upload;
