const express = require('express');
const mongoose = require('mongoose');
const ordersRoute = require('./routes/orders');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/orderdb')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/orders', ordersRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
