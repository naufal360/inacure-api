const Response = require('../model/Response');

const createUser = (req, res) => {
  try {
    res.json(new Response.Success(false, null, { name: 'Inacure' }));
  } catch (error) {}
};

module.exports = { createUser };
