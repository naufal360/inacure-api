const Response = require('../model/Response');

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.json(new Response.Error(true, 'Unauthorized'));
    return;
  }

  const bearer = token.replace('Bearer ', '');

  console.log(bearer);

  next();
};

module.exports = requireAuth;
