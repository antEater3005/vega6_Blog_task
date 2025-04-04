# Vega6 Blog Task Project

## Prerequisites
Ensure you have the following installed:
- Node.js (>= 16.x)
- npm (comes with Node.js) or yarn
- MongoDB (if using a database)

---

## Frontend (Vite + React)

### Setup
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Open `http://localhost:5173` in your browser.

---

## Backend (Node.js + Express + MongoDB)

### Setup
1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the backend directory
   - Add the following environment variables:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     ```
4. Start the backend server:
   ```sh
   npm run dev
   ```
5. The backend will run on `http://localhost:5000`

---

## API Endpoints

### Authentication
- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/signin` - Authenticate user & return token
- **GET** `/api/auth/` - Get details about current user

### Blogs
- **GET** `/api/blogs` - Get all blogs
- **GET** `/api/blogs/:id` - Get a single blog by ID
- **GET** `/api/blogs/by-user` - Get a all blogs posted by current logged in user
- **POST** `/api/blogs` - Create a new blog (requires authentication)
- **PUT** `/api/blogs/:id` - Update a blog (requires authentication & ownership)
- **DELETE** `/api/blogs/:id` - Delete a blog (requires authentication & ownership)

---

## Deployment
### Frontend
1. Build the project:
   ```sh
   npm run build
   ```
2. Serve the build files using a hosting service like Vercel or Netlify.

### Backend
1. Use `pm2` or another process manager to keep the server running:
   ```sh
   pm2 start server.js --name backend
   ```
2. Deploy using a service like AWS, DigitalOcean, or Heroku.

---

## Additional Notes
- Ensure MongoDB is running before starting the backend.
- Use Postman or a similar tool for testing APIs.
- Modify `.env` settings as needed for production.

Happy coding! 🚀

