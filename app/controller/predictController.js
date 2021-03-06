const tf = require("@tensorflow/tfjs-node");
const fs = require("fs");
const axios = require("axios");
const httpStatus = require("http-status");
const { Storage } = require("@google-cloud/storage");

const Response = require("../model/Response");
const Article = require("../model/Article");
const History = require("../model/History");
const processFile = require("../middleware/uploadFile");
const { format } = require("util");

const storage = new Storage({ keyFilename: "env.json" });
const bucket = storage.bucket("inacure-storage");

async function readImage(path) {
  const response = await axios.get(path, { responseType: "arraybuffer" });
  const imageBuffer = Buffer.from(response.data, "binary");
  console.log("imgBuffer", imageBuffer);
  const tfimage = tf.node.decodeImage(imageBuffer, 3);
  const resized = tf.image.resizeBilinear(tfimage, [224, 224]).toFloat();

  // Normalize the image
  const offset = tf.scalar(255.0);
  const normalized = tf.scalar(1.0).sub(resized.div(offset));

  //We add a dimension to get a batch shape
  const batched = normalized.expandDims(0);
  console.log("isi batched: ", batched);
  return batched;
}

function argMax(array) {
  return Array.prototype.map
    .call(array, (x, i) => [x, i])
    .reduce((r, a) => (a[0] > r[0] ? a : r));
}

async function predict(url) {
  const image = await readImage(url);

  console.log("hasil image", image);
  const model = await tf.loadGraphModel(
    "https://storage.googleapis.com/inacure-storage/ml-model/iv3_saved_model/model.json"
  );
  const output = await model.predict(image).dataSync();
  const predictions = argMax(output);
  console.log(output);
  console.log("Classification Results:", predictions);
  return predictions;
}

async function makePredictions(req, res, next) {
  try {
    await processFile(req, res);

    if (!req.file) {
      const response = new Response.Error(400, "Please upload a file!" );
      return res.status(httpStatus.BAD_REQUEST).json(response);
    }

    const ext = req.file.originalname.split('.').pop();
    if (ext !== "png" && ext !== "jpg" && ext !== "jpeg" && ext !== "PNG" && ext !== "JPG" && ext !== "JPEG") {
      const response = new Response.Error(400, "Only images are allowed" );
      return res.status(httpStatus.BAD_REQUEST).json(response);
    }

    const blob = bucket.file("ml-images/" + req.file.originalname.split('.').join('-' + Date.now() + '.') );
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on("error", (err) => {
      const response = new Response.Error(500, err.message );
      return res.status(httpStatus.BAD_REQUEST).json(response);
    });

    blobStream.on("finish", async (data) => {
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );

      const predictions = await predict(publicUrl);
      const classes = {
          0: 'Anggur',
          1: 'Apel',
          2: 'Ceri',
          3: 'Delima',
          4: 'Jamblang',
          5: 'Jambu Biji',
          6: 'Kedelai',
          7: 'Lemon',
          8: 'Mangga',
        };

      console.log(predictions);
      console.log(classes[predictions[1]]);

      const article = await Article.findOne({
        name: classes[predictions[1]],
      });
      if (predictions[0] < 0.75) {
        const response = new Response.Error(true, "Can't detect the image!");
        res.status(httpStatus.BAD_REQUEST).json(response);
        return;
      }
      if (!article) {
        const response = new Response.Error(true, "Article not found!");
        res.status(httpStatus.BAD_REQUEST).json(response);
        return;
      }

      // Post history
      const userId = req.currentUser._id;
      const emailUser = req.currentUser.email;
      const predictNum = predictions[0];
      const percentage = predictNum * 100;
      const predictStr = percentage.toFixed().toString() + "%";
      const articleHis = classes[predictions[1]];

      if(!articleHis){
        articleHis = "N/A";
      };

      const history = new History({
        userId: userId,
        email: emailUser,
        imageUrl: publicUrl,
        articleName: articleHis,
        predictRate: predictStr,
      });

      await history.save();
      
      const response = new Response.Success(false, null, article);
      res.status(httpStatus.OK).json(response);
    });

    blobStream.end(req.file.buffer);
  } catch (err) {
    const response = new Response.Error(true, err.message);
    res.status(httpStatus.BAD_REQUEST).json(response);
  }
}

module.exports = makePredictions;
