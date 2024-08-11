import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './config/docs/swagger.js';
import productRouter from './routers/productRouter.js';

const app = express();

dotenv.config();
const PORT = process.env.PORT;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    /* Depricated 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    */
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

app.use(cors());
app.use(express.json()); //To parse JSON request bodies

// Serve Swagger Documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Use the product router
app.use('', productRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Get JSON format Swagger-doc
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.listen(PORT, (req, res) => {
  console.log(`server started on port ${PORT}`);
});
