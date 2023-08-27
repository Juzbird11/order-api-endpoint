const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: {
    name: String,
    phone: String,
    address: String
  },
  shippingFee: Number,
  orderStatus: String,
  orderItems: [{
    product: {
      name: String,
      price: Number,
      image: String,
      size: String,
      quantity: Number
    }
  }]
});

module.exports = mongoose.model('Order', orderSchema);
