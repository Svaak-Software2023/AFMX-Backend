const jwt = require("jsonwebtoken");
const clientModel = require("../model/clientModel.js");
const TokenModel = require("../model/tokenModel.js");
const crypto = require("crypto");
const bycrptjs = require("bcryptjs");
require("dotenv").config();
const sendResetPasswordEmail = require("../utility/sendEmail.js");
const sendEmail = require("../utility/sendEmail.js");

const bycrptSalt = process.env.BCRYPT_SALT;
const jwt_secret = process.env.JWT_SECRET;
const client_url = process.env.CLIENT_URL;

const generateToken = async (clientId) => {
  try {
    const token = await jwt.sign({ clientId }, jwt_secret);
    return token;
  } catch (error) {
    throw new Error(error.message);
  }
};

const securePassword = async (password) => {
  try {
    const passwordHash = await bycrptjs.hash(password, Number(bycrptSalt));
    return passwordHash;
  } catch (error) {
    console.log("error", error.message);
  }
};

const registerClient = async (signUpDetails, filename) => {
  const sPassword = await securePassword(signUpDetails.clientPassword);

  const {
    clientPrifix,
    clientFirstName,
    clientMiddleName,
    clientLastName,
    clientSuffix,
    clientSSN,
    clientAddress1,
    clientAddress2,
    clientPostalCode,
    clientCity,
    stateId,
    countryId,
    clientPhone,
    clientEmail,
    clientLinkedInProfile,
    clientWebsite,
    createdDate,
    updatedDate,
    isActive,
  } = signUpDetails;

  // finding the client total number of count
  let clientCount = 0;
  clientCount = await clientModel.find().count();

  const newClientDetails = await clientModel({
    clientId: clientCount + 1,
    clientPrifix,
    clientFirstName,
    clientMiddleName,
    clientLastName,
    clientSuffix,
    clientProfileImage: filename,
    clientSSN,
    clientAddress1,
    clientAddress2,
    clientPostalCode,
    clientCity,
    stateId,
    countryId,
    clientPassword: sPassword,
    clientPhone,
    clientEmail,
    clientLinkedInProfile,
    clientWebsite,
    createdDate,
    updatedDate,
    isActive,
  });

  // cheking exitsting user
  const existingUser = await clientModel.findOne({ clientEmail });

  if (existingUser) {
    throw new Error("Email already exist");
  } else {
    const clientDetails = await newClientDetails.save();
    const subject = `Thank You for Joining AFMX Membership!`;
    const data = `
    <p>Dear ${clientFirstName} ${clientMiddleName},</p> 
    <p>Welcome to the exclusive AFMX community! We are thrilled to have you as a member, and we want to express 
     our gratitude for choosing AFMX for your tour experiences.</p>
    <p> As a valued member, you now have access to our exclusive tour website, where a world of personalized 
     benefits awaits you. Here are some of the perks you can enjoy:</p>
    <p>1.Personalized Experience and Account Settings: Tailor your preferences for a customized journey.</p>
    <p>2.Personalized Service Experience and Requests: Your preferences matter, and we're here to make your 
     experience unique.</p>
    <p>3.Exclusive Benefits: Unlock special privileges available only to AFMX members.</p>
    <p>4.Personalized Community Experience: Connect with like-minded members and enhance your journey together.</p>
    <p>5.Discounts in the Chemical Shop: Enjoy special savings on select products in our shop.</p>
    <p>6.Gain Points for a Free Service: Earn points with every interaction to redeem a complimentary service of 
     your choice.</p>
    <p>7.24/7 Customer Support: We're here around the clock to assist you with any queries or concerns.</p>
    <p>8.On-Call Emergency Cleaning: In case of unexpected situations, our emergency cleaning services are just a
     call away.</p>
    <p>Your membership is not just a transaction; it's a commitment to an elevated travel experience.
    Thank you for choosing AFMX, where your journey is our priority.</p>
    <p>If you have any questions or need assistance navigating our website, feel free to reach out to our
    dedicated customer support team.</p>
    <p>Once again, thank you for joining AFMX. We look forward to being part of your unforgettable
    cleaning experiences!
    </p>`
  //Sending the email to client Users. 
    sendEmail(clientEmail, subject, data)
    return clientDetails;
  }
};

const LoginClient = async (loginDetails) => {
  const { clientEmail, clientPassword } = loginDetails;

  if (!clientEmail || !clientPassword) {
    throw new Error("clientEmail and clientPassword must be compulsory !");
  }

  const user = await clientModel.findOne({ clientEmail });

  if (!user) {
    // User not found, handle this case
    throw new Error("User not found");
  }

  // validate, user is active or not
  // only active user is allowed to login
  if (!user.isActive) {
    console.log("inside if block");
    throw new Error(
      "user is not active.. Need to create an account then login"
    );
  }

  if (user) {
    const passwordMatch = await bycrptjs.compare(
      clientPassword,
      user.clientPassword
    );

    if (passwordMatch) {
      const tokenData = await generateToken(user.clientId);

      const userDetails = {
        clientId: user.clientId,
        clientPrifix: user.clientPrifix,
        clientFirstName: user.clientFirstName,
        clientMiddleName: user.clientMiddleName,
        clientLastName: user.clientLastName,
        clientSuffix: user.clientSuffix,
        clientProfileImage: user.clientProfileImage,
        clientSSN: user.clientSSN,
        clientAddress1: user.clientAddress1,
        clientAddress2: user.clientAddress2,
        clientPostalCode: user.clientPostalCode,
        clientCity: user.clientCity,
        stateId: user.stateId,
        countryId: user.countryId,
        clientPassword: user.clientPassword,
        clientPhone: user.clientPhone,
        clientEmail: user.clientEmail,
        clientLinkedInProfile: user.clientLinkedInProfile,
        clientWebsite: user.clientWebsite,
        isActive: user.isActive,
        token: tokenData,
      };
      return userDetails;
    } else {
      throw new Error("Password does not match");
    }
  } else {
    throw new Error("Login details are not valid");
  }
};

