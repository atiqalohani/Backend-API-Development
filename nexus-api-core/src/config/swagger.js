const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Nexus API Core',
      version: '1.0.0',
      description: 'Industrial-grade Backend RESTful API Core'
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Development Server'
      }
    ]
  },
  apis: ['./src/routes/*.js']
};

module.exports = swaggerJSDoc(options);
