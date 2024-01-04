const express = require("express");
const uploadImages=  require("../controllers/images");
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const cloudinary = require("../cloudImage/cloudinary");
const multer = require('multer');

const routerImages = express.Router();


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "demo-node-js-youtube",
        format: "jpg",
    },
});

const upload = multer({storage: storage});

routerImages.post("/upload", upload.array("images", 2), uploadImages);

module.exports = routerImages;