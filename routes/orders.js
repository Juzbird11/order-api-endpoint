const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Order = require('../models/Order');

const orderSchema = Joi.object({
  customer: Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().required()
  }).required(),
  shippingFee: Joi.number().required(),
  orderStatus: Joi.string().required(),
  orderItems: Joi.array().items(Joi.object({
    product: Joi.object({
      name: Joi.string().required(),
      price: Joi.number().required(),
      image: Joi.string().required(),
      size: Joi.string().required(),
      quantity: Joi.number().required()
    }).required()
  })).required()
});


router.post('/', async (req, res) => {
  try {
    const { error } = orderSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
