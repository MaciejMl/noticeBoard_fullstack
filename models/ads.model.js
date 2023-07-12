const mongoose = require('mongoose');

const adsSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 10, maxlength: 50 },
  content: { type: String, required: true, minlength: 20, maxlength: 1000 },
  price: { type: Number, required: true },
  date: { type: String, required: true },
  image: { type: String, required: true },
  location: { type: String, required: true },
  info: { type: String, required: true },
  user: { type: String, required: true, ref: 'User' },
});

module.exports = mongoose.model('Ads', adsSchema);
