const Response = require('../model/Response');

const signUp = (req, res) => {
  try {
    res.json(new Response.Success(false, null, { name: 'Inacure' }));
  } catch (error) {}
};

const signIn = (req, res) => {};

module.exports = { signUp, signIn };
