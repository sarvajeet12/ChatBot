const { response } = require("express");
const Chat = require("../models/chatModel");
const Conversation = require("../models/convoModel");


// ------------------------------------------create chat ----------------------------------------------------

const createChat = async (req, resp) => {
    try {
        const userId = req.user.id;

        const chat = await Chat.create({
            user: userId,
        })

        resp.status(200).json({
            success: true,
            response: chat
        })


    } catch (error) {
        // console.log("Something went wrong while creating Chat: ", error);
        return resp.status(500).json({
            success: false,
            message: "Something went wrong while creating Chat",
            error: error.message
        });
    }
}


// -------------------- get all chats ------------------------

const getAllChats = async (req, resp) => {
    try {
        const chats = await Chat.find({ user: req.user.id }).sort({ createdAt: -1 });

        if (!chats) {
            return resp.status(404).json({
                success: false,
                message: "No chats found",
            })
        }
        resp.status(200).json({
            success: true,
            response: chats
        })


    } catch (error) {
        // console.log("Something went wrong while getting all chats: ", error);
        return resp.status(500).json({
            success: false,
            message: "Something went wrong while getting all chats",
            error: error.message
        });
    }


}

// ---------------------------------- conversation ----------------------
const addConversation = async (req, resp) => {
    try {

        if (!req.params.id || req.params.id === "null") {
            return resp.status(400).json({
                success: false,
                message: "Invalid or missing chat ID",
            });
        }

        const chat = await Chat.findById(req.params.id);


        if (!chat) {
            return resp.status(404).json({
                success: false,
                message: "Chat not found",
            })
        }

        const conversation = await Conversation.create({
            chat: chat._id,
            question: req.body.question,
            answer: req.body.answer,
        })


        const updatedChat = await Chat.findByIdAndUpdate(req.params.id, { latestMessage: req.body.question }, { new: true })

        resp.status(200).json({
            success: true,
            response: conversation,
            update: updatedChat
        })


    } catch (error) {
        // console.log("Something went wrong while add conversation: ", error.message);
        return resp.status(500).json({
            success: false,
            message: "Something went wrong while add conversation",
            error: error.message
        });
    }
}

// ---------------------------------- get all conversation ----------------------
const getConversation = async (req, resp) => {
    try {

        const conversation = await Conversation.find({ chat: req.params.id });

        if (!conversation) {
            return resp.status(404).json({
                success: false,
                message: "Conversation not found",
            })
        }

        resp.status(200).json({
            success: true,
            response: conversation
        })

    } catch (error) {
        ("Something went wrong while get conversation: ", error);
        return resp.status(500).json({
            success: false,
            message: "Something went wrong while get conversation",
            error: error.message
        });
    }
}


//  ---------------------------- delete conversation of particular chat id ----------------------

const deleteChat = async (req, resp) => {
    try {
        const chat = await Chat.findById(req.params.id);

        if (!chat) {
            return resp.status(404).json({
                success: false,
                message: "Chat not found",
            })
        }

        if (chat.user.toString() !== req.user.id.toString()) {
            return resp.status(401).json({
                success: false,
                message: "You are not authorized to delete this chat",
            })
        }

        // Delete all conversations associated with the chat ID
        await Conversation.deleteMany({ chat: chat._id });

        // delete chat
        await chat.deleteOne();

        resp.status(200).json({
            success: true,
            message: "Chat deleted successfully",
            response: chat
        })

    } catch (error) {
        // console.log("Something went wrong while deleting chat: ", error);
        return resp.status(500).json({
            success: false,
            message: "Something went wrong while deleting chat",
            error: error.message
        });
    }
}



module.exports = { createChat, getAllChats, addConversation, getConversation, deleteChat };