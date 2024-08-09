const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const productRouter = require('./productRouter');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); //To parse JSON request bodies

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

// Use the product router
app.use('', productRouter);

const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('hey');
});

app.listen(PORT, (req, res) => {
  console.log(`server started on port ${PORT}`);
});
