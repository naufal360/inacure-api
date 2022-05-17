const Response = require('../model/Response');

const pageNotFound = (req, res) => {
  res.json(new Response.Error(true, 'Page Not Found'));
};

module.exports = pageNotFound;
