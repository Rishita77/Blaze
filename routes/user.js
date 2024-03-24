const express = require('express');
const User = require('../model/mongo');

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  // Validate the user input
  const { error } = User.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if the user already exists
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already exists.');

  // Create a new user
  user = new User(req.body);
  try {
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;