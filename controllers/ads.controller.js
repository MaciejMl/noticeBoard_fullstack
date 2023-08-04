const Ads = require('../models/ads.model');
const sanitize = require('mongo-sanitize');
const getImageFileType = require('../utils/getImageFileType');
const path = require('path');
const deleteFile = require('../utils/deleteFile');

exports.getAll = async (req, res) => {
  try {
    res.json(await Ads.find().populate('user'));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getSingle = async (req, res) => {
  try {
    const updatedAds = await Ads.findById(req.params.id).populate('user');

    if (!updatedAds) {
      res.status(404).json({ message: 'Element not found...' });
    } else {
      res.json(updatedAds);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

exports.newAdd = async (req, res) => {
  try {
    let { title, content, price, date, location, info, user } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

    title = sanitize(title);
    content = sanitize(content);
    price = sanitize(price);
    date = sanitize(date);
    image = req.file ? sanitize(req.file.filename) : null;
    location = sanitize(location);
    info = sanitize(info);
    user = sanitize(user);

    const filePath = req.file
      ? path.join(__dirname, `../client/public/img/uploads/${image}`)
      : null;

    if (
      title &&
      typeof title === 'string' &&
      title.length >= 10 &&
      content &&
      typeof content === 'string' &&
      content.length >= 20 &&
      price &&
      typeof price === 'string' &&
      content &&
      typeof content === 'string' &&
      date &&
      typeof date === 'string' &&
      location &&
      typeof location === 'string' &&
      info &&
      typeof info === 'string' &&
      req.file &&
      ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)
    ) {
      const titleExist = await Ads.findOne({ title });
      if (titleExist) {
        deleteFile(filePath);
        return res
          .status(409)
          .send({ message: 'Announcement with this title already exists' });
      }

      const newAds = new Ads({
        title,
        content,
        price,
        date,
        image,
        location,
        info,
        user: req.session.user,
      });

      await newAds.save();
      res.status(201).json({ message: 'Announcement created' });
    } else {
      deleteFile(filePath);
      res.status(400).send({ message: 'Bad request' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

exports.editAds = async (req, res) => {
  try {
    let { title, content, price, date, location, info, user } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

    title = sanitize(title);
    content = sanitize(content);
    price = sanitize(price);
    date = sanitize(date);
    image = sanitize(req.file ? req.file.filename : '');
    location = sanitize(location);
    info = sanitize(info);
    user = sanitize(user);

    const filePath = path.join(
      __dirname,
      `../client/public/img/uploads/${image}`
    );

    if (
      title &&
      typeof title === 'string' &&
      content &&
      typeof content === 'string' &&
      price &&
      typeof price === 'string' &&
      content &&
      typeof content === 'string' &&
      date &&
      typeof date === 'string' &&
      location &&
      typeof location === 'string' &&
      info &&
      typeof info === 'string'
    ) {
      const updatedAds = await Ads.findById(req.params.id);

      if (updatedAds) {
        if (
          req.file &&
          ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)
        ) {
          deleteFile(
            path.join(
              __dirname,
              `../client/public/img/uploads/${updatedAds.image}`
            )
          );
        } else {
          image = updatedAds.image;
        }

        await Ads.updateOne(
          { _id: req.params.id },
          {
            $set: {
              title,
              content,
              price,
              date,
              image,
              location,
              info,
              user: req.session.user,
            },
          }
        );

        res.status(201).json({ message: 'Announcement has been modified' });
      } else if (!updatedAds) {
        deleteFile(filePath);
        res.status(404).json({ message: 'Announcement not found...' });
      }
    } else {
      req.file ? deleteFile(filePath) : 'unknown';
      res.status(400).send({ message: 'Bad request' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

exports.eraseAds = async (req, res) => {
  try {
    const updatedAds = await Ads.findById(req.params.id);
    if (updatedAds) {
      const filePath = path.join(
        __dirname,
        `../client/public/img/uploads/${updatedAds.image}`
      );
      await Ads.deleteOne({ _id: req.params.id });
      deleteFile(filePath);
      res.json({ message: 'OK' });
    } else {
      res.status(404).json({ message: 'Element not found...' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

exports.searchAds = async (req, res) => {
  try {
    res.json(
      await Ads.find({ title: { $regex: `(?i)${req.params.searchPhrase}` } })
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};
