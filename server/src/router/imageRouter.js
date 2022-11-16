// imports
const express = require("express");
const router = express.Router();
const { v4: uuid } = require("uuid");
const path = require("path");
const {
  getImage,
  uploadImage,
  deleteImage,
} = require("../controller/imageController");

// vars
const ImgFolder = "image";
const PublicDir = path.join(__dirname, "../", "public");
const ImgSizes = {
  xxxs: 32,
  xxs: 64,
  xs: 126,
  sm: 256,
  md: 512,
  lg: 600,
  xl: 720,
  xxl: 920,
  xxxl: 1280,
};

// Routes
router.get(
  "/:fileName", // get image when needed convert them
  getImage(PublicDir, ImgFolder, ImgSizes)
);

router.post(
  "/", // upload an image with a unique name
  uploadImage(PublicDir, ImgFolder, "file", uuid)
);

router.delete(
  "/:fileName", // delete an image with all its coverted forms
  deleteImage(PublicDir, ImgFolder)
);

// exports
module.exports = router;
