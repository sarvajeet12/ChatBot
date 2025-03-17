const Mongoose = require("mongoose");

const chatSchema = new Mongoose.Schema(
    {
        user: {
            type: Mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        latestMessage: {
            type: String,
            default: "New Chat"
        }
    }, {
    timestamps: true
}

);

const Chat = Mongoose.model("Chat", chatSchema);

module.exports = Chat;