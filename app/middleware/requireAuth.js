const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const User = require("../model/User");
const Response = require("../model/Response");
const clearToken = require("../utils/clearToken");

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization;
  const response = new Response.Error(true, "Unauthorized");

  if (!token) {
    res.status(httpStatus.UNAUTHORIZED).json(response);
    return;
  }

  const myToken = clearToken(token);

  jwt.verify(myToken, process.env.KEY, async (error, payload) => {
    if (error) {
      res.status(httpStatus.UNAUTHORIZED).json(response);
      return;
    }
    const id = payload.id;
    const user = await User.findOne({ _id: id });
    req.currentUser = user;
    next();
  });
};

module.exports = requireAuth;
