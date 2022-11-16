// Imports
const path = require("path");
const fs = require("fs");
const Jimp = require("jimp");

function readImage(filePath) {
  return new Promise((resolve, reject) => {
    Jimp.read(filePath, (err, img) => {
      if (err) reject(err);
      resolve(img);
    });
  });
}
// ----------------------------------------------
exports.getImage =
  (PublicDirectory, ImageSrcFolder, ImageSizes) => async (req, res) => {
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
      if (!fs.existsSync(parentFilePath))
        throw {
          message: "No file was found the given name!",
          status: 404,
        };
      // If Parent file is requested
      if (typeof size === "undefined") return res.sendFile(parentFilePath);

      // if cached one exists
      const resizedFilePath = path.join(imageFolder, size + fileExt);
      if (fs.existsSync(resizedFilePath)) return res.sendFile(resizedFilePath);

      // Convert the file
      const image = await readImage(parentFilePath);
      // Jimp.AUTO = -1
      image.resize(ImageSizes[size], -1); // Resize
      // Save an Optimized image
      await image
        // .contrast(0.1)
        .quality(60)
        .normalize()
        .writeAsync(resizedFilePath);
      // Send the file
      res.sendFile(resizedFilePath);
    } catch ({ status, message }) {
      res.status(status || 500).send(message);
    }
  };

exports.uploadImage =
  (PublicDirectory, ImageSrcFolder, ImageInputName, generateUniqueId) =>
  async (req, res) => {
    // Upload a file and save it in uploads folder
    try {
      if (!req.files)
        throw {
          message: "Please select a file to be uploaded!",
        };
      const file = req.files[ImageInputName];
      // save the uploaded file in to uploads folder
      const uniqueId = generateUniqueId();
      const fileExt = path.extname(file.name);
      const folderPath = path.join(ImageSrcFolder, uniqueId);
      const filePath = path.join(
        folderPath,
        "main" + fileExt // unique Id + file extension
      );
      const fullFilePath = path.join(PublicDirectory, filePath);
      const imageFileName = uniqueId + fileExt;
      const url = "/" + ImageSrcFolder + "/" + imageFileName;

      // Make promise out of mv function of express-fileuploader
      // create the src folder
      await fs.promises.mkdir(
        path.join(PublicDirectory, ImageSrcFolder, uniqueId)
      );
      file.mv(fullFilePath, (err) => {
        if (err)
          throw {
            status: 401,
            message: "failed to upload!",
          };
        res.status(201).json(url);
      });
    } catch ({ status, message }) {
      res.status(status || 500).json({ message });
    }
  };

exports.deleteImage = (PublicDirectory, ImageSrcFolder) => async (req, res) => {
  // Delete a file from uploads folder
  try {
    const { fileName } = req.params;
    if (!fileName)
      throw {
        status: 400,
        message: "Please define the file name!",
      };

    // relative path
    const folderName = fileName.replace(path.extname(fileName), "");
    const folderPath = path.join(PublicDirectory, ImageSrcFolder, folderName);

    // Make sure that the parent fodler exists
    if (!fs.existsSync(folderPath))
      throw {
        message: "No file was found the given name!",
        status: 404,
      };

    // Delete the files inside of the folder
    const images = await fs.promises.readdir(folderPath);
    for (const image of images)
      await fs.promises.unlink(path.join(folderPath, image));
    // Delete the folder itself
    await fs.promises.rmdir(folderPath);
    res.json("File has successfully deleted!");
  } catch ({ status, message }) {
    res.status(status || 500).send(message);
  }
};
