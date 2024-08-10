import { validationResult } from 'express-validator';
import Product from '../schemas/productModel.js';

// Get all produts
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Returns a list of products
    res.json(products);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get a product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Returns an object
    if (!product)
      return res.status(404).json({
        status: 'FAILED',
        message: 'Product not found',
        data: null,
      });
    res.json(product);
  } catch (err) {
    res.status(500).json({
      status: 'FAILED',
      message: err.message,
      data: null,
    });
  }
};

// Create a new produt
const createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  let { name, price, color, stock } = req.body;
  const newProduct = new Product({
    name,
    price,
    color,
    stock,
  });

  try {
    const savedProduct = await newProduct.save(); // Returns a newly added product
    res.status(201).json({
      status: 'SUCCESS',
      message: 'Product created successfully!',
      data: savedProduct,
    });
  } catch (err) {
    res.status(400).json({
      status: 'FAILED',
      message: err.message,
    });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.send(400).json({
      errors: errors.array(),
    });
  }

  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: 'SUCCESS',
      message: 'Product updated successfully!',
      data: product,
    });
  } catch (err) {
    res.status(400).json({
      status: 'FAILED',
      message: err.message,
      data: null,
    });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({
      status: 'SUCCESS',
      message: 'Product Deleted Successfully!',
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      status: 'FAILED',
      message: err.message,
      data: null,
    });
  }
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
