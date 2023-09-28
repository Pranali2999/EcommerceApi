const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const config = require('./config/mongoose'); 

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

// Use product routes
app.use('/products', productRoutes);

const port =3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
