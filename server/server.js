require("dotenv").config();

const express = require("express");
const cors = require("cors")


const app = express();
const port = process.env.PORT;
const connectDB = require("./configs/dbConfig");



//1. for deployment purpose (require path)
const path = require("path");


//2. for deployment purpose (take path)
const _dirname = path.resolve();
// console.log("path", _dirname)


// TODO: tackle cors
const corsOption = {
    origin: "https://chatbot-c1at.onrender.com",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type'],
};


// middleware
app.use(express.json());
app.use(cors(corsOption))


// ? Router Path
const userRouter = require("./routers/userRouter");
const chatRouter = require("./routers/chatRouter");



// TODO: routers
app.use("/api/v1/user", userRouter);
app.use("/api/v1/chat", chatRouter);



//3. for deployment purpose
app.use(express.static(path.join(_dirname, "/client/dist")));
app.get("*", (req, resp) => {
    resp.sendFile(path.resolve(_dirname, "client", "dist", "index.html"))
});


// If database connected successfully THEN run "app.listen"
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at port no: ${port}`);
    });
});