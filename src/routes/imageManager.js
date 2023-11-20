// import controllers images
const imageController = require("../controllers/imageController")

const express = require("express");
const router = express.Router();


router.post('/saveimages', imageController.upload.single('file'), imageController.addImage);
router.get('/userimage/:user_id', imageController.getImagesByUserId);
router.get('/getAllImages',imageController.getAllImages);
router.delete('/deleteAllImages',imageController.deleteAllImages);
router.put(
  "/getImage/:user_id/:imageID",
  imageController.getImageByUserIdAndImageId
);

// router.put("./editImage", imageController.editImage);

// router.get('/userimages/:user_id', imageController.getImagesByUserId);

module.exports = router; 