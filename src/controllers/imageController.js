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
  console.log("Uploaded File:", req.file);
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

const getImagesByUserId = async (req, res) => {
  const user_id = req.params.user_id; // Assuming user_id is in the URL parameters
  const sql = "SELECT * FROM image WHERE user_id = ?";
  const values = [user_id];
  db.query(sql, values, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ Error: "Error fetching images by user ID" });
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
// 3. get single product
const getOneImage = async (req, res) => {
  let imageID = req.params.imageID;
  let image = await Image.findOne({ where: { imageID: imageID } });
  res.status(200).send(image);
};
// 4. update Product
const updateImage = async (req, res) => {
  let imageID = req.params.imageID;
  const image = await Image.update(req.body, { where: { imageID: imageID } });
  res.status(200).send(image);
};

const getImageByUserIDAndImageID = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const image_id = req.params.imageID;

    const selectQuery = "SELECT * FROM image WHERE user_id = ? AND imageID = ?";
    const values = [user_id, image_id];

    db.query(selectQuery, values, (err, result) => {
      if (err) {
        return res.status(500).json({ Error: "Error fetching image" });
      }

      if (result.length === 0) {
        return res.status(404).json({ Error: "Image not found" });
      }

      res.status(200).json({ Status: "Success", image: result[0] });
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    return res
      .status(500)
      .json({ Error: "Internal server error", Details: error.message });
  }
};

const updateImageByUserIDAndImageID = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const image_id = req.params.imageID;
    const { imageData } = req.body;

    const updateQuery =
      "UPDATE image SET image_data = ?, dateImage = NOW() WHERE user_id = ? AND imageID = ?";
    const values = [imageData, user_id, image_id];

    db.query(updateQuery, values, (err, result) => {
      if (err) {
        console.error("Error updating image:", err);
        return res.status(500).json({ Error: "Internal server error" });
      }

      res
        .status(200)
        .json({ Status: "Success", UpdatedRows: result.affectedRows });
    });
  } catch (error) {
    console.error("Error updating image:", error);
    return res
      .status(500)
      .json({ Error: "Internal server error", Details: error.message });
  }
};



module.exports = {
  addImage,
  getAllImages,
  getImagesByUserId,
  getOneImage,
  updateImage,
  deleteAllImages,
  upload, // Assuming multerConfig is the Multer configuration
  getImageByUserIDAndImageID,
  updateImageByUserIDAndImageID,
};
