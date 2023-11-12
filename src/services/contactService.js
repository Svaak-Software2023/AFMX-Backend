const contactModel = require("../model/contactUsModel");
const sendEmail = require("../utility/sendEmail");

const contactUsPage = async (contactDetails) => {
  const { name, email, message } = contactDetails;

  const createContact = await contactModel({
    name,
    email,
    message,
  });

  // Check Existing contact.
  const contactExists = await contactModel.findOne({ email });
  console.log("contactExists", contactExists);

  if (contactExists) {
    throw new Error("Contact Exists");
  } else {
    const contactData = await createContact.save();

    const data = `<h3>Name: ${name}</h3> <br/><h3>Email: ${email}</h3> <br/><p> Message: ${message}</p>`;
    //  Sending email to the admin.
    sendEmail("sameerhacker34@gmail.com", "User Information", data);
    const link = `<h4> Thank You For Contact Us !</h4>`;
    // Sending email to the user.
    sendEmail(email, "Contact Us", link);
    return contactData;
  }
};

module.exports = {
  contactUsPage,
};
