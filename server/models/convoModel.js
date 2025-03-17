const Mongoose = require("mongoose");

const conversationSchema = new Mongoose.Schema(
    {
        chat: {
            type: Mongoose.Schema.Types.ObjectId,
            ref: "Chat",
            required: true
        },
        question: {
            type: String,
            required: true
        },
        answer: {
            type: String,
            required: true
        }
    }, {
    timestamps: true
}

);

const Conversation = Mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;