const forgetPassword = async (forgetDetails) => {
  const { clientEmail } = forgetDetails;

  const user = await clientModel.findOne({ clientEmail: clientEmail });

  if (!user) throw new Error("Email does not exits");

  let token = await TokenModel.findOne({ userId: user._id });
  let randomBytesString = crypto.randomBytes(32).toString("hex");
  let hashToken = await securePassword(randomBytesString);
  if (token) await token.deleteOne();

  await new TokenModel({
    userId: user._id,
    token: hashToken,
    createdAt: Date.now(),
  }).save();

  const subject = `Assistance with Password Reset for America's Finest Maintenance Company, LLC`;

  const link = `
  <p>Dear ${user.clientFirstName} ${user.clientMiddleName},</p>
  <p>We understand that you've recently initiated a password reset for your America's Finest 
  Maintenance Company, LLC account. Your security is our priority, and we're here to guide you
  through the process of regaining access to your account securely and promptly.</p>
  <p>To reset your password, kindly follow the steps outlined below:</p>
  <p>1. Access the Password Reset Link: To initiate the password reset process, simply click on the
  following link: 
  <a href="${client_url}/api/reset-password?&token=${randomBytesString}&id=${user._id}">Password Reset Link</a>. 
  Please be aware that this link will expire within 24 hours,so we recommend taking prompt action.</p>
  <p>2. Create a New Password: Once you've clicked on the link, you'll be directed to a page where
  you can establish a new password. For optimal security, we suggest choosing a password that is
  both strong and unique.</p>
  <p>3. Sign In: After successfully setting your new password, return to our login page and sign in
  using your email address along with the newly created password</p>
  <p>If you did not request this password reset, please disregard this email, and your account will
  remain secure</p>
  <p>Your security is of utmost importance to us, and we encourage you to adopt the following best
  practices:</p>
  <p>- Select a robust password containing a mix of letters, numbers, and special characters.\n
  - Avoid using easily guessable information, such as birthdays or common words.\n
  - Regularly update your password to enhance overall security.</p>
  <p>Should you encounter any challenges during the password reset process or have any additional
  questions, please do not hesitate to reach out to our support team at\n
  Customerservice@americasfinestmaintenance.com or (844)-200-900. We are here to assist you.</p>
  `;

// Sending email to the client for reset password.
  sendResetPasswordEmail(clientEmail, subject, link);
  return { link };
};

const resetPassword = async (userId, token, clientPassword) => {
  let passwordResetToken = await TokenModel.findOne({ userId });


  if (!passwordResetToken) {
    throw new Error("Invalid or expired password reset token");
  }

  const isValid = await bycrptjs.compare(token, passwordResetToken.token);

  if (!isValid) {
    throw new Error("Invalid or expired password reset token");
  }
  const newPassword = await securePassword(clientPassword);

  await clientModel.findByIdAndUpdate(
    { _id: userId },
    { $set: { clientPassword: newPassword } },
    { new: true }
  );

  const user = await clientModel.findById({ _id: userId });

  const subject = `Your Password Has Been Successfully Reset`

  const data = `
  <p>Dear ${user.clientFirstName} ${user.clientMiddleName},</p>
  <p>We hope this email finds you well.</p>
  <p>This is a confirmation that the password for your [account/service] has been successfully reset. 
  Your account security is our top priority, and we wanted to inform you of this recent change.</p>
  <p>If you initiated this password reset, you can disregard this email. However, if you did not request 
  a password reset or believe this action was taken in error, please contact our support team immediately 
  at Customerservice@americasfinestmaintenance.com or (844)-200-900.</p>
  <p>For your security, we recommend reviewing your account activity to ensure no unauthorized access has occurred. 
  If you notice any suspicious activity, please let us know right away.</p>
  <p>Thank you for your prompt attention to this matter.</p>
  <p>Best regards,</p>
  <p>AFMX</p>
  `

  // const link = ` ${user.clientFirstName} ${user.clientMiddleName}`;
  // Sending an email to the client reset password. 
  sendResetPasswordEmail(user.clientEmail, subject, data);

  await passwordResetToken.deleteOne();

  return { message: "Password reset was successful" };
};

module.exports = {
  registerClient,
  LoginClient,
  forgetPassword,
  resetPassword,
};
