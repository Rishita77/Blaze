const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const router = express.Router();

// User login
router.post('/login', async (req, res) => {
  // Validate the user input
  const { error } = User.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if the user exists
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');

  // Check if the password is correct
  const isPasswordValid = await user.comparePassword(req.body.password);
  if (!isPasswordValid) return res.status(400).send('Invalid email or password.');

  // Create a JWT token
  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h',
    }
  );

  // Send the token to the user
  res.send(token);
});

module.exports = router;