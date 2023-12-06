const db = require("../config/database");
const fs = require("fs");
// image Upload
const multer = require("multer");
const path = require("path");
const express = require("express");
// const model = require("../model/imageModel");
const { Image } = require("../model/imageModel");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images"); // Adjust the destination folder as needed
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}_${file.originalname}`;
    console.log("Destination:", "public/images");
    console.log("File Name:", fileName);
    cb(null, fileName);
  },
});

const upload = multer({ storage });

// create main Model
// const Image = model.images;

const addImage = async (req, res) => {
  const sql =
    "INSERT INTO image (`image_data`, `dateImage`, `user_id`) VALUES (?, NOW(), ?)";
  const values = [req.body.image_data, req.body.user_id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error posting:", err);
      return res.status(500).json({ Error: "Internal server error" });
    }

    return res.status(201).json({ Status: "Success" });
  });
};

const getImagesByUserEmail = async (req, res) => {
  const email = req.params.email; // Assuming email is in the URL parameters
  const sql = "SELECT * FROM image WHERE email = ?";
  const values = [email];
  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ Error: "Error fetching images by email" });
    }
    return res.status(200).json({ Status: "Success", images: result });
  });
};

const getAllImages = async (req, res) => {
  const sql = "SELECT * FROM image";
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ Error: "Error fetching images" });
    }
    return res.status(200).json({ Status: "Success", images: result });
  });
};



const deleteAllImages = async (req, res) => {
  const sql = "DELETE FROM image"; // Use DELETE query to remove all rows
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ Error: "Error deleting images" });
    }
    return res
    .status(200)
      .json({ Status: "Success", message: "All images deleted successfully" });
    });
  };
  // 4. update Product
  const updateImage = async (req, res) => {
    try {
      const imageID = req.params.imageID;
      const { image_data } = req.body;
      
      const sql =
      "UPDATE image SET image_data = ? , dateImage = NOW() WHERE imageID = ?";
      const values = [image_data, imageID];
      
      db.query(sql, values, (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Internal server error" });
        }
        
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: "Image not found" });
        }
        
        return res
        .status(200)
        .json({ status: "Success", message: "Image updated successfully" });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  //5. get image by imageID
  const getImagesByImageId = async (req, res) => {
    const imageID = req.params.imageID; // Assuming imageID is in the URL parameters
    const sql = "SELECT * FROM image WHERE imageID = ?";
    const values = [imageID];
    db.query(sql, values, (err, result) => {
      if (err) {
        return res
        .status(500)
        .json({ Error: "Error fetching images by image ID" });
      }
      return res.status(200).json({ Status: "Success", images: result });
    });
  };
  
  //6. delete image by imageID
  const deleteImageById = async (req, res) => {
    const imageID = req.params.imageID;
    const sql = "DELETE FROM image WHERE imageID =?";
    const values = [imageID];
    db.query(sql, values, (err, result) => {
      res.json({
        status: "success",
        message: `Successfully delete id of ${imageID}!`,
      });
    });
  };
  
  const getImagesOfUser = (req, res) => {
    const user_id = req.params.user_id; // Change from req.params.id to req.params.user_id
    const sql = "SELECT * FROM image WHERE user_id = ?";
    const values = [user_id];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        return res.status(500).json({ Error: "Error fetching images by user ID" });
      }
  
      // Check if there are no images for the given user ID
      if (result.length === 0) {
        return res.status(404).json({ Status: "No images found for the user ID" });
      }
  
      return res.status(200).json({ Status: "Success", images: result });
    });
  };

// 7. delete All Images by User_id
const deleteAllImageByUserID = async (req, res) => {
  try {
    const user_id = req.params.user_id; // Change from req.params.id to req.params.user_id

    const sql = "DELETE FROM image WHERE user_id = ?";
    const values = [user_id];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error deleting images:", err);
        res.status(500).json({
          status: "error",
          message: "Internal Server Error",
        });
      } else {
        res.json({
          status: "success",
          message: `Successfully deleted images for user_id ${user_id}!`,
        });
      }
    });
  } catch (error) {
    console.error("Error getting user_id:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};



module.exports = {
  addImage,
  getAllImages,
  getImagesByUserEmail,
  updateImage,
  deleteAllImages,
  getImagesOfUser,
  upload, // Assuming multerConfig is the Multer configuration
  getImagesByImageId,
  deleteImageById,
  deleteAllImageByUserID
};
