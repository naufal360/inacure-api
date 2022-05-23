const mongoose = require("mongoose");

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
  codeIdentity: {
    type: Number,
    required: true,
  }
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
