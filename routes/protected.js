const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// Protected route
router.get('/', async (req, res, next) => {
  // Check if the user is authenticated
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).send('Invalid user.');
    }
    next();
  } catch (error) {
    return res.status(401).send('Invalid token.');
  }

  // Route logic for protected route
  res.send('Welcome to the protected route!');
});

module.exports = router;