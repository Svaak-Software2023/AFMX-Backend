const contactModel = require("../model/contactUsModel");
const sendEmail = require("../utility/sendEmail");

const contactUsPage = async (contactDetails) => {
  const { name, email, message, subject, phoneNumber } = contactDetails;

  console.log("contactDetails", contactDetails);

  const createContact = await contactModel({
    name,
    email,
    message,
    subject,
    phoneNumber
  });

   // Save in Contact Model
    const contactData = await createContact.save();

    const sub = `New Inquiry - [${subject}]`
    const data = `
    <p>Dear AFMX,</p>
    <p>A new inquiry has been submitted through our online inquiry form. Here are the details:</p><br/>
    <p><b>Inquirer's Name:</b> ${name}</p>
    <p><b>Email Address:</b> ${email}</p>
    <p><b>Phone Number:</b> ${phoneNumber}</p>
    <p><b>Inquiry Topic/Reason:</b> ${subject}</p>
    <p><b>Detailed Inquiry:</b></p>
    <p>${message}</p><br/>
    <p>Best regards,</p>
    <p>AFMX</p>
    `
    // Sending email to the Admin.
     sendEmail(process.env.ADMIN_EMAIL, sub, data)

     const subUser = `Thank You for Your Inquiry`

     const dataForUser = `
     <p>Dear ${name},</p>
     <p>Thank you for reaching out to the exclusive AFMX community! We appreciate your interest in AFMX. 
     AFMX is pleased to assist you with any questions or information you may need.</p>
     <p>We have received your inquiry submitted through our online form, and I want to assure you that 
     we are diligently working to address your request. Our team is reviewing the details you provided, 
     and we aim to get back to you as soon as possible.</p>
     <p>In the meantime, if you have any additional information to share or specific details you'd like us 
     to consider, please feel free to respond to this email or provide further details through our website</p>
     <p>We understand the importance of your inquiry, and we are committed to providing you with the best possible 
     assistance. If your matter is urgent or requires immediate attention, please don't hesitate to contact us 
     directly at Customerservice@americasfinestmaintenance.com or (844)-200-900.</p>
     <p>Once again, thank you for considering AFMX. We value your interest, and we look forward to the opportunity 
     to serve you</p><br/>
     <p>Best regards,</p>
     <p>AFMX</p>
     ` 

    //  Sending email to the Users.
    sendEmail(email, subUser, dataForUser);

    return contactData;
};

module.exports = {
  contactUsPage,
};
