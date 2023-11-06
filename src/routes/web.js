//Nhung cai api phuc vu cho server side rendering
//Web site co nhung cai method nao\
// Define your API routes here
const {getHomePage , getABC , createUser , getUser} = require('../controllers/homeController')
const express = require("express");
const router = express.Router()

// router.Method('/route' , handler    )
router.get( '/' , getHomePage )

router.post( '/create-user' , createUser )
router.get('/abc' , getABC )
router.get('/users' , getUser )

// app.get("/users", (req, res) => {
//     db.query("SELECT * FROM user", (err, results) => {
//       if (err) {
//         return res.status(500).json({ error: "Database error" });
//       }
//       console.log(">>>>>results = ", results);
//       return res.status(200).json(results);
//     });
//   });

module.exports = router; // export default

