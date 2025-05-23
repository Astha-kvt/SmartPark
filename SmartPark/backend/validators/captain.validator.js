const { body, check } = require('express-validator');

// Validate captain registration & login
exports.validateCaptain = [
  // Validate firstname (required, min 3 chars)
  check('fullname.firstname')
    .notEmpty().withMessage('First name is required')
    .isLength({ min: 3 }).withMessage('First name must be at least 3 characters'),

  // Validate email (required, valid format)
  check('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(), // Converts email to lowercase

  // Validate password (required, min 6 chars)
  check('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];