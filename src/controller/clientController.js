const clientService = require("../client/clientService");

const registerClient = async (req, res) => {
  try {
    const signUpService = await clientService.registerClient(
      req.body,
      req.file.filename
    );

    return res
      .status(201)
      .json({ message: "client created successfully", signUpService });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const LoginClient = async (req, res) => {
  try {
    const signInService = await clientService.LoginClient(req.body);

    return res.status(200).json({ message: "Login Succefully", signInService });
  } catch (error) {
    if (error.message === "Password does not match") {
      return res.status(401).json({ error: "Invalid credentials password" });
    } else {
      if (error.message === "User not found") {
        return res.status(401).json({ error: "Unauthorized User" });
      }
    }

    return res.status(500).json({ error: error.message });
  }
};


const forgetPassword = async (req, res) => {
  try {

    const forgetRequest = await clientService.forgetPassword(req.body);
    console.log("forgetrequest", forgetRequest);
    return res.status(200).json({message:"Link has been sent in your email", forgetRequest});
    
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
}


const resetPassword = async (req, res) => {
  
  try {
    const resetRequest = await clientService.resetPassword(req.body.userId, req.body.token, req.body.clientPassword );
    return res.json(resetRequest);

  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}

module.exports = {
  registerClient,
  LoginClient,
  forgetPassword,
  resetPassword
};
