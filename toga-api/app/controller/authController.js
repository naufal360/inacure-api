const Response = require('../model/Response');
const userValidator = require('../utils/userValidator');

const signUp = async (req, res) => {
  try {
    const request = await userValidator.validateAsync(req.body);
    res.json(new Response.Success(false, null, request));
  } catch (error) {
    res.json(new Response.Error(true, error.message));
  }
};

const signIn = async (req, res) => {
  try {
    res.json(new Response.Success(false, 'success', {}));
  } catch (error) {
    res.json(new Response.Error(true, error.message));
  }
};

module.exports = { signUp, signIn };
