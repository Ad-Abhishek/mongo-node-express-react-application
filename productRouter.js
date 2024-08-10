const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const productController = require('./productController');

// Validation rules
const productValidationRules = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long'),
  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({ gt: 0 })
    .withMessage('Price must be a number greater than 0'),
  body('color')
    .notEmpty()
    .withMessage('Color is required')
    .isString()
    .withMessage('Color must be a string')
    .isLength({ min: 3 })
    .withMessage('Color must be at least 3 characters long'),
  body('stock')
    .notEmpty()
    .withMessage('Stock is required')
    .isInt({ gt: 0 })
    .withMessage('Stock must be a number greater or equal to 0'),
];

// Routes for product CRUD operations
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.post(
  '/products/',
  productValidationRules,
  productController.createProduct
);
router.put(
  '/products/:id',
  productValidationRules,
  productController.updateProduct
);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
