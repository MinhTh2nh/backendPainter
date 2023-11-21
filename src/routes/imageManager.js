// import controllers images
const imageController = require("../controllers/imageController")

const express = require("express");
const router = express.Router();


router.post('/saveimages', imageController.upload.single('file'), imageController.addImage);
router.get('/userimage/:user_id', imageController.getImagesByUserId);
router.get('/getAllImages',imageController.getAllImages);
router.delete('/deleteAllImages',imageController.deleteAllImages);
router.get(
  "/getImage/:user_id/:imageID",
  imageController.getImageByUserIDAndImageID
);
router.put("/updateImage/:user_id/:imageID",imageController.updateImageByUserIDAndImageID);

module.exports = router; 