const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const helmet = require('helmet');
require('dotenv').config();

const { db, dbURI } = require('./db');

const app = express();
app.use(helmet());
const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({ mongoUrl: dbURI }),
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV == 'production' },
  })
);

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true,
};

if (process.env.NODE_ENV !== 'production') {
  app.use(cors(corsOptions));
}

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.static(path.join(__dirname, '/client/build')));

app.use(express.static(path.join(__dirname, '/client/public')));

app.use('/api', require('./routes/ads.routes'));
// app.use('/auth', require('./routes/user.routes'));
app.use('/auth', require('./routes/auth.routes'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

module.exports = server;
