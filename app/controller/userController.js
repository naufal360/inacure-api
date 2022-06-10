const Response = require("../model/Response");
const User = require("../model/User");
const UserImages = require("../model/UserImages");
const httpStatus = require("http-status");
const processFile = require("../middleware/uploadFile");
const { format } = require("util");

const {Storage} = require('@google-cloud/storage');
const storage = new Storage({ keyFilename: "env.json" });
const bucket = storage.bucket("inacure-storage");

const getUser = async (req, res) => {
  const user = req.currentUser;
  const response = new Response.Success(false, null, user);
  res.json(response);
};

const updateUser = async (req, res) => {
  try {    
    const userId = req.currentUser._id;
    const userEmail = req.currentUser.email;

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

    const blob = bucket.file(`user-images/${userId}/` + req.file.originalname.toLowerCase().split(" ").join("-"  + Date.now() + "."));
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
    
    const upload = new UserImages({
        userId: userId,
        email: userEmail,
        imageUrl: uploadUrl,
    });
    const uploadSave = await upload.save();

    // Update user profiles images
    await User.findByIdAndUpdate(userId, { imageUrl: uploadUrl } );

    // Return response
    const response = new Response.Success(false, null, uploadSave);
    res.status(httpStatus.OK).json(response);

    blobStream.end(req.file.buffer);
  } catch (error) {
    const response = new Response.Error(true, error.message);
    res.status(httpStatus.BAD_REQUEST).json(response);
  }
};

module.exports = { getUser, updateUser };
