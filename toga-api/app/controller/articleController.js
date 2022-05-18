const httpStatus = require('http-status');
const Response = require('../model/Response');

const getArticles = async (req, res) => {
  let response = null;
  try {
    res.status(httpStatus.OK).json({ message: 'Hai, Article' });
  } catch (error) {
    response = new Response.Error(true, error.message);
    res.status(httpStatus.BAD_REQUEST).json(response);
  }
};

module.exports = { getArticles };
