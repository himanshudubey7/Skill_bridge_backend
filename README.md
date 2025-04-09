# 💬 Skill Bridge Platform - Backend

A backend API for a Skill Exchange Platform where users can sign up, create skill-based profiles, post their skills or requirements, and 
communicate with each other through a simple messaging system. Built using **Node.js**, **Express**, **MongoDB**, and **JWT-based Authentication**.

---

## 📁 Project Structure


skill-exchange-backend/
├── models/
│   ├── user.js
│   ├── profile.js
│   ├── skillPost.js
│   └── chat.js
├── routes/
│   ├── authRoutes.js
│   ├── profileRoutes.js
│   ├── skillPost.js
│   └── messages.js
├── .env
├── server.js
├── package.json
└── README.md


## 🚀 Features

- 🔐 User Authentication (JWT-based)
- 👤 User Profiles with Skills and Requirements
- 📝 Skill Posting (Filterable by category or keyword)
- 💌 Simple Messaging System (store & fetch messages between users)
- 🌐 CORS support for frontend integration
- 📦 MongoDB (Mongoose) based models and schema validation


## 🔧 Installation

### 1. Clone the repository
bash
git clone https://github.com/yourusername/skill-exchange-backend.git
cd skill-exchange-backend


### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root with the following variables:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/skill-exchange
JWT_SECRET=your_jwt_secret_key
```

> 💡 You can use MongoDB Atlas or a local MongoDB instance.

---

## ▶️ Run the server

```bash
npm start
```

The server will be running at:  
📍 `http://localhost:5000`

---

## 🛠️ API Routes

### 🔐 Authentication

- **POST /api/auth/register** – Register a new user  
- **POST /api/auth/login** – Login and get JWT token

### 👤 Profiles

- **POST /api/profile** – Create or update user profile  
- **GET /api/profile/:userId** – Get profile by user ID

### 📢 Skill Posts

- **POST /api/posts** – Create a skill/requirement post  
- **GET /api/posts** – Get all posts (with optional filters)

### 💬 Messages

- **POST /api/messages/send** – Send a message to another user  
- **GET /api/messages/:userId** – Fetch all messages between logged-in user and target user

---

## 🧪 Testing with Postman

1. Register/login a user → Get JWT token
2. Create profile and posts
3. Use the token in `Authorization` header for protected routes:
   ```
   Authorization: Bearer <your_token>
   ```
4. Test sending messages:
   ```
   POST /api/messages/send
   Body:
   {
     "to": "<recipient_user_id>",
     "message": "Hey, let's connect!"
   }
   ```

5. Fetch messages:
   ```
   GET /api/messages/<recipient_user_id>
   ```

---

## 📱 Frontend Integration

To test messaging, you can use a simple frontend HTML page:

```html
<script src="https://cdn.socket.io/4.7.2/socket.io.min.js"></script>
<script>
  const socket = io("http://localhost:5000", {
    auth: {
      token: "<your_jwt_token>"
    }
  });

  socket.emit("send_message", { to: "<user_id>", message: "Hello!" });

  socket.on("receive_message", (data) => {
    console.log("Received:", data);
  });
</script>
```

> You can also skip real-time sockets and rely on REST messaging endpoints if you want simpler integration.

---

## 💡 Future Improvements

- ✅ Real-time chat with Socket.IO
- 📬 Notifications for new messages
- 🧠 AI-suggested matches or skill pairings
- 📱 Full frontend (React) integration
- 📊 User ratings and endorsements

---

## 📄 Author

This project is belongs to himanshudubey7.

---

## 👤 Author

- GitHub: [himanshudubey7](https://github.com/himanshudubey7)
- LinkedIn: [Linkdin](https://www.linkedin.com/in/himanshu-dubey-887275249/)

```
