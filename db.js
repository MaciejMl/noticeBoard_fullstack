const mongoose = require('mongoose');

dbURI = 'mongodb://localhost:27017/NoticeBoardDB';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});

db.on('error', (err) => console.log('Error ' + err));

module.exports = { db, dbURI };
