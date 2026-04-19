const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is missing. Please set it in backend/.env or via environment variables.');
  process.exit(1);
}

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/problems', require('./routes/problemRoutes'));
app.use('/api/code', require('./routes/codeRoutes'));
app.use('/api/submissions', require('./routes/submissionRoutes'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'LeetCode Clone API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
