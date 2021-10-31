require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const fs = require('fs');
const events = require('./db/events.json');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the API.',
  });
});

app.get('/dashboard', verifyToken, (req, res) => {
  jwt.verify(req.token, JWT_SECRET_KEY, (err) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.json({
        events: events,
      });
    }
  });
});

app.post('/register', (req, res) => {
  if (req.body) {
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      // You'll want to encrypt the password in a live app
    };

    const data = JSON.stringify(user, null, 2);

    fs.writeFile('db/user.json', data, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Added user to user.json');
      }
    });
    // The secret key should be an evironment variable in a live app
    const token = jwt.sign({ user }, JWT_SECRET_KEY);
    res.json({
      token,
      email: user.email,
      name: user.name,
    });
  } else {
    res.sendStatus(401);
  }
});

app.post('/login', (req, res) => {
  const userDB = fs.readFileSync('./db/user.json');
  const userInfo = JSON.parse(userDB);
  if (
    req.body &&
    req.body.email === userInfo.email &&
    req.body.password === userInfo.password
  ) {
    // The secret key should be an environment variable in a live app
    const token = jwt.sign({ userInfo }, JWT_SECRET_KEY);
    res.json({
      token,
      email: userInfo.email,
      name: userInfo.name,
    });
  } else {
    res.sendStatus(401);
  }
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(401);
  }
}

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
