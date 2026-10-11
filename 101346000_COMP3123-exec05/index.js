const express = require('express');
const path = require('path');
const app = express();
const userRouter = require('./routes/users');

// Middleware to parse JSON and urlencoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add User Router (mounted at /api/v1/user as well as root for convenience)
app.use('/api/v1/user', userRouter);
app.use('/', userRouter);

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

// Also serve home.html on the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

// Route to demonstrate and test error handling middleware
app.get('/error', (req, res, next) => {
  next(new Error('Server Error'));
});

/*
Add error handling middleware to handle below error
- Return 500 page with message "Server Error"
*/
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});

const PORT = process.env.PORT || process.env.port || 8081;
app.listen(PORT, () => {
  console.log('Web Server is listening at port ' + PORT);
});