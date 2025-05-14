const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorhandler');


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();
console.log(process.env.CORS_URL);

// Enable CORS for frontend
app.use(cors({
  origin: process.env.CORS_URL,
  credentials: true,
}));


// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goalsCRUD'));
app.use('/api/users', require('./routes/userRoutes'));




// ❗ Error handler should be after all routes
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
