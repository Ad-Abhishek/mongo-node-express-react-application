import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Product API',
    version: '1.0.0',
    description: 'My Product API Description',
  },
};

const options = {
  swaggerDefinition,
  apis: ['./routers/productRouter.js'],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
