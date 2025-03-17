const Mongoose = require("mongoose");

const userSchema = new Mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

const User = Mongoose.model("User", userSchema);

module.exports = User;