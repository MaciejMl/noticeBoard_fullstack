const mongoose = require('mongoose');

const NODE_ENV = process.env.NODE_ENV;
let dbURI = '';

if (NODE_ENV === 'production') {
  dbURI = `mongodb+srv://szypki:${mySecret}@mytestingdb.unpaqol.mongodb.net/NoticeBoardDB?retryWrites=true&w=majority`;
} else {
  dbURI = 'mongodb://localhost:27017/NoticeBoardDB';
}

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});

db.on('error', (err) => console.log('Error ' + err));

module.exports = { db, dbURI };
