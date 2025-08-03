# 📝 Blogs Backend API

A RESTful API built with **Node.js**, **Express**, and **MongoDB** (via **Mongoose**) for managing user accounts and blog content. This backend supports JWT-based authentication and modular route separation.

## 📁 Project Structure

blogs-backend/
├── app.js                 # Main server entry
├── .env                  # Environment variables
├── routes/               # Main route index
├── modules/              # Feature-specific modules
│   ├── blogs/            # Blog-related logic (CRUD)
│   │   ├── blog.api.js
│   │   ├── blog.controller.js
│   │   └── blog.model.js
│   └── users/            # User registration, login, profile
│       ├── user.api.js
│       ├── user.controller.js
│       ├── user.model.js
│       └── user.validator.js
├── utils/                # Utility functions
│   ├── hash.js           # Password hashing
│   ├── secure.js         # Authentication & role-checking middleware
│   └── token.js          # JWT token generation
├── package.json
└── .gitignore

## 🚀 Features

- ✅ User Registration & Login
- ✅ JWT-based Authentication
- ✅ Role-based Authorization (e.g., `user`, `admin`, `author`)
- ✅ Blog CRUD operations
- ✅ Filter blogs by title or current user
- ✅ Error-handling middleware
- ✅ MongoDB integration via Mongoose

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/prg6useless/Blogs-Backend.git
cd Blogs-Backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure `.env`

Create a `.env` file in the root directory and add the following:

```env
PORT=any_port eg:5000

#jwt
JWT_KEY=your_jwt_password
JWT_EXPIRY=your_jwt_expiry_time

#bcrypt
SALT_ROUND=integer_value

#databaseURI
MONGO_URI=your_mongodb_uri

```

### 4. Run the Server

```bash
npm start       # or node app.js
# or for development
npx nodemon app.js
```

## 🧪 API Endpoints

### 🔒 Auth Routes (User)

```
POST   /api/v1/users/register       # Register new user
POST   /api/v1/users/login          # Login and get JWT
GET    /api/v1/users/profile        # Get logged-in user details (auth required)
PATCH  /api/v1/users/:id/profile    # Update user profile (auth required)
DELETE /api/v1/users/:id            # Delete user details
```

### 📝 Blog Routes

```
POST   /api/v1/blogs                          # Create new blog (auth required)
GET    /api/v1/blogs                          # Get all blogs (with pagination)
GET    /api/v1/blogs/my-blogs                 # Get blogs created by current user (auth required)
GET    /api/v1/blogs/:id                      # Get blog by ID
PUT    /api/v1/blogs/:id                      # Update blog (auth required)
POST   /api/v1/blogs/:id/comments             # Add comment to a blog (auth required)
DELETE /api/v1/blogs/:id/comments/:commentId  # Delete comment of a blog (auth required)
DELETE /api/v1/blogs/:id                      # Delete blog (auth required)
```

---

## 🔐 Middleware

* **secureMiddleWare()**: Checks for valid JWT and current logged in user.
* **isOwnerOfBlog()**: Checks if current user has access to update and delete blogs.
* **Password Hashing**: Handled in `utils/hash.js` using bcrypt.
* **JWT Token Utilities**: Signing and decoding handled in `utils/token.js`.

---

## 📦 Tech Stack

* Node.js
* Express.js
* MongoDB (via Mongoose)
* JWT for Auth
* Bcrypt for Password Security

```