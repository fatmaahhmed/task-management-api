# Project & Task Management API

A robust RESTful API built with Node.js, Express, TypeScript, and MongoDB for managing projects and tasks.

## Features

- **Authentication**: JWT-based login and registration.
- **Role-Based Access Control**: Differentiates between 'Admin' and 'Member' roles.
- **Projects**: Create, read, update, delete (CRUD) projects.
- **Tasks**: Create tasks under projects, with robust filtering, pagination, and sorting.
- **Validation**: Zod schema validation for all inputs.
- **Error Handling**: Global error handling middleware.

## Tech Stack

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Language**: TypeScript
- **Validation**: Zod
- **Testing**: Jest & Supertest
- **Containerization**: Docker & Docker Compose

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the root directory based on the `.env.example`:

```bash
cp .env.example .env
```

Ensure it contains:
```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/project_management
JWT_SECRET=your_jwt_secret_key_here
```

### 2. Run Locally (Without Docker)

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

Run tests:
```bash
npm run test
```

### 3. Run With Docker

You can spin up the entire application along with MongoDB using Docker Compose:

```bash
docker-compose up --build
```

The API will be available at `http://localhost:4000`.

## API Documentation

A Postman collection is included in the repository (`postman_collection.json`). You can import this directly into Postman to test the endpoints.