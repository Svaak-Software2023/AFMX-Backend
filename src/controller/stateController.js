const stateService = require("../services/stateService");

const registerState = async (req, res) => {
  try { 
    //Creating a new State.
    const registerNewState = await stateService.registerState(
      req.body
    );

    return res
      .status(201)
      .json({ message: "State created", registerNewState });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
    registerState,
};
