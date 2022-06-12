const Upload = require('../model/Upload');
const { Storage } = require("@google-cloud/storage");
const processFile = require("../middleware/uploadArticleFile");
const { format } = require("util");
const httpStatus = require("http-status");
const Response = require("../model/Response");
const path = require('path');

const storage = new Storage({ keyFilename: "env.json" });
const bucket = storage.bucket("inacure-storage");

const postUpload = async (req, res) => {
    let response = null;
    try{
        await processFile(req, res);
    
        if (!req.file) {
          const response = new Response.Error(400, "Please upload a image!" );
          return res.status(httpStatus.BAD_REQUEST).json(response);
        }

        const ext = req.file.originalname.split('.').pop();
        if (ext !== "png" && ext !== "jpg" && ext !== "jpeg" && ext !== "PNG" && ext !== "JPG" && ext !== "JPEG") {
          const response = new Response.Error(400, "Only images are allowed" );
          return res.status(httpStatus.BAD_REQUEST).json(response);
        }
    
        const blob = bucket.file("images/" + req.file.originalname.toLowerCase().split(" ").join("-"));
        const blobStream = blob.createWriteStream({
          resumable: false,
        });
    
        blobStream.on("error", (err) => {
          const response = new Response.Error(500, err.message );
          return res.status(httpStatus.BAD_REQUEST).json(response);
        });
    
        blobStream.on("uploaded", async (data) => {
          const uploadUrl = format(
            `https://storage.googleapis.com/${bucket.name}/${blob.name.toLowerCase()}`
          );
        });

        const uploadUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name.toLowerCase().split(" ").join("-")}`;
        const requestName = req.file.originalname.replace(/\.[^/.]+$/, "");
        const uploadName = requestName.charAt(0).toUpperCase() + requestName.slice(1);
        
        const upload = new Upload({
            url: uploadUrl,
            name: uploadName,
        });

        const uploadSave = await upload.save();
        response = new Response.Success(false, null, uploadSave);
        res.status(httpStatus.OK).json(response);

        blobStream.end(req.file.buffer);
    } catch (error) {
    response = new Response.Error(true, error.message);
    res.status(httpStatus.BAD_REQUEST).json(response);
  }
};

const getUploads = async (req, res) => {
  let response = null;
  try{
    const images = await Upload.find();

    response = new Response.Success(false, null, images);
    res.status(httpStatus.OK).json(response);
  } catch (error) {
    response = new Response.Error(true, error.message);
    res.status(httpStatus.BAD_REQUEST).json(response);
  }
};

const deleteUpload = async (req, res) => {
  let response = null;
  try {
    // cloud storage delete image
    const findImg = await Upload.findOne({
      _id: req.query.id,
    });
    const ext = path.extname(findImg.url);
    const findName = findImg.name;
    const fileName = findName + "" + ext;
    const blob = bucket.file("images/" + fileName.toLowerCase().split(" ").join("-"));
    const deleted = await blob.delete();

    console.log(`gs://${bucket.name}/${blob.name} deleted`);

    // mongodb delete data
    const deleteImg = await Upload.findByIdAndDelete(req.query.id);
    if(!deleteImg) {
      response = new Response.Error(true, notFoundId);
      res.status(httpStatus.BAD_REQUEST).json(response);
      return;
    }
    response = `Detele ${blob.name} Success!`;
    res.status(httpStatus.OK).json({ message: response});
  } catch (error) {
    response = new Response.Error(true, error.message);
    res.status(httpStatus.BAD_REQUEST).json(response);
  }
}

module.exports = { postUpload, getUploads, deleteUpload };
