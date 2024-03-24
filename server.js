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