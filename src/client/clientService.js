const jwt = require("jsonwebtoken");
const clientModel = require("../model/clientModel.js");
const TokenModel = require("../model/tokenModel.js");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const bycrptjs = require("bcryptjs");
require("dotenv").config();
const sendResetPasswordEmail = require("../utility/sendEmail.js");

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
    console.log("error123", error.message);
  }
};

const registerClient = async (signUpDetails, filename) => {
  console.log("filename", filename);
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

  const newClientDetails = await clientModel({
    clientId: uuidv4(),
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
    return clientDetails;
  }
};

const LoginClient = async (loginDetils) => {
  const { clientEmail, clientPassword } = loginDetils;

  if (!clientEmail || !clientPassword) {
    throw new Error("clientEmail and clientPassword must be compulsary !");
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
      const response = {
        success: true,
        message: "Client Details",
        data: userDetails,
      };

      return response;
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

  const link = `<div style="width: 100%;margin: auto;">
    <h3>Hi ${user.clientFirstName} ${user.clientMiddleName},</h3>
    <p>You requested to reset your password</p>
    <p>Please, click the link below to reset your password</p>
    <a href="${client_url}/api/reset-password?&token=${randomBytesString}&id=${user._id}" style="width:100%; background-color:blue;padding: 5px 25px; text-decoration: none; color:#fff;font-weight: 600;">Reset Password</a>
  </div>`;

  // const link =
  //   "Hi " +
  //   user.clientFirstName +
  //   ', please click the link <a href= "http://localhost:5000/api/reset-password?&token=' +
  //   randomBytesString +
  //   "&id=" +
  //   user._id +
  //   '"> reset your password </a>';

  sendResetPasswordEmail(clientEmail, "Password Reset Request", link);
  return { link };
};

const resetPassword = async (userId, token, clientPassword) => {
  let passwordResetToken = await TokenModel.findOne({ userId });

  console.log("useerid", passwordResetToken);

  if (!passwordResetToken) {
    throw new Error("Invalid or expired password reset token");
  }
  console.log("passwordResetToken", passwordResetToken.token);

  const isValid = await bycrptjs.compare(token, passwordResetToken.token);

  if (!isValid) {
    throw new Error("Invalid or expired password reset token");
  }
  console.log("clinetPassowr", clientPassword);
  const newPassword = await securePassword(clientPassword);
  console.log("newPassword", newPassword);

  await clientModel.findByIdAndUpdate(
    { _id: userId },
    { $set: { clientPassword: newPassword } },
    { new: true }
  );

  const user = await clientModel.findById({ _id: userId });

  const link = ` ${user.clientFirstName} ${user.clientMiddleName}`;

  sendResetPasswordEmail(user.clientEmail,"Password Reset Successfully",link);

  await passwordResetToken.deleteOne();

  return { message: "Password reset was successful" };
};

module.exports = {
  registerClient,
  LoginClient,
  forgetPassword,
  resetPassword,
};
