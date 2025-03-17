const express = require("express");
const router = express.Router();


// controllers
const userControllers = require("../controllers/userController")

// middleware
const authMiddleware = require("../middlewares/isAuth");


// send otp
router
    .route("/send-otp")
    .post(userControllers.sendOTP)


// login page  
router
    .route("/login").
    post(userControllers.userLogin);

// user details
router
    .route("/user-details")
    .get(authMiddleware, userControllers.userDetails);





module.exports = router; 
