const express = require('express');
const router = express.Router();

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: System status and metrics
 */
router.get('/health', (req, res) => {
  const healthData = {
    status: 'UP',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    memoryUsage: process.memoryUsage()
  };

  res.status(200).json({
    success: true,
    data: healthData
  });
});

module.exports = router;
