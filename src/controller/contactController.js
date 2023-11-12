const contactService = require("../services/contactService");

const contactUsPage = async (req, res) => {
  try {
    // Handle contact us page response.
    console.log("body", req.body);
    const contactResponse = await contactService.contactUsPage(req.body);
    return res
      .status(201)
      .json({ message: "Contact Created", contactResponse });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  contactUsPage,
};
