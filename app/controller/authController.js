const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const Response = require("../model/Response");
const User = require("../model/User");
const userValidator = require("../utils/userValidator");
const signInValidator = require("../utils/signInValidator");
const bcrypt = require("../utils/bcrypt");

const signUp = async (req, res) => {
  let response = null;
  try {
    const request = await userValidator.validateAsync(req.body);

    const users = await User.findOne({ email: request.email });
    if (users) {
      response = new Response.Error(true, "Email already exist");
      res.status(httpStatus.BAD_REQUEST).json(response);
      return;
    }

    const hashedPassword = await bcrypt.hash(request.password);
    request.password = hashedPassword;

    const user = new User(request);
    user.imageUrl = "https://storage.googleapis.com/bangkit-inacure/default-profile/default.png";
    const result = await user.save();
    response = new Response.Success(false, null, result);
    res.status(httpStatus.OK).json(response);
  } catch (error) {
    response = new Response.Error(true, error.message);
    res.status(httpStatus.BAD_REQUEST).json(response);
  }
};

const signIn = async (req, res) => {
  let response = null;
  const signInErrorMessage = "Invalid email or password";
  try {
    const request = await signInValidator.validateAsync(req.body);

    const user = await User.findOne({ email: request.email });
    if (!user) {
      response = new Response.Error(true, signInErrorMessage);
      res.status(httpStatus.BAD_REQUEST).json(response);
      return;
    }

    const isValidPassword = await bcrypt.compare(
      request.password,
      user.password
    );
    if (!isValidPassword) {
      response = new Response.Error(true, signInErrorMessage);
      res.status(httpStatus.BAD_REQUEST).json(response);
      return;
    }

    const createJwtToken = jwt.sign({ id: user._id }, process.env.KEY);
    const data = { token: createJwtToken };
    response = new Response.Success(false, null, data);
    res.status(httpStatus.OK).json(response);
  } catch (error) {
    response = new Response.Error(true, error.message);
    res.status(httpStatus.BAD_REQUEST).json(response);
  }
};

module.exports = { signUp, signIn };
