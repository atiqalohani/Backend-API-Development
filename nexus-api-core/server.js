const app = require('./src/app');
const logger = require('./src/utils/logger');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Nexus API Core running on http://localhost:${PORT}`);
  logger.info(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});
