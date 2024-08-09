const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const productRouter = require('./productRouter');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); //To parse JSON request bodies

// Use the product router
app.use('', productRouter);

const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('hey');
});

app.listen(PORT, (req, res) => {
  console.log(`server started on port ${PORT}`);
});
