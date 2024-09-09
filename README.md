# Backend Project

This is the backend of the project built with Node.js and Express. The application uses MongoDB as the database and Passport.js for user authentication.

## Table of Contents
- [Installation](#installation)
- [Running the Project Locally](#running-the-project-locally)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Building for Production](#building-for-production)

## Installation

### Prerequisites

Before running the project locally, ensure that you have the following prerequisites installed on your machine:

- Node.js (version 14 or higher)
- npm
- MongoDB (running locally or on a cloud service like MongoDB Atlas)

### Clone the Repository

Clone the project repository from GitHub:

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository


# Backend Project

This is the backend of the project built with Node.js and Express. The application uses MongoDB as the database and Passport.js for user authentication.

## Table of Contents
- [Installation](#installation)
- [Running the Project Locally](#running-the-project-locally)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Building for Production](#building-for-production)

## Installation

### Prerequisites

Before running the project locally, ensure that you have the following prerequisites installed on your machine:

- Node.js (version 14 or higher)
- npm
- MongoDB (running locally or on a cloud service like MongoDB Atlas)

### Clone the Repository

Clone the project repository from GitHub:

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
npm install


Running the Project Locally
Set Up Environment Variables
Ensure that your .env file is set up correctly with the following environment variables:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/your-database-name
SESSION_SECRET=your-session-secret

Start the Development Server
To run the project locally, use the following command:

npm start

This will start the server, and the backend will be available at http://localhost:5000 by default.

Features
User Registration and Login with Passport.js
Secure Authentication using Passport's Local Strategy
Protected Routes
CRUD operations with MongoDB
Session management with express-session
API Endpoints
Here are some of the main API endpoints:

POST /api/register - Register a new user
POST /api/login - Log in an existing user
POST /api/logout - Log out the user
POST  /api/addStudent - Add a new student
PUT   /api/editStudent/:id - Edit the existing student
GET   /api/getStudents - Get students list
DELETE  /api/delete/:id  - Delete a student data
