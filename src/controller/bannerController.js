const bannerService = require("../services/bannerService");

const bannerHandleImage = async (req, res) => {
  try {
    const bannerResponse = await bannerService.bannerHandleImage(
      req.body,
      req.file.filename
    );
    return res.json({ message: "Banner created", bannerResponse });
  } catch (error) {
    console.log("error1", error.message);

    return res.status(500).json({ error: error.message });
  }
};

const bannerUpdate = async (req, res) => {
  console.log("inside controller");
  try {
    console.log("bannerId", req.params.bannerId);
    const bannerUpdateResponse = await bannerService.bannerUpdate(
      req.params.bannerId,
      req.body
    );
    return res.json({ message: "Banner Update", bannerUpdateResponse });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const bannerDelete = async (req, res) => {
  console.log("inside controller");
  try {
    console.log("bannerId", req.params.bannerId);
    const bannerDeleteResponse = await bannerService.bannerDelete(
      req.params.bannerId,
      req.body
    );
    return res.json({ message: "Banner deactivated", bannerDeleteResponse });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  bannerHandleImage,
  bannerUpdate,
  bannerDelete,
};
