import { body } from 'express-validator';

const productReqValidator = [
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

export default productReqValidator;
