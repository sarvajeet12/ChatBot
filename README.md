# ChatBot MERN Applicatio

Welcome to the **ChatBot MERN Application**!  
This is a full-stack, modern, and scalable chatbot platform built using the MERN stack (MongoDB, Express.js, React, Node.js). The app supports secure OTP-based authentication, real-time chat, and a clean, responsive UI.

---

## 🌐 Deployment : https://chatbot-c1at.onrender.com

---

## 🚀 Features

- **User Authentication:** Secure login with OTP sent via email.
- **Chat Management:** Create, view, and delete chat sessions.
- **Conversation Storage:** All conversations are stored and retrievable.
- **Responsive UI:** Modern, mobile-friendly interface.
- **Email Integration:** OTPs sent using Nodemailer and Gmail SMTP.
- **Protected Routes:** JWT-based authentication for secure endpoints.
- **Environment Config:** All sensitive data managed via .env.

---

## 📚 API Responses & Definitions

### Authentication

- **POST `/api/v1/user/send-otp`**
  - **Request:** `{ email: string }`
  - **Response (Success):**
    ```json
    {
      "success": true,
      "message": "OTP Sent Successfully",
      "response": { "email": "user@example.com", "otp": "123456", ... }
    }
    ```
  - **Response (Failure):**
    ```json
    {
      "success": false,
      "message": "Something went wrong while send otp",
      "error": "Error message"
    }
    ```

- **POST `/api/v1/user/login`**
  - **Request:** `{ email: string, otp: string }`
  - **Response (Success):**
    ```json
    {
      "success": true,
      "message": "Logged In Successfully !!!",
      "response": { "email": "user@example.com", ... },
      "token": "JWT_TOKEN"
    }
    ```
  - **Response (Failure):**
    ```json
    {
      "success": false,
      "message": "Invalid Otp!!"
    }
    ```

### Chat & Conversation

- **POST `/api/v1/chat/new`**  
  Create a new chat session.
- **GET `/api/v1/chat/get-chats`**  
  Retrieve all chats for the user.
- **POST `/api/v1/chat/:id`**  
  Add a conversation to a chat.
- **GET `/api/v1/chat/:id`**  
  Get all conversations for a chat.
- **DELETE `/api/v1/chat/:id`**  
  Delete a chat and its conversations.

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, React Router, React Icons, React Toastify, Axios
- **Backend:** Node.js, Express.js, Mongoose, JWT, Nodemailer, OTP Generator, CORS, dotenv
- **Database:** MongoDB Atlas
- **Email Service:** Gmail SMTP via Nodemailer

---

## 📦 Main Dependencies

### Server

- `express`
- `mongoose`
- `jsonwebtoken`
- `nodemailer`
- `otp-generator`
- `dotenv`
- `cors`
- `nodemon`

### Client

- `react`
- `react-dom`
- `react-router-dom`
- `axios`
- `react-toastify`
- `react-icons`
- `react-otp-input`
- `@lottiefiles/dotlottie-react`
- `vite`

---

## 📁 Folder Structure

```
ChatBot/
│
├── .env
├── package.json
├── .gitignore
├── client/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   ├── components/
│   │   │   ├── sidebar.jsx
│   │   │   └── conversation.jsx
│   │   ├── context/
│   │   │   ├── common-store.jsx
│   │   │   └── chat-store.jsx
│   │   ├── pages/
│   │   │   ├── home.jsx
│   │   │   ├── login.jsx
│   │   │   ├── dashboard.jsx
│   │   │   └── error.jsx
│   │   ├── routers/
│   │   │   └── router.jsx
│   │   └── service/
│   │       ├── api-connector.jsx
│   │       └── apis.jsx
│   └── public/
│
├── server/
│   ├── server.js
│   ├── configs/
│   │   ├── dbConfig.js
│   │   └── emailConfig.js
│   ├── controllers/
│   │   ├── userController.js
│   │   └── chatController.js
│   ├── middlewares/
│   │   └── isAuth.js
│   ├── models/
│   │   ├── userModel.js
│   │   ├── chatModel.js
│   │   ├── convoModel.js
│   │   └── otpModel.js
│   ├── routers/
│   │   ├── userRouter.js
│   │   └── chatRouter.js
│   ├── template/
│   │   └── emailVerification.js
│   └── utils/
│       └── sendEmail.js
```

---

## 💡 Main Points & Highlights

- **OTP Authentication:** Secure and user-friendly login flow.
- **JWT Security:** All chat endpoints are protected.
- **Email Verification:** Users receive OTPs via email for verification.
- **Clean UI:** Responsive and modern design with React and Vite.
- **Easy Setup:** All configuration via .env file.
- **Scalable Structure:** Modular codebase for easy maintenance and extension.
- **API Connector:** Centralized Axios-based API handler for frontend requests.
- **Toast Notifications:** User feedback for all major actions.

---

## 📝 How to Run

1. **Clone the repository**
2. **Install dependencies**
   ```sh
   npm install
   cd client && npm install
   ```
3. **Configure .env**  
   Add your MongoDB, JWT, and email credentials.
4. **Run the server**
   ```sh
   npm run dev
   ```
5. **Run the client**
   ```sh
   cd client
   npm run dev
   ```

---

**Enjoy chatting! 🚀**
