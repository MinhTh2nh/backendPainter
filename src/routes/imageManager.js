// import controllers images
const imageController = require("../controllers/imageController");

const express = require("express");
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Image
 *   description: Operations related to images.
 */

/**
 * @swagger
 * /saveimages:
 *   post:
 *     summary: Upload and save an image.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     tags: [Image]
 *     responses:
 *       200:
 *         description: Image saved successfully.
 */
router.post("/saveimages",imageController.upload.single("file"), imageController.addImage);
/**
 * @swagger
 * /userimage/{email}:
 *   get:
 *     summary: Get images by user email.
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The user's email.
 *     tags: [Image]
 *     responses:
 *       200:
 *         description: A list of images.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   imageID:
 *                     type: string
 *                     description: The image ID.
 *                     example: abc123
 *                   image_data:
 *                     type: string
 *                     description: The image data.
 *                     example: base64encodedimage
 *                   dateImage:
 *                     type: string
 *                     format: date-time
 *                     description: The date the image was created.
 *                     example: 2023-12-07T12:30:45Z
 *                   user_id:
 *                     type: integer
 *                     description: The user ID associated with the image.
 *                     example: 1
 */
router.get("/userimage/:email", imageController.getImagesByUserEmail);
/**
 * @swagger
 * /getAllImages:
 *   get:
 *     summary: Get all images.
 *     tags: [Image]
 *     responses:
 *       200:
 *         description: A list of all images.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   imageID:
 *                     type: string
 *                     description: The image ID.
 *                     example: abc123
 *                   image_data:
 *                     type: string
 *                     description: The image data.
 *                     example: base64encodedimage
 *                   dateImage:
 *                     type: string
 *                     format: date-time
 *                     description: The date the image was created.
 *                     example: 2023-12-07T12:30:45Z
 *                   user_id:
 *                     type: integer
 *                     description: The user ID associated with the image.
 *                     example: 1
 */

router.get("/getAllImages", imageController.getAllImages);
/**
 * @swagger
 * /deleteAllImages:
 *   delete:
 *     summary: Delete all images.
 *     tags: [Image]
 *     responses:
 *       200:
 *         description: All images deleted successfully.
 */
router.delete("/deleteAllImages", imageController.deleteAllImages);
/**
 * @swagger
 * /getImage/{imageID}:
 *   get:
 *     summary: Get an image by ID.
 *     parameters:
 *       - in: path
 *         name: imageID
 *         schema:
 *           type: string
 *         required: true
 *         description: The image ID.
 *     tags: [Image]
 *     responses:
 *       200:
 *         description: The requested image.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 imageID:
 *                   type: string
 *                   description: The image ID.
 *                   example: abc123
 *                 image_data:
 *                   type: string
 *                   description: The image data.
 *                   example: base64encodedimage
 *                 dateImage:
 *                   type: string
 *                   format: date-time
 *                   description: The date the image was created.
 *                   example: 2023-12-07T12:30:45Z
 *                 user_id:
 *                   type: integer
 *                   description: The user ID associated with the image.
 *                   example: 1
 */

router.get("/getImage/:imageID", imageController.getImagesByImageId);
/**
 * @swagger
 * /editImage/{imageID}:
 *   put:
 *     summary: Update an image by ID.
 *     parameters:
 *       - in: path
 *         name: imageID
 *         schema:
 *           type: string
 *         required: true
 *         description: The image ID.
 *     requestBody:
 *       description: Updated image data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image_data:
 *                 type: string
 *                 description: The updated image data.
 *                 example: updated_base64encodedimage
 *               dateImage:
 *                 type: string
 *                 format: date-time
 *                 description: The updated date the image was created.
 *                 example: 2023-12-08T14:45:30Z
 *             required:
 *               - image_data
 *               - dateImage
 *     tags: [Image]
 *     responses:
 *       200:
 *         description: Image updated successfully.
 */

router.put("/editImage/:imageID", imageController.updateImage);
/**
 * @swagger
 * /delete/{imageID}:
 *   delete:
 *     summary: Delete an image by ID.
 *     parameters:
 *       - in: path
 *         name: imageID
 *         schema:
 *           type: string
 *         required: true
 *         description: The image ID.
 *     tags: [Image]
 *     responses:
 *       200:
 *         description: Image deleted successfully.
 */
router.delete("/delete/:imageID",imageController.deleteImageById);
/**
 * @swagger
 * /deleteAllImageByUserID/{user_id}:
 *   delete:
 *     summary: Delete all images of a user by ID.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID.
 *     tags: [Image]
 *     responses:
 *       200:
 *         description: All images of the user deleted successfully.
 */
router.delete("/deleteAllImageByUserID/:user_id",imageController.deleteAllImageByUserID);
/**
 * @swagger
 * /getImagesOfUser/{user_id}:
 *   get:
 *     summary: Get images of a user by ID.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID.
 *     tags: [Image]
 *     responses:
 *       200:
 *         description: A list of images of the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   imageID:
 *                     type: string
 *                     description: The image ID.
 *                     example: abc123
 *                   image_data:
 *                     type: string
 *                     description: The image data.
 *                     example: base64encodedimage
 *                   dateImage:
 *                     type: string
 *                     format: date-time
 *                     description: The date the image was created.
 *                     example: 2023-12-07T12:30:45Z
 *                   user_id:
 *                     type: integer
 *                     description: The user ID associated with the image.
 *                     example: 1
 */

router.get("/getImagesOfUser/:user_id", imageController.getImagesOfUser);

module.exports = router;