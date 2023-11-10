const StateModel = require("../model/stateModel.js");

const registerState = async (stateDetails) => {
  const {
    //Field values from UI
    stateName,
    countryId,
    createdDate,
    updatedDate,
    isActive,
  } = stateDetails;

  // Check total Number of documents in the State collection
  let stateCount = 0;
  stateCount = await StateModel.find().count();

  const newStateDetails = await StateModel({
    //Save in State Model
    stateId: stateCount + 1,
    stateName,
    countryId,
    createdDate,
    updatedDate,
    isActive,
  });

  // Check Existing State
  const stateExists = await StateModel.findOne({ stateName });

  if (stateExists) {
    throw new Error("State exists");
  } else {
    const newDetails = await newStateDetails.save();
    return newDetails;
  }
};

module.exports = {
  registerState,
};
