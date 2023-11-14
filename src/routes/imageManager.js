// routes/imageManager.js
const express = require("express");
const router = express.Router();
const db = require("../config/database");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req , file , db ) =>{
      db(null , 'public/images')
    },
    filename: (req , file , db ) =>{
      db(null , file.filename + "_" + Date.now() + path.extname(file.originalname))
    },
  });
  
const upload = multer({
    storage : storage
})

router.post('/saveimages', upload.single('image'), (req, res) => {
    const image = req.file.filename;
    const user_id = req.body.user_id; // Assuming user_id is sent in the request body; adjust accordingly
  
    // Check if the user exists
    db.query('SELECT * FROM user WHERE user_id = ?', [user_id], (err, userResults) => {
      if (err) {
        return res.status(500).json({ Message: "Database error" });
      }
      if (userResults.length === 0) {
        return res.status(404).json({ Message: "User not found" });
      }
  
      // Insert the new image with the user's foreign key
      const insertImageQuery = 'INSERT INTO image (image_data, dateImage, user_id) VALUES (?, NOW(), ?)';
      db.query(insertImageQuery, [image, user_id], (err, data) => {
        if (err) {
          return res.status(500).json({ Message: "Database error" });
        }
  
        // After successful insertion, retrieve all images for the user
        const retrieveImagesQuery = 'SELECT * FROM image WHERE user_id = ?';
        db.query(retrieveImagesQuery, [user_id], (err, imagesResults) => {
          if (err) {
            return res.status(500).json({ Message: "Database error" });
          }
  
          return res.status(201).json({ Message: "Image upload successful", images: imagesResults });
        });
      });
    });
  });
  router.get('/userimages/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    // Retrieve all images for the specified user
    const retrieveImagesQuery = 'SELECT * FROM image WHERE user_id = ?';
    db.query(retrieveImagesQuery, [user_id], (err, imagesResults) => {
      if (err) {
        return res.status(500).json({ Message: "Database error" });
      }
  
      return res.status(200).json({ Message: "Image list retrieved successfully", images: imagesResults });
    });
  });
module.exports = router; 