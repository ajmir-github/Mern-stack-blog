// imports
const express = require("express");
const router = express.Router();
const {
  getImage,
  uploadImage,
  deleteImage
} = require("../controller/imageController");


router.get("/:fileName", // get image when needed convert them
  getImage
);

router.post("/", // upload an image with a unique name
  uploadImage
);


router.delete("/:fileName",  // delete an image with all its coverted forms
  deleteImage
);




// exports
module.exports = router;