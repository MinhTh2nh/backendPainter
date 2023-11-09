//Nhung cai api phuc vu cho server side rendering
//Web site co nhung cai method nao\
// Define your API routes here
const {getHomePage , getABC , createUser , getUser} = require('../controllers/homeController')
const express = require("express");
const router = express.Router()

// router.Method('/route' , handler    )
router.get( '/' , getHomePage )

router.get('/users' , getUser )
router.post( '/create-user' , createUser )

router.get('/abc' , getABC )


module.exports = router; // export default

