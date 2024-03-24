const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Replace this with your own MongoDB URI
const MONGODB_URI = 'mongodb://localhost:27017/my-app';

const app = express();
const userRouter = require('./routes/user');
const loginRouter = require('./routes/login');

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

// Set up middleware
app.use(bodyParser.json());

app.use('/users', userRouter);

app.use('/users/login', loginRouter);



// Set up routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Handle the /users/me endpoint
app.get('/users/me', authenticate, (req, res) => {
  // Send the user object in the response
  res.send(req.user);
});

// Middleware to check if the user is authenticated
function authenticate(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(401).send(err.message);
      req.user = user;
      next();
    });
  } else {
    return res.status(401).send('Access denied');
  }
}

// Handle the /users/logout endpoint
app.get('/users/logout', (req, res) => {
  // Clear the token from the request
  req.session = null;

  // Send a success response
  res.send('Logged out successfully');
});

//hi harsheen