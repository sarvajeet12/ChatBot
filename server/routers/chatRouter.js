const express = require("express");
const router = express.Router();


// controllers
const chatControllers = require("../controllers/chatController")

// middleware
const authMiddleware = require("../middlewares/isAuth");


// create chat
router
    .route("/new")
    .post(authMiddleware, chatControllers.createChat)

// get all chats
router
    .route("/get-chats")
    .get(authMiddleware, chatControllers.getAllChats)

//add conversation 
router
    .route("/:id")
    .post(authMiddleware, chatControllers.addConversation)

//get conversation 
router
    .route("/:id")
    .get(authMiddleware, chatControllers.getConversation)


//delete chat 
router
    .route("/:id")
    .delete(authMiddleware, chatControllers.deleteChat)






module.exports = router; 
