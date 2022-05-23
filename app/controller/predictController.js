const tf = require("@tensorflow/tfjs-node");
const fs = require("fs");

function readImage(path) {
  //reads the entire contents of a file.
  //readFileSync() is synchronous and blocks execution until finished.
  console.log(path);
  const imageBuffer = fs.readFileSync(path);

  //Given the encoded bytes of an image, it returns a 3D or 4D tensor of the decoded image. Supports BMP, GIF, JPEG and PNG formats.
  // decode image to tensor and transform image channel to 3
  // e.g [224, 224, 4] image will be transformed to [224, 224, 3]
  const tfimage = tf.node.decodeImage(imageBuffer, 3);
  const resized = tf.image.resizeBilinear(tfimage, [224, 224]).toFloat();

  // Normalize the image
  const offset = tf.scalar(255.0);
  const normalized = tf.scalar(1.0).sub(resized.div(offset));

  //We add a dimension to get a batch shape
  const batched = normalized.expandDims(0);
  return batched;
}

function argMax(array) {
  return Array.prototype.map
    .call(array, (x, i) => [x, i])
    .reduce((r, a) => (a[0] > r[0] ? a : r));
}

async function makePrediction(req, res, next) {
  console.log("Masuk");
  if (!req.file) {
    res.status(400).send({
      status: false,
      data: "No File is selected.",
    });
    return;
  }
  try {
    const file = req.file.path;
    console.log(file);

    if (!file) {
      res.status(400).send({
        status: false,
        data: "No File is selected.",
      });
    }
    const image = readImage(file);

    const output = {};
    const model = await tf.loadGraphModel(
      "file://vgg19_model/vgg19_saved_model/model.json"
    );
    const predictions = await model.predict(image).dataSync();
    output.predictions = argMax(predictions);
    console.log("Classification Results:", output.predictions);
    res.statusCode = 200;
    res.json(output);
  } catch (err) {
    console.log(err);
  }
}

module.exports = makePrediction;
