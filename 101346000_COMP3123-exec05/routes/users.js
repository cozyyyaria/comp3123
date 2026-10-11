const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const userFilePath = path.join(__dirname, '../user.json');

// Helper function to read user.json data
const getUserData = () => {
  const data = fs.readFileSync(userFilePath, 'utf-8');
  return JSON.parse(data);
};

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req, res) => {
  try {
    const user = getUserData();
    res.json(user);
  } catch (error) {
    res.status(500).json({ status: false, message: 'Server Error' });
  }
});

/*
- Modify /login router to accept username and password as JSON body parameter
- Read data from user.json file
- If username and passsword is valid then send response as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body || {};
    const user = getUserData();

    if (!username || username !== user.username) {
      return res.json({
        status: false,
        message: "User Name is invalid"
      });
    }

    if (!password || password !== user.password) {
      return res.json({
        status: false,
        message: "Password is invalid"
      });
    }

    return res.json({
      status: true,
      message: "User Is valid"
    });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Server Error' });
  }
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get(['/logout/:username', '/logout'], (req, res) => {
  const username = req.params.username || req.query.username || 'User';
  res.send(`<b>${username} successfully logged out.<b>`);
});

// Also support POST for logout if needed
router.post(['/logout/:username', '/logout'], (req, res) => {
  const username = req.params.username || req.query.username || (req.body && req.body.username) || 'User';
  res.send(`<b>${username} successfully logged out.<b>`);
});

module.exports = router;