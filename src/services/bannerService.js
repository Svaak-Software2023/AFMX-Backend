const BannerModel = require("../model/bannerModel.js");
const clientModel = require("../model/clientModel.js");

const registerBanner = async (bannerDetails, filename) => {
  const {
    businessName,
    businessURL,
    countryName,
    countryCode,
    phoneNumber,
    bannerLocation,
    bannerImageTitle,
    bannerImageAltText,
    bannerImageLink,
    startDate,
    endDate,
    description,
    clientId,
    isActive,
  } = bannerDetails;

  const client = await clientModel.findOne({ clientId });

  let bannerCount = 0;
  bannerCount = await BannerModel.find().count();

  if (client) {
    // Creating banner model based on UI
    const newBannerDetails = await BannerModel({
      bannerId: bannerCount + 1,
      businessName,
      businessURL,
      countryName,
      countryCode,
      phoneNumber,
      bannerLocation,
      bannerImage: filename,
      bannerImageTitle,
      bannerImageAltText,
      bannerImageLink,
      startDate,
      endDate,
      description,
      clientId,
      isActive,
    });

    const bannerCreateDetails = await newBannerDetails.save();
    return bannerCreateDetails;
  } else {
    throw new Error(
      "Your clientId does not exists, go to singup then create banner"
    );
  }
};

const updateBanner = async (bannerId, updateDetails) => {
  // check existing bannerId
  const bannerData = await BannerModel.findOne({ bannerId: bannerId });

  if (!bannerData) {
    throw new Error("Banner data is not found");
  }

  // update only if isActive is true
  const updateData = await BannerModel.findOneAndUpdate(
    { bannerId: bannerId },
    { $set: updateDetails },
    { new: true }
  );
  if (!updateData) {
    throw new Error("Banner could not updated");
  }

  return updateData;
};

const deleteBanner = async (bannerId, deleteDetails) => {
  // check existing bannerId
  const bannerData = await BannerModel.findOne({ bannerId: bannerId });

  if (!bannerData) {
    throw new Error("Banner data is not found");
  }

  // update only if isActive is true
  const updateData = await BannerModel.findOneAndUpdate(
    { bannerId: bannerId },
    { $set: deleteDetails },
    { new: true }
  );
  if (!updateData) {
    throw new Error("Banner could not deactivate");
  }

  return updateData;
};

module.exports = {
  registerBanner,
  updateBanner,
  deleteBanner,
};
