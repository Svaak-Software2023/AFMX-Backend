const CountryModel = require("../model/countryModel.js");

const registerCountry = async (countryDetails) => {
  const {
    //Field values from UI
    countryName,
    countryShortName,
    countryPhoneCode,
    createdDate,
    updatedDate,
    isActive,
  } = countryDetails;

  // Check total Number of documents in the Country collection
  let countryCount = 0;
  countryCount = await CountryModel.find().count();

  const newCountryDetails = await CountryModel({
    //Save in Country Model
    countryId: countryCount + 1,
    countryName,
    countryShortName,
    countryPhoneCode,
    createdDate,
    updatedDate,
    isActive,
  });

  // Check Existing Country
  const countryExists = await CountryModel.findOne({ countryName });

  if (countryExists) {
    throw new Error("Country exists");
  } else {
    const newDetails = await newCountryDetails.save();
    return newDetails;
  }
};

//Update Country

const updateCountry = async (countryId, updateCountryDetails) => {
  // const {
  //   //Field values from UI
  //   countryName,
  //   countryShortName,
  //   countryPhoneCode,
  // } = updateCountryDetails;

  // console.log(paramsCountryId);

  // const {
  //   countryId
  // } = paramsCountryId

  // if(!countryName && !countryShortName && !countryPhoneCode) {
  //   throw new Error('All field must filled');
  // }

  // Check existing country
  const countryData = await CountryModel.findOne({ countryId: countryId });

  if (!countryData) {
    throw new Error("country data not found");
  }

  const updatedCountry = await CountryModel.findOneAndUpdate(
    { countryId: countryId },
    { $set: updateCountryDetails },
    { new: true }
  );

  if (!updatedCountry) {
    throw new Error("Country not found");
  }

  return updatedCountry;
};

module.exports = {
  registerCountry,
  updateCountry,
};
