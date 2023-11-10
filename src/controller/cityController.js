const cityService = require("../services/cityService");

const registerCity = async (req, res) => {
  try { 
    // Handle the city response.
    const cityResponse = await cityService.registerCity(
      req.body
    );

    return res
      .status(201)
      .json({ message: "City created", cityResponse });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
    registerCity,
};
