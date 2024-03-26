const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Secret key for JWT
const secretKey = crypto.randomBytes(32).toString('hex');

// Load user data from a JSON file
const usersData = JSON.parse(fs.readFileSync('users.json'));


// Forgot password endpoint
app.post('/forgotpassword', (req, res) => {
  const { username, email, mobileNumber } = req.body;

  // Find user by username
  const user = usersData.users.find(user => user.username === username);

  // If user not found or email and mobile number don't match, return error
  if (!user || (user.email !== email || user.mobilenumber !== mobileNumber)) {
    return res.status(400).json({ error: 'Invalid username, email, or mobile number' });
  }

  return res.status(200).json({ message: 'Password sent successfully', password: user.password});
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find user by username and password
  const user = usersData.users.find(user => user.username === username && user.password === password);

  if (user) {
    const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
    res.status(200).json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: 'Invalid username or password' });
  }
});
// Profile endpoint
app.get('/profile', verifyToken, (req, res) => {
  const decoded = jwt.verify(req.token, secretKey);
  const username = decoded.username;
  
  const user = usersData.users.find(user => user.username === username);
  
  if (user) {
    res.status(200).json({ success: true, user });
  } else {
    res.status(404).json({ success: false, message: 'User not found' });
  }
});

//Update Profile
app.put('/updateprofile', verifyToken, (req, res) => {
  const decoded = jwt.verify(req.token, secretKey);
  const username = decoded.username;
  
  // Find user index by username
  const userIndex = usersData.users.findIndex(user => user.username === username);
  
  if (userIndex !== -1) {
    // Update user profile with the new data
    usersData.users[userIndex] = req.body;
    fs.writeFileSync('users.json', JSON.stringify(usersData, null, 2)); // Save updated data to JSON file
    
    res.status(200).json({ success: true, message: 'Profile updated successfully', user: req.body });
  } else {
    res.status(404).json({ success: false, message: 'User not found' });
  }
});

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
