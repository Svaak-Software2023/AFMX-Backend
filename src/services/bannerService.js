const BannerModel = require("../model/bannerModel.js");
const clientModel = require("../model/clientModel.js");

const bannerHandleImage = async (bannerDetails, filename) => {
  console.log("filename", filename);

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
  console.log("client", client);

  let bannerCount = 0;
  bannerCount = await BannerModel.find().count();

  if (client) {
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
    console.log("saved", bannerCreateDetails);
    return bannerCreateDetails;
  } else {
    console.log("else");
    throw new Error(
      "Your clientId does not exists, go to singup then create banner"
    );
  }
};

const bannerUpdate = async (bannerId, updateDetails) => {
  console.log("bannerId--->", bannerId);
  console.log("updateDetails", updateDetails);

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

const bannerDelete = async (bannerId, deleteDetails) => {
  console.log("bannerId--->", bannerId);
  console.log("deleteDetails", deleteDetails);

  const bannerData = await BannerModel.findOne({ bannerId: bannerId });
  console.log("bannerData", bannerData);
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
  bannerHandleImage,
  bannerUpdate,
  bannerDelete,
};
