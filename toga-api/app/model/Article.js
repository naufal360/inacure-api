const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },

  latinName: {
    type: String,
    required: true,
  },

  family: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
});

const Article = mongoose.model('Artcile', ArticleSchema);

module.exports = Article;
