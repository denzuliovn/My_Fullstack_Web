# FullStack Web Project

## 📌 Project Overview
This is a full-stack web application built with:
- **Frontend**: Vite, TailwindCSS, ShadCN/UI
- **Backend**: Node.js, GraphQL (using GraphQL Yoga)
- **Database**: MongoDB (Docker)

## 🚀 Getting Started
Follow these steps to set up and run the project.

### 🔧 Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)

---

## 🖥️ Frontend Setup
```sh
cd FullStack/Frontend
npm install
npm run dev
```

---

## 🛠️ Backend Setup
```sh
cd FullStack/test-project
npm install
npm install graphql-yoga
npm start
```

---

## 🗄️ Database Setup (MongoDB)
Ensure your database container is running:
```sh
docker start db
```

---

## 📜 Notes
- Make sure MongoDB is running before starting the backend.
- If you face any issues, check your `.env` configuration.
- Use `npm run build` in the frontend for production.

---

## 📌 Author
Developed by **[Your Name]**

