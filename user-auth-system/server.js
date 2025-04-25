require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const { sequelize, testConnection } = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

sequelize.authenticate()
    .then(() => console.log('PostgreSQL Connected...'))
    .catch(err => console.error('PostgreSQL Connection Error:', err));

// Sync models
sequelize.sync({ alter: true })
    .then(() => console.log('Database synced'))
    .catch(err => console.error('Database sync error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});