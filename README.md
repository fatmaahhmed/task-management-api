# Task Management API

A robust RESTful API built with Node.js, Express, TypeScript, and MongoDB for managing projects and tasks. 

##  Features
- **Layered Architecture:** Clear separation of concerns (Routes, Controllers, Services).
- **Authentication:** JWT-based user authentication and authorization.
- **Data Validation:** Zod used for strong request body validation.
- **Filtering:** Task filtering by `status` and `priority` via query parameters.
- **Dockerized DB:** Easy database setup using Docker Compose.
- **Seed Script:** Populate the DB with mock data for quick testing.

##  Tech Stack
- **Backend:** Node.js, Express.js
- **Language:** TypeScript
- **Database:** MongoDB, Mongoose
- **Security:** bcrypt, jsonwebtoken (JWT)
- **Validation:** Zod

##  Getting Started

### 1. Environment Variables
Create a `.env` file in the root directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/task_management_db
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=1d