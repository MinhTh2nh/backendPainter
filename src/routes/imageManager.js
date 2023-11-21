// import controllers images
const imageController = require("../controllers/imageController");

const express = require("express");
const router = express.Router();
const db = require("../config/database");
const multer = require("multer");
const path = require("path");

router.post(
  "/saveimages",
  imageController.upload.single("file"),
  imageController.addImage
);
router.get("/userimage/:user_id", imageController.getImagesByUserId);
router.get("/getAllImages", imageController.getAllImages);
router.delete("/deleteAllImages", imageController.deleteAllImages);

// router.get('/userimages/:user_id', imageController.getImagesByUserId);

module.exports = router;
