const CityModel = require("../model/cityModel.js");

const registerCity = async (cityDetails) => {
  const {
    //Field values from UI
    cityName,
    stateId,
    createdDate,
    updatedDate,
    isActive,
  } = cityDetails;

  // Check total Number of documents in the City collection
  let cityCount = 0;
  cityCount = await CityModel.find().count();

  const newCityDetails = await CityModel({
    //Save in City Model
    cityId: cityCount  + 1,
    cityName,
    stateId,
    createdDate,
    updatedDate,
    isActive,
  });

  // Check Existing City
  const cityExists = await CityModel.findOne({ cityName });

  if (cityExists) {
    throw new Error("City exists");
  } else {
    const newDetails = await newCityDetails.save();
    return newDetails;
  }
};

module.exports = {
  registerCity,
};
