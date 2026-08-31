const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');

const swaggerSpec = require('./config/swagger');
const apiLimiter = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');
const AppError = require('./utils/appError');

const healthRoutes = require('./routes/healthRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Logging Middleware
app.use(morgan('dev'));

// Rate Limiting
app.use('/api/', apiLimiter);

// In src/app.js

const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

// Add this line to serve your frontend code from the public folder
app.use(express.static(path.join(__dirname, '../public')));

// Your API Routes
app.use('/api/v1', userRoutes);

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/v1', healthRoutes);
app.use('/api/v1', userRoutes);

// Handle 404 Unmatched Routes
app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find endpoint ${req.originalUrl} on this server`, 404));
});

// Centralized Error Handling Middleware
app.use(errorHandler);

module.exports = app;
