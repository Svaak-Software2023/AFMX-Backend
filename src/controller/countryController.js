const countryService = require("../services/countryService");

//Create Country
const registerCountry = async (req, res) => {
  try {
    // Handle register country response.
    const countryResponse = await countryService.registerCountry(req.body);

    return res
      .status(201)
      .json({ message: "Country created", countryResponse });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//Update country
const updateCountry = async (req, res) => {
  try {
    // Handle updated country response.
    const countryUpdatedResponse = await countryService.updateCountry(
      req.params.countryId,
      req.body
    );

    return res
      .status(202)
      .json({ message: "Country updated", countryUpdatedResponse });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerCountry,
  updateCountry,
};
