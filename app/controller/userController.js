const Response = require("../model/Response");

const getUser = (req, res) => {
  const user = req.currentUser;
  const response = new Response.Success(false, null, user);
  res.json(response);
};

module.exports = { getUser };
