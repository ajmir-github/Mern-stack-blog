// ----------------------------------------------
// ----------------------------------------------
// ----------------------------------------------
// imports
const express = require("express");
const path = require("path");
const fs = require("fs");
const Jimp = require('jimp');
const router = express.Router();
const { v4: uuid } = require("uuid");



// ----------------------------------------------
// ----------------------------------------------
// ----------------------------------------------
// util funcs and vars
const ImageSizes = {
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

const ImageSrcFolder = "images";
const ImageInputName = "file";
const PublicDirectory = path.join(__dirname, "../", "public");


function readImage(filePath) {
  return new Promise((resolve, reject) => {
    Jimp.read(filePath, (err, img) => {
      if (err) reject(err);
      resolve(img);
    })
  })
}

function setCacheMed({ days }) {
  const period = 60 * 60 * 24 * days;
  return (req, res, next) => {
    res.set('Cache-control', 'public, max-age=' + period);
    next();
  }
}


// ----------------------------------------------
// ----------------------------------------------
// ----------------------------------------------
// Routes

router.post("/upload", async (req, res) => {
  // Upload a file and save it in uploads folder
  // input name = file
  try {
    if (!req.files) throw {
      message: "Please select a file to be uploaded!"
    };
    const file = req.files[ImageInputName];
    // save the uploaded file in to uploads folder
    const uniqueId = uuid();
    const fileExt = path.extname(file.name)
    const folderPath = path.join(ImageSrcFolder, uniqueId);
    const filePath = path.join(
      folderPath,
      "main" + fileExt // unique Id + file extension
    )
    const fullFilePath = path.join(PublicDirectory, filePath);
    const url = path.join(ImageSrcFolder, uniqueId) + fileExt;

    // Make promise out of mv function of express-fileuploader
    // create the src folder
    await fs.promises.mkdir(path.join(PublicDirectory, ImageSrcFolder, uniqueId));
    file.mv(fullFilePath, err => {
      if (err) throw {
        status: 401,
        message: "failed to upload!"
      };
      res.json({ message: "Uploaded!", url })
    }
    )

  } catch ({ status, message }) {
    res.status(status || 500).json({ message });
  }
});


router.post("/delete", async (req, res) => {
  // Delete a file from uploads folder
  try {
    const { fileName } = req.body;
    if (!fileName) throw {
      status: 400,
      message: "Please define the file name!"
    };
    // relative path
    const folderName = fileName.replace(path.extname(fileName), "");
    const folderPath = path.join(PublicDirectory, ImageSrcFolder, folderName);
    // Delete the files inside of the folder
    const images = await fs.promises.readdir(folderPath);
    for (const image of images)
      await fs.promises
        .unlink(path.join(folderPath, image));
    // Delete the folder itself
    await fs.promises.rmdir(folderPath);
    res.json("File has successfully deleted!");

  } catch ({ status, message }) {
    res.status(status || 500).json({ message });
  }
});




router.get("/:fileName", setCacheMed({ days: 1 }), async (req, res) => {
  try {
    const { size } = req.query;
    const { fileName } = req.params;
    const fileExt = path.extname(fileName);
    const parentFileName = "main" + fileExt;
    const imageFolder = path.join(
      PublicDirectory,
      ImageSrcFolder,
      fileName.replace(fileExt, "")
    );

    const parentFilePath = path.join(imageFolder, parentFileName);
    // Making sure that the parent file exists
    if (!fs.existsSync(parentFilePath)) throw {
      message: "No file was found the given name!",
      status: 404
    }
    // If Parent file is requested
    if (typeof size === "undefined")
      return res.sendFile(parentFilePath);

    // if cached one exists
    const resizedFilePath = path.join(imageFolder, size + fileExt);
    if (fs.existsSync(resizedFilePath))
      return res.sendFile(resizedFilePath);

    // Convert the file
    const image = await readImage(parentFilePath);
    image.resize(ImageSizes[size], Jimp.AUTO); // Resize
    // Save an Optimized image
    await image
      // .contrast(0.1)
      .quality(60)
      .normalize()
      .writeAsync(resizedFilePath)
    // Send the file
    res.sendFile(resizedFilePath);
  } catch ({ status, message }) {
    console.log({ message })
    res
      .status(status || 500)
      .send(message)
  }
})


// exports
module.exports = router;