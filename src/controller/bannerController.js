const bannerService = require("../services/bannerService");

const registerBanner = async (req, res) => {
  try {
    // Handle the register banner response
    const bannerResponse = await bannerService.registerBanner(
      req.body,
      req.file.filename
    );
    return res.json({ message: "Banner created", bannerResponse });
  } catch (error) {
    console.log("error1", error.message);

    return res.status(500).json({ error: error.message });
  }
};

const updateBanner = async (req, res) => {
  try {
    // Handle the update banner response
    const bannerUpdateResponse = await bannerService.updateBanner(
      req.params.bannerId,
      req.body
    );
    return res.json({ message: "Banner Update", bannerUpdateResponse });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteBanner = async (req, res) => {
  try {
    // Handle the delete banner response based on bannerId
    const bannerDeleteResponse = await bannerService.deleteBanner(
      req.params.bannerId,
      req.body
    );
    return res.json({ message: "Banner deactivated", bannerDeleteResponse });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerBanner,
  updateBanner,
  deleteBanner,
};
