const JoinModel = require("../model/joinItemModel");

const registerJoin = async (joinDetails, fileName) => {
  const {
    // Field values from the UI
    afmxJoinId,
    afmxJoinDescription,
    afmxSlide,
    createdDate,
    updatedDate,
    isActive,
  } = joinDetails;

  // Finding the total number of document in join collection
  let joinCount = 0;
  joinCount = await JoinModel.find().count();

  const joinNewDetails = await JoinModel({
    //Save in Join Model
    afmxJoinId: joinCount + 1,
    afmxJoinImageVideo: fileName,
    afmxJoinDescription,
    afmxSlide,
    createdDate,
    updatedDate,
    isActive,
  });
  // check existing id
  const existingJoin = await JoinModel.findOne({ afmxJoinId });

  if (existingJoin) {
    throw new Error("Join afmx exists");
  } else {
    const details = await joinNewDetails.save();
    return details;
  }
};

const updateJoin = async (afmxJoinId, updatedJoinDetails) => {
  const joinData = await JoinModel.findOne({ afmxJoinId: afmxJoinId });

  if (!joinData) {
    throw new Error("join data is not found");
  }

  const updateJoinAfmx = await JoinModel.findOneAndUpdate(
    { afmxJoinId },
    { $set: updatedJoinDetails },
    { new: true }
  );
  return updateJoinAfmx;
};

module.exports = {
  registerJoin,
  updateJoin,
};
