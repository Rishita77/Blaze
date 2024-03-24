const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./model/user');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/user-auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// Middleware
app.use(bodyParser.json());

// Home route
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

// Register route
app.post('/users/register', async (req, res) => {
  const { email, username, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send('User already exists');
  }

  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Create a new user
  const newUser = new User({ email, username, password: hashedPassword });
  await newUser.save();

  // Send a success response
  res.send('User registered successfully');
});

// Login route
app.post('/users/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send('Invalid email or password');
  }

  // Check if password is correct
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).send('Invalid email or password');
  }

  // Create and assign a token
  const token = jwt.sign({ id: user._id }, 'SECRET_KEY', { expiresIn: '1h' });

  // Send a success response with the token
  res.send({ token });
});

// Middleware for user authentication
function authenticate(req, res, next) {
  const token = req.header('Authorization').split(' ')[1];

  if (!token) {
    return res.status(401).send('Access denied');
  }

  try {
    const decoded = jwt.verify(token, 'SECRET_KEY');

    if (decoded) {
      req.user = decoded;
      next();
    }
  } catch (error) {
    res.status(401).send('Access denied');
  }
}

// Protected route
app.get('/users/profile', authenticate, (req, res) => {
  res.sendFile(`${__dirname}/profile.html`);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});