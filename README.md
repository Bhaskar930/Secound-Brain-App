# 🧠 Second Brain Web App (Full-Stack MERN) — 2024

**Second Brain** is a full-stack MERN productivity tool that helps users save, organize, and collaborate on links and notes — all in one place. The app features real-time sharing, authentication, and a responsive, modern UI.

---

## ✨ Features

- 📝 Save and manage personal links and notes
- 🔐 JWT authentication with protected routes
- 🤝 Real-time content sharing for collaboration
- 🎯 Fully responsive design using Tailwind CSS
- 🧭 Organized dashboard with intuitive UI/UX

---

## 🛠 Tech Stack

### 💻 Frontend

- React.js
- TypeScript
- Tailwind CSS
- React Hooks
- Vite

### 🖥 Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- dotenv

---

## 📁 Folder Structure

Second-Brain-App/
├── Brainly-main-frontend/ # React + Tailwind frontend
└── Brainly-Backend/ # Express.js backend with MongoDB & JWT

yaml
Copy code

---

## ⚙️ Getting Started Locally

### 1️⃣ Backend Setup

```bash
cd Brainly-Backend
npm install
Create a .env file in the root of Brainly-Backend:

env
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
Start the backend server:

bash
Copy code
npm run dev
```
2️⃣ Frontend Setup
```bash
Copy code
cd Brainly-main-frontend
npm install
npm run dev
```
