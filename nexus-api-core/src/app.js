const express = require('express');
const path = require('path');
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
app.use(helmet({
  contentSecurityPolicy: false // Allows inline scripts in index.html to run
}));
app.use(cors());
app.use(express.json());

// Logging Middleware
app.use(morgan('dev'));

// Rate Limiting
app.use('/api/', apiLimiter);

// Serve frontend static files from the root index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'index.html'));
});

// Serve any additional static assets from the root directory
app.use(express.static(process.cwd()));

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
app.use('/api/v1', healthRoutes);
app.use('/api/v1', userRoutes);

// Handle 404 Unmatched Routes
app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find endpoint ${req.originalUrl} on this server`, 404));
});

// Centralized Error Handling Middleware
app.use(errorHandler);

module.exports = app;
