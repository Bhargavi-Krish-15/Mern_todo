project-directory/
├── backend/                # Backend folder (Node.js/Express)
│   ├── models/             # Mongoose models (e.g., User.js, Task.js)
│   ├── routes/             # API routes (e.g., auth.js, tasks.js)
│   ├── middleware/         # Middleware (e.g., auth.js for JWT verification)
│   ├── util/               # Utility functions (e.g., SecretToken.js)
│   ├── server.js           # Entry point for the backend server
│   └── package.json        # Backend dependencies (jsonwebtoken, bcrypt, etc.)
├── frontend/               # Frontend folder (React)
│   ├── src/
│   │   ├── components/     # React components (e.g., Login.jsx, Home.jsx)
│   │   ├── App.js          # Main React component
│   │   └── index.js        # Entry point for React app
│   └── package.json        # Frontend dependencies (axios, react-router-dom, etc.)