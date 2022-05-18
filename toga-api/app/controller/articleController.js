const httpStatus = require('http-status');
const Response = require('../model/Response');
const Article = require('../model/Article');
const articleValidation = require('../utils/articleValidator');

const getArticles = async (req, res) => {
  let response = null;
  try {
    res.status(httpStatus.OK).json({ message: 'Hai, Article' });
  } catch (error) {
    response = new Response.Error(true, error.message);
    res.status(httpStatus.BAD_REQUEST).json(response);
  }
};

const postArticles = async (req, res) => {
  let response = null;
  try {
    const { 
      imageUrl,
      name,
      latinName,
      family,
      description,
      ingredient,
      efficacy,
     } = await articleValidation.validateAsync(req.body);

     const article = new Article({
      imageUrl,
      name,
      latinName,
      family,
      description,
      ingredient,
      efficacy,
     });

     const articleSave = await article.save();
     response = new Response.Success(false, null, articleSave);
     res.status(httpStatus.OK).json(response);
  } catch (error) {
    response = new Response.Error(true, error.message);
    res.status(httpStatus.BAD_REQUEST).json(response);
  }
}

module.exports = { getArticles, postArticles };
