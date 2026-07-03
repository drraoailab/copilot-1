/**
 * Personal Information Form Application
 * A Node.js + Express server with form validation and security
 */

const express = require('express');
const { body, validationResult } = require('express-validator');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware Setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// View Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/**
 * Validation middleware array for form submission
 * Validates, sanitizes, and trims all input fields
 */
const validationRules = () => {
  return [
    body('fullName')
      .trim()
      .notEmpty()
      .withMessage('Full Name is required')
      .isLength({ min: 2 })
      .withMessage('Full Name must be at least 2 characters long')
      .matches(/^[a-zA-Z\s'-]*$/)
      .withMessage('Full Name can only contain letters, spaces, hyphens, and apostrophes')
      .escape(),

    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email Address is required')
      .isEmail()
      .withMessage('Please provide a valid email address')
      .normalizeEmail()
      .escape(),

    body('age')
      .notEmpty()
      .withMessage('Age is required')
      .isInt({ min: 18, max: 120 })
      .withMessage('Age must be a number between 18 and 120')
      .escape(),

    body('phone')
      .optional({ checkFalsy: true })
      .trim()
      .matches(/^[\d\s\-\+\(\)]{7,}$/)
      .withMessage('Phone number must be in a valid format (at least 7 digits)')
      .escape(),

    body('biography')
      .optional({ checkFalsy: true })
      .trim()
      .isLength({ max: 500 })
      .withMessage('Biography cannot exceed 500 characters')
      .escape()
  ];
};

/**
 * GET / - Render the blank form page
 */
app.get('/', (req, res) => {
  res.render('form', { errors: [], formData: {} });
});

/**
 * POST /submit - Process form submission
 * Validates input, returns form with errors or success page
 */
app.post('/submit', validationRules(), (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Convert errors to an object keyed by field name for easier template access
    const errorsByField = {};
    errors.array().forEach(error => {
      errorsByField[error.param] = error.msg;
    });

    // Re-render form with errors and previously submitted data
    return res.render('form', {
      errors: errors.array(),
      errorsByField: errorsByField,
      formData: req.body
    });
  }

  // If validation passes, prepare sanitized data for success page
  const submittedData = {
    fullName: req.body.fullName,
    email: req.body.email,
    age: req.body.age,
    phone: req.body.phone || 'Not provided',
    biography: req.body.biography || 'Not provided'
  };

  res.render('success', { data: submittedData });
});

/**
 * 404 Error Handler
 */
app.use((req, res) => {
  res.status(404).render('404');
});

/**
 * Global Error Handler
 */
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).send('An internal server error occurred');
});

// Start Server
app.listen(PORT, () => {
  console.log(`✓ Server running at http://localhost:${PORT}`);
  console.log(`✓ Press Ctrl+C to stop the server`);
});
