const util = require("util");
const Multer = require("multer");
const maxSizeArticle = 30 * 1024 * 1024;

let processArticle = Multer({
  storage: Multer.memoryStorage(),
  limits: { fileSize: maxSizeArticle },
}).single("image");

let processArticleMiddleware = util.promisify(processArticle);
module.exports = processArticleMiddleware;