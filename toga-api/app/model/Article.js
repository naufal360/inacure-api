const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },

  name: {
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

  ingredient: {
    type: String,
    required: true,
  },

  efficacy: {
    type: [String],
    required: true,
  },
});

const Article = mongoose.model('Artcile', articleSchema);

module.exports = Article;